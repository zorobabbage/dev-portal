---
id: core-consensus
title: 共识
keywords: 
- core
- consensus
- PBFT
description: Core protocol design - consensus.
---

---
本节描述了 PBFT 共识（最初在 Zilliqa [白皮书]（https://docs.zilliqa.com/whitepaper.pdf) 中设计）是如何在核心 Zilliqa 代码中实现和使用的。

## 协议中的用法

共识用于协议的以下阶段：

| 数据 | 成员 | 运行时期                                |
|--------------------------|--------------|----------------------------------------|
| DS 区块 | DS委员会| PoW 窗口之后 |
| 分片微块 | 分片节点 | 分片节点 Tx 处理后 |
| DS 微块 + Tx 区块 | DS委员会| DS 节点 Tx 处理后 |
| VC 区块 | DS委员会| DS节点进入视图变化后|

### 状态机

共识协议是跨两个类实现的：`ConsensusLeader` 和 `ConsensusBackup`。 下图显示了 Leader 和 backup 的状态转换。

![image01](/img/contributors/core/consensus-protocol/image01.jpg)

#### 初始状态

首次创建每个类的对象时，会设置 `INITIAL` 状态（例如，请参阅 `DirectoryService::RunConsensusOnDSBlockWhenDSPrimary`）。

#### 公告和承诺阶段

实例化后，运行 `ConsensusLeader` 的节点通过发送公告消息来启动序列。该公告包括所有同行需要达成共识的数据。然后每个运行`ConsensusBackup` 的节点处理公告消息，这也意味着运行与共识类型相关的验证器功能（例如， `DirectoryService::DSBlockValidator`）。

如果公告被接受，则提交将发送回 Leader 。 Leader 保持在此阶段，直到从 backup 中收到所需的提交次数 (2/3)（请注意， Leader 本身是白皮书中提出的 2/3+1 要求的一部分）。

#### 挑战和响应阶段

在收到所需数量的提交后， Leader 生成挑战，这是提交的每个人（包括 Leader 本身）的聚合提交和公钥的函数。然后将挑战发送给已提交的 backup ，后者随后发回响应消息。

#### 集体签名阶段

收集到所有响应后， Leader 生成集体签名，并将集体签名和响应映射（指示谁参与了提交和响应阶段）发送给所有对等方。有了这些信息， backup 就可以验证集体签名，这有效地结束了一轮共识。

### 两轮共识

实际上，上面的状态机仅代表 PBFT 共识序列的一半。完整的共识需要分两轮运行上述阶段。

轮次之间存在一些差异。首先，公告触发第 1 轮的开始。对于第 2 轮，集体签名消息作为触发器。其次，在第 1 轮中共同签名的消息是用户打算验证的数据（例如，DS 区块）。对于第 2 轮，要共同签名的消息是相同的数据加上第 1 轮的集体签名和响应映射。

### 共识子集

共识协议最初被设计为从 `INITIAL` 到 `DONE` 的单一线性序列。但是，由于网络不稳定不可避免地会经常导致一个或多个视图变化，从而减缓主网的进度。

为了解决这种情况，我们更改了共识实现以支持跨不同对等子集的多个并发运行共识。下面是它的工作原理：

:::note
对于主网，我们在 DS 级别将子集数量设置为 2，在分片级别设置为 1。以下步骤假定此计数。代码理论上支持其他计数，但此时可能尚未完全测试。
:::


1. 不是在收到所需的 2/3 提交后立即进行处理，而是 Leader 需要等待最长持续时间为 `COMMIT_WINDOW_IN_SECONDS` 秒以接收提交。只有当 `COMMIT_TOLERANCE_PERCENT` 指定的节点百分比已经提交时，它才会缩短等待时间。这是为两轮共识完成的。

2. 一旦 Leader 停止接受提交，它会从已提交的对等节点中生成两个子集（两个子集的大小均为 2/3+1，并且包括 Leader ）：
   - 子集 0 = 如果 DS 委员会内达成共识，则优先考虑 DS 守卫，并用其他 DS 节点填充剩余的插槽。如果共识在分片内，则随机选择节点，不偏向于守卫。
   - 子集 1 = 随机选择节点，不偏向守卫（无论共识是在 DS 还是分片级别完成）。

3.  Leader 创建两个挑战并将这两个挑战发送给至少属于两个子集之一的所有 backup 。
4.  backup 验证两个挑战并向两者发送回响应。
5.  Leader 检查来自每个 backup 的两个响应，并挑选出 backup 是子集一部分的响应。
6. 一旦两个子集之一完成，共识回合结束。
7. 从第二轮共识中的提交列表中再次生成子集，然后遵循相同的处理步骤。

### 操作参数

这些是影响我们共识运作方式的相关常量：

- `BROADCAST_GOSSIP_MODE` - 当它为 `true` 时，`ConsensusLeader` 使用 gossip 发送公告和集体签名消息。否则，将使用多播发送消息。

- `COMMIT_TOLERANCE_PERCENT` - 如果子集计数大于 1，则指定发送提交以提早减少等待时间（由 `COMMIT_WINDOW_IN_SECONDS` 指定）所需的对等节点的百分比。

- `COMMIT_WINDOW_IN_SECONDS` - 如果子集计数大于 1，则指定 Leader 等待接收提交的最长时间。

- `CONSENSUS_MSG_ORDER_BLOCK_WINDOW` - 这在 `DirectoryService` 或 `Node` 级别使用，以指示节点将延迟处理不适用于当前共识对象状态的特定共识消息的秒数（基于 `ConsensusCommon ::CanProcessMessage()`)。

- `CONSENSUS_OBJECT_TIMEOUT` - 这在 `DirectoryService` 或 `Node` 级别使用，以指示节点将延迟处理不适用于 `DirectoryService` 或 `Node` 实例的当前状态的共识消息的秒数（例如，DS 节点可能已经接收到视图更改共识消息，而它仍未处于“VIEWCHANGE_CONSENSUS” 状态）。

- `DS_NUM_CONSENSUS_SUBSETS` - 这表示在 DS 委员会内用于达成共识的共识子集的数量。

- `SHARD_NUM_CONSENSUS_SUBSETS` - 这表示用于在分片内达成共识的共识子集的数量。