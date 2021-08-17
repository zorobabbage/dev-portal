---
id: staking-commission-management
title: 佣金管理
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- node operator 
- commission
description: Commission management
---
---

委托人在智能合约上可用的操作如下：

1. [更新佣金率](#update-commission-rate)
2. [提现佣金](#withdraw-commission)
3. [更新收款地址](#update-address-for-receiving-commission)

:::info
质押智能合约中的佣金和佣金变化率由 `uint128` 表示。最后 7 位数字代表小数点。因此，如果百分比为 5.2%，则佣金的值将是 5.2 x 10^7，以整数表示）。
:::

## 更新佣金率

### 描述

`UpdateComm` 允许 SSN 运营商将佣金更新为新费率。每个周期的费率变化增量不得超过 [最大佣金变化率](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md#staking-parameters) (`maxcommchangerate`)。这是为了防止快速变化而允许对佣金率进行更渐进式调整。最后，新汇率必须小于或等于 `maxcommchangerate`。

### 前提条件

节点运营商在当前周期内不得更改佣金率。

### 参数

`new_rate`：新的佣金率

### Transition

``
transition UpdateComm(new_rate: Uint128)
``

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 提取佣金

### 描述

`WithdrawComm` 允许 SSN 运营商将赚取的所有佣金提取到佣金接收地址 `rec_addr`。

:::info
不管接收地址有没有更新，这个操作只能从 SSN 运营商地址调用。
:::

### 参数

无

### Transition

```
transition WithdrawComm()
```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 更新接收佣金地址

### 描述

`UpdateReceivedAddr` 将接收佣金地址更改为新地址。

### 参数

`new_addr`：调用 transition `WithdrawComm` 时接收佣金的新地址

### Transition

```
transition UpdateReceivedAddr(new_addr: ByStr20)
```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |