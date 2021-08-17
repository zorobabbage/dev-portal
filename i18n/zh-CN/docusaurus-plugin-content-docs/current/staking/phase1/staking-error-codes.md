---
id: staking-error-codes
title: 智能合约错误代码
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- error codes
description: Smart Contract Error Codes
---
---

## 概述

当遇到错误条件时，`ssnlist` 智能合约将抛出带有错误代码的异常。 如下示例所示。
```
Exception thrown: (Message [(_exception : (String "Error")) ; (code : (Int32 -13))]) :188
  Raised from IsProxy :269
  Raised from IsPaused :279
  Raised from DelegateStake :797
```
在这里，我们将揭开错误代码的神秘面纱。

## 错误代码

| 错误名称 | 错误代码 | 说明 |
| ---------- | ---------- | ----------- | 
| ContractFrozenFailure | -1 | `ssnlist` 合约当前处于暂停状态 |
| VerifierValidationFailed | -2 | 发起者应该是一个`verifier` |
| AdminValidationFailed | -3 | 发起者应该是一个`admin` |
| StagingAdminNotExist | -4 | 未设置暂存管理员 |
| StagingAdminValidationFailed | -5 | 无法验证暂存管理员 |
| ProxyValidationFailed | -6 | transition 的调用者必须是注册的代理地址| 
| DelegDoesNotExistAtSSN | -7 | 当前 `SSN` 不存在 `Delegator` |
| DelegHasBufferedDeposit | -8 | `Delegator` 已使用当前的 `SSN` 缓冲存款，无法继续进行当前的操作 |
| ChangeCommError | -9 | `SSN 运营商`在当前奖励周期中刚刚更改了佣金，将无法在本周期再次更改它 |
| SSNNotExist | -10 | `SSN` 不存在 |
| SSNAlreadyExist | -11 | 存在一个与发起者提供的地址相同的 `SSN` |
| DelegHasUnwithdrawRewards | -12 | `Delegator` 有未提取的奖励，无法进行当前操作 |
| DelegHasNoSufficientAmt | -13 | `Delegator` 无法提取或重新委托质押，因为提供的金额大于他当前使用特定 SSN 的 dekegaed 金额 |
| SSNNoComm | -14 | `SSN` 没有佣金给 `SSN运营商` 可提现|
| DelegStakeNotEnough | -15 | 委托金额小于`min stock` |
| ExceedMaxChangeRate | -16 | 佣金变动金额大于最大佣金变动率允许的金额|
| ExceedMaxCommRate | -17 | 佣金率不能超过最大佣金率，即 100% |
| InvalidTotalAmt | -18 | 不能减少总质押金额 |
| VerifierNotSet | -19 | `verifer` 未设置 |
| VerifierRecvAddrNotSet | -20 | `verifer` 接收地址未设置|
| ReDelegInvalidSSNAddr | -21 | 发起者试图重新委托给一个不存在的 `SSN` |
| AvailableRewardsError | -22 | 奖励验证失败 |
| InvalidSwapAddr | -23 | 没有切换请求的地址或委托人切换到相同地址 |
| SwapAddrValidationFailed | -24 | 请求者切换地址与请求者地址不匹配 |
| SwapAddrAlreadyExistsAsRequest | -25 | 检测到循环切换请求 |
