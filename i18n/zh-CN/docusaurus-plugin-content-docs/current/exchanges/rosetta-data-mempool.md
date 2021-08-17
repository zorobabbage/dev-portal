---
id: rosetta-data-mempool
title: 内存池
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- data
- menpool
description: Mempool
---

---

## 获取所有内存池交易

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "metadata": {}
}
```

响应：

示例

```json
{
    "transaction_identifiers": [
        {
            "hash": "af6e2a81812f7834312e8e2358b51f2f9d7ca696c4d315258102ed868389a7c1"
        }
    ]
}
```
