---
id: rosetta-construction-metadata
title: 元数据
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- metadata
description: Metadata
---

---

## 创建一个获取元数据的请求

使用来自 `预处理` 的有效载荷，`元数据` 返回构建交易所需的基本信息。 在 Rosetta Zilliqa 中，会返回诸如 `nonce` 和 `version` 之类的信息。

请求：

`options` 来自 `/construction/preprocess`
```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    }, 
    "options": {
        "amount": "2000000000000",
        "gasLimit": "50",
        "gasPrice": "2000000000",
        "senderAddr": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
        "toAddr": "zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0"
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
    "metadata": {
        "amount": "2000000000000",
        "gasLimit": "50",
        "gasPrice": "2000000000",
        "nonce": 187,
        "pubKey": "02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e",
        "senderAddr": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
        "toAddr": "zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0",
        "version": 21823489
    }
}
```
