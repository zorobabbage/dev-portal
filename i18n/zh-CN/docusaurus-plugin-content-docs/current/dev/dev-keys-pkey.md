---
id: dev-keys-pkey
title: 私钥和密钥库文件
keywords: 
- key management
- private key
- keystore
- import
- dapp interaction
- zilliqa
description: Zilliqa Private Key & Keystore File
---

---

除了 ZilPay，dApp 开发人员可以允许他们的用户使用其他钱包选项（例如私钥或密钥库文件）与他们的 dApp 进行交互。 但是，我们建议使用浏览器插件（例如 ZilPay）进行密钥管理。
## 通过私钥导入
以下代码片段说明了如何从私钥导入你的帐户

```javascript
zilliqa.wallet.addByPrivateKey(privkey); //Private key was stored in the privKey variable
```

## 通过密钥库文件导入
以下代码片段说明了如何从加密的 JSON 密钥库文件中导入你的帐户并获取加密的私钥

```javascript
import { decryptPrivateKey } from '@zilliqa-js/crypto';
async function privKeyFromKeystore() {
    let keystore = JSON.parse(encryptedWallet); //encryptedWallet is the encrypted keystore file
    let privKey = await decryptPrivateKey(passphrase, keystore); //passphrase variable has the passphrase of the encrypted wallet
}
```

## 与 dApp 交互

使用 ```zilliqa-js/crypto``` 模块导入账户后，后续做任何事情的步骤都与前面的例子类似。 在下面的代码片段中，我们使用私钥调用 `Hello World` 合约的 transition  `setHello()`。

:::info
如果你想使用密钥库而不是私钥，你可以用上面的代码片段替换 `zilliqa.wallet.addByPrivateKey(privkey)`。
:::

```javascript
  async updateWelcomeMsg(){
    //Only the below two lines are different when compared with ZilPay login.
    let zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
    zilliqa.wallet.addByPrivateKey(privkey); //Private key was stored in the privKey variable

    let setHelloValue = this.state.setHelloValue; //new value of the welcome msg
    let contractAddress = localStorage.getItem("contract_address");
    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);   
    const myGasPrice = units.toQa('1000', units.Units.Li); // Gas Price that will be used by all transactions
    contractAddress = contractAddress.substring(2);
    const ftAddr = toBech32Address(contractAddress);
    try {
        const contract = zilliqa.contracts.at(ftAddr);
        const callTx = await contract.call(
            'setHello',
            [
                {
                    vname: 'msg',
                    type: 'String',
                    value: setHelloValue
                }
            ],
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: VERSION,
                amount: new BN(0),
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(10000),
            }
        );
  
    } catch (err) {
        console.log(err);
    }
  }
```