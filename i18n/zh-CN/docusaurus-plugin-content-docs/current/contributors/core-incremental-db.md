---
id: core-incremental-db
title: 增量数据库
keywords: 
- core 
- incremental 
- database
description: Core protocol design - incremental DB.
---

---
增量数据库功能利用 AWS 简单存储服务 (S3) 为矿工和种子节点提供一种有效的方式来获取区块链数据以加入网络。

## 背景

在此功能之前，基本设计涉及在每个 Tx 时期将整个持久性数据上传或同步到 AWS S3 存储桶。然后新节点将从该存储桶中获取整个持久性数据。

这对于所有现有的 LevelDB 数据库都没有问题，但 `state` 数据库除外。这是因为在 `state` 上运行 `aws-cli sync` 时，会导致上传数据库中的所有文件，这很耗时且带宽效率不高。

因此，为每个 Tx epoch 上传 `state` LevelDB 是一个瓶颈，为此我们引入了增量数据库作为解决方案。

:::note
实际上有可能在每个 Tx 时期更新 `stateDB` 中的所有文件，如果该特定时期中的交易改变了地址的状态，这些地址以某种方式更新了状态 LevelDB 中所有文件的 TrieDB。
:::

## 执行

两个脚本构成了增量数据库的构建块。

### 上传增量数据库脚本

脚本 `uploadIncrDB.py` 在由 Zilliqa Research 管理的查询节点上运行。它执行以下步骤：

1. 将 `Lock` 文件添加到 S3 存储桶**增量**
2. 在每个 Tx 时期，在本地 `persistence` 文件夹（即在这个查询节点内）和 AWS S3 上的 `incremental\persistence` 之间执行同步。更具体地说，同步是根据基于 Tx 纪元号的不同标准来完成的。下面是一些可能性：
  - 在脚本启动时
    1. 清除两个 bucket，即 **incremental** 和 **statedelta**
    2. 同步整个`persistence`（即文件夹中存在的所有内容，包括 `state`、`stateroot`、`txBlocks`、`txnBodies`、`txnBodiesTmp`、`microblock` 等）到 bucket **incremental* *
    3. 清除存储桶 **statedelta** 中的所有状态增量
  - 每 10 个 DS 时期（即第 10 个 DS 时期之后的第一个 Tx 时期）
    1. 同步整个 `persistence` 到 bucket **incremental**
    2. 清除存储桶 **statedelta** 中的所有状态增量
  - 在所有其他 Tx 时期
    1. 同步整个 `persistence`（不包括`state`、`stateroot`、`contractCode`、`contractStateData`、`contractStateIndex`）到 bucket **incremental**
    2. 对于 DS 时期内的第一个 Tx 块（例如，100、200、300，...），我们不需要上传状态增量差异。相反，完整的 `stateDelta` LevelDB（生成一个 tarball，例如 `stateDelta_100.tar.gz`）被上传到 S3 存储桶 **statedelta**
    3. 对于其他 Tx 区块，我们将状态增量差异（由 tarball 组成，例如 `stateDelta_101.tar.gz`、`stateDelta_102.tar.gz`、....`stateDelta_199.tar.gz`）上传到 S3 存储桶 **statedelta**
3. 从 S3 存储桶中移除 `Lock` 文件**增量**

### 下载增量数据库脚本

每个矿工或种子节点在启动时执行脚本 `downloadIncrDB.py`，以获取最新的区块链数据。它执行以下步骤：

1. 检查 `Lock` 文件是否存在。一直等到没有找到 `Lock` 文件为止
2. 清除现有的本地 `persistence` 文件夹，然后从 S3 存储桶**增量**下载整个持久化数据（除了矿工节点的 `microblocks` 和 `txBodies`）
3. 检查上一步执行后是否出现了 `Lock` 文件。如果是，返回第一步
4. 清除现有的本地 `StateDeltasFromS3` 文件夹，然后将所有状态增量从 S3 存储桶 **statedelta** 下载到 `StateDeltasFromS3` 文件夹

## 加入节点的增量数据库使用

1. 节点使用 `downloadIncrDB.py` 脚本从 S3 存储桶 **incrementalDB** 下载数据到它的 `persistence` 文件夹
2. 节点使用相同的脚本用来自 S3 存储桶 **statedelta** 的所有状态增量同步到其 `StateDeltasFromS3` 文件夹
3.节点加载 `persistence` 的内容并启动同步。在这一点上，节点有一个基本状态，比如说，`X`
4. 然后节点使用 `StateDeltasFromS3` 中的状态增量重新创建最新状态（例如 `stateDelta_101.tar.gz`、`stateDelta_101.tar.gz`、....、`stateDelta_199.tar.gz`、`stateDelta_200。 tar.gz`, `stateDelta_201.tar.gz`, ....)
5. 使用这些文件，最终状态 `Y` 计算为 `Y = X + x1 + x2 + ... + x99 + x100 + x101 + x102 + ...`

更多关于新节点加入的信息可以在 [重新加入机制](core-rejoin-mechanism.md) 页面中找到。