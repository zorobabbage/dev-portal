---
id: core-websocket-server
title: WebSocket 服务器
keywords: 
- core 
- websocket
- server
description: Core protocol design - websocket server.
---

---
查找或种子节点可以选择（使用 `ENABLE_WEBSOCKET`）在端口 `WEBSOCKET_PORT`（默认为 4401）上启用 WebSocket 服务器。 WebSocket 服务器为用户（例如 SDK 客户端）提供基于订阅的数据查询模型，并作为轮询的替代方案。

我们的 [应用程序开发人员](../dev/dev-tools-websockets.md) 部分详细介绍了与 WebSocket 服务器的交互。

WebSocket 服务器在 Zilliqa 核心的 [libServer](https://github.com/Zilliqa/Zilliqa/blob/master/src/libServer/WebsocketServer.h) 中实现，使用 [WebSocket++](https://github.com/zaphoyd/websocketpp) C++ 库。