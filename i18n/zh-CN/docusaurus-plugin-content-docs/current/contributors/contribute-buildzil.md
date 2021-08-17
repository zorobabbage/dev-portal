---
id: contribute-buildzil
title: 构建 Zilliqa
keywords: 
- contribution 
- core
description: Contribution guide for Zilliqa core.
---

---
Zilliqa 核心是用 C++ 实现的，并存档在我们的开源 [Github 仓库](https://github.com/Zilliqa/Zilliqa/) 中。

Zilliqa Research 主要维护代码库并调节外部开发人员的贡献。

虽然我们在实现运行 Zilliqa 主网的核心协议方面取得了长足的进步，但这仍然是一项充满活力的工作。会定期推送新功能、改进和错误修复。始终欢迎开发人员社区对推进该项目做出贡献。

## 快速入门指南

Ubuntu 18.04 正式支持构建 Zilliqa 代码库。

按照以下步骤执行构建：

1. 根据 [本节](https://github.com/Zilliqa/Zilliqa/#build-dependencies) 在仓库中安装需要的依赖。
2. 克隆 [Zilliqa 仓库](https://github.com/Zilliqa/Zilliqa/)。
3. 根据 [本节](https://github.com/Zilliqa/Zilliqa/#build-from-source-code) 构建源码。

成功后，将在工作目录的 `build` 子文件夹中创建输出（包括 `zilliqa` 二进制文件）。

## 下一步

一旦你能够构建代码库，你就可以通过多种方式做出贡献了：

1. 作为 PR 提交代码更改（请阅读 [贡献指南](contribute-guidelines.md)）
2.提交 [proposals](contribute-standards.md)，完善核心协议设计
3.在 [repository issues](https://github.com/Zilliqa/Zilliqa/issues) 提交bug报告和功能请求
4. 向我们的 [bug 赏金计划](contribute-bug-bounty.md) 提交与安全相关的问题

## 为 Scilla 做贡献

功能齐全的 Zilliqa 节点还包括 Scilla 智能合约解释器。如果你有兴趣为该项目做出贡献，请参阅 [Scilla 网站](https://scilla-lang.org/#getinvolvedsection)。

## 资源

这些是有助于解释核心协议的可用资源：

1. Zilliqa [白皮书](https://docs.zilliqa.com/whitepaper.pdf)
2. [Zilliqa 架构](../basics/basics-zil-nodes.mdx) 和 [核心协议设计](../contributors/core-node-operation.md) 部分
3. [Zilliqa 改进提案](https://github.com/Zilliqa/ZIP/) 仓库
4. [官方博客](https://blog.zilliqa.com/) 中的每月更新和技术文章
5. 我们 [官方Discord服务器](https://discord.com/invite/XMRE9tt) 上的开发者社区频道