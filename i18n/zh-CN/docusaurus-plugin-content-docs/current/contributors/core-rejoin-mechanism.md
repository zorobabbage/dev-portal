---
id: core-rejoin-mechanism
title: 重新加入机制
keywords: 
- core 
- rejoin 
- mechanism
description: Core protocol design - rejoin mechanism.
---

---
以下部分解释了不同类型节点的加入和重新加入过程。

使用的一些术语是：

1. **启动脚本**：这是指主网加入页面中提供的脚本（即`launch_docker.sh` 和 `launch.sh`）或用于守卫节点的 `start.sh`
2. **上层种子**：节点可以查询区块链数据的种子节点。 一个或多个上层种子通常列在 `constants.xml` 中

加入或重新加入过程依赖于 `m_syncType` 设置，它可以是以下任何值：

| 同步类型 | 目的                                          |
|-------------------------|---------------------------------------------------|
| `(0) NO_SYNC`           | 表示一个节点已完全同步 |
| `(1) NEW_SYNC`          | 新节点（可能是分片的）加入或重新加入 |
| `(2) NORMAL_SYNC`       | 新节点（未分片）加入 |
| `(3) DS_SYNC`           | DS 节点重新加入|
| `(4) LOOKUP_SYNC`       | 查询节点重新加入 |
| `(5) RECOVERY_ALL_SYNC` | 从现有区块链启动整个网络 |
| `(6) NEW_LOOKUP_SYNC`   | 新查询节点加入 |
| `(7) GUARD_DS_SYNC`     | DS 守卫节点重新加入 |

:::note
为简化以下部分，已省略特定于守卫的序列。
:::

## 新节点加入

:::note
这也适用于尝试使用启动脚本重新加入的现有分片节点。
:::

1. 启动脚本使用 `download_incr_db.py` 从 AWS S3 [增量数据库](core-incremental-db.md)下载最新的持久化数据
2. 启动脚本使用 `m_syncType = NEW_SYNC` 启动节点（即 `zilliqa` 进程）
3. 节点读出由启动脚本更新的本地 `persistence`
4. 节点使用从增量数据库中获取的基本状态和状态增量重新创建当前状态
5.由于 `m_syncType` 不是 `NO_SYNC`，节点会阻塞一些通常会被同步节点处理的消息
6.节点使用 `Node::StartSynchronization()` 开始同步

### `Node::StartSynchronization()`

