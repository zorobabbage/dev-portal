---
id: rosetta-construction-parse
title: 解析
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- parse
description: Parse
---

---

## 解析交易

对未签名或已签名的交易调用解析以了解制定交易的意图。 这是在签名之前（在 `/construction/payloads` 之后）和广播之前（在 `/construction/combine` 之后）运行的完整性检查。

:::info
相应地设置 `已签名` 标志以表示交易是已签名还是未签名。
:::

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "signed": true,
    "transaction": "{\"amount\":2000000000000,\"code\":\"\",\"data\":\"\",\"gasLimit\":1,\"gasPrice\":1000000000,\"nonce\":186,\"pubKey\":\"02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e\",\"signature\":\"51c69af638ad7afd39841a7abf937d5df99e20adedc4287f43c8070d497ba78136c951192b3920914feb83b9272ccb2ca7facd835dfad10eff2b848b13616daf\",\"toAddr\":\"zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0\",\"version\":21823489}"
}
```

响应：

示例

```json
{
    "signers": [
        "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r"
    ],
    "operations": [
        {
            "operation_identifier": {
                "index": 0
            },
            "type": "transfer",
            "status": "",
            "account": {
                "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
                "metadata": {
                    "base16": "99f9d482abbdC5F05272A3C34a77E5933Bb1c615"
                }
            },
            "amount": {
                "value": "-2000000000000",
                "currency": {
                    "symbol": "ZIL",
                    "decimals": 12
                }
            }
        },
        {
            "operation_identifier": {
                "index": 1
            },
            "related_operations": [
                {
                    "index": 0
                }
            ],
            "type": "transfer",
            "status": "",
            "account": {
                "address": "zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0",
                "metadata": {
                    "base16": "4978075dd607933122f4355B220915EFa51E84c7"
                }
            },
            "amount": {
                "value": "2000000000000",
                "currency": {
                    "symbol": "ZIL",
                    "decimals": 12
                }
            }
        }
    ],
    "account_identifier_signers": [
        {
            "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
            "metadata": {
                "base16": "99f9d482abbdC5F05272A3C34a77E5933Bb1c615"
            }
        }
    ]
}
```
