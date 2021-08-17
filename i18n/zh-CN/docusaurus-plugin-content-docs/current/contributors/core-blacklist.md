---
id: core-blacklist
title: 黑名单
keywords: 
- core
- blacklist
description: Core protocol design - blacklisting.
---

---
Zilliqa 具有在 `libNetwork` 中实现的黑名单功能。这个想法是跟踪对等点的 IP 地址，在下面列出的情况下，可能会中断节点的操作。一旦被列入黑名单，对等方就被有效地排除在与节点的进一步交互之外。

## 黑名单条件

- Socket 写入失败（根据 `P2PComm::IsHostHavingNetworkIssue`）
- Socket 连接失败（根据 `P2PComm::IsHostHavingNetworkIssue`）
- 来自对等方的 Gossip 消息超过 `MAX_GOSSIP_MSG_SIZE_IN_BYTES`
- 从对等方读取的字节超过 `MAX_READ_WATERMARK_IN_BYTES`

## 黑名单检查

发出

-`Lookup::SendMessageToRandomSeedNode`
-`P2PComm::SendMessageNoQueue`
- `SendJob::SendMessageCore`
- `SendJobPeer::DoSend`
- `SendJobPeers<T>::DoSend`

传入

-`P2PComm::AcceptConnectionCallback`

## 黑名单豁免

添加排除权限

1. DS 守卫
   - 当收到 `NEWDSGUARDNETWORKINFO` 时（新IP）
   - 每当 DS 委员会更新时
2. 查找节点
   - 每次发送消息时
3. 使用 `miner_info.py whitelist_add` 手动添加 IP

删除排除权限

1. DS 守卫
   - 当收到 `NEWDSGUARDNETWORKINFO` 时（旧IP）
2.使用 `miner_info.py whitelist_remove` 手动删除 IP

## 黑名单删除和清除

- 非查找节点在 DS 纪元开始时从黑名单中删除 `BLACKLIST_NUM_TO_POP` 数量的对等点
- 非查找节点也会在 DS epoch 开始时从黑名单中删除所有列入黑名单的种子节点
- 查找节点在收到 DS 区块后清除整个黑名单

## 启用黑名单

黑名单默认启用，仅在进行节点恢复（`RECOVERY_ALL_SYNC`）时暂时禁用。在这种情况下，一旦处理了 Tx 区块，就会重新启用黑名单。

## 轻松的黑名单

如果对等点暂时关闭，则该对等点可能无法访问。在这种情况下，与该对等方的 socket 连接通常会返回错误消息 `EHOSTDOWN` 或 `ECONNREFUSED`。发生这种情况时，我们会避免像前面列出的 [条件](#黑名单条件) 那样在“严格”意义上将同级列入黑名单。相反，我们将对等点列入“宽松”类别的黑名单。

虽然来自或发送到严格列入黑名单的对等方的所有传入和传出消息都被阻止，但对于宽松黑名单中的对等方，仅阻止发送到对等方的消息。这允许对等体在其恢复联机后通过发送移除请求将其自身从每个人的黑名单中移除。如果发现对等方在宽松黑名单中，则将接受这样的请求。