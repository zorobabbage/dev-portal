---
id: rosetta-data-network-status
title: 状态
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- data
- network
- status
description: Status
---

---

## 获取网络状态

返回当前 1) 创世区块号和哈希 2) 区块号、哈希和时间戳

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
    "current_block_identifier": {
        "index": 1668170,
        "hash": "cfe255a521942588708213129f6cce4522820fb0aaaf1bb3934f2908ca94b738"
    },
    "current_block_timestamp": 1596617124206,
    "genesis_block_identifier": {
        "index": 0,
        "hash": "1947718b431d25dd65c226f79f3e0a9cc96a948899dab3422993def1494a9c95"
    },
    "peers": null
}
```
