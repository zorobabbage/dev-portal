---
id: core-message-queues
title: 消息队列和作业
keywords: 
- core 
- message 
- queues 
- jobs
description: Core protocol design - message queues and jobs.
---

---
传入和传出消息队列在 `P2PComm` 和 Zilliqa 核心的其余部分之间维护。这有助于在消息处理中提供一些排序，并且还增加了对可以缓冲的消息数量的一些控制。一旦准备好进行处理，消息就会进入一个线程池，线程池控制可以并发处理的消息数量。

从 socket 读取传入消息后，首先将其插入到 `Zilliqa::m_msgQueue` 中，其最大大小由 `MSGQUEUE_SIZE` 控制。当队列达到满容量时，将丢弃任何新的传入的消息。在启动期间启动的专用线程管理消息的出队并将它们发送到 `Zilliqa::m_queuePool`，这是一个受`MAXRECVMESSAGE` 限制的线程池。一旦分配给一个线程，消息就会根据前面的部分被分派。

等效地，在将传出消息写出到 socket 之前，它首先被插入到 `P2PComm::m_sendQueue` 中，其最大大小由 `SENDQUEUE_SIZE` 控制。一旦队列已满，任何新的传出消息也会被丢弃。在启动期间启动的专用线程还管理消息的出列并将它们发送到 `Zilliqa::m_SendPool`，这也受 `MAXSENDMESSAGE` 限制。一个分配给线程的消息根据消息的 `P2PComm::SendJob` 设置发送出去。