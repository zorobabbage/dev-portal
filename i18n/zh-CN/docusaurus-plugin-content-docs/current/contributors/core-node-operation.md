---
id: core-node-operation
title: 一般节点操作
keywords: 
- core 
- node 
- operation
description: Core protocol design - general node operation.
---

---
Zilliqa 节点在启动期间需要以下信息：

- Schnorr 密钥对
- IP 地址和监听端口
- 同步类型
- 是否从 S3 检索持久性

大多数其他操作参数在文件 `constants.xml` 中定义。

在启动期间，节点将采用其如下 [身份](../basics/basics-zil-nodes.mdx) ：

- 基于同步类型和引导条件的新节点、分片节点或 DS 节点（例如，`DSInstructionType::SETPRIMARY`）
- 如果 `GUARD_MODE=true` 和公钥在 `constants.xml` 中的 `ds_guard` 或 `shard_guard` 列表中，则为 DS 或分片保护节点
- 查询节点，如果 `LOOKUP_NODE_MODE=true`
- 如果 `LOOKUP_NODE_MODE=true` 且 `ARCHIVAL_LOOKUP=true`，则为种子节点

节点在启动时通常会执行以下操作：

- 启动传入和传出消息队列管理线程
- 填充一些信息（例如，密钥和 IP、保护节点列表、初始 DS 委员会节点列表）
- 设置持久性（例如，从 AWS S3 检索数据）
- 根据指定的同步类型同步，并从那里继续操作

有关各种功能操作的深入说明，请参阅其他部分。