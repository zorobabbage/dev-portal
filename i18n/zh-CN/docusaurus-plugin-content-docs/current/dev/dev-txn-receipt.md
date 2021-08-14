---
id: dev-txn-receipt
title: 回执
keywords: 
- receipt
- transitions
- events
- params
- transaction
- zilliqa
description: Zilliqa Transaction Receipt
---

---
在区块链中确认交易后，将返回交易响应以及 `回执`。

具有 `回执` 结构的交易响应示例：
```
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
      // others

    "receipt": {
      "accepted": true,
      "cumulative_gas": "878",
      "epoch_num": "589742",
      "success": true,
      "transitions": [
        {
          "addr": "0x9a65df55b2668a0f9f5f749267cb351a37e1f3d9",
          "depth": 0,
          "msg": {
            "_amount": "50000000000000",
            "_recipient": "0xc0e28525e9d329156e16603b9c1b6e4a9c7ed813",
            "_tag": "onFundsReceived",
            "params": []
          }
        }
      ]
    },
    "senderPubKey": "0x03DE40DF885B0E334D53FF5E5554589AAF46F2339FEBEE93213F2CCE52D1F488F4",
    "signature": "0xB19AB66C4410EE4833A9C5DEE600471DB4D711F6B61D2312988E6E70CC655409F18BB42BB6940B6263C8EA5CE08CAEC06111BDF19BE00D7E15F25515CAA45DAA",
    "toAddr": "9a65df55b2668a0f9f5f749267cb351a37e1f3d9",
    "version": "65537"
  }
}
```
根据正在处理的交易类型（例如付款、合约调用、链式合约调用），`回执` 可能会返回不同的数据。

## 参数
本节列出了所有 _可能的_ `回执` 返回值。

| 名称             | 描述                                                                |
| ---------------- | ---------------------------------------------------------------------------|
| `cumulative_gas` | 在特定块中执行时使用的 gas 总量   |
| `epoch_num` | 分配此交易时的区块高度 |
| `errors` | 如果交易有任何错误，则包含错误代码 |
| `event_logs` | 包含被调用的合约 transition 的参数 |
| `exceptions` | 调用合约时出错返回异常信息 |
| `transitions` | 包含用于调用特定 transition 的参数 |
| `success` | 如果交易成功执行，则返回 true，否则返回 false |

# #事件
`event_logs` 是触发合约调用而创建的事件。

例如，在下面的示例合约代码中，调用 transition `setHello` 将触发一个名为 `setHello ` 的事件。
```
(* HelloWorld Sample *)

transition setHello (msg : String)
  is_owner = builtin eq owner _sender;
  match is_owner with
  | False =>
    e = {_eventname : "setHello()"; code : not_owner_code};
    event e
  | True =>
    welcome_msg := msg;
    e = {_eventname : "setHello()"; code : set_hello_code}; (* trigger event here *)
    event e
  end
end
```

如果我们执行这个 transition，返回的 `回执` 如下所示:
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        // others
        "receipt": {
            "accepted": false,
            "cumulative_gas": "668",
            "epoch_num": "1474081",
            "event_logs": [
                {
                    "_eventname": "setHello()",
                    "address": "0xde8d3637aec06d6c7da49aeb9c7409ac44a98138",
                    "params": [
                        {
                            "type": "Int32",
                            "value": "2",
                            "vname": "code"
                        }
                    ]
                }
            ],
            "success": true
        },
    }
}
```

注意，在区块链成功执行 transition `setHello` 时会返回 `setHello` 事件。

## Transition
如果合约正在调用其他 procedure 或另一个合约 transition，则返回 `transitions` 对象。`transition` 对象提供了 `transition chain` 的详细信息，比如发起者的地址、标签(transition 名称)、接收者、参数等。

`transition` 对象示例:
```
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "ID": "52605cee6955b3d14f5478927a90977b305325aff4ae0a2f9dbde758e7b92ad4",
    "amount": "50000000000000",
    "data": "{\"_tag\":\"sendFunds\",\"params\":[{\"vname\":\"accountValues\",\"type\":\"List (AccountValue)\",\"value\":[{\"constructor\":\"AccountValue\",\"argtypes\":[],\"arguments\":[\"0xc0e28525e9d329156e16603b9c1b6e4a9c7ed813\",\"50000000000000\"]}]}]}",
    "gasLimit": "25000",
    "gasPrice": "1000000000",
    "nonce": "3816",
    "receipt": {
      "accepted": true,
      "cumulative_gas": "878",
      "epoch_num": "589742",
      "success": true,
      "transitions": [
        {
          "addr": "0x9a65df55b2668a0f9f5f749267cb351a37e1f3d9",
          "depth": 0,
          "msg": {
            "_amount": "50000000000000",
            "_recipient": "0xc0e28525e9d329156e16603b9c1b6e4a9c7ed813",
            "_tag": "onFundsReceived",
            "params": []
          }
        }
      ]
    },
    ...
  }
}
```
在上面的例子中，从 `data` 对象我们可以观察到这里调用了 transition `sendFunds`，大意是将 `50000000000000` 发送到 `0xc0e28525e9d329156e16603b9c1b6e4a9c7ed813`。 请注意，在 `transitions` 对象中，随后会在内部调用 procedure `onFundsReceived`，我们可以观察到接收者和金额确实是传输的金额。

## 异常
如果合约在遇到调用 transition 的问题时引发特别错误，则返回一个 `exceptions` 对象，例如，调用没有足够余额的转账 transition 等。 `exceptions` 对象包含引发错误的合约的 `line` 编号以及相应的异常 `message`。

`exceptions` 对象示例：
```
"receipt": {
    ... // others
    ...
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
    ]
}
```
