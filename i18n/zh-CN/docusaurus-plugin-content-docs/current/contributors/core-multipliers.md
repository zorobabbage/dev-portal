---
id: core-multipliers
title: Multipliers
keywords: 
- core 
- multipliers
description: Core protocol design - multipliers.
---

---
Zilliqa 网络——特别是 DS 委员会和分片节点——维护一个查询节点列表。网络生成的所有区块链数据都转发到这些查询节点，以便它们作为 [全节点](../basics/basics-zil-nodes#查询节点) 运行。

另一方面，网络不直接了解所有现有的 [种子节点](../basics/basics-zil-nodes#种子节点)。种子节点也是全节点，需要接收与查询节点相同的数据以保持与网络同步。这些种子节点包括由 Zilliqa Research 维护以服务公共 API 的节点，和由交易所以及生态系统合作伙伴托管的节点。

为了解决这种通信差距，multiplier 扮演着从网络接收与区块链数据相关的消息并将它们转发到种子节点的角色。除了上述查询节点之外，网络还维护了这些乘数节点的列表，因此区块链数据也会发送给它们。 Zilliqa 主网运行有多个 multiplier，每个 multiplier 都配置为将消息转发到由 IP 地址和端口标识的种子节点列表。

multiplier 是一个简单的 Go 程序，它基本上在特定端口侦听传入消息并将消息转发到转发列表。它会定期检查此列表是否有任何更新，从而可以随时添加或删除种子节点。multiplier 使用散列来防止多次转发重复的消息。它足够强大，可以在 I/O 超时错误的情况下重试向接收者发送消息，这中错误可能是由于两端的网络故障而发生的。