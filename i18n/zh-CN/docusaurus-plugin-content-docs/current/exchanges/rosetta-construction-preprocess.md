---
id: rosetta-construction-preprocess
title: 预处理
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- preprocess
description: Preprocess
---

---

预处理在 /construction/payloads 之前被调用，以构建对交易构建所需的元数据（例如 `nonce`）的请求。从 `preprocess` 返回的选项对象将被发送到 `/construction/metadata`。

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
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
            },
            "metadata": {
                "senderPubKey": "0x02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e"
            }
        }
    ],
    "metadata": {}
}
```

响应：

示例

```json
{
    "options": {
        "amount": "2000000000000",
        "gasLimit": "1",
        "gasPrice": "2000000000",
        "senderAddr": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
        "toAddr": "zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0"
    },
    "required_public_keys": [
        {
            "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
            "metadata": {
                "base16": "99f9d482abbdC5F05272A3C34a77E5933Bb1c615"
            }
        }
    ]
}
```
