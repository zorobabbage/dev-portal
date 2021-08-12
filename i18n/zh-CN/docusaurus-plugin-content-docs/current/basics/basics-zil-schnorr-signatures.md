---
id: basics-zil-schnorr-signatures
title: 施诺尔签名
keywords: 
- schnorr signatures
- zilliqa
description: Schnorr Signatures
---

---

Zilliqa 采用基于椭圆曲线的 Schnorr 签名算法（EC-Schnorr）作为基础签名算法。Schnorr 允许多重签名，它比 ECDSA 更快，并且具有更小的签名大小（64个字节）。

Schnorr 算法最初基于 BSI TR-03111 Elliptic Curve Cryptography (ECC) 1.0 版的第 4.2.3 页第 24 节。 Zilliqa [白皮书](https://docs.zilliqa.com/whitepaper.pdf) 中还包含对该算法的更完整讨论。

Schnorr 算法用于共识协议、消息签名以及协议中需要签名的任何地方。 Zilliqa 节点还通过其 Schnorr 公钥以及 IP 信息进行标识。