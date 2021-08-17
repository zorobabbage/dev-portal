---
id: staking-ssn-before-you-start
title: 开始之前
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- node operator 
description: Before you start
---
---

在你开始作为质押种子节点 (SSN) 运营商的旅程之前，请通读以下内容以更好地了解质押种子节点的作用和目的。

## 究竟什么是种子节点？

种子节点是不参与 Zilliqa 网络共识的 Zilliqa 全节点。种子节点的用途如下：

- 作为验证交易的核心 Zilliqa 网络直接接入点（对于最终用户和客户）
- 合并交易请求并将它们转发到查找节点（另一种类型的节点）以分发到分片
- 维护整个交易历史和区块链的全局状态，这是提供区块浏览器等服务所需要的

## 种子节点和质押种子节点有什么区别？

种子节点从第一天起就成为 Zilliqa 生态系统的一部分。它们至关重要，因为它们提供对 dApp、钱包、浏览器和交易所的 [API](https://apidocs.zilliqa.com/#introduction) 访问。大多数种子节点是私有的，访问仅限于运营商的基础设施。 Zilliqa 提供了一组可在 [api.zilliqa.com](https://api.zilliqa.com) 上公开访问的种子节点。

质押种子节点（SSN）的目的是向受信任的运营商 `开放` 种子节点，使我们更接近整个种子节点架构的去中心化。为了吸引优质的种子节点运营商，必须建立适当的激励机制。这在 [ZIP-11](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md) 和 [ZIP-19](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md) 有详细描述。我们强烈建议任何希望在阶段 1.1 成为 SSN 运营商的人阅读 ZIP-11 和 ZIP-19。

## 谁有资格在阶段 1.1 运行 SSN？

阶段 1.1 中的 SSN 可通过 SSN 公钥的白名单接收。我们可能无法满足在阶段 1 启动时运行 SSN 的所有请求。

白名单背后的基本原理是：

- 确保种子节点网络不会因 SSN 过载而退化
- 选择并加入高质量的 SSN 运营商

因此，我们将根据以下因素优先考虑 SSN 运营商。请注意，这些并不是硬性要求，我们将全面评估每个运营商。

- 能够运行和维护种子节点的高可用性
- 能够达到 ZIP-11 中所述的最低质押金额
- 能够长期持续维护 SSN
- 能够在网络升级后及时升级 SSN
- 能够提供钱包用户界面或浏览器等增值服务
- Zilliqa 面向社区的 SSN 运营商

## 下一步是什么？

在你继续设置 SSN 之前，请联系 maintainers[at]zilliqa.com 上的 Zilliqa 技术团队以设置沟通渠道。 Zilliqa 团队将使用该频道来了解更多有关潜在 SSN 运营商的信息，并及时提供有关 Zilliqa 网络活动（例如网络升级）的信息。
