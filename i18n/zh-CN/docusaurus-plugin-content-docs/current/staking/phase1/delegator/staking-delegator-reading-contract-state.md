---
id: staking-delegator-reading-contract-states
title: 读取合约状态
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- delegator
- contract states
description: Reading contract states
---

在本节中，我们将介绍一些从委托人的角度来看很有用的读取操作。 这些是：

- [当前 SSN 列表](#getting-the-current-list-of-ssns)
- [SSN 的委托人列表](#getting-the-list-of-delegators-for-a-ssn)
- [委托人的缓冲存款](#getting-the-delegators-buffered-deposit)
- [委托人的质押数量](#getting-the-delegators-stake-amount)
- [委托人的质押奖励](#getting-the-delegators-stake-reward)
- [委托人的奖励历史](#getting-the-delegators-reward-history)
- [委托人的待处理质押提取请求](#getting-the-delegators-pending-stake-withdrawal-request)
- [委托历史](#getting-delegation-history)

为了从智能合约中读取上述信息，你应该使用 [`GetSmartContractSubState`](https://apidocs.zilliqa.com/#getsmartcontractsubstate) API 通过从 `ssnlist` 智能合约中查询。

## 获取当前的 SSN 列表

### 输入

- `ssnlist` 智能合约地址
- `ssnlist`

```json 
curl -d '{
    "id": "1",
    "jsonrpc": "2.0",
    "method": "GetSmartContractSubState",
    "params": ["<ssnlist contract address>","ssnlist",[]]
}' -H "Content-Type: application/json" -X POST "<api endpoint>"
```

### 输出

SSN 与相应 SSN 数据类型的映射

映射 SSN 地址 -> [SSN 数据类型](https://github.com/Zilliqa/staking-contract/tree/spec/contracts#data-types)

```json
{
   "id":"1",
   "jsonrpc":"2.0",
   "result":{
      "ssnlist":{
         "<ssn addr>":{
            "argtypes":[
               
            ],
            "arguments":[
               {
                  "argtypes":[
                     
                  ],
                  "arguments":[
                     
                  ],
                  "constructor":"<ActiveStatus>"
               },
               "<StakeAmount>",
               "<StakeRewards>",
               "<name of ssn>",
               "<staking api url>",
               "<api url>",
               "<buffered deposit>",
               "<comission rate>",
               "<commssion rewards>",
               "<ssn commission receiving address>"
            ]
         }
      }
   }
}
```

## 获取 SSN 的委托人列表

### 输入
- `ssnlist` 智能合约地址
-`ssn_deleg_amt`
- SSN 地址

__示例__
```bash
curl -d '{
    "id": "1",
    "jsonrpc": "2.0",
    "method": "GetSmartContractSubState",
    "params": ["<ssnlist contract addresss>","ssn_deleg_amt",["0x<address of SSN>"]]
}' -H "Content-Type: application/json" -X POST "<api endpoint>"
```

### 输出
映射 `SSN 地址`-> 映射 `委托人地址` `质押存款金额`

__示例__
```json
{"<ssn address>":{"<delegator address>":"<stake deposit amount>"}}
```

## 获取委托人的缓冲存款

### 输入

- `ssnlist` 智能合约地址
- `buff_deposit_deleg`
- 委托人地址

__示例__ 
```bash
curl -d '{
>     "id": "1",
>     "jsonrpc": "2.0",
>     "method": "GetSmartContractSubState",
>     "params": ["<ssnlist contract address>","buff_deposit_deleg",["0x<address of delegator>"]]
> }' -H "Content-Type: application/json" -X POST "<api endpoint>"
```

### 输出

`ssn address` 的映射，其值为 `cycle number` 和该特定 `cycle number` 处的 `buffered deposit` 的映射

映射 `SSN地址`->映射`周期数` `Qa为单位的缓冲存款金额`

:::info
周期数是指存款提交到缓冲存款时智能合约的周期数。
:::

__示例__ 
```json
{"<ssn address>":{"<cycle number>":"<deposit amount>"}}
```

## 获取委托人的质押数量

### 输入

- `ssnlist` 智能合约地址
- `deposit_amt_deleg`
- `委托人` 的地址

__示例__ 
```bash
curl -d '{
>     "id": "1",
>     "jsonrpc": "2.0",
>     "method": "GetSmartContractSubState",
>     "params": ["<ssn contract address>","deposit_amt_deleg",["<delegator address>"]]
> }' -H "Content-Type: application/json" -X POST "api endpoint"
```

### 输出

由 SSN 地址和特定委托人的相应委托金额组成的映射

映射 `ssn地址`->`委托金额`
```json
{"<ssn addr>":"<delegated amount>",
"<ssn addr>":"<delegated amount>"}
```

## 获得委托人的质押奖励

即将推出

## 获取委托人的奖励历史

即将推出

## 获取委托人的待处理质押提款请求

### 输入

- `ssnlist` 智能合约地址
- `withdrawal_pending`
- `委托人` 的地址

__示例__ 
```bash
curl -d '{
    "id": "1",
    "jsonrpc": "2.0",
    "method": "GetSmartContractSubState",
    "params": ["<ssnlist contract address>","withdrawal_pending",["0x<address of delegator>"]]
}' -H "Content-Type: application/json" -X POST "<api endpoint>"

```

### 输出

由发起提款时的 `纪元号` 和相应的提款 `金额` 组成的映射

映射 `纪元号`->“待提款金额”
```json
{"<epoch number>":"<amount (Qa) to be withdrawn>",
"<epoch number>":"<amount (Qa) to be withdrawn>"}
```

## 获取委托历史

即将推出
