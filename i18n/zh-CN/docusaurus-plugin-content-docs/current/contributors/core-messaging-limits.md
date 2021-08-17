---
id: core-messaging-limits
title: 消息限制
keywords: 
- core 
- messaging 
- limits
description: Core protocol design - messaging limits.
---

---
Zilliqa 节点的点对点通信的数量和大小由堆栈不同部分的几个因素控制。

## 消息大小

- `MIN_READ_WATERMARK_IN_BYTES`：在我们对数据采取行动之前从 socket 读取的最小字节数。它基本上是 libevent 函数 `bufferevent_setwatermark` 所需的 `lowmark` 参数。
- `MAX_READ_WATERMARK_IN_BYTES`：在我们停止接受进一步输入之前从 socket 读取的最大字节数。它基本上是 libevent 函数 `bufferevent_setwatermark` 所需的 `highmark` 参数。
- `MAX_GOSSIP_MSG_SIZE_IN_BYTES`：起始字节 = `START_BYTE_GOSSIP` 的 socket 消息的最大大小。如果消息达到此大小，则发送方将被列入黑名单。

## 消息计数

- `MAXSENDMESSAGE`：传出消息池的活动线程数。
- `MAXRECVMESSAGE`：传入消息池的活动线程数。
- `SENDQUEUE_SIZE`：传出消息队列的最大大小（在传输到传出池之前），超出该大小的任何其他消息都将被丢弃。
- `MSGQUEUE_SIZE`：传入消息队列的最大大小（在传输到传入池之前），超过该大小的任何其他消息都将被丢弃。

## 发送频率

- `MAXRETRYCONN`：为向对等方发送消息而尝试执行的 socket 连接的最大次数。
- `PUMPMESSAGE_MILLISECONDS`：重新尝试 socket 连接之前的最长等待时间（最短为 1 毫秒）。

## 活跃连接

- `MAX_PEER_CONNECTION`：到特定对等点的最大活跃连接数。