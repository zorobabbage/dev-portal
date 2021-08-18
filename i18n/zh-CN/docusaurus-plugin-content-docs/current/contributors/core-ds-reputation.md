---
id: core-ds-reputation
title: DS 声望
keywords: 
- core 
- directory 
- service 
- committee 
- reputation
description: Core protocol design - DS reputation.
---

---
DS 声望在 DS 多进多出中的集成能够识别和移除性能不佳的 DS 节点，而不仅仅是最老的 DS 节点。这鼓励节点所有者为 DS 节点使用更好的硬件，提高网络的稳定性和效率，特别是在共识协议期间。

步骤是：

1. 在 DS Block 共识期间，每个 DS 节点的性能是根据它们在上一个 DS 纪元中获得的奖励来评估的
2. DS leader 调用 `DetermineByzantineNodes()` 来找出哪些 DS 节点表现不佳（根据 `constants.xml` 中设置的标准）。这些表现不佳的节点的公钥包含在 DS Block 共识公告中
3. DS 备份节点在处理公告时调用 `VerifyRemovedByzantineNodes`，以验证被提议从委员会中删除的 DS 节点确实表现不佳。必须通过验证才能达成共识；否则将触发视图更改
4. DS Block 共识后，将表现不佳的 DS 节点从 DS 委员会和区块链网络中删除。他们将需要再次执行 PoW 以重新加入网络

## 参考

1. [DS 信誉提案](https://github.com/nnamon/zilliqa-research/blob/master/ds_reputation/proposal.md)
2. [PR 1587](https://github.com/Zilliqa/Zilliqa/pull/1587)