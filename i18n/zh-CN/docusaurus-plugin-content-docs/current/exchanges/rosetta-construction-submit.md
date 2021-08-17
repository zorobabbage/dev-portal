---
id: rosetta-construction-submit
title: 提交
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
- submit
description: Submit
---

---

## 提交签名交易

向 Zilliqa 网络提交已签名的交易。 这个调用是非阻塞的，并且会立即返回一个交易哈希。

:::info
在调用 `/submit` 之前，请先调用 `/combine` 获取请求参数所需的`signed_transaction`。
:::


请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "signed_transaction": "{\"amount\":2000000000000,\"code\":\"\",\"data\":\"\",\"gasLimit\":1,\"gasPrice\":2000000000,\"nonce\":187,\"pubKey\":\"02e44ef2c5c2031386faa6cafdf5f67318cc661871b0112a27458e65f37a35655e\",\"senderAddr\":\"zil1n8uafq4thhzlq5nj50p55al9jvamr3s45hm49r\",\"signature\":\"fcb93583d963a7c11f52f04b1ecbd129aa3df896e618b47ff163dc18c53b59afc4289851fd2d5a50eaa7d7ae0763eb912797b0b34e1cf1e6d3865a218e1066b7\",\"toAddr\":\"zil1f9uqwhwkq7fnzgh5x4djyzg4a7j3apx8dsnnc0\",\"version\":21823489}"
}
```

响应：

示例

```json
{
    "transaction_identifier": {
        "hash": "963a984ee255cfd881b337a52caf699d4f05799c45cc0948d8a8ce72a6a12d8e"
    }
}
```

