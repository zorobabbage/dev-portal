---
id: dev-tools-websockets
title: WebSocket 服务器
keywords: 
- websockets
- txblock
- subscription events
- events
- contract
- zilliqa
description: Zilliqa Websockets
---

---

本页面介绍了 Zilliqa WebSocket 服务器 和 SDK 客户端之间的协议，用于查询订阅和消息推送。

## 介绍

Zilliqa WebSocket Server 提供 WebSocket 服务，使 Zilliqa 区块链上的 dApp 开发者或其他构建者能够订阅特定主题（例如，新区块已产生、支付交易已确认、智能合约发出的事件）。 使用 WebSocket 服务，开发人员不再需要定期轮询区块链以获取特定信息。

| 网络 | Endpoint |
| ------- | ---- |
| 主网 | wss://api-ws.zilliqa.com |
| 测试网 | wss://dev-ws.zilliqa.com |

## 功能工作流

客户端可以通过发送查询来订阅或取消订阅某些主题。 如果查询失败，通常会立即通过相关错误消息通知客户端。 对于每个 Tx 块，订阅的内容将由服务器在一条消息中发送给每个客户端。 此消息（此处称为**通知**）包括一个数组，其中包含对订阅主题的所有更新。

## 支持的查询

目前支持查询以下类型的数据：

- **新的 TxBlock**。 这包括最近生成的 Tx 块和该块内处理的所有交易的哈希值。
- **事件日志**。 这包括为指定的合约地址生成的所有事件日志。
- **取消订阅**。 这告诉服务器取消客户端对某个主题的订阅。

## 异常处理

如果查询失败，通常会向客户端发送**错误消息**：

```json
{
  "type":"Error",
  "error":"..."
}
```

以下错误消息适用于所有类型的无效查询：

- **invalid query field**。 这会通知客户端查询无效、无法找到、为空、格式错误或不可用。

## 消息编码

按照惯例，我们仍然使用 JSON 作为我们的编码格式。

epoch 消息会以这种方式呈现：

```json
{
	"type": "Notification",
	"values": [{
		"query": "NewBlock",
		"value": {
			"TxBlock": {
				"body": {
					"BlockHash": "b2214da8e25efbd4291f85016094824a8fcd46075d06e365282d39ee4ba8ca24",
					"HeaderSign": "E276EFC8B01AC51804272AAAB4FC59DD96B08B3988F9DA6BED28657CC74A1A609E73B203AA58664EAEB4A960FFEF3D636A7691EBD7F89A03CEFEB12FA8797615",
					"MicroBlockInfos": [{
						"MicroBlockHash": "9e811581454211ea5a757678460bb62a73860d1be9e5b8b805d3b176d4d92451",
						"MicroBlockShardId": 0,
						"MicroBlockTxnRootHash": "eec45db6a9b70463a8ac32bec853bcb5fe1d73ffec1244e1cc0427036483bbfa"
					}, {
						"MicroBlockHash": "066ff187ff392a9a9cd430a248552f10759f98e0ac530015091ffa430d68ba83",
						"MicroBlockShardId": 1,
						"MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
					}, {
						"MicroBlockHash": "250091b5c626143bde230813c527f77a007303e6dc3502642c7d468bc2d064e4",
						"MicroBlockShardId": 2,
						"MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
					}]
				},
				"header": {
					"BlockNum": "15",
					"DSBlockNum": "1",
					"GasLimit": "15000000",
					"GasUsed": "1",
					"MbInfoHash": "4b2d20a0bcb382ad2e2560791ed90ed21100e8e84ebac63d62d3c0b1a3fb11fe",
					"MinerPubKey": "0x02FC9ED69524A23AEFCB85B8A36C998F512C0512C6932DED74680A044F9D3EBC95",
					"NumMicroBlocks": 3,
					"NumTxns": 1,
					"PrevBlockHash": "5bda21605e7ea9404c58a40eebe99563adf330bab5b39e7438f8e4db28607b37",
					"Rewards": "1000000000",
					"StateDeltaHash": "2f878030ab9b0a211c1e584e140707c79d62d067390bfe3ccaf08fdaeaad2229",
					"StateRootHash": "94abb63e27984f46e914db2601de6af2048a3bf72f69eaac34421b7dfbd34a82",
					"Timestamp": "1572512230807870",
					"Version": 1
				}
			}
		},
		"TxHashes": [
			["1beb32a5435e993aa3025a70d8a5e71df43c10e2fe3f6ef832d1a5c371a63852"],
			[],
			[]
		]
	}, {
		"query": "EventLog",
		"value": [{
			"address": "0x0000000000000000000000000000000000000000",
			"event_logs": [{
				"_eventname": "foo1",
				"params": [{
					"vname": "bar1",
					"type": "String",
					"value": "abc"
				}, {
					"vname": "bar2",
					"type": "ByStr32",
					"value": "0x0000000000000000000000000000000000000001"
				}]
			}]
		}]
	}, {
		"query": "Unsubscribe",
		"value": ["NewBlock"]
	}]
}
```