1. 向所有上层种子发送请求，从他们的 [空闲黑名单](core-blacklist.md#空闲黑名单) 中删除节点的 IP 地址
2. 从随机上层种子中获取最近的 DS 区块和 Tx 区块
3. 单独的线程在接收到 Tx 区块时处理，获取相应的状态增量并计算当前每个的状态
4. 如果最新的 Tx 区块是针对非空纪元的：
   1. 从随机上层种子中获取最新的分片结构并检查该节点是否已经是分片的一部分
   2. 如果它不属于任何分片，那么它被认为是一个新的矿工，在这种情况下，根据前面的步骤继续获取最近的区块
   3. 如果它已经是分片的一部分
      1. 设置分片参数（成员和 ID）
      2. 将 `m_syncType` 更改为 `NO_SYNC` 并停止屏蔽消息
      3. 向分片节点发送从空闲黑名单中移除的请求
      4. 通过初始化节点变量（例如，`m_consensusID`、`m_consensusLeaderID` 等）、检查当前角色（即分片 leader 或 backup）、初始化 Rumor 管理器并继续进行微块共识，开始下一个 Tx 纪元
      5. 此时节点已成功重新加入网络，成为现有分片节点
5. 如果最新的 Tx 区块是一个空的纪元：
   1. 计算状态后将状态更新移动到磁盘
   2. 获取最新的 DS 委员会信息，向随机上层种子发送请求，让该节点知道何时开始 PoW 挖矿
   3. 收到上层种子通知后开始挖矿
   4. 如果下一个 DS 区块的分片信息中包含该节点：
      1. 将 `m_syncType` 更改为 `NO_SYNC` 并停止屏蔽消息
      2. 此时节点已经成功加入网络，成为新的分片节点
   5. 如果节点未能及时接收到下一个 DS 区块：
      1. 从随机上层种子中获取最新的 DS 区块
      2. 如果一个新的 DS 区块实际上被创建了，这意味着这个节点丢失了 PoW。则如上面所做继续同步直到下一个空纪元
      3. 如果节点无法从上层种子获取新的 DS 区块，则设置 `syncType = NORMAL_SYNC` 并触发 `Node::RejoinAsNormal`

节点在 `Node::StartSynchronization()` 中维护一个 while 循环，同时执行上述所有步骤（空闲黑名单删除请求除外）。当 `m_syncType` 变为 `NO_SYNC` 时，它退出 while 循环。

### `Node::RejoinAsNormal()`

1. 设置 `SyncType = NORMAL_SYNC`
2. 从 AWS S3 增量数据库下载最新的持久化数据
3. 检索下载的持久化存储
4. 使用从增量数据库中获取的基本状态和状态增量重新创建当前状态
5. 由于 `m_syncType` 不是 `NO_SYNC`，所以屏蔽一些通常会被同步节点处理的消息
6. 使用 `Node::StartSynchronization()` 开始同步

## DS 节点加入

:::note
这也适用于尝试使用启动脚本重新加入的现有 DS 节点。
:::

此过程反映了新节点加入的过程，但有一些不同：

1. 重新创建当前状态后，检查该节点是否是当前 DS 委员会的一部分。 如果是：
    1. 从最新的 DS 纪元开始为所有 Tx 区块和微块重新创建 coinbase
    2. 从随机上层种子中获取丢失的签名（需要用于 coinbase 重建）
    3. 向所有上层种子发送从空闲黑名单中移除的请求
    4. 触发 `DirectoryService::StartSynchronization()`
2. 如果节点不是当前 DS 委员会的一部分，则触发 `Node::RejoinAsNormal()`

### `DirectoryService::RejoinAsDS()`

这个过程反映了 `Node::RejoinAsNormal()`，但有一些不同：

1. 设置 `SyncType = DS_SYNC`
2. 使用 `DirectoryService::StartSynchronization()` 开始同步

### `DirectoryService::StartSynchronization()`

这个过程反映了 `Node::StartSynchronization()`，但有一些不同：

1. 节点不需要检查分片成员资格。 但是，在重新创建当前状态后，如果该节点不再是 DS 委员会的一部分，则触发 `Node::RejoinAsNormal()`
2. 重新创建当前状态后，如果新的 DS 纪元已经开始，则再次获取更新后的分片结构
3. 通过初始化节点变量（例如 `m_consensusID`、`m_consensusLeaderID` 等）、检查当前角色（即 DSleader 或 backup）、初始化 Rumor 管理器并进行微块共识来开始下一个 Tx 纪元
4. 如果最新的 Tx 区块是用于非空纪元，则将状态设置为 `MICROBLOCK_SUBMISSION`
5. 如果最新的 Tx 区块是一个空纪元，则将状态设置为 `POW_SUBMISSION`
6. 此时节点已经成功重新加入网络，成为现有的 DS 节点

### 其他触发 DS 节点重新加入的条件

1. 当视图发生变化时，DS 节点首先进行预检。 预检失败的原因之一是，如果在预检查期间挖出了新的 DS 区块或 Tx 区块，并且该特定节点未能参与该区块的共识。 这将导致节点调用 `DirectoryService::RejoinAsDS()`
2. 如果 `Node::Install()` 因任何原因失败，DS 节点检查它是否仍然是DS 委员会的一部分。 如果是，则触发 `RejoinAsDS()`。 如果不是，它会触发 `RejoinAsNormal()`
3. 如果节点以 `DS_GUARD_SYNC` 的 `SyncType` 启动，则触发 `RejoinAsDS()`

## 种子节点加入

此过程反映了新节点加入的过程，但有一些不同：

1. 启动脚本以 `m_syncType = NEW_LOOKUP_SYNC` 启动节点
2. 节点使用 `Lookup::InitSync()` 开始同步

### `Lookup::InitSync()`

1. 从随机上层种子中获取最近的 DS 区块和 Tx 区块
2. 单独的线程在接收到 Tx 区块时处理，获取相应的状态增量并计算当前每个的状态
3. 如果最新的 Tx 区块是一个空纪元：
    1. 计算状态后将状态更新移动到磁盘
4. 从随机上层种子中获取任何微块，用于新接收的 Tx 区块以及从持久化数据中读出的最后 `N` 个 Tx 区块
5. 从随机上层种子中获取最新的分片结构
6. 设置 `syncType = NO_SYNC`
7. 此时节点作为种子节点已成功重新加入网络

在执行上述所有步骤时，节点在 `Lookup::InitSync()` 中维护一个 while 循环。 当 `m_syncType` 变为 `NO_SYNC` 时，它退出 while 循环。

### `Lookup::RejoinAsNewlookup()`

种子节点可能会错过接收 Tx 区块或 DS 区块，在这种情况下，它会失去同步并触发 `RejoinAsNewlookup` 重新加入。

1. 设置 `syncType = NEW_LOOKUP_SYNC`
2. 如果丢失的 Tx 区块数量超过 `NUM_FINAL_BLOCK_PER_POW`：
    1. 从 AWS S3 增量数据库下载最新的持久化数据
    2. 检索下载的持久化存储
    3. 使用 `Lookup::InitSync()` 开始同步
3. 如果丢失的 Tx 区块数量不超过 `NUM_FINAL_BLOCK_PER_POW`：
    1. 使用 `Lookup::StartSynchronization()` 开始同步

### `Lookup::StartSynchronization()`

1. 从随机上层种子中获取最近的 DS 区块和 Tx 区块
2. 单独的线程在接收到 Tx 区块时处理，获取相应的状态增量并计算当前每个的状态
3. 如果最新的 Tx 区块是一个空纪元：
    1. 计算状态后将状态更新移动到磁盘
4. 从随机上层种子中获取任何微块，用于新接收的 Tx 区块以及从持久化数据中读出的最后 `N` 个 Tx 块
5. 从随机上位种子中获取最新的 DS 委员会信息
6. 设置 `syncType = NO_SYNC`
7. 此时节点作为种子节点已成功重新加入网络

## 查找节点重新加入

查找节点可能会错过接收 Tx 区块或 DS 区块，在这种情况下，它会失去同步并触发 `RejoinAsLookup` 重新加入。

### `Lookup::RejoinAsLookup()`

1. 设置 `syncType = LOOKUP_SYNC`
2. 使用 `Lookup::StartSynchronization()` 开始同步