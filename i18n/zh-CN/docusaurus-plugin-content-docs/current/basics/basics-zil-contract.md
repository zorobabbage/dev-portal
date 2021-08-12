---
id: basics-zil-contract
title: 智能合约层
keywords: 
- scilla
- smart contract
- pbft
- zilliqa
- scilla interpreter
description: Zilliqa Smart Contracts
---

---

Zilliqa 拥有自己的智能合约语言，称为 Scilla。 Scilla 是 Smart Contract Intermediate Level Language 的缩写，它被设计为一种考虑到智能合约安全的原则性语言。

Scilla 在智能合约上强加了一种结构，通过直接在语言级别消除某些已知漏洞，使应用程序不易受到攻击。 此外，Scilla 的原则性结构使应用程序本质上更安全，更易于进行形式验证。

Scilla 中的一些设计选择包括：

1. **计算和通信之间的分离：** Scilla 中的合约被构造为通信自动机：每个合约内的计算（例如，改变其余额或计算函数的值）都是作为独立的原子 transition 实现的，即不涉及任何其他方。 每当需要这种参与时（例如，将控制权转移给另一方），transition 将通过发送和接收消息的方式以明确的通信结束。

2. **有效计算和纯计算的分离：** 在 transition 中发生的任何合约内计算都必须终止，并对合约的状态和执行产生可预测的影响。 为了实现这一点，Scilla 从函数式编程中汲取灵感，在区分纯表达式（例如，具有原始数据类型和映射的表达式）、不纯的本地状态操作（即读/写到合约字段）和区块链反射（ 例如，读取当前区块高度）。

## Scilla Interpreter

Scilla 目前带有一个用 OCaml 编写的 [解释器](https://github.com/zilliqa/scilla)。 解释器提供了一个调用接口，使用户能够使用指定的输入调用 transition 并获得输出。 使用提供的输入执行 transition 将产生一组输出，以及智能合约可变状态的变化。

有关解释器的更多详细信息，请参阅 [Scilla 中文文档](https://scilla-docs-zh-cn.readthedocs.io/zh_CN/latest/interface.html)。
