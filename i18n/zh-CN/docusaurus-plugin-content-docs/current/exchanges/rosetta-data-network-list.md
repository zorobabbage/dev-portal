---
id: rosetta-data-network-list
title: 列表
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- data
- network
- list
description: List
---

---

## 获取可用网络列表

返回 Rosetta 服务器支持的 NetworkIdentifiers 列表，即 `testnet` 和 `mainnet`。


请求：

```json
{
    "metadata": {}
}
```

响应：

示例

```json
{
    "network_identifiers": [
        {
            "blockchain": "zilliqa",
            "network": "mainnet"
        },
        {
            "blockchain": "zilliqa",
            "network": "testnet"
        }
    ]
}
```
