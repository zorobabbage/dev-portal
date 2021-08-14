---
id: basics-zil-gas
title: Gas 计算
keywords: 
- gas accounting
- gas pricing
- contract gas
- zilliqa
- minimum gas
description: Zilliqa Gas
---

---

## Gas 价格

Zilliqa 的共识算法（即 PBFT）要求节点对每个区块以及其中的每个交易进行投票。 进入网络的每笔交易都有一个 gas 价格——这是发送者愿意支付给矿工以处理交易的一个 gas 单位的价格（以 ZIL 为单位）。

为了确保矿工不会强加自己的 gas 价格，这可能导致无法就交易达成一致，Zilliqa 协议维护了一个所有矿工都会接受的 _全局最小 gas 价格_。

网络运行算法来计算整个网络将同意的可接受的全局最低 gas 价格。 该算法考虑了：a）最近几个时期的先前 gas 价格 b）每个矿工在当前时期愿意接受的最低 gas 价格，以及 c）网络拥堵。

本质上，该算法根据最近几个纪元的网络拥堵情况来决定 gas 价格。 理由是，如果网络拥堵严重，那么矿工就可以对 gas 价格发表意见，而如果网络不拥堵，则 gas 价格不应过多依赖于提议的 gas 价格。


当前全局最低 gas 价格为 0.002 ZIL。

## 支付交易

每笔支付交易消耗 1 个 gas 单位，因此，支付交易要支付的 gas 为 0.002 ZIL。


## 智能合约交易

由于智能合约交易涉及更多的计算和存储，处理智能合约交易所需的 gas 取决于被调用的合约的复杂性、传递的参数等。 Scilla 带有一个内置的 gas 计算模块，可以跟踪 gas 在 Scilla 解释器执行合约时消耗。

Scilla 文字的每次使用以及在 Scilla 中执行表达式和语句都有确定性的相关成本。 更多详细信息可以在 [gas 计算文档](https://github.com/Zilliqa/scilla-docs/blob/master/docs/texsources/gas-costs/gas-doc.pdf)中找到
