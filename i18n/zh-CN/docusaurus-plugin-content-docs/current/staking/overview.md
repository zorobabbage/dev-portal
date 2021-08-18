---
id: staking-overview
title: 概述
keywords: 
- 质押
- overview
- ssn
- seed node
- zilliqa
description: Zilliqa Seed Node Staking Overview
---
欢迎来到种子节点质押部分。 Zilliqa 的质押已分几个阶段实施。

## 阶段 0
阶段 0 是种子节点质押计划的初始、过去阶段。阶段 0 在 [ZIP-3](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-3.md) 中有正式描述。

阶段 0 的目标是：
- 向更多运营商开放种子节点网络
- 在种子节点操作层面引入质押

质押计划中的种子节点被称为 **Staked Seed Node** 或 **SSN**。

## 阶段 1
阶段 1 是 SSN 质押的过去阶段。 [ZIP-11](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md) 中正式描述了阶段 1。

阶段 1 介绍：
- 质押委托机制，无需向中间托管人存入 $ZIL
- 无上限的质押
- 以 gZIL 代币形式的质押奖励，一种符合 ZRC-2 的治理代币
- 质押数量绑定

## 阶段 1.1

[阶段 1.1](phase1/staking-phase1-overview) 是 SSN 质押的当前阶段。它建立在阶段 1 的质押之上，并在 [ZIP-19](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md) 中有正式描述。

阶段 1.1 包含阶段 1 的所有功能，并进一步引入
- 账户间转账存款
- 在 transition `AssignStakeRewards` 中删除自定义 ADT
- 正确删除空映射条目
- 质押参数的变化与 Zilliqa `v8.0.0` 的变化相结合