---
id: mining-additional-info
title: 补充信息
keywords: 
- mining
- pow
- network difficulty
- reward mechanism
- epoch architecture
- zilliqa	
description: Mining Additional Informantion
---

---
## Network Epoch Architecture

![Zilliqa Epoch Architecture](https://i.imgur.com/Da4t6FW.png)

在每个 DS Epoch 开始时，所有挖矿候选者都将以`60` 秒为一个窗口周期运行工作量证明（Ethash 算法），以竞争加入 Zilliqa 网络。

- 满足 `DS_POW_DIFFICULTY` 参数的节点将有资格作为 DS 节点加入。
- 满足 `POW_DIFFICULTY` 参数的节点将有资格作为分片节点加入。

每个 DS 时期（2-3 小时）内总共有 100 个 TX 时期（每 1-2 分钟）。每 100 个 TX 时期被称为 **Vacuous epoch**。

真空时期仅用于：

- 将 coinbase 奖励分配给所有节点。
- 升级机制的处理（因为 pBFT 中没有分叉）。
- 写入持久状态存储（更新节点的 levelDB）。

在一个真空时期，网络不处理任何交易。

## 工作量证明算法

Zilliqa 使用 [**Ethash**](https://github.com/ethereum/wiki/wiki/Ethash) 作为其 PoW 算法。因此，Zilliqa 在其工作量证明算法中使用 DAG，该算法在每个 **DS 时期** 以递增速率生成。 bootstrap DAG 大小大约为 `1.02GB`。

有关 Zilliqa PoW 算法的更多详细信息，请参阅 [核心协议文档](../contributors/core-pow.md)。

## 网络难度

有关难度调整算法的更多详细信息，请参阅 [核心协议文档](../contributors/core-difficulty-adjustment.mdx)。

## 网络奖励机制

参考 [Zilliqa 架构-奖励机制](../basics/basics-zil-reward.md)。