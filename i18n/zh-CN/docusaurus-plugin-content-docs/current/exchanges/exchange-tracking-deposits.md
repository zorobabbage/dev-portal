---
id: exchange-tracking-deposits
title: 轮询充币
keywords: 
- track deposits
- exchanges
- cron job
- zilliqa
description: Track Exchange Deposits
---

---

除了发送交易外，交易所还需要一种方法来侦听发送到其地址（存款）的交易。 我们不会在本教程中介绍如何在 Zilliqa 上为类似 ERC20 的智能合约完成此操作，但可以应用相同的策略。

:::info
本教程中的代码源自 [示例应用程序](https://github.com/Zilliqa/dev-portal/blob/master/examples/exchange/src/cron/deposit.ts)。
:::

## 配置

为了在 Node.js 中实现一个简单而熟悉的轮询机制，我们将使用一些额外的依赖项：

```sh
npm i node-cron p-map lodash
```

## 实现处理函数

我们将使用一个名为 `DepositCron` 的简单 `class` 来设置我们的 cron 作业。 我们将从实现一个处理程序方法开始，因此我们将其命名为 `handler`。

```ts
import {flatten, range} from 'lodash';
import pMap from 'p-map';
import * as cron from 'node-cron';
import {ZilliqaService} from '../services/zilliqa';

export class DepositCron {
  addresses: string[] = [];
  frequency: string = '* * * * *';
  svc: ZilliqaService;
  task: cron.ScheduledTask;
  // you should persist the last fetched block to a database, and initialise
  // this cron job with that block number, to avoid fetch all blocks from 0 to
  // present.
  lastFetchedTxBlock: number = 0;

  constructor(frequency: string, svc: ZilliqaService, addresses: string[]) {
    this.frequency = frequency;
    this.svc = svc;
    this.addresses = addresses;
  }

  async handler() {
    const currentTxBlock = await this.svc.getTxBlock();
    console.log('Current tx block: ', currentTxBlock);
    if (currentTxBlock > this.lastFetchedTxBlock) {
      // get transactions from lastFetchedTxBlock + 1 to current, and set
      // lastFetchedTxBlock to current
      const transactions = await pMap(
        range(this.lastFetchedTxBlock + 1, currentTxBlock),
        blk => this.svc.getDeposits(this.addresses, blk),
      ).then(flatten);

      this.lastFetchedTxBlock = currentTxBlock;

      // we are only logging to stdout, but in a real application, you would
      // be writing the result to the database.
      console.log(`Found ${transactions.length} deposits for ${this.addresses}`);
    }
  }
}
```

我们来展开一下 `handler`。 我们采取几个步骤：

1. 获取当前的 `TxBlock`。
2. 我们将当前 `TxBlock` 的值与我们使用 `lastFetchedTxBlock` 记录的值进行比较。
3. 如果有差异，我们获取在 `lastFetchedTxBlock + 1` 和当前 `TxBlock` 之间已经处理的所有交易 - 即我们错过的每个交易。
4. 然后，我们为该区块范围内处理的每个交易调用 `svc.getDeposits`。 它将每个交易的 `toAddr` 属性与我们传递给 `constructor` 的 `addresses` 数组进行比较，检查它是否包含我们的 `toAddr`。 如果是，那么我们所关注的地址的交易就已经发生了。

## 启动 Cron 作业

到目前为止，我们无法启动或控制我们的 `CronJob`。 我们将通过实现 `start`、`stop` 和 `nuke` 方法来做到这一点。

```ts
import {flatten, range} from 'lodash';
import pMap from 'p-map';
import * as cron from 'node-cron';
import {ZilliqaService} from '../services/zilliqa';

export class DepositCron {
  addresses: string[] = [];
  frequency: string = '* * * * *';
  svc: ZilliqaService;
  task: cron.ScheduledTask;
  // you should persist the last fetched block to a database, and initialise
  // this cron job with that block number, to avoid fetch all blocks from 0 to
  // present.
  lastFetchedTxBlock: number = 0;

  constructor(frequency: string, svc: ZilliqaService, addresses: string[]) {
    this.frequency = frequency;
    this.svc = svc;
    this.addresses = addresses;
    this.task = cron.schedule(this.frequency, this.handler.bind(this));
  }

  async handler() {
    const currentTxBlock = await this.svc.getTxBlock();
    console.log('Current tx block: ', currentTxBlock);
    if (currentTxBlock > this.lastFetchedTxBlock) {
      // get transactions from lastFetchedTxBlock + 1 to current, and set
      // lastFetchedTxBlock to current
      const transactions = await pMap(
        range(this.lastFetchedTxBlock + 1, currentTxBlock),
        blk => this.svc.getDeposits(this.addresses, blk),
      ).then(flatten);

      this.lastFetchedTxBlock = currentTxBlock;

      // we are only logging to stdout, but in a real application, you would
      // be writing the result to the database.
      console.log(`Found ${transactions.length} deposits for ${this.addresses}`);
    }
  }

  async start() {
    this.task.start();
  }

  async stop() {
    this.task.stop();
  }

  async nuke() {
    this.task.destroy();
  }
}
```

现在我们有了方法，就可以像这样使用 cron 作业了：

```ts
// app.ts
// initialise services
import * as services from './services';
import * as crons from './cron';

const zilliqaSvc = new services.ZilliqaService(
  'https://stress-test-api.aws.z7a.xyz',
  {
    [config.get('mnemonic')]: 8,
  },
);

// boot up cron jobs
// these can also be destroyed
const depositCron = new crons.DepositCron('* * * * *', zilliqaSvc);
depositCron.start();
```