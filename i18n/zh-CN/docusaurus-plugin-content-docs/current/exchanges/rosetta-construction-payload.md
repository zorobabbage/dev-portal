---
id: rosetta-construction-payloads
title: 有效载荷
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- payloads
description: Payloads
---

---

## 生成未签名交易和签名有效负载

有效载荷使用一系列操作被调用，响应来自`/construction/metadata`。 它返回一个未签名的交易 blob 和一组必须由特定帐户使用 Zilliqa Schnorr 签名算法签名的有效负载。

请求：

`operation_identifier 1` 的 `metadata` 来自 `/construction/metadata`
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
            }
        }
    ],
    "metadata": {       // from construction/metadata
        "amount": "2000000000000",
        "gasLimit": "1",
        "gasPrice": "2000000000",
        "nonce": 187,
        "pubKey": "02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e",
        "senderAddr": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
        "toAddr": "zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0",
        "version": 21823489
    },
    "public_keys": [
        {
            "hex_bytes": "02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e",
            "curve_type": "secp256k1"
        }
    ]
}
```

响应：

示例

```json
{
    "unsigned_transaction": "{\"amount\":2000000000000,\"code\":\"\",\"data\":\"\",\"gasLimit\":1,\"gasPrice\":2000000000,\"nonce\":187,\"pubKey\":\"02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e\",\"senderAddr\":\"zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r\",\"toAddr\":\"zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0\",\"version\":21823489}",
    "payloads": [
        {
            "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
            "hex_bytes": "088180b40a10bb011a144978075dd607933122f4355b220915efa51e84c722230a2102e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e2a120a100000000000000000000001d1a94a200032120a10000000000000000000000000773594003801",
            "account_identifier": {
                "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
                "metadata": {
                    "base16": "99f9d482abbdC5F05272A3C34a77E5933Bb1c615"
                }
            },
            "signature_type": "schnorr_1"
        }
    ]
}
```
