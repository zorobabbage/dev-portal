---
id: exchange-sending-transactions
title: 发送交易
keywords: 
- constructing transaction object
- signing transaction
- sending transaction
- zilliqa
description: Sending Zilliqa Transactions For Exchanges
---

---

任何交易所的一个关键特征是能够将保管的资金提取到用户选择的任意地址。 由于 Zilliqa 节点不提供代表你签署交易的 API，因此你必须使用你选择的 SDK 在本地执行此操作。 我们提供了使用 zilliqa-js（官方 JavaScript SDK）的示例。

## 构造交易对象

有几种方法可以构造一个 `Transaction` 实例。 我们建议使用位于伞形 Zilliqa 对象上的交易工厂，如下所示：

```js
const { Zilliqa } = require("@zilliqa-js/zilliqa");
const { getPubKeyFromPrivateKey } = require("@zilliqa-js/crypto");
const { BN, Long, bytes, units } = require("@zilliqa-js/util");

const api = "https://dev-api.zilliqa.com";
const chainId = 333; // Testnet
const msgVersion = 1;
const zilliqa = new Zilliqa(api);

const toAddress = "BENCH32_ADDRESS";
const fromPrivateKey = "SENDER_PRIVATE_KEY";
const fromPublicKey = getPubKeyFromPrivateKey(fromPrivateKey)
const fromAddress = getAddressFromPrivateKey(fromPrivateKey)
const amountToSendInZil = 0.17;
const gasPriceInZil = 0.002;
const nextNonce = (await zilliqa.blockchain.getBalance(fromAddress)).result.nonce + 1;

const rawTx = zilliqa.transactions.new({
  version: bytes.pack(chainId, msgVersion),
  amount: new BN(units.toQa(amountToSendInZil * 1000000, units.Units.Li)),
  nonce: nextNonce,
  gasLimit: Long.fromNumber(50), // normal (non-contract) transactions cost 50 gas after network upgrade in mid april 2021
  gasPrice: new BN(units.toQa(gasPriceInZil * 1000000, units.Units.Li)), // the minimum gas price is 1,000 li
  toAddr: toAddress,
  pubKey: fromPublicKey, // this determines which account is used to send the tx
});
```

## 签署交易

同样，你可以通过几种方式签署交易。 背后的逻辑时，签名是用椭圆曲线 `secp256k1` 完成的。 最简单的方法是使用钱包。 扩展一下我们上面的例子：

```js
zilliqa.wallet.addByPrivateKey(fromPrivateKey);
// signWith uses the specified address to perform the signing of the transaction.
// note that we provided the nonce to use when constructing the transaction.
// if the nonce is not provided, zilliqa-js will automatically try to determine the correct nonce to use.
// however, if there is no network connection, zilliqa-js will not be able to
// do that, and signing will fail.
const signedTx = await zilliqa.wallet.signWith(rawTx, fromAddress);
```

请注意，我们提供了在构建交易时使用的随机数。 如果未提供随机数，zilliqa-js 将自动尝试确定要使用的正确随机数。 但是，如果没有网络连接，zilliqa-js 就做不了这事了，并且签名也会失败。

如果 `交易` 成功签名，你将能够访问 `txParams`上的 `signature` 属性。

```ts
console.log(signedTx.txParams.signature) // 128-bit signature
```

在此阶段，你将能够通过种子节点将新签名的交易广播到网络。

## 发送交易

广播已签名的交易没什么特别之处，但如果你对 Zilliqa 的架构没有深入了解，就会涉及一些可能会让你感到困惑的微妙之处。

我们演示了一种使用内置 `HTTPProvider` 广播交易的初级方法，如下所示：

```js
const res = await zilliqa.provider.send("CreateTransaction", signedTx.txParams)
```

这将返回一个 `Promise`，如果成功，它将包含你的交易哈希：

```js
console.log(res.result && res.result.TranID) // 32-byte transaction hash
```

但是，请注意，如果在处理事务时出现错误，响应中将不存在 `result`。 相反，响应将包含一个 `error` 键，这是一个符合 JSON-RPC 2.0 的对象。

如果你收到 `TranID`，则表示你的交易已被种子节点接受，现在处于待处理状态。 `zilliqa-js` 提供了一种自动轮询查找以进行确认的方法：

```ts
// returns a Promise<Transaction>
// in this case, we try polling the node 33 times, increasing the interval
// between attempts by 1000ms each time. this works out roughly to the block
// time on the Zilliqa main net.
const tx = await signedTx.confirm(res.result.TranID, 33, 1000)
```

`confirm` 方法返回一个 Promise，其状态表示交易的确认状态。 如果交易被确认：

```ts
assert(signedTx.isConfirmed() === true);
```
