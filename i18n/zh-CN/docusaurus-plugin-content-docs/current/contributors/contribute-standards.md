---
id: contribute-standards
title: 协议标准
keywords: 
- protocol
- standards
- ZIP
- improvement
- proposals
description: Contribution guide to Zilliqa core protocol standards.
---

---
自 2017 年发布最初的 [白皮书](https://docs.zilliqa.com/whitepaper.pdf) 以来，Zilliqa 核心已经发展到解决我们 Zilliqa 主网中遇到的功能、安全、性能、部署和可用性等挑战性工作。虽然 Zilliqa 平台自成立以来已经取得了显着的成熟度，但随着区块链领域新的发展，也提供了改进的机会，Zilliqa 平台仍在不断完善中。

Zilliqa 核心协议包含在我们的 [C++ 代码库](https://github.com/Zilliqa/Zilliqa/) 中的实现以及围绕它的所有相关流程或约定（例如，数据格式、API 规范等）。其中许多可以在我们的 [设计文档](core-intro.md) 和其他可用资源中获取，他们共同构成了我们的核心协议标准。

本着开源开发的精神，非常欢迎社区对改进这些标准的贡献。我们的 [Zilliqa 改进提案](https://github.com/Zilliqa/ZIP/) 仓库为这些贡献提供了结构化的途径。一旦经过同行评审，提案就会被实施并最终成为核心协议标准的一部分。

这些提议的一些例子包括：

1. 规格
   - Zilliqa 地址标准 ([ZIP-1](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-1.md))
   - Zilliqa 内部交易 ([ZIP-2](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-2.md))
2. 功能更新
   - Zilliqa Scilla 外部库支持 ([ZIP-5](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-5.md))
   - 采用 MPT 进行合约状态散列 ([ZIP-8](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-8.md))
3. 功能添加
   - 种子节点质押机制 ([ZIP-3](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-3.md))
   - Zilliqa 隔离服务器 ([ZIP-6](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-6.md))
4. 可用性和 API 标准
   - GetMinerNodes API ([ZIP-4](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-4.md))
   - 交易请求的 URL Scheme 格式 ([ZIP-7](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-7.md))

首先，请阅读仓库中的这些资源：

1. [简介](https://github.com/Zilliqa/ZIP/#zip)
2. [贡献指南](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-0.md#what-is-a-zip)