---
id: dev-tools-zilliqajs
title: zilliqa-js
keywords: 
- zilliqajs
- zilliqa-js
- js
- installation
- apis
- examples
- zrc2 wallet
- hello world
- zilliqa
description: Zilliqa Websockets
---

---
## 介绍
[zilliqa-js](https://github.com/Zilliqa/Zilliqa-JavaScript-Library) 是一个 Javascript 库，允许你与 Zilliqa 网络节点进行交互——创建钱包、部署合约和调用 transition 以与智能合约交互。

## 源代码

Github 仓库可以在 [https://github.com/Zilliqa/Zilliqa-JavaScript-Library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library) 找到

## 发行版本

zilliqa-js 的所有版本都可以在 [https://www.npmjs.com/package/@zilliqa-js/zilliqa](https://www.npmjs.com/package/@zilliqa-js/zilliqa) 找到

发行说明可以在 [https://github.com/Zilliqa/Zilliqa-JavaScript-Library/releases](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/releases) 找到

## 安装

建议开发者使用伞包 `@zilliqa-js/zilliqa` 安装 JavaScript 客户端。 它会引导各种模块，然后可以作为 `Zilliqa` 类的成员访问这些模块。

```shell
yarn add @zilliqa-js/zilliqa
# you may also need to install the tslib package.
yarn add tslib
# bn.js should be added with the above package. if it is not, install it manually.
yarn add bn.js
```

## 方法和 API

下表提供了 zilliqa-js 的每个模块的描述以及不可能想要使用它的目的。访问每个模块的相关链接，可以找到该模块支持的方法和 api 的详细说明。

| package | 描述 | 依赖 |
| --- | --- | --- |
| [`@zilliqa-js/core`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-core)      | 核心抽象和基类，例如 `HTTPProvider` 和用于与 Zilliqa JSON-RPC 接口交互的网络逻辑。                                                   | 无                                                                                    |
| [`@zilliqa-js/account`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-account)     | `Wallet`、`Account` 和 `Transaction` 抽象存在于这个包中。                                                                                                  | `@zilliqa-js/core`, `@zilliqa-js/crypto`, `@zilliqa-js/util`, `@zilliqa-js/proto`       |
| [`@zilliqa-js/blockchain`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-blockchain) | Zilliqa `JSON-RPC` 的主接口。                                                                                                                                | 无                                                                                    |
| [`@zilliqa-js/contract`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-contract)   | 暴露一个 `Contracts` 模块，负责智能合约的部署和交互。                                                                                | `@zilliqa-js/account`, `@zilliqa-js/blockchain`, `@zilliqa-js/core`, `@zilliqa-js/util` |
| [`@zilliqa-js/crypto`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-crypto)     | 暴露了几个松散耦合的加密便利函数，用于处理 Zilliqa 区块链及其加密原语，例如 Schnorr 签名。 | `@zilliqa-js/util`                                                                      |
| [`@zilliqa-js/proto`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-proto)      | Protobuf 源文件和相应生成的 JS 模块。                                                                                                             | 无                                                                                    |
| [`@zilliqa-js/util`](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-util)       | 处理序列化/反序列化和验证的杂项功能。                                                                                   | 无                                                                                    |
| [`@zilliqa-js/viewblock`](https://github.com/Ashlar/zilliqa-js-viewblock)       | 与 ViewBlock 的 API 接口交互的库                                                                                   | `@zilliqa-js/crypto`                                                                                    |

## 演示 - ZRC-2 钱包
对于这个演示，我们将查看一个简单的 ZRC-2 钱包的 zilliqa-js 相关代码，[ZRC-2](https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc- 2.md) 是 Zilliqa 上同质化代币的标准。 完整代码可以在 [ZRC-2 钱包仓库](https://github.com/arnavvohra/dev-portal-examples/tree/master/zrc-2-wallet) 中找到。 这个仓库是用 React 编写的，但是 zilliqa-js 方法和 API 可以与任何 javascript 框架一起使用。

#### 从加密钱包和密码短语生成私钥和地址
```javascript
import { decryptPrivateKey, getAddressFromPrivateKey} from '@zilliqa-js/crypto';
let keystore = JSON.parse(this.state.encryptedWallet);
const pk = await decryptPrivateKey(this.state.passphrase, keystore);
const address =  getAddressFromPrivateKey(pk);
```

#### 获取用户的 $ZIL 余额
```javascript
const {Zilliqa} = require('@zilliqa-js/zilliqa');
const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
let balanceState = await zilliqa.blockchain.getBalance(userAddress);
if(balanceState){
    let balance = balanceState.result.balance;
    balance = units.fromQa(new BN(balance), units.Units.Zil);// user's $zil balance
}
```

#### 获取用户的代币余额
```javascript
let userAddress = localStorage.getItem("userAddress");//userAddress is retrieved from localStorage in this example
const {Zilliqa} = require('@zilliqa-js/zilliqa');
const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

let smartContractState = await zilliqa.blockchain.getSmartContractState(tokenContractAddress);
if(smartContractState){
    let balances_map = smartContractState.result.balances_map;
    userAddress = userAddress.toLowerCase();
    let userTokenBalance = balances_map[userAddress];//user's token balance  
}
```

#### 通过调用 ZRC-2 合约的 Transition  “Transfer” 将代币发送到另一个地址

```javascript
sendTransaction = async() => {
const {Zilliqa} = require('@zilliqa-js/zilliqa');
const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const {BN, Long, bytes, units} = require('@zilliqa-js/util');
const {toBech32Address, fromBech32Address} = require('@zilliqa-js/crypto');

//You can set the value of the following variables according to your liking
let contractAddress = localStorage.getItem("token_contract_address");
let recipientAddress = this.state.sendingAddress;
let sendingAmount = this.state.sendingAmount;
let privkey = localStorage.getItem("private_key");


zilliqa.wallet.addByPrivateKey(privkey);

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

const myGasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
contractAddress = contractAddress.substring(2);
recipientAddress = fromBech32Address(recipientAddress);//converting to ByStr20 format
const ftAddr = toBech32Address(contractAddress);
try {
    const contract = zilliqa.contracts.at(ftAddr);
    const callTx = await contract.call(
        'Transfer',
        [
            {
                vname: 'to',
                type: 'ByStr20',
                value: recipientAddress,
            },
            {
                vname: 'amount',
                type: 'Uint128',
                value: sendingAmount,
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