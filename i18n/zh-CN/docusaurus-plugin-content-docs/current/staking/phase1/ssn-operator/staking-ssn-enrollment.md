---
id: staking-ssn-enrollment
title: SSN 加入质押智能合约
keywords: 
- staking
- staked seed node
- enrollment
- smart contract
- zilliqa
description: Enrollment of SSN into staking smart contract
---
---

我们需要以下信息才能将你的 SSN 注册到智能合约中。 SSN 运营商的注册只能由 Zilliqa 团队完成。

| 信息 | 类型 | 未来调整？ |
|---------------------- | --------- | --------------------- |
| SSN地址| ByStr20 | 没有 |
| SSN 运营商名称 | String | 合约管理 |
| URL (RAW) | String | 合约管理 |
| API 网址 | String | 合约管理 |
| 佣金率 | Uint128 | SSN 运营商|

对于 SSN 地址，请确保此钱包地址是安全的，例如：Ledger。 一旦注册，将无法更改。
对于 `URL (RAW)` 和 `API URL`，请提供端口号。

为确保所有现有 SSN 运营商之间的公平竞争，我们允许 SSN 设置的初始佣金率为 0-20%。 然而，SSN 运营商随后可以通过 transition [`UpdateComm`](staking-commission-management#update-commission-rate) 重新调整佣金率。