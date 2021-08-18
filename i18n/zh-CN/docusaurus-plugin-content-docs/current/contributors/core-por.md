---
id: core-por
title: 声望证明
keywords: 
- core 
- por 
- proof 
- reputation
description: Core protocol design - proof of reputation.
---

---
[DS 声望](core-ds-reputation.md) 功能使用节点性能来规范 DS 委员会内的节点任期。以类似的方式，PoW 提交选择过程旨在优先考虑在网络中生成更多联合签名（即积极执行共识以生成区块）的节点。当主网已满时（即达到 2400 个节点的限制），将首先处理来自具有更高优先级评级的节点的 PoW 提交。此功能称为声望证明 (PoR)。

:::note
只有当 PoW 提交数量超过 `constants.xml` 中的 `MAX_SHARD_NODE_NUM` 时，声望选择才生效。
:::

## PoR 程序

1.当我们引导系统时，每个节点的声望为 0
2. 节点共同签名的每一个微区块或 Tx 区块，其声望都会增加 1。声望上限为 4096
3. 如果在任何 DS 纪元节点未能加入网络，其声望将重置为 0
4. 在每个 DS epoch 开始时，DS leader 调用 `CalculateNodePriority()` 根据节点声望计算节点优先级。优先级高的节点会被优先考虑加入分片结构
5. DS 备份收到 DS 区块公告后，调用 `VerifyNodePriority()` 同样计算节点优先级，验证分片结构中的节点是否满足最低声望/优先级要求
6. 当新的 DS leader 被选中时，分片结构被发送给它。新的 DS leader 可以从分片结构中获得每个节点的声望