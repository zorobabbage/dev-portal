---
id: dev-keys-zilpay
title: ZilPay
keywords: 
- key management
- zilpay
- detect
- connect
- browser extension
- wallet
- access acounts
- api
- zilliqa
description: Zilpay Zilliqa Browser Extension Wallet
---

---

ZilPay 是一个[开源](https://github.com/zilpay/zil-pay) 浏览器插件，用于管理用户的 Zilliqa 钱包，可用于 Chrome、Firefox 和 Opera 浏览器。 它不会在远程服务器上存储任何用户的私钥。 相反，它们受密码保护并存储在浏览器存储中。 它是一个非托管钱包，这意味着用户对他们的私钥有完全的访问权和责任。

## 检测 ZilPay

ZilPay 使用 ```window.zilPay``` 将全局 API 注入其用户访问的网站。 该 API 允许网站请求用户登录、从区块链加载数据并提示用户签署消息和交易。

要检查用户是否安装了 ZilPay，这里有一个示例代码
 ```typescript
 (typeof window.zilPay !== 'undefined') { /* do something */ }
 ```

## 将你的 dApp 与 ZilPay 连接起来

你需要询问用户是否允许将你的 dApp 连接到他们的 ZilPay 钱包。 以下是请求权限的示例代码
```typescript
window.zilPay.wallet.connect()
```
这是一个返回 promise 的方法，它使用 `Boolean` 值进行解析。 `true` 值表示用户接受你的连接请求，而 `false` 值表示拒绝。

## 访问用户帐户
连接到用户的 ZilPay 钱包后，您可以通过 ```window.zilPay.wallet.defaultAccount``` 查看当前账户信息。

如果你希望在用户更改帐户或网络时收到通知，你可以订阅相关事件
```typescript
window.zilPay.wallet.observableAccount().subscribe(function (account) {
    // ... When the user changes account
});
window.zilPay.wallet.observableNetwork().subscribe(function (net) {
    // ... When the user changes network
});
```

## API 参考
ZilPay 提供了一组文档供你参考
- [提供者 API](https://zilpay.xyz/Documentation/zilliqa-provider/)
- [区块链相关 API](https://zilpay.xyz/Documentation/zilliqa-api-blockchain/)
- [加密相关 API](https://zilpay.xyz/Documentation/zilliqa-api-crypto/)
- [Utils 相关 API](https://zilpay.xyz/Documentation/zilliqa-api-utils/)
- [合约相关 API](https://zilpay.xyz/Documentation/zilliqa-contracts/)
