---
id: core-multisignatures
title: 多重签名
keywords: 
- core 
- multisignatures
description: Core protocol design - multisignatures.
---

---
任何共识轮次的最终结果基本上都是生成 EC-Schnorr 签名，这是 2/3+1 参与者共同签署共识数据的产物。

本节简要介绍如何在 Zilliqa 核心中实现和使用多重签名。有关多重签名如何工作的更多信息，请参阅 Zilliqa [白皮书](https://docs.zilliqa.com/whitepaper.pdf)。

## 在共识中生成多重签名

1. Leader 发出公告消息，其中包含要联签的数据
2. backup 生成 commit point 和 commit secret，然后发回 commit point
3. Leader 汇总所有收到的 commit point
4. Leader 生成并发出 `challenge = function(aggregated commit points, aggregated public keys, data to co-sign)`
5. backup 在其末端重新生成相同的挑战并验证相等性
6. backup 生成并发回 `response = function(commit secret,challenge,private key)`
7. Leader 将每个响应验证为 `function(response, challenge, public key, commit point)`
8.Leader 生成并发出 `signature = function(challenge, aggregated responses)`
9. leader 和 backup 都验证签名为 `function(signature, data to co-sign,aggregated public keys)`

## 实现细节

多重签名所需的加密组件在 `Schnorr.h` 和 `MultiSig.h` 中实现。

可以将 `Schnorr::Sign` 视为通过每个参与者的 `CommitPoint`、`Response` 和 `PubKey` 组件的聚合以及间接使用每个参与者在生成这些组件的过程中的 `PrivKey` 和 `CommitSecret`。

事实上，你会注意到 `MultiSig::MultiSigVerify` 的实现与 `Schnorr::Verify` 几乎相同（除了为域名分离的哈希函数添加了一个字节）。这表明虽然联合签名是通过一些聚合魔法完成的，但最终多重签名仍然是 Schnorr 签名，可以这样验证。

## 域名分离的哈希函数

共识协议中的散列操作分为三个不同的域名。 “分离”是指在共识的不同点之间将唯一的字节值整合到哈希运算中，以在共识过程中有效地划分域。

1. 第一个域名分离的哈希函数基本上是指节点提交其 PoW 及其公钥，或者我们现在所说的所有权证明（PoP）阶段。虽然在 PoW 阶段的代码中没有进行任何行为更改，但我们创建了一个包装函数`MultiSig::SignKey`，以强调通过签署公钥，节点有效地提供了拥有私钥的证明。
2. 第二个域名分离散列函数是指 backup 必须将 commit point 的散列与 commit point 本身一起发送。为了实现这一点，数据结构`CommitPointHash` 被添加到 `MultiSig.h` 中。commit point 哈希是在单个字节（`0x01`）加上 commit point 生成的。
3. 第三个域名分离的哈希函数是指 leader 在生成 challenge 值的过程中，在哈希运算中引入了另一个字节（`0x11`）。