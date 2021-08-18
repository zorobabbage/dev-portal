---
id: core-gossip
title: Gossip
keywords: 
- core 
- gossip
description: Core protocol design - gossip.
---

---
Zilliqa 核心中提供了一个 `RumorManager` 库来支持节点之间的消息 gossip。

## 概述

- 目标是提供一种替代广播的通信方法，特别是在大规模集群中。
- 在 `P2PComm::SendBroadcastMessage` 中实现的广播是资源匮乏的；它发送 `O(n^2)` 消息，需要大量线程，并打开太多 TCP 连接。
- gossip 算法，在这篇 [论文](https://zoo.cs.yale.edu/classes/cs426/2013/bib/karp00randomized.pdf) 中详细描述，提供了一种在`O( logn)` 轮次和 `O(ln(ln(n)))` rumor 消息（其中 `n` 是参与 gossip 的节点数量）。
- `RumorManager` 扮演管理所有 gossip/rumor 及其状态的角色。

## 接口

为节点公开以下接口以在网络中启用 gossip 消息。

### InitializeRumorManager

网络中的每个节点在新的 DS 纪元开始时（或在成功更改视图之后）使用来自他们自己的分片或委员会的节点列表初始化 `RumorManager`。

初始化包括以下内容：

- 存储对等点列表
- 在对等列表、DS 委员会成员和查询节点中存储对等节点的公钥
- 存储节点自己的对等信息和密钥对
- 轮次开始（每 `ROUND_TIME_IN_MS` 毫秒运行一个循环），其中包括：
  - 检查 `RumorHolder` 中每个 rumor 的状态并发送到 `MAX_NEIGHBORS_PER_ROUND` 随机对等方（如果 rumor 不够旧）。
  - `RumorHolder` 在每一轮中使用中值计数器算法（如白皮书的第 3 节所述）监视/更改其持有的每个 rumor 的状态。

### SpreadRumor

这使节点能够启动 rumor 与其对等列表进行 gossip。它会将 rumor 添加到 `RumorHolder`，后者反过来管理其状态并进一步 gossip。

### SpreadForeignRumor

这使节点能够开始传播从不属于其对等列表的节点（因此，“foreign”）接收的 rumor。它根据在 `RumorManager` 初始化期间存储的所有公钥来验证发送方节点。

### StopRounds

停止 gossip 轮次，从而停止对对等点的 gossip。
  
## Rumor 状态机

谣言状态机由 `RumorHolder` 管理。

每个 rumor 都会在任何时候处于以下状态之一：

- `NEW`：peer `v` 知道 `r` 和 `counter(v,r) = m`（年龄/轮次）
- `KNOWN`：冷却状态；保持这个状态进行 `m_maxRounds` 轮，并参与 rumor 传播
- `OLD`：最终状态；会员停止参与 rumor 传播

每个 rumor 都以 `NEW` 状态开始。它要么保持此状态，要么立即或根据白皮书中提到的算法在连续轮次中进入 `KNOWN` 或 `OLD` 状态。每个 rumor 都与轮次有关（将其视为 rumor 时代）。

rumor 被配置为分别在 `<MAX_ROUNDS_IN_BSTATE>` 和 `<MAX_ROUNDS_IN_CSTATE>` 中停留在 `NEW` 和 `KNOWN` 状态。
总轮次数配置为不超过 `<MAX_TOTAL_ROUNDS>`，之后 rumor 被标记为 `OLD`。这些设置可以在节点的常量文件中找到，如下所示：

```xml
<gossip_custom_rounds>
  <MAX_ROUNDS_IN_BSTATE>2</MAX_ROUNDS_IN_BSTATE>
  <MAX_ROUNDS_IN_CSTATE>3</MAX_ROUNDS_IN_CSTATE>
  <MAX_TOTAL_ROUNDS>6</MAX_TOTAL_ROUNDS>
</gossip_custom_rounds>
```

## Gossip 消息格式

| 字段 | 说明 |
|-------------------|--------------------------------------|
| START_BYTE_GOSSIP | 0x33（表示 gossip 消息类型）|
| HDR | 消息头 |
| GOSSIP_MSGTYPE | 见下一节 |
| GOSSIP_ROUND | Rumor 年龄（根据消息发送者）|
| GOSSIP_SNDR_PORT | 发件人监听端口|
| PUB_KEY | 发件人的公钥 |
| SIGNATURE         | 有效载荷签名 |
| Payload            | 要 gossip 的 Rumor |

## Optimized Pull-Push Mechanism

`GOSSIP_MSGTYPE` 可以指以下任何一项：

- `PUSH (0x01)`：对 `PULL` 请求的响应。有效负载包含原始消息。它被发送到请求对等方。
- `PULL (0x02)`：对给定散列的原始消息的请求。有效载荷包含哈希。它被放在响应中发送给发送 `LAZY_PUSH` 或 `LAZY_PULL` 的节点。
- `EMPTY_PUSH (0x03)`：如果节点在其存储中没有任何激活的 rumor，它会在每一轮发送给随机邻居。它表示向节点的邻居询问 rumor。有效载荷包含未使用的虚拟数据。
- `EMPTY_PULL (0x04)`：这会发送给 `EMPTY_PULL` 或 `LAZY_PULL` 的发送者，以表明它也没有任何激活的 rumor。有效载荷包含未使用的虚拟数据。
- `FORWARD (0x05)`：一种特殊类型，表示正在发送的消息来自外部对等方。这意味着发件人不属于当前分片或委员会。通常它从查询节点发送到分片或 DS 委员会节点，或在分片节点和 DS 委员会节点之间（在任一方向）。
- `LAZY_PUSH (0x06)`：在每一轮发送给随机邻居，用于其商店中的每个激活 rumor。有效负载包含要被 gossip 的原始消息的哈希值。
- `LAZY_PULL (0x07)`：如果发送者在本轮中第一次发送了 `LAZY_PUSH`/`EMPTY_PUSH` 消息，则是对发送者的响应。有效负载包含原始消息的哈希值。

:::note
每条 gossip 消息都经过签名，签名经过验证后才被接受。
:::

综合上面的消息，通过使用 `EMPTY_*` 和 `LAZY_*` 散列并使用 `PUSH` 和 `PULL` 获取实际原始消息来优化标准 Push-Pull 机制。

因此，`LAZY_PUSH` 和`LAZY_PULL` 是散列 gossip 的主干，并且是唯一对其底层 rumor （即散列）具有有效 `GOSSIP_ROUND` 的 gossip 消息。对于其他消息类型，`GOSSIP_ROUND` 只是设置为 -1，因为它在这些类型中没有用。

## 消息订阅

由于快速 gossip 的性质，节点可能在特定时间点只有散列而不是原始消息。在这种情况下，如果节点收到该散列的 `PULL` 消息，则会将该节点添加到订阅列表中。一旦节点收到该散列的原始消息，它就会将其发送给订阅列表中的所有对等方。