---
id: core-ds-mimo
title: DS 多进多出
keywords: 
- core 
- directory
- service 
- committee 
- membership
description: Core protocol design - DS MIMO.
---

---
:::note
DS 委员会驱逐现已被 [DS 声望](core-ds-reputation.md) 取代。
:::

DS 委员会成员使用多入多出 (MIMO) 设置来维护。这种设置允许 `n` 个节点在每个 DS 时期加入和离开 DS 委员会。步骤是：

1.节点提交 PoW（难度和 DS 难度）
2. DS leader 组成 DS Block
   - DS leader 通过使用 `min(number of eligible pow submission, NUM_DS_ELECTION)` 来确定有多少节点被选入 DS 委员会
   - 因此，传入 DS 节点的数量范围从 0 到 `NUM_DS_ELECTION`
3. DS leader 在 DS Block 内的映射中添加新加入的 DS 成员信息
4. DS leader 从`sortedPoWSolns` 中删除传入的 DS 成员，以确保传入的 DS 成员不会被添加到任何分片中
5. 组成 DS Block 后，`ComputeDSBlockParameters()` 返回传入 DS 成员的数量（后面会用到）
6. 现在，是时候从 DS 委员会中剔除 `n` 个（最老的）DS 成员并将这些成员降级为分片成员
7. DS leader 将被驱逐的成员加入 `m_allPoWConns` 和 `sortedPoWSolns`
   - 由于降级成员不执行 PoW，因此对这些成员提供了虚拟 PoW 解决方案
   - 这种情况下的虚拟 PoW 解决方案是使用 `sha256(node’s pubkey)` 计算的
8. 现在，是时候组成分片结构了。这部分没有大的变化
9. DS Block 共识开始并顺利完成
10. DS leader 和 backups 执行以下操作
   - DS leader 和 backups 在执行 `UpdateMyDSModeAndConsensusId()` 之前首先运行 `UpdateDSCommitteeComposition()`。这与新成员将要做的事情保持一致。此外，进行此类更改可以更轻松地计算 `consensusMyID`
   - 在 `mediator` 的 DS 委员会数据结构中添加 `n` 个传入的 DS 成员
   - 从 `mediator` 中的 DS 委员会数据结构中弹出 `n` 个 DS 成员
   - 最老的 `n` 个成员由 `(consensusID + n incoming DS members) >= size of DS committee` 决定。这些节点将其模式更改为 `IDLE`
   - 其他 DS 成员将他们的 `consensusMyID` 增加 `n` 并将状态更新为 DS leader 或 backups
11. DS 委员会将 DS Block 和分片结构发送给所有 PoW 提交者
12. 新加入的 DS 成员接收 DS 区块，对其进行处理，并根据 DS 区块映射中的排序更新他们的 DS `consensusMyID`。从这里开始，这些节点就是 DS 委员会的一部分了
13. 分片成员处理 DS Block 并更新他们对 DS 委员会的看法