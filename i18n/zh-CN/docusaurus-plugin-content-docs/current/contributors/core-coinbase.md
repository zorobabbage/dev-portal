---
id: core-coinbase
title: Coinbase 奖励
keywords: 
- core 
- coinbase 
- rewards
description: Core protocol design - coinbase rewards.
---

---
在每个 DS 纪元，总共会分发 `COINBASE_REWARD_PER_DS` QA 来奖励矿工。在此金额中，25% 分配为基本奖励，5% 分配为查找奖励，剩余部分为基于联合签名的奖励。

基本奖励平均分配给每个节点。具体来说，这些节点是通过 PoW 获得分片或 DS 委员会成员资格的节点。

查找奖励平均分配给所有查询节点。

基于节点签名的微块（在分片节点的情况下）或交易区块（在 DS 节点的情况下）的数量以成比例的方式将基于联合签名的奖励分配给相同的基本奖励接收者。

:::note
守护节点不会获得奖励。相反的，他们的奖励份额存储在空地址中。
:::

## 分发过程

1. 奖励分配发生在 vacuum 纪元期间（即 DS 纪元中的最后一个 Tx 纪元）
2. 状态变化（即空地址的减法和节点地址的加法）反映在 DS 委员会微块的状态增量中
3. DS 对状态 delta 执行共识并且记录奖励
4. 从第一个 Tx 纪元（当前 DS 纪元）到空纪元之前的联合签名被考虑用于基于联合签名的奖励分配
5. 来自分片的联合签名仅被考虑用于 vacuous 纪元（即，DS 节点的 Tx 区块联合签名被排除在外）。这是因为 DS 委员会需要先计算 coinbase 奖励分配，然后才能在 vacuum 纪元中执行生成 Tx 区块（带有 DS 节点的共同签名）的共识

## 技术说明

开发人员需要注意 coinbase 奖励数据结构的管理方式有点不同。

为了跟踪基于联合签名的奖励的联合签名，我们使用这个约定：`m_coinbaseRewardees[EPOCH][SHARDID]-->{Cosigs}`。但是，纪元编号取决于分片 ID 是指实际分片还是 DS 委员会。

例如，带有两个分片（ID 为 `0` 和 `1`）的 `纪元 5` 的联合签名以下面这种方式存储：

```
m_coinbaseRewardees[5][0] --> {Cosigs from Microblock proposed by shard 0}
m_coinbaseRewardees[5][1] --> {Cosigs from Microblock proposed by shard 1}
m_coinbaseRewardees[6][-1]--> {Cosigs from Tx block mined by DS Committee}
```

请注意，DS 委员会的分片 ID 为 `-1`。 此外，纪元号比分片的纪元号高 1。 这是因为在 `SaveCoinbase()` 之前调用了 `IncreaseEpochNum()`（在 `StoreFinalBlock()` 内部）。