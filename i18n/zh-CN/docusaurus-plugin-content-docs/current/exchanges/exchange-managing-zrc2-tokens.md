---
id: exchange-managing-zrc2-tokens
title: 管理同质化代币 (ZRC-2)
keywords: 
- zrc2
- polling
- exchanges
- zilliqa
description: Managing Fungible Tokens (ZRC-2)
---

---

## ZRC-2 简介

[ZRC-2](https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc-2.md) 是 Zilliqa 中同质化代币的正式标准。它是在 Zilliqa 区块链上创建货币的开放标准。

ZRC-2 标准允许使用以下功能
- 铸造/燃烧代币
- 将代币从一个账户转移到另一个账户
- 查询账户代币余额
- 查询总代币余额
- 批准第三方花费一定数量的代币
- 等等。

## ZRC-2 示例

- [XSGD](https://www.zilliqa.com/xsgd) - Xfers 打造的第一个与新加坡元挂钩的稳定币
- [gZIL](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md#governance-tokens-aka-gzil) - 通过 Zilliqa 种子节点质押计划获得的 ZIL 治理代币

## 检查合约是否符合 ZRC-2

在开始与 ZRC-2 进行任何集成之前，检查智能合约以确保其符合 ZRC-2 标准非常重要。不符合标准可能会导致与其他合约或 dApp/交易所集成的可组合性问题。

请查看此开发人员门户的开发人员部分中的 [ZRC-2 规范](../dev/dev-keys-zrc2-wallet-support#zrc-2-specification) 小节。

## 合约操作

请查看 [与 ZRC-2 同质化代币合约集成](../dev/dev-keys-zrc2-wallet-support#integrating-with-zrc-2-fungible-tokens-contract) 小节，了解如何获取代币余额和转移代币。

## 跟踪传入的 ZRC-2 存款

要跟踪特定 ZRC-2 代币的任何新**入金**：
1. 使用 API [`GetTxnBodiesForTxBlock`](../apis/api-transaction-get-txbodies-for-txblock) API 逐块轮询区块链并处理每笔交易
2. 对于 TxBlock 中的每笔交易，执行以下操作：
   - 检查 `toAddr` 是否与对应的 ZRC-2 代币合约地址匹配。例如合约地址 [a845c1034cd077bd8d32be0447239c7e4be6cb21](https://viewblock.io/zilliqa/address/0xa845c1034cd077bd8d32be0447239c7e4be6cb2) 是 ZRC-2 代币标准的 gZil 的合约地址.
   - 检查 **success** 字段是否设置为 `true`。如果为 `false`，则表示该交易未被网络接受。
   - 在 `data` 下，查找 `Transfer` 或 `TransferFrom` 标签。检查 `value` 是否与你的存款地址的 base16 地址格式匹配。
   - 如果匹配，`value` 表示从发件人转移到你的存款地址的代币数量。

:::note
处理 `value` 时，请注意智能合约使用的小数位数。
:::

3. **[可选检查]** 你还可以检查 `event_logs` 并确保以下内容：
   - `_eventname` 匹配 `TransferSuccess` 并且 `address` 匹配你的存款地址
   - 在`params` 映射下：
      - vname `sender` 指交易的发送者
      - vname `recipient` 指你的存款地址
      - vname `amount` 指转移的代币数量

ZRC-2 代币的交易存款示例
```bash
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "ID": "765efeb58c4e4fd314a861155173de85baed90df4fcd9b2a24c8693e611d1970", <-- Transaction hash
    "amount": "0", <-- This is in term of $ZIL and not ZRC-2 token
    "data": "{\"_tag\":\"Transfer\",\"params\":[{\"vname\":\"to\",\"type\":\"ByStr20\",\"value\":\"0xa795895a4cebe56068439858b6b1f4fe09af4c8c\"},{\"vname\":\"amount\",\"type\":\"Uint128\",\"value\":\"475772968079442\"}]}",
    "gasLimit": "3125",
    "gasPrice": "2000000000",
    "nonce": "71",
    "receipt": {
      "accepted": false,
      "cumulative_gas": "492",
      "epoch_num": "895498",
      "event_logs": [
        {
          "_eventname": "TransferSuccess",
          "address": "0xa845c1034cd077bd8d32be0447239c7e4be6cb21", <-- Contract address of ZRC-2 token
          "params": [
            {
              "type": "ByStr20",
              "value": "0x49355e4ec63634266e0b6c8fa3cbc02a76a6dd75",
              "vname": "sender"
            },
            {
              "type": "ByStr20",
              "value": "0xa795895a4cebe56068439858b6b1f4fe09af4c8c",
              "vname": "recipient"
            },
            {
              "type": "Uint128",
              "value": "475772968079442",
              "vname": "amount"
            }
          ]
        }
      ],
      "success": true, <-- Transaction is successful and confirmed on the blockchain
      "transitions": [
        {
          "addr": "0xa845c1034cd077bd8d32be0447239c7e4be6cb21",
          "depth": 0,
          "msg": {
            "_amount": "0",
            "_recipient": "0xa795895a4cebe56068439858b6b1f4fe09af4c8c",
            "_tag": "RecipientAcceptTransfer",
            "params": [
              {
                "type": "ByStr20",
                "value": "0x49355e4ec63634266e0b6c8fa3cbc02a76a6dd75",
                "vname": "sender"
              },
              {
                "type": "ByStr20",
                "value": "0xa795895a4cebe56068439858b6b1f4fe09af4c8c",
                "vname": "recipient"
              },
              {
                "type": "Uint128",
                "value": "475772968079442",
                "vname": "amount"
              }
            ]
          }
        },
        {
          "addr": "0xa845c1034cd077bd8d32be0447239c7e4be6cb21",
          "depth": 0,
          "msg": {
            "_amount": "0",
            "_recipient": "0x49355e4ec63634266e0b6c8fa3cbc02a76a6dd75",
            "_tag": "TransferSuccessCallBack",
            "params": [
              {
                "type": "ByStr20",
                "value": "0x49355e4ec63634266e0b6c8fa3cbc02a76a6dd75",
                "vname": "sender"
              },
              {
                "type": "ByStr20",
                "value": "0xa795895a4cebe56068439858b6b1f4fe09af4c8c",
                "vname": "recipient"
              },
              {
                "type": "Uint128",
                "value": "475772968079442",
                "vname": "amount"
              }
            ]
          }
        }
      ]
    },
    "senderPubKey": "0x03A4738532329F5867A448B32B16DF65AEC51C09CCAE8C972D78E49E9EFC84EF89",
    "signature": "0x73E84B5FB5AE7D46F941E5BC393253EA19EAE8CD2C5FD07A64D553970EFF8FBDB79384730C10310055E79CA560DC9B79A77ED64E5ADC69260EE32185D3AAF20B",
    "toAddr": "a845c1034cd077bd8d32be0447239c7e4be6cb21",  <-- Contract address of ZRC-2 token
    "version": "65537"
  }
}
```
## 其他参考
- [各种 ZRC-2 操作的示例代码](https://github.com/Zilliqa/ZRC/tree/master/example/zrc2)
