---
id: core-transaction-dispatch
title: 交易调度
keywords: 
- core 
- transaction 
- dispatch
description: Core protocol design - transaction dispatch.
---

---
从创建到确认，交易生命周期按以下顺序进行：

1. 终端用户通过 Zilliqa API 发送 `CreateTransaction` JSON 请求。交易 JSON 包含有关交易的基本信息
2. 收到请求的种子节点验证其内容，并将其转换为核心的交易定义格式
3. 种子节点以 `SEED_TXN_COLLECTION_TIME_IN_SEC` 确定的时间间隔将这个交易（和其他处理过的交易请求）转发到一个查询节点
4. 接收转发交易的查询节点决定哪个分片应该处理交易，并将其添加到该分片的交易数据包中
5. 在每个 Tx 纪元开始时（加上由 `LOOKUP_DELAY_SEND_TXNPACKET_IN_MS` 确定的短暂延迟），查询节点将其交易数据包分派到所有分片（包括 DS 委员会）
6. 交易数据包在分片内进行 gossip。每个节点收到后缓存数据包
7. 在 `TX_DISTRIBUTE_TIME_IN_MS` 确定的间隔内，每个节点处理从前一个Tx 纪元缓冲的交易数据包。处理数据包涉及验证每个交易并将它们添加到节点的交易内存池中
8. 间隔后，节点（分片）先进行微块，再进行 Tx 区块（DS委员会）共识。在共识期间，内存池中的交易以一种确定性的方式被消费
9. 创建 Tx 区块后，分片和 DS 节点将交易提交到区块链并将交易回执转发到查询节点（和种子节点，通过 [multipliers](core-multipliers.md)）
10. 终端用户通过 Zilliqa API 查询交易状态。接收请求的种子节点使用交易回执通知用户交易状态