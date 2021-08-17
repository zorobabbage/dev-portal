---
id: staking-phase1-overview
title: 阶段 1.1 概述
keywords: 
- staking
- overview
- ssn
- seed node
- phase 1
- zilliqa	
description: Phase 1.1 Overview
---

欢迎来到 Zilliqa 种子节点质押计划的阶段 1.1。我们邀请感兴趣的参与者通读 [Zilliqa 改进提案 19](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md) 中阶段 1 的正式文档。

阶段 1.1 建立在 [ZIP-3](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-3.md) 和 [ZIP-11](https:// github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md）。

在阶段 0，我们通过一个简单的机制引入了我们的质押程序，该机制涉及 3 个不同的角色：
1. SSN 运营商
2. 验证者
3. 合约管理员

SSN 运营商承担着质押者和种子节点运营商的双重角色。因此，如果运营商希望向非运营商个人收取质押押金，则运营商需要提供另外的平台（如质押池平台）来支持押金收集和奖励分配。这种质押形式对某些人来说可能并不理想，因为他们需要信任这个中介（即运营商）来持有他们的质押存款并公平地分配他们的奖励。

阶段 1 通过引入一个称为 **委托人** 的新角色来解决这些问题。委托人可以将其质押直接存入质押合约，也可以直接从合约中获得奖励。这消除了信任中介的需要。 SSN 运营商的角色也在阶段 1 进行了调整，SSN 运营商不再需要处理质押存款和奖励。相反，运营商可以专注于监督其 SSN 的运营，以及管理从委托人那里收到的佣金。

阶段 1.1 为阶段 1 添加了新功能，即能够将质押存款从一个地址转移到另一个地址。它还介绍了阶段 1 的代码修复。

## 如何进行

:::danger 免责声明
在参与我们的质押计划之前，请仔细阅读我们的 [免责声明](../staking-disclaimer) 页面。
:::

此阶段 1.1 文档中的下一部分组织如下：

1. [一般信息](staking-general-information) 部分包含任何对质押程序感兴趣的人有用的详细信息
2. [委托人](delegator/staking-delegator-overview) 部分针对以下受众：
   - 质押钱包建设者
   - 质押仪表盘建设者
   - 想要构建自己的工具链的委托人
3. [SSN 运营商](ssn-operator/staking-ssn-before-you-start) 部分针对希望启动和维护 SSN 的运营商。这些运营商可以是托管或非托管的，包括：
   - 资源管理器和钱包提供商
   - 质押即服务提供商
   - API 即服务提供商
   - 感兴趣的 Zilliqa 社区成员
   - 在其平台上提供质押的交易所

想要质押的 Zilliqa 代币持有者可以简单地参考 [https://www.zilliqa.com/staking](https://www.zilliqa.com/staking) 了解如何质押和委托他们的代币。