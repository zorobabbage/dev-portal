---
id: exchange-transaction-receipts
title: 了解存款交易
keywords: 
- transaction receipts
- fields
- polling
- exchanges
- zilliqa
description: Transaction Receipts Exchanges
---

---

## 存款交易

当 [获取交易](https://apidocs.zilliqa.com/#gettransaction) 为JSON 格式时，已确认的交易在 **result** 字段下带有 **receipt**。

## 基本字段

以下是 **receipt** 可能具有的字段。 这些字段通常适用于付款和合约交易。

| 字段 | 类型 | 说明 |
|:------------------ |:---------- |:---------------- ----------------------------------------- |
| **cumulative_gas** | string     | 本次交易消耗的 gas 总量|
| **epoch_num** | string      | 确认此交易的纪元号 |
| **success** | boolean     | 此交易的结果（成功时为 `true`）|

例如：

```
"receipt": {
  "cumulative_gas": "10481",
  "epoch_num": "586524",
  "success": true
},
```

## 补充字段

对于智能合约交易，与智能合约执行相关的附加信息包含在 “**receipt**” 下的补充字段中。

### 成功交易

如果交易成功（即 **success** 字段为 `true`），将出现以下字段：

| 字段 | 类型 | 描述                                                                                 |
|:------------------ |:---------- |:-------------------------------------------------------------------------------------------- |
| **accepted**       | boolean    | 此交易中的最后一次 transition 是否发生了**余额转移**|
| **event_logs**     | json-array | 合约在处理过程中发出的事件日志列表。 每个日志包含：<ol><li>**_eventname**: [string] 事件名称</li><li>**address**: [string] 发出此事件的合约地址</li><li>**params**: [json-array] transition 下的参数列表。 每个条目包含：<ul><li>**vname**: [string] 变量名</li><li>**type**: [string] 变量类型</li><li>**value**: [string] 变量值</li></ul></li></ol>                                                                |
| **transitions**    | json-array | Scilla 解释器在处理交易期间调用的内部 transaction 列表。 每个 transaction 包含：<ol><li>**addr**: [string] 发出此 transition 的合约账户的地址</li><li>**depth**: [int] 当前 transition 的深度。 交易中接收者直接发出的 transition 深度为 0。如果深度 0 中的 transition 调用了其他合约的 transition，则这些 transition 的深度为 1。依此类推。</li><li>**msg**: [json-object] Scilla 解释器发出的消息字段，其中包括：<ul><li>**_amount**: [string] 从本次 transition 转移的余额</li><li>**_recipient**: [string] 此 transition 的接收者，可以是钱包账户或合约账户</li><li>**_tag**: [string] 合约定义的 transition 名称</li><li>**params**: [json-array] transition 下的参数列表。 每个条目包含：<ul><li>**vname**: [string] 变量名</li><li>**type**: [string] 变量类型</li><li>**value**: [string] 变量值</li></ul></li></ul></li></ol>             |

例如:

```
"receipt": {
  "accepted": true,
  "cumulative_gas": "878",
  "epoch_num": "589742",
  "event_logs":[
    {
      "_eventname":"RecordsSet",
      "address":"0x708bfbba57436ed45efc13df9fab4249a354e06b",
      "params":[
        {
          "type":"ByStr20",
          "value":"0x9611c53be6d1b32058b2747bdececed7e1216793",
          "vname":"registry"
        },
        {
          "type":"ByStr32",
          "value":"0x2bb13c9b0a5dd28d42b470e2073df14608a9056310988b84b24dc342211e0627",
          "vname":"node"
        }
      ]
    },
  ],
  "success": true,
  "transitions": [
    {
      "addr": "0x9a65df55b2668a0f9f5f749267cb351a37e1f3d9",
      "depth": 0,
      "msg": {
        "_amount": "50000000000000",
        "_recipient": "0xc0e28525e9d329156e16603b9c1b6e4a9c7ed813",
        "_tag": "onFundsReceived",
        "params": [
          "vname": "emp_addr",
          "type": "ByStr20",
          "Value": "0x00345678901234567890123456789012345678ab"
        ]
      }
    }
  ]
}

```

### 不成功的交易

如果交易不成功（即 **success** 字段为 `false`），则不会执行余额转移。 此外，这些字段将出现：

| 字段 | 类型 | 描述                                                                                  |
|:------------------ |:----------- |:-------------------------------------------------------------------------------------------- |
| **errors**         | json-object | 包含键值字段的对象。 键 [string] 表示错误发生的深度。 值部分是一个 JSON 数组，其中列出了报告的错误代码 [int]。 可以在 [这里](https://github.com/Zilliqa/Zilliqa/blob/8b088f8ea63f1aab43fde8bbb9741ecaf36b089b/src/libData/AccountData/TransactionReceipt.h#L32) 找到可能的错误代码列表.                                  |
| **exceptions**     | json-array  | Scilla 解释器返回的异常列表。 每个异常包含：<ol><li>**line”**: [int] Scilla 合约代码中检测到异常的行</li><li>**message**: [string] 描述异常的消息</li></ol> |

例如:

```
"receipt": {
  "cumulative_gas": "1220",
  "epoch_num": "588004",
  "errors": {
    "0": [
      7
    ]
  },
  "exceptions": [
    {
      "line": 87,
      "message": "Exception thrown: (Message [(_exception : (String \"Error\")) ; (code : (Int32 -2))])"
    },
    {
      "line": 100,
      "message": "Raised from IsAdmin"
    },
    {
      "line": 137,
      "message": "Raised from ConfigureUsers"
    }
  ],
  "success": false
  }
```

## 交易所轮询来自智能合约交易的 $ZIL 存款的推荐步骤

1. 确认**success** 字段设置为 `true`。
2. 遍历 **transitions** JSON 数组。 对于每次 transition，要通过智能合约成功存入`$ZIL`，必须满足以下条件：
    1. **_recipient** 对应交易所控制的已知存款地址。
    2. **_tag** 为 `AddFunds` 或为空。
    :::note
     `_tag` 可以在 `msg` 字段下找到。 如果 `_tag` 或 `msg` 不存在，则没有来自此特定 transition 的入金。
    :::
    3. **_amount** 非零。
    4. 勾选 **_recipient** 和 **_amount**，完成余额转账信息。 在这种情况下，你可以确认在地址 **_recipient** 上有一份存款，其值为 **_amount**（单位 `Qa` ）。
    5. 继续遍历剩余的 transition 并检查更多存款。