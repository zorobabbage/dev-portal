---
id: core-status-server
title: 状态服务器
keywords: 
- core 
- status 
- server
description: Core protocol design - status server.
---

---
每个 Zilliqa 节点都有一个 API 服务器侦听端口 `STATUS_RPC_PORT`（默认为 4301）。该服务器只能在本地主机上访问。

此状态服务器提供有关节点操作参数的有用信息。它还使用户能够控制节点在其不同方面的操作的行为（例如，在纪元结束时停止 PoW 挖矿）。

实用程序脚本 [miner_info.py](https://github.com/Zilliqa/Zilliqa/blob/master/scripts/miner_info.py) 允许与状态服务器交互。

实用程序脚本支持的可用命令包括：

- **checktxn**：检查交易是否在节点的交易内存池中
- **difficulty**：返回 PoW 挖矿的最新难度
- **disable_pow**：禁止节点在下一个时期执行 PoW 挖矿
- **ds**：返回 DS 委员会成员名单
- **ds_difficulty**：返回 PoW 挖矿的最新 DS 难度
- **dsepoch**：返回最新的 DS 纪元号
- **epoch**：返回最新的 Tx 纪元号
- **state**：根据其状态机返回该节点的状态
- **type**：返回节点类型（例如，DS 或分片）