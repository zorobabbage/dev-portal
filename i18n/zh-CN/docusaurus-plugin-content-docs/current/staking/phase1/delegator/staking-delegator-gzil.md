---
id: staking-delegator-gzil
title: gZIL 代币
keywords: 
- staking
- ssn
- smart contract
- zilliqa	
- delegator
- gzil
description: $gZIL tokens
---
---

[`$gZIL`](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-11.md#governance-tokens-aka-gzil)，治理 ZIL 的缩写，是 ZRC-2 合规的同质化代币合约。 发行 gZIL 背后的基本原理是捕获长期代币持有者，并让他们拥有治理代币，以便他们以后可以在整个生态系统范围内做出决策。 合约代码库可以在 [这里](https://github.com/Zilliqa/staking-contract) 找到。

:::note
$gZIL 不会奖励给 SSN 运营商，除非他们自己以委托人的身份委托他们的质押。 佣金没有 $gZIL 组件。
:::

| 参数 | 值 |
| ----------------- | ------------------------------------- |
| 奖励率 | 每获得 1 $ZIL 奖励 0.001 $gZIL |
| 奖励期限 | 约 1 年 |
| 最大供应量 | 722,700 $gZIL |

在 1 年期限之后，将不会铸造任何 $gZIL。 因此，我们鼓励所有用户在大约 1 年的期限结束之前撤回他们的质押奖励。

:::note
很可能所有 722,700 $gZIL 无法完全铸造，因为铸造的 $gZIL 数量取决于质押奖励提取的频率。
:::

与 $gZIL 的集成请参考 [ZRC-2 集成指南](../../../dev/dev-keys-zrc2-wallet-support)。
