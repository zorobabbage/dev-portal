---
id: staking-phase11-notice
title: 阶段 1.1 迁移通知
keywords: 
- staking
- general information
- ssn
- seed node
- zilliqa	
- migration
description: Staking phase 1.1 migration notice
---

:::important

**质押阶段 1 迁移**

我们将执行从质押阶段 1 到阶段 1.1 的合约迁移。迁移将于 2021 年 5 月 11 日星期二进行。阶段 1 合约将在 UTC 时间 04:45 左右永久冻结。迁移最多可能需要 7 天才能完成。我们的目标是在迁移完成后立即重新开放质押。
:::

## 质押阶段 1.1

正如 [ZIP-19](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md) 中提出的，质押阶段 1.1 包含以下更改：
- 将质押从一个账户转移到另一个账户
- 正确删除空映射以防止合约状态膨胀
- 在 transition `AssignStakeRewards` 中删除用户自定义 ADT
- 质押参数改变

迁移到阶段 1.1 将涉及以下内容：
1. 阶段 1.0 合约冻结
2. 部署新的代理和 ssnlist 合约
3. 状态和资金从阶段 1 迁移到阶段 1.1

## 重要笔记

- 迁移期间不能进行质押活动
- 迁移后合约地址将发生变化
- **委托人**无需任何操作
- **钱包、浏览器和节点运营商**，迁移后需要切换到新的合约地址。合约中的所有 transition 名称和参数保持不变
- 在迁移期间，质押奖励将全额追溯分配给所有委托人和节点运营商
- 我们还将更新 Zillion 质押门户，以指向迁移后的阶段 1.1 合约

## 合约信息

对于钱包和浏览器，我们将尽快让你知道阶段 1.1 的主网质押合约地址。与此同时，我们已经将测试网质押合约从阶段 1 迁移到阶段 1.1。有关阶段 1.1 测试网合约，请参阅 [此页面](staking-general-information)。

## 对质押参数的更改（主网）

随着主网升级到 Zilliqa `v8.0.0`，出块时间将会减少。因此，我们将对质押参数进行以下更改：

| 参数 | 阶段 1.0 | 阶段 1.1（主网 v8.0.0 - v8.0.3）| 阶段 1.1 (主网 v8.0.4) |
|-------------- | ------------- | --------- | --------- |
| 1 周期持续时间 | ~27 小时 | ~23.83 小时 | ~23.91 小时 |
| 每个周期的区块数| 1,800 | 2,200 | 2,200 |
| 每个周期的奖励| 1,980,000 $ZIL | 1,548,800 $ZIL | 1,795,200 $ZIL |
| 解绑期 | 24,000 个最终区块 | 30,800 个最终区块（约 2 周）| 30,800 个最终区块（约 2 周）|

对于钱包和浏览器，你可能需要调整你的 UI 以反映参数的变化。

## 迁移持续时间

|                 | 日期/时间                       |
|---------------- | ------------------------------- |
| 迁移开始 | 2021 年 5 月 11 日星期二 04:45 UTC |
| 迁移结束 | 2021 年 5 月 18 日星期二 05:00 UTC |

:::note
如果迁移提前结束，我们将尽快恢复质押活动。
:::

## 新功能 - 为委托人交换钱包

将添加一项新功能，允许将所有 SSN 上的全部质押存款、奖励和待提款转移到新地址。 此类转移不需要用户经历解绑期，而是在确认转移后立即执行质押转移和其他相关状态。 本次转移不会产生任何罚款，且不限制转移次数。

新的 transition 如下：

| 名称 | 参数 | 说明 |
| ----------- | -----------|-------------|
| `RequestDelegatorSwap` | `new_deleg_addr: ByStr20, initiator: ByStr20` | 向另一个委托人创建一个请求，表明将所有现有的质押、奖励等转移给这个新委托人。<br/><br/>`initiator` 是想要转移其质押的委托人的地址。< br/><br/>`new_deleg_addr` 是接收者的地址，该地址将接收 `initiator`（原始所有者）的所有质押金额、奖励、待提款等。 `initiator` 可以通过发送带有另一个 `new_deleg_addr` 的请求来更改接收者。 `initiator` 也可以通过 `RevokeDelegatorSwap` 撤销请求。<br/><br/>在接收端，`new_deleg_addr` 可以通过 `ConfirmDelegatorSwap` 接受交换或通过 `RejectDelegatorSwap` 拒绝交换。< br/><br/>为避免任何一方在交换后获得或失去奖励，双方在请求和确认时不得有缓冲存款或未提取的奖励。此外，如果存在由 `new_deleg_addr` 向 `initiator` 发出的现有请求，则 `initiator` 不允许向 `new_deleg_addr` 发出请求，即，如果存在 `A -> B` 请求，则 ` B` 不能向 `A` 提出请求，除非 `B` 首先接受或拒绝现有请求。但是，`B` 可以向其他委托人发出其他交换请求。<br/><br/>**一旦接收方接受交换请求，更改将不可逆转，因此请谨慎使用 `new_deleg_addr`。** | 
| `RevokeDelegatorSwap` | `initiator: ByStr20` | 撤销交换请求。 这仅由提出现有交换请求并希望取消它的 `initiator` 使用。 | 
| `ConfirmDelegatorSwap` | `requestor: ByStr20, initiator: ByStr20` | 接受来自请求者的交换请求。<br/><br/>`initiator` 是新的委托人，它将继承 `requestor` 的所有质押金额、提款、奖励等。<br/><br />`requestor` 是通过 `RequestDelegatorSwap` 发起交换请求的委托人。<br/><br/>为避免任何一方在交换后获得或失去奖励，双方在确认的时候不得有缓冲存款或未提取的奖励。 | 
| `RejectDelegatorSwap` | `requestor: ByStr20, initiator: ByStr20` | 拒绝来自请求者的交换请求。<br/><br/>一旦被拒绝，如果他/她希望恢复拒绝，请求者必须再次创建交换请求。<br/><br/>`initiator` 是将从 `requestor` 继承所有质押金额、提款、奖励等的新委托人。<br/><br/>`requestor` 是通过 `RequestDelegatorSwap` 发起交换请求的委托人。 | 

更多信息请参考 [账户间质押转移](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md#design-changes-for-phase-11)

## 参考

- [阶段1.1 质押合约](https://github.com/Zilliqa/staking-contract)
- [ZIP-19 - 种子节点质押机制：阶段 1.1](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-19.md)
- [Zilliqa 主网 V8 升级通知](../../dev/dev-upgrade-v8)
