---
id: rosetta-construction
title: 介绍
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
description: Introduction
---

---


## 构造

构造 API 使开发人员能够以标准格式写入区块链（即构造交易）。 实现是无状态的，可以完全离线运行，并支持分离密钥生成和签名。

### 构造流程
构造流程如下：
1. [/construction/derive](rosetta-construction-derive)
2. [/construction/preprocess](rosetta-construction-preprocess)
3. [/construction/metadata](rosetta-construction-metadata)
4. [/construction/payloads](rosetta-construction-payloads)
5. [/construction/parse](rosetta-construction-parse)
6. [/construction/combine](rosetta-construction-combine)
7. /construction/parse (to confirm correctness)
8. [/construction/hash](rosetta-construction-hash)
9. [/construction/submit](rosetta-construction-hash)

### 操作流程

```
                               调用者（如 Coinbase）                  + 构建 API 实现
                              +-------------------------------------------------------------------------------------------+
                                                                     |
                               从公钥           +----------------------------> /construction/derive
                               从公钥派生地址                         |
                                                                     |
                             X                                       |
                             X 创建元数据请求           +---------------------> /construction/preprocess
                             X （操作数组）                           |                    +
    获取构建交易              X                                       |                    |
    所需的元数据              X            +-----------------------------------------------+
                             X            v                          |
                             X 获取在线元数据         +-----------------------> /construction/metadata (online)
                             X                                       |
                                                                     |
                             X                                       |
                             X 构建要签名的有效负载         +------------------> /construction/payloads
                             X （操作数组）                           |                   +
                             X                                       |                   |
    创建未签名交易            X          +------------------------------------------------+
                             X          v                            |
                             X 解析未签名交易               +------------------> /construction/parse
                             X 以确认正确性                           |
                             X                                       |
                                                                     |
                             X                                       |
                             X 签名有效载荷             +-----------------------------> /construction/combine
                             X （使用调用者自己的分离签名者）           |                 +
                             X                                       |                 |
    创建签名交易              X         +-----------------------------------------------+
                             X         v                             |
                             X 解析签名交易                 +--------------------> /construction/parse
                             X 以确认正确性                           |
                             X                                       |
                                                                     |
                             X                                       |
                             X 获取已签名交易的哈希值           +--------------> /construction/hash
    广播签名交易              X 以监控状态                             |
                             X                                       |
                             X 提交交易                 +--------------------------> /construction/submit (online)
                             X                                       |
                                                                     +
```