以下部分提供了每个订阅主题的详细信息。

### 订阅新区块

#### 查询消息

```json
{
	"query": "NewBlock"
}
```

#### 回应消息

成功订阅后，服务器将向客户端回显查询消息。 否则，服务器将返回错误消息。

#### 特定于本主题的错误消息

无

#### 通知示例

```json
{
	"query": "NewBlock",
	"value": {
		"TxBlock": {
			"body": {
				"BlockHash": "b2214da8e25efbd4291f85016094824a8fcd46075d06e365282d39ee4ba8ca24",
				"HeaderSign": "E276EFC8B01AC51804272AAAB4FC59DD96B08B3988F9DA6BED28657CC74A1A609E73B203AA58664EAEB4A960FFEF3D636A7691EBD7F89A03CEFEB12FA8797615",
				"MicroBlockInfos": [{
					"MicroBlockHash": "9e811581454211ea5a757678460bb62a73860d1be9e5b8b805d3b176d4d92451",
					"MicroBlockShardId": 0,
					"MicroBlockTxnRootHash": "eec45db6a9b70463a8ac32bec853bcb5fe1d73ffec1244e1cc0427036483bbfa"
				}, {
					"MicroBlockHash": "066ff187ff392a9a9cd430a248552f10759f98e0ac530015091ffa430d68ba83",
					"MicroBlockShardId": 1,
					"MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
				}, {
					"MicroBlockHash": "250091b5c626143bde230813c527f77a007303e6dc3502642c7d468bc2d064e4",
					"MicroBlockShardId": 2,
					"MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
				}]
			},
			"header": {
				"BlockNum": "15",
				"DSBlockNum": "1",
				"GasLimit": "15000000",
				"GasUsed": "1",
				"MbInfoHash": "4b2d20a0bcb382ad2e2560791ed90ed21100e8e84ebac63d62d3c0b1a3fb11fe",
				"MinerPubKey": "0x02FC9ED69524A23AEFCB85B8A36C998F512C0512C6932DED74680A044F9D3EBC95",
				"NumMicroBlocks": 3,
				"NumTxns": 1,
				"PrevBlockHash": "5bda21605e7ea9404c58a40eebe99563adf330bab5b39e7438f8e4db28607b37",
				"Rewards": "1000000000",
				"StateDeltaHash": "2f878030ab9b0a211c1e584e140707c79d62d067390bfe3ccaf08fdaeaad2229",
				"StateRootHash": "94abb63e27984f46e914db2601de6af2048a3bf72f69eaac34421b7dfbd34a82",
				"Timestamp": "1572512230807870",
				"Version": 1
			}
		}
	},
	"TxHashes": [
		["1beb32a5435e993aa3025a70d8a5e71df43c10e2fe3f6ef832d1a5c371a63852"],
		[],
		[]
	]
}
```

### 订阅事件日志

#### 查询消息

```json
{
  "query":"EventLog",
  "addresses":[
    "0x0000000000000000000000000000000000000000",
    "0x1111111111111111111111111111111111111111"
  ]
}
```

#### 回应消息

成功订阅后，服务器将向客户端回显查询消息。 否则，服务器将返回错误消息。

#### 特定于本主题的错误消息

