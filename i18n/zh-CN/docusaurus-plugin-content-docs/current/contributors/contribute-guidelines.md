---
id: contribute-guidelines
title: 贡献指南
keywords: 
- development
- guidelines
description: Development guidelines for contributing to Zilliqa core.
---

---
## 开发过程

我们尽量使我们的开发过程简单，并通过自动化强制执行硬性规则。

在开始之前，请先熟悉以下文档：

1. [行为准则](https://github.com/Zilliqa/Zilliqa/blob/master/CODE_OF_CONDUCT.md)
2. [编码风格](https://github.com/Zilliqa/Zilliqa/blob/master/CODING_STYLE.md)
3. [编码和审查指南](https://github.com/Zilliqa/Zilliqa/blob/master/CONTRIBUTING.md)

这些是为项目做出贡献时要考虑的基本事项：

1. `master` 分支是 Zilliqa 仓库的主要开发分支。所有新工作都必须基于 `master` 分支创建新分支。
2. 编译代码更改时，使用 `./build.sh style` 而不是`./build.sh`，以便clang-format 自动修复代码格式。
3. 为你的代码更改编写或执行所有测试。下面的 [部分](#testing) 描述了不同的支持的测试。
4. 提交 pull request 时，填写 [模板](https://github.com/Zilliqa/Zilliqa/blob/master/.github/PULL_REQUEST_TEMPLATE.md) 中要求的详细信息。

## CI/CD 管道和发布管理

拉取请求必须获得至少 2 位审阅者的批准才能合并到 `master` 分支中。

此外，拉取请求必须通过对代码更改的自动检查。这些是由 Travis CI 构建作业沿分支和与 master 合并完成的。这些检查包括：

1. 代码构建
2. clang 格式
3. clang-tidy
4. 代码覆盖

定期创建新版本，并且可以通过检出版本标签（例如，`git checkout tags/v6.2.0`）访问这些版本。
这些版本随附 [发行说明](https://github.com/Zilliqa/Zilliqa/releases)，详细说明了修复、改进和新功能。

在我们的 [Docker Hub 仓库](https://hub.docker.com/repository/docker/zilliqa/zilliqa) 上，发布版本也会自动作为 Docker 镜像提供。不在我们官方支持的操作系统上的节点运营商可以选择在这些镜像上运行他们的节点。

## 测试

有几种方法可以测试核心协议：

1. 针对代码的特定部分编写 [单元测试](https://github.com/Zilliqa/Zilliqa/tree/master/tests)。大多数单元测试作为 CI/CD 管道的一部分执行，以确保不回归。
2. 启动 [本地测试网](https://github.com/Zilliqa/Zilliqa#boot-up-a-local-testnet-for-development) 在本地机器上模拟 Zilliqa 网络。
3. 启动一个近似于实际 Zilliqa 主网的基于云的测试网。目前此方法仅适用于 Zilliqa 研究团队。如果你的代码更改需要使用此方法进行测试，请与团队协调。