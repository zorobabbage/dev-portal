---
id: core-message-dispatch
title: 消息调度和处理
keywords: 
- core 
- message 
- dispatch 
- processing
description: Core protocol design - message dispatch and processing.
---

---
在 `src/cmd/main.cpp` 中，我们指定 `Zilliqa::Dispatch` 作为 `P2PComm::StartMessagePump` 中的调度器。 `P2PComm` 从 socket 读取的每条消息都被发送到 `Zilliqa::Dispatch`。

当 Zilliqa 开始处理消息时，它会调用 `Zilliqa::ProcessMessage`。任何消息的第一个字节都定义了**消息类型**。

:::note
这里的“第一个字节”指的是 socket 消息的有效载荷部分。在`P2PComm` 级别，每个 socket 消息由预定义的标头和有效负载组成。
:::

根据类型，`Zilliqa::ProcessMessage` 会将消息转发到相应的处理程序。消息类型列表可以在 `src/common/Messages.h` 内的 `enum MessageType` 中找到。

任何继承自 `Executable` 的类都将是一个消息处理程序。例如，类型 `0x01` 表示 `DIRECTORY`，这个消息将由 `libDirectoryService` 处理。如果你进入 `libDirectoryService`，你会发现一个函数`DirectoryService::Execute`。

所有从 `Executable` 继承的类将首先检查消息中的第二个字节，该字节定义了**指令类型**。指令类型列表可以在 `src/common/Messages.h` 中找到。

从那里开始，`Execute()` 将进一步将消息转发到类内部的一个私有函数，这些函数都被命名为 `ProcessXXX`。