---
id: rosetta-construction-combine
title: 结合
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- combine
description: Combine
---

---

## 从签名创建网络交易

从未签名的交易和提供的签名数组创建 Zilliqa 支付交易。 从此方法返回的签名交易将被调用者发送到 `/construction/submit` 端点。

:::info
在调用 `/combine` 之前，请先调用 `/payloads` 以获得 `unsigned_transaction`。 接下来，使用 [goZilliqa SDK](https://github.com/Zilliqa/gozilliqa-sdk) 或其他 Zilliqa 的 SDK 制作交易对象并签署交易对象； 以 __hexadecimals__ 格式打印 __*签名*__ 和 __*交易对象*__。
:::


有关如何制作和签署交易对象的示例代码，请参阅 [`signRosettaTransaction.js`](https://github.com/Zilliqa/zilliqa-rosetta/blob/master/examples/signRosettaTransaction.js)。

将它们用作请求参数，如下所示：

```json
{
    ...,
    "unsigned_transaction": ... // from /payloads
    "signatures": [
        {
            "signing_payload": {
                "address": "string", // sender account address
                "hex_bytes": "string",  // signed transaction object in hexadecimals representation obtained after signing with goZilliqa SDK or other Zilliqa SDK
                "signature_type": "ecdsa"
            },
            "public_key": {
                "hex_bytes": "string", // sender public key
                "curve_type": "secp256k1"
            },
            "signature_type": "ecdsa",
            "hex_bytes": "string" // signature of the signed transaction object 
        }
    ]
}

```


请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "unsigned_transaction": "{\"amount\":2000000000000,\"code\":\"\",\"data\":\"\",\"gasLimit\":1,\"gasPrice\":2000000000,\"nonce\":187,\"pubKey\":\"02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e\",\"senderAddr\":\"zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r\",\"toAddr\":\"zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0\",\"version\":21823489}",
    "signatures": [
        {
            "signing_payload": {
                "account_identifier": {
                    "address": "zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r",
                    "metadata": {
                        "base16": "99f9d482abbdC5F05272A3C34a77E5933Bb1c615"
                    }
                },
                "hex_bytes": "088180b40a10bb011a144978075dd607933122f4355b220915efa51e84c722230a2102e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e2a120a100000000000000000000001d1a94a200032120a10000000000000000000000000773594003801",
                "signature_type": "schnorr_1"
            },
            "public_key": {
                "hex_bytes": "02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e",
                "curve_type": "secp256k1"
            },
            "signature_type": "schnorr_1",
            "hex_bytes": "fcb93583d963a7c11f52f04b1ecbd129aa3df896e618b47ff163dc18c53b59afc4289851fd2d5a50eaa7d7ae0763eb912797b0b34e1cf1e6d3865a218e1066b7"
        }
    ]
}
```

响应：

示例

```json
{
    "signed_transaction": "{\"amount\":2000000000000,\"code\":\"\",\"data\":\"\",\"gasLimit\":1,\"gasPrice\":2000000000,\"nonce\":187,\"pubKey\":\"02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e\",\"senderAddr\":\"zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r\",\"signature\":\"fcb93583d963a7c11f52f04b1ecbd129aa3df896e618b47ff163dc18c53b59afc4289851fd2d5a50eaa7d7ae0763eb912797b0b34e1cf1e6d3865a218e1066b7\",\"toAddr\":\"zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0\",\"version\":21823489}"
}
```
