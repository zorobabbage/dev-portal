---
id: core-pow
title: 工作量证明算法
keywords: 
- core 
- por 
- proof 
- work 
- algorithm
description: Core protocol design - PoW algorithm.
---

---
## 工作量证明

工作量证明或 PoW 是区块链网络中的原始共识算法。在其他区块链（例如比特币和以太坊）中，该算法用于确认交易并在链中生成新区块。通过 PoW，矿工们相互竞争以完成网络上的交易并获得奖励。

在 Zilliqa 中，PoW 被用作分片节点加入网络所需满足的阈值。之后，节点可以开始签署交易并获得奖励。因此，在 Zilliqa 中，完成 PoW 并不意味着节点实际上已经可以获得奖励。

## 为什么需要 PoW

使用 PoW 的主要好处是抗 DoS 攻击防御以及质押对挖矿可能性的低影响。

**防御 DoS 攻击**。 PoW 对网络中的行为施加了一些限制。首先，它需要大量的努力来执行。有效的攻击需要大量的计算能力和大量的时间来进行这些计算。因此，攻击是可能的，但也是无用的，因为成本太高。

**挖矿可能性**。你钱包里有多少钱并不重要。重要的是要有强大的计算能力来解决难题并生成新的区块。因此，巨额资金的持有者并不负责整个网络的决策。

## Ethash 算法

Zilliqa 区块链使用最初来自以太坊的 Ethash 算法。

Ethash 是基于以太坊的区块链货币的工作量证明功能。它使用 Keccak，一种最终标准化为 SHA-3 的哈希函数（这两者是不同的，不应混淆）。

自 1.0 版以来，Ethash 已被设计为通过内存硬度（即更难在特殊 ASIC 芯片中实现）并且易于验证来形成 耐 ASIC 的特性。它还使用早期 Dagger 和 Hashimoto 哈希的略微修改版本来消除计算开销。 Ethash 功能以前称为 Dagger-Hashimoto，随着时间的推移不断发展。 Ethash 使用称为 Ethash DAG 的初始 1GB 数据集和 16MB 缓存供轻客户端保存。它们每 30,000 个区块（称为一个纪元）重新生成一次。矿工获取 DAG 的片段以使用交易和收据数据生成混合哈希，同时使用加密随机数生成低于动态目标难度的哈希。

## PoW 模式

Zilliqa 支持 5 种 PoW 模式。一些适用于本地或小规模测试，而另一些模式则用于主网挖矿。

### 轻型数据集挖矿

如果你不更改 `constants.xml` 中的任何参数，则这是默认的挖矿模式。它使用 CPU 来执行 PoW。它将动态生成 DAG 数据，不会将其存储在内存中；因此，它是最慢的方法，但它也不需要 1GB RAM。适用于本地测试或小规模云测试。不适合主网挖矿。

### 完整数据集挖矿

如果在 `constants.xml` 中将 `FULL_DATASET_MINE` 设置为 `true`，将启用此模式。它使用 CPU 来执行 PoW。它类似于轻型数据集挖矿模式——DAG 是动态生成的。但是，DAG 生成后，会保存在内存中。因此，下次需要使用相同的 DAG 时，将直接从内存中读出。这种方法比轻型数据集挖矿模式更快，但它需要硬件上的 1GB RAM。适用于本地测试或小规模云测试。不适合主网挖矿。

### GPU 挖矿

如果在 `constants.xml` 中将 `CUDA_GPU_MINE` 或 `OPENCL_GPU_MINE` 设置为 `true`，则将启用此模式。它使用 GPU 来执行 PoW。在 `constants.xml` 的 `GPU` 部分中有更多可用于此模式的参数。该模式使用 GPU 生成 DAG，DAG 保存在 GPU RAM 中。它要求 GPU 至少有 1GB RAM。由于 GPU 有数千个内核，因此挖矿速度可以比 CPU 挖矿快得多。适用于主网挖矿，但仅限于引导阶段；现在主网难度太高，单机无法在规定时间内完成 PoW。因此，它现在仅适用于测试目的。

### Getwork 服务器挖矿

如果在 `constants.xml` 中将 `GETWORK_SERVER_MINE` 设置为 `true`，将启用此模式。 Zilliqa 节点将作为挖矿服务器，如果该节点的 GPU 机器可以找到结果，其他 GPU 机器可以从该服务器获取工作并提交结果。这种模式可以将多台 GPU 机器的算力组合在一起，完成一个高难度的 PoW 工作。但是如果有多个 Zilliqa 节点使用这种模式，这种设置并不容易维护。

### 远程挖矿

如果在 `constants.xml` 中将 `REMOTE_MINE` 设置为 `true`，将启用此模式。此外，`MINING_PROXY_URL` 需要设置为挖矿代理的地址。在这种模式下，多个 Zilliqa 节点可以向挖矿代理发送 PoW 工作请求，挖矿代理将工作包分派给多台矿机。如果矿机找到结果，则将其发送给挖矿代理，挖矿代理再将其发送到 Zilliqa 节点。这种模式可以支持多个 Zilliqa 节点和矿机，但需要单独运行一个挖矿代理服务器。

## 参考

1. [Ethash](https://en.wikipedia.org/wiki/Ethash)
2. [挖矿代理](https://github.com/DurianStallSingapore/Zilliqa-Mining-Proxy)