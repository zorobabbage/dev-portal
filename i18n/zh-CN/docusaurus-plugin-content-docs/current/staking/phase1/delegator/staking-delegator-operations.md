---
id: staking-delegator-operations
title: 智能合约操作
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- delegator
- delegation
description: Smart contract operations
---
---

委托人在智能合约上可用的操作如下：

1. [委托质押](#delegate-stake)
2. [提取权益奖励和 gZIL](#withdraw-stake-rewards-and-gzil)
3. [提现数量](#withdraw-stake-amount)
4. [完全提现](#complete-withdrawal)
5. [质押金额再委托](#stake-amount-redelegation)

## 智能合约中值的表示

`_amount` 和 `amt` 用 `Qa` 表示，其中 1 `ZIL` = 1 * 1E12 `Qa`。

## 委托质押

### 描述

`DelegateStake` 接受 $ZIL 存款并将质押委托给由 `ssnaddr` 标识的 SSN。

如果无法接受质押，则会抛出 `异常` 并恢复交易。如果 SSN 已经处于活动状态，则此质押将被缓冲，否则它将被添加到 SSN 的质押池中。如果委托的金额小于 `mindelegstake`，则 transition 应该抛出错误。

:::info
由于阶段 1 质押计划的非托管性质，只有钱包的所有者才能提取质押金额和质押奖励。 SSN 运营商将无法使用该资金。
:::

### 参数

`_amount`：存入智能合约的质押金额
`ssnaddr`：要委托的 SSN

### Transition

```
transition DelegateStake(ssnaddr: ByStr20) 
```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 提取质押奖励和 gZIL

### 描述

`WithdrawStakeRewards` 从 SSN 中提取委托人的质押奖励（$ZIL 和 `gZIL`）。 如果 gZIL 的发行仍在进行中，每给予 1 $ZIL 质押奖励，委托人将获得 0.001 `gZIL`。

:::info
如果委托人委托给多个 SSN 并希望从 SSN 中提取所有奖励，则用户将需要多次调用此 transition，每次指定不同的 SSN 地址。
:::

### 参数

`ssnaddr`：委托人希望从中提取奖励的 SSN 地址

### Transition

```
transition WithdrawStakeRewards(ssnaddr: ByStr20)
```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 提取质押金额

### 描述

`WithdrawStakeAmt` 是从 SSN 中提取委托人的质押数量的两个操作中的第一个。成功调用此 transition 后，提取的质押金额将进入**解除绑定**状态。委托人将需要等待 30,800 个区块（约 2 周），然后委托人才能成功调用 transition `CompleteWithdrawal` 以完成提款回委托人的钱包。当质押金额处于解绑状态时，将没有资格获得任何新奖励（$ZIL 和/或 gZIL）。

对于测试网，解绑期是 50 个区块而不是 30,800 个区块。

:::info
如果委托人委托给多个 SSN 并希望从 SSN 中提取所有奖励，则用户将需要多次调用此 transition，每次指定不同的 SSN 地址。
:::

### 前提条件
委托人不应有任何无人认领的质押奖励或缓冲存款。提款后，委托人剩余质押金额必须大于合约中指定的最小委托人权益金额，即 10 ZIL

### 参数

`ssnaddr`：委托人希望从中提取奖励的 SSN 地址
`amt`：从委托中提取到特定 SSN 的质押数量

### Transition

```
 WithdrawStakeAmt(ssnaddr: ByStr20, amt: Uint128)
 ```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 完成提款

### 描述

`CompleteWithdrawal` 是从 SSN 中提取委托人的质押数量所需的两个操作中的第二个，委托人首先需要成功调用 transition  `WithdrawStakeAmt`，等待 30,800 个区块（约 2 周）以解除抵押数量 结束，最后在单独的交易中调用 `CompleteWithdrawal` 完成提现，并将质押金额收回到委托人的钱包中。

`CompleteWithdrawal` 将遍历所有已经转换到 `unbonding` 状态的质押金额，确定已经完成解绑过程的金额并将其撤回委托人的钱包。 此操作与 SSN 无关。

### 前提条件
委托人不应有任何无人认领的质押奖励或缓冲存款。

### 参数

无

### Transition

```
 CompleteWithdrawal()
 ```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |

## 质押数量重新授权

### 描述

`ReDelegateStake` 允许委托人将质押金额从一个 SSN 转移到另一个 SSN。 质押金额不会进入解绑状态。 但是，质押数量的缓冲可能仍然适用。

### 参数

`ssnaddr`: 现有的 SSN，其中的质押数量将从中提取并转移到新的 SSN
`to_ssn`：接受质押金额委托的新 SSN 
`amount`：要转移到新 SSN 的质押数量

### Transition

```
transition ReDelegateStake(ssnaddr: ByStr20, to_ssn: ByStr20, amount: Uint128)
```

### 示例代码

| 语言 | 传送门 |
| -------- | ------------------- |
| NodeJS   | 即将推出 |
| Java     | 即将推出 |
| Golang   | 即将推出 |