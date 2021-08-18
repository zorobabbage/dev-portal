---
id: core-view-change
title: 视图变更
keywords: 
- core 
- view 
- change
description: Core protocol design - view change.
---

---
在网络停顿的情况下，核心协议回退到视图变更。这个过程发生在 DS 委员会内，涉及选择一个新的 DS 委员会 leader，以在停顿前的时间点恢复区块链的进程。

一般步骤如下：

1. DS 委员会共识因某种原因停滞
2. 网络进入视图变更状态
3. DS 委员会的候选 leader 使用 PBFT 领导视图变更共识
4. DS 备份验证候选 leader 的公告
5. 视图变更共识达成
6. DS 委员会恢复停滞的共识

### 术语

1. 候选 leader：将领导视图变更共识轮的提议 leader
2. Faulty leader(s): 停顿前的当前 leader，以及任何未能成功完成视图变更共识的候选 leader
3. 驱逐：将所有有缺陷的 leader 安置在 DS 委员会的后面。这意味着在下一次 DS 共识之后，这些节点将优先从 DS 委员会中删除

### 触发条件

这些是可能导致视图变更发生的条件：

1. 节点进入 `RunConsensusOnDSBlock()` 但是 DS 区块共识没有在规定时间内完成
2. 节点进入 `RunConsensusOnFinalBlock()` 但是 Tx 区块共识没有在规定时间内完成
3. 节点进入 `RunConsensusOnViewChange()` 但 VC 区块共识未在规定时间内完成

### 步骤

1. 满足任何触发条件并开始视图变更
2. DS 节点进行视图变更预检：
    1. 联系查询节点请求新区块（DS 或 Tx）
    2. 如果没有获得新区块，则继续进行视图变更
    3. 如果获得了新区块，作为 DS 节点重新加入
3. 所有节点使用 `CalculateNewLeaderIndex()` 计算新的候选 leader 索引，它使用这个算法
    ```text
    H(finalblock or vc block hash, vc counter) % size (or num of DS guard)

    If a previous vc block (for current consensus) exists, use vc block hash. Else use Tx block hash. If new candidate leader index is current faulty leader, re-calculate using
    H(H(finalblock or vc block hash, vc counter)) repeatedly till an index is not the current faulty leader.
    ```
1. 候选 leader 和 backup 继续进行视图变更共识，直到完成或停止
   1. 如果停滞，等待超时并重新运行与新候选 leader 的视图变更共识
2. 所有节点从 DS 委员会中删除错误的 leader（在 VC 区块头的列表中找到）
3. 所有节点在 DS 委员会后面添加错误的 leader（除非那些是 [DS 守卫](core-guard-mode.mdx)）
4. 所有节点根据更新的 DS 委员会重新计算 `m_consensusMyID` 和 `m_consensusLeaderID`
5. 所有节点将 VC 区块存储到持久化存储中
6. 如果停滞共识是在 Tx 区块共识：
   1. VC 区块被发送到查询和分片节点
   2. 查询和分片节点类似地使用 VC 区块更新 DS 委员会组成
7. 如果延迟共识是在 DS 区块共识：
   1. DS 节点缓存视图变更期间生成的所有 VC 区块
8. 所有节点在视图变更之前重新运行停滞的共识（DS 区块或 Tx 区块共识）
   1. 如果重新运行共识是针对 Tx 区块，则使用指数退避算法调整 gas 限制
9. 共识运行完成（或者，失败并触发另一个停滞）
10. 如果完成的共识是针对 DS 区块的：
   1. DS 节点将缓存的 VC 区块附加到新生成的 DS 区块
   2. DS 区块（连同 VC 区块）被发送到查询和分片节点
   3. 查询和分片节点类似地使用 VC 区块更新 DS 委员会组成