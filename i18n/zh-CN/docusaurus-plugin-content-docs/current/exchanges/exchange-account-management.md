---
id: exchange-account-management
title: 帐户管理
keywords: 
- generating account
- exporting account
- importing account
- zilliqa
description: Exchange Account Management
---

---

## 生成大量帐户

交易所的一项常见任务是安全且可预测地生成大量地址。 你可以使用一个或多个 [BIP39 助记词](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)。

```ts
export class ZilliqaService {
  accounts: string[] = [];
  zil: Zilliqa;

  constructor(api: string, mnemonics: {[mnemonic: string]: number}) {
    const zilliqa = new Zilliqa(api);
    this.zil = zilliqa;

    // you can use one or more mnemonics to manage/generate a large number of accounts
    for (let m in mnemonics) {
      const num = mnemonics[m];
      range(num).forEach(i => {
        const address = this.zil.wallet.addByMnemonic(m, i);
        this.accounts.push(address);
      });
    }
  }

  /* truncated */
}
```

## 导出帐户

你可能还希望将密钥对导出为可移植格式，以便在其他地方使用。 我们支持 [Web3 机密存储定义](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) 的修改实现。

```typescript
import { Zilliqa } from '@zilliqa-js/zilliqa';
import * fs from 'fs';

export class ZilliqaService {
  accounts: string[] = [];
  zil: Zilliqa;

  constructor(api: string, mnemonics: {[mnemonic: string]: number}) {
    const zilliqa = new Zilliqa(api);
    this.zil = zilliqa;

    // you can use one or more mnemonics to manage/generate a large number of accounts
    for (let m in mnemonics) {
      const num = mnemonics[m];
      range(num).forEach(i => {
        const address = this.zil.wallet.addByMnemonic(m, i);
        this.accounts.push(address);
      });
    }
  }

  /* truncated */

  export(address: string) {
    // keep this secret.
    const passphrase = 'something';
    const json = this.zil.wallet.export(address, passphrase);
    // at this point, you should safely write this to disk, or send it to
    // a vault somehwere. the point is to keep it safe.
    fs.writeFile('/path/to/safe/place', json);
  }

  /* truncated */
}
```

现在，你应该能够在指定的路径中找到包含密码短语加密私钥的文件。 请记住始终保密此文件，尤其是你的密码！

## 导入账户

:::caution
以太坊的实现与 Zilliqa 的不同。 你将**不能**使用 web3 解密 Zilliqa 密钥库文件，反之亦然。
:::

在某个阶段，你可能还需要导入之前导出的密钥库文件。 对于这个，有一个很方面的实施方案。

```ts
import pify from 'pify';
import { Zilliqa } from '@zilliqa-js/zilliqa';
import * fs from 'fs';

export class ZilliqaService {
  accounts: string[] = [];
  zil: Zilliqa;

  constructor(api: string, mnemonics: {[mnemonic: string]: number}) {
    const zilliqa = new Zilliqa(api);
    this.zil = zilliqa;

    // you can use one or more mnemonics to manage/generate a large number of accounts
    for (let m in mnemonics) {
      const num = mnemonics[m];
      range(num).forEach(i => {
        const address = this.zil.wallet.addByMnemonic(m, i);
        this.accounts.push(address);
      });
    }
  }

  /* truncated */

  export(address: string) {
    // keep this secret.
    const passphrase = 'something';
    const json = this.zil.wallet.export(address, passphrase);
    // at this point, you should safely write this to disk, or send it to
    // a vault somehwere. the point is to keep it safe.
    fs.writeFile('/path/to/safe/place', json);
  }

  async addKeystoreFile(path: string, passphrase: string) {
    const buf = await pify(fs.readFile)(path);
    const json = buf.toString();
    const address = await this.zil.wallet.addByKeystore(json, passphrase);

    return address;
  }

  /* truncated */
```
这两种方法允许你安全地序列化和反序列化你的帐户。