- **invalid addresses field**。 这告诉客户端地址字段无效，这意味着它无法找到或者格式错误或为空。
- **no contract found in list**。 这告诉客户端提供的地址都是非合约的。

#### Sample Notification

```json
{
  "query":"EventLog",
  "value":
  [
    {
      "address":"0x0000000000000000000000000000000000000000",
      "event_logs":[
        {
          "_eventname":"foo1",
          "params":[
            {
              "vname":"bar1",
              "type":"String",
              "value":"abc"
            },
            {
              "vname":"bar2",
              "type":"ByStr32",
              "value":"0x0000000000000000000000000000000000000001"
            }
          ]
        },
      ]
    }
  ]
}
```

请注意，对于地址 `0x111111111111111111111111111111111111111` 的地址没有出现在消息中，因为它没有在这个时期发布任何事件日志。

### 订阅交易日志

#### 查询消息

```json
{"query" : "TxnLog" , "addresses" : ["0x42fb82623b9ea0b9dbf41e74304a39908a378cfd"]}
```

#### 回应消息

成功订阅后，服务器将向客户端回显查询消息。 否则，服务器将返回错误消息。

#### 特定于本主题的错误消息

- **invalid hex address**。 这表明地址字段不是正确的 32 字节地址。

- **invalid addresses field**。 这告诉客户端地址字段无效，这意味着它无法找到或者格式错误或为空。

- **no valid address found in list**。 这告诉客户端提供的地址都是无效的。

#### 通知示例

```json
{
  "type": "Notification",
  "values": [
    {
      "query": "TxnLog",
      "value": [
        {
          "address": "eb955ff1715a1eb71f63c655504866117591b7fa",
          "log": [
            {
              "ID": "b676bd19fecaf6296e799f9edc2887c85e6d5e6417860f454ddd73ed0dc6fd61",
              "amount": "1000000000000",
              "fromAddr": "eb955ff1715a1eb71f63c655504866117591b7fa",
              "success": true,
              "toAddr": "046105286e2ec9ca467b5bdfa0975b0e9342eb0a"
            }
          ]
        }
      ]
    }
  ]
}
```


### 取消订阅

#### 查询消息

```json
{
  "query":"Unsubscribe",
  "type":"EventLog"
}
```

#### 响应消息

一旦成功取消订阅，服务器将向客户端回显查询消息。 否则，服务器将返回错误消息。

#### 特定于本主题的错误消息

- **invalid type field**。 这告诉客户端类型字段无效，这意味着它无法找到或者格式错误或为空。

#### 通知示例

```json
{
  "query":"Unsubscribe",
  "value":["NewBlock", "EventLog"]
}
```

## 例子

客户端订阅 NewBlock：

```json
{
 "query":"NewBlock"
}
```

客户端订阅事件日志：

```json
{
 "query":"EventLog",
 "addresses":[
   "0x000000000000000000000000000000000",
   "0x111111111111111111111111111111111"
 ]
}
```

客户端取消订阅 NewBlock：

```json
{
  "query":"Unsubscribe",
  "type":"NewBlock"
}
```

通知：

