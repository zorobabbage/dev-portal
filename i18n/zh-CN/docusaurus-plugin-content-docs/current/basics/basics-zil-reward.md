---
id: basics-zil-reward
title: 激励机制
keywords: 
- base rewards
- flexible rewards
- coinbase reward
- reward calculator
- zilliqa
description: Zilliqa Rewards
---

---
在 Zilliqa 网络中，激励分为：

* **[总量的 20%] 基础激励**，分配给网络中所有验证节点（DS/分片）。
* **[总量的 40%] 动态激励**，基于节点在 TX 时期执行 pBFT 共识时提交的有效和接受（分片内的前 2/3 签名者）签名的数量。

对于 DS 和分片节点，基本激励和动态激励具有相同的权重。 所有激励都集中在整个 DS 纪元中，并且仅在空的纪元期间（即 DS 纪元的最后一个交易纪元）分配。

请注意，激励的最后 **40%** 将提供给 Zilliqa 质押计划。

例如，如果 Zilliqa 网络中总共有 2400 个节点，并且 `COINBASE_REWARD` 设置为每个 DS 纪元的 ZIL 为 `197244.577626`，则激励分配将为：

- 基础激励：
    ```shell
    197244.577626 * 0.25 / 2400
    = 20.546310169375 $ZIL per node per DS Epoch
    ```
- 动态激励：（先到先得）
    ```shell
    197244.577626 * 0.70 / (2,400 * 2/3 [Successful signers] * 99 [TX blocks])
    = ~0.8716616435492 $ZIL per valid and accepted signature
    ```
:::note
为了这个新生网络的稳定性，Zilliqa 的守护节点也部署在网络中，包括 DS 委员会和所有分片。 这些守护节点始终留在网络中，不进行 PoW，也不会得到激励。 但是，分配前的激励划分确会将保护节点计算在内。 因此，对于设法满足 PoW 要求的非保护节点没有“奖金”激励。
:::

通过复制 [**激励计算器**](https://docs.google.com/spreadsheets/d/1iA3DvXMiAql6bf1mGHHxfGLICm0wZ2Gav5HzRkP81j4/edit?usp=sharing) 并编辑黄色高亮显示的单元格，了解我们的每日挖矿盈利能力。