```json
{
  "type":"Notification",
  "values":[
    {
      "query":"NewBlock",
      "value":{
        "TxBlock":{
          "body":{
            "BlockHash":"b2214da8e25efbd4291f85016094824a8fcd46075d06e365282d39ee4ba8ca24",
            "HeaderSign":"E276EFC8B01AC51804272AAAB4FC59DD96B08B3988F9DA6BED28657CC74A1A609E73B203AA58664EAEB4A960FFEF3D636A7691EBD7F89A03CEFEB12FA8797615",
            "MicroBlockInfos":[
              {
                "MicroBlockHash":"9e811581454211ea5a757678460bb62a73860d1be9e5b8b805d3b176d4d92451",
                "MicroBlockShardId":0,
                "MicroBlockTxnRootHash":"eec45db6a9b70463a8ac32bec853bcb5fe1d73ffec1244e1cc0427036483bbfa"
              },
              {
                "MicroBlockHash":"066ff187ff392a9a9cd430a248552f10759f98e0ac530015091ffa430d68ba83",
                "MicroBlockShardId":1,
                "MicroBlockTxnRootHash":"0000000000000000000000000000000000000000000000000000000000000000"
              },
              {
                "MicroBlockHash":"250091b5c626143bde230813c527f77a007303e6dc3502642c7d468bc2d064e4",
                "MicroBlockShardId":2,
                "MicroBlockTxnRootHash":"0000000000000000000000000000000000000000000000000000000000000000"
              }
            ]
          },
          "header":{
            "BlockNum":"15",
            "DSBlockNum":"1",
            "GasLimit":"15000000",
            "GasUsed":"1",
            "MbInfoHash":"4b2d20a0bcb382ad2e2560791ed90ed21100e8e84ebac63d62d3c0b1a3fb11fe",
            "MinerPubKey":"0x02FC9ED69524A23AEFCB85B8A36C998F512C0512C6932DED74680A044F9D3EBC95",
            "NumMicroBlocks":3,
            "NumTxns":1,
            "PrevBlockHash":"5bda21605e7ea9404c58a40eebe99563adf330bab5b39e7438f8e4db28607b37",
            "Rewards":"1000000000",
            "StateDeltaHash":"2f878030ab9b0a211c1e584e140707c79d62d067390bfe3ccaf08fdaeaad2229",
            "StateRootHash":"94abb63e27984f46e914db2601de6af2048a3bf72f69eaac34421b7dfbd34a82",
            "Timestamp":"1572512230807870",
            "Version":1
          }
        }
      },
      "TxHashes":[
        ["1beb32a5435e993aa3025a70d8a5e71df43c10e2fe3f6ef832d1a5c371a63852"],
        [],
        []
      ]
    },
    {
      "query":"EventLog",
      "value":[
        {
          "address":"0x0000000000000000000000000000000000000000",
          "event_logs":[
            {
              "_eventname":"foo1",
              "params":[
                {
                  "vname":"bar1",
                  "type":"String",
                  "value":"abc"
                },
                {
                  "vname":"bar2",
                  "type":"ByStr32",
                  "value":"0x0000000000000000000000000000000000000001"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "query":"Unsubscribe",
      "value":["NewBlock"]
    }
  ]
}

```

上述消息后，在下一个 Tx 块期间，客户端将不再收到通知中的 `NewBlock`。

## 使用 zilliqa-js 的示例

我们的 [Zilliqa-JavaScript-Library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library) 提供了一种更简单的订阅主题的方法。

### 订阅新区块

```js
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  SocketConnect,
  StatusType,
  MessageType,
} = require('@zilliqa-js/subscriptions');

async function test() {
  const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
  
  const subscriber = zilliqa.subscriptionBuilder.buildNewBlockSubscriptions(
    'wss://dev-ws.zilliqa.com',
  );
  
  // if subscribe success, it will echo the subscription info
  subscriber.emitter.on(StatusType.SUBSCRIBE_NEW_BLOCK, (event) => {
    console.log('get SubscribeNewBlock echo: ', event);
  });

  subscriber.emitter.on(MessageType.NEW_BLOCK, (event) => {
    // doing what you want with new block
    console.log('get new block: ', event.value.TxBlock.header);
  });
  
  //if unsubscribe success, it will echo the unsubscription info
  subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event) => {
    console.log('get unsubscribe event: ', event);
  });

  await subscriber.start();
}

test();
```

### 订阅事件日志

```js
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const { StatusType, MessageType } = require('@zilliqa-js/subscriptions');

async function test() {
  const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
  const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
    'wss://dev-ws.zilliqa.com',
    {
      // smart contract address you want to listen on  
      addresses: [
        '0x2ce491a0fd9e318b39172258101b7c836da7449b',
        '0x167e3980e04eab1e89ff84523ae8c77e008932dc',
      ],
    },
  );
  
  subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event) => {
    // if subscribe success, it will echo the subscription info
    console.log('get SubscribeEventLog echo: ', event);
  });
  
  subscriber.emitter.on(MessageType.EVENT_LOG, (event) => {
    // do what you want with new event log
    console.log('get new event log: ', JSON.stringify(event));
  });
 
  subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event) => {
    //if unsubscribe success, it will echo the unsubscription info
    console.log('get unsubscribe event: ', event);
  });

  await subscriber.start();
}

test();
```
