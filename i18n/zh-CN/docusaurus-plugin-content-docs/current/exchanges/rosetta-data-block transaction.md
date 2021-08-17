---
id: rosetta-data-block-transaction
title: 交易
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- API
- contruction
description: Transaction
---

---

## 获取区块交易 - 付款

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "block_identifier": {
    	"index": 1582509,
    	"hash": "4cc2adbb6fe5f14952b1a7043b0a3fb0a33016fe0de99d1bc2102f349e3cd3ad"
    },
    "transaction_identifier": {
    	"hash": "e03a4dcfce78a7f40a686969260bef57e0e18cead8fa1b60df05edfd69c80415"
    }
}
```

响应：

示例
__注意__：操作类型为 `transfer`。

```json
{
    "transaction": {
        "transaction_identifier": {
            "hash": "e03a4dcfce78a7f40a686969260bef57e0e18cead8fa1b60df05edfd69c80415"
        },
        "operations": [
            {
                "operation_identifier": {
                    "index": 0
                },
                "type": "transfer",
                "status": "SUCCESS",
                "account": {
                    "address": "zil17z645g0dr8nwgs5r8tafyekpv6kk882nxaqr70",
                    "metadata": {
                        "base16": "F0b55a21ED19E6E442833Afa9266C166aD639d53"
                    }
                },
                "amount": {
                    "value": "-300000000000000",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                }
            },
            {
                "operation_identifier": {
                    "index": 1
                },
                "related_operations": [
                    {
                        "index": 0
                    }
                ],
                "type": "transfer",
                "status": "SUCCESS",
                "account": {
                    "address": "zil1yz8putzpxrjrlrcn9xukwe6fyeg9jlyjmnw70a",
                    "metadata": {
                        "base16": "208E1e2c4130E43F8F1329B96767492650597C92"
                    }
                },
                "amount": {
                    "value": "300000000000000",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                },
                "metadata": {
                    "gasLimit": "1",
                    "gasPrice": "1000000000",
                    "nonce": "138",
                    "receipt": {
                        "accept": false,
                        "errors": null,
                        "exceptions": null,
                        "success": true,
                        "cumulative_gas": "1",
                        "epoch_num": "1582509",
                        "event_logs": null,
                        "transitions": null
                    },
                    "senderPubKey": "0x027558EDE7BA1EA7A7633F1ACA898CE3DE0F7589C6B5D8C30D91EDE457F6E552F6",
                    "signature": "0x9795884BD13CF195334B5D8E79A425C1582CF8D481091F64840D11BBC19EC893444021C1793AF242703823CF4FCC29E72060D79EEAB0478D9334A73F173A97A4",
                    "version": "21823489"
                }
            }
        ]
    }
}
```

*获取区块交易 - 合约部署*

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "mainnet"
    },
    "block_identifier": {
    	"index": 670379,
    	"hash": "e71a6d73ec69accb63cb77e67ce6bdde92e6de5a9f1981d8cd9f2f4630031a7b"
    },
    "transaction_identifier": {
    	"hash": "5a3662d689468b423f050824c93343b790a7295d44a4e0f5ebee119ecc18d065"
    }
}
```

响应：

示例
__注意__：操作类型为 `contract_deployment`。

```json
{
    "transaction": {
        "transaction_identifier": {
            "hash": "5a3662d689468b423f050824c93343b790a7295d44a4e0f5ebee119ecc18d065"
        },
        "operations": [
            {
                "operation_identifier": {
                    "index": 0
                },
                "type": "contract_deployment",
                "status": "SUCCESS",
                "account": {
                    "address": "zil1a35lxvh38y3u8xe7kzxfkgdhmctj387zs92llt",
                    "metadata": {
                        "base16": "ec69F332F13923C39B3eB08c9b21B7De17289FC2"
                    }
                },
                "amount": {
                    "value": "0",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                },
                "metadata": {
                    "code": "\nscilla_version 0\nimport BoolUtils\nlibrary ResolverLib\ntype RecordKeyValue =\n  | RecordKeyValue of String String\nlet nilMessage = Nil {Message}\nlet oneMsg =\n  fun(msg: Message) =>\n    Cons {Message} msg nilMessage\nlet eOwnerSet =\n  fun(address: ByStr20) =>\n    {_eventname: \"OwnerSet\"; address: address}\n(* @deprecated eRecordsSet is emitted instead (since 0.1.1) *)\nlet eRecordSet =\n  fun(key: String) =>\n  fun(value: String) =>\n    {_eventname: \"RecordSet\"; key: key; value: value}\n(* @deprecated eRecordsSet is emitted instead (since 0.1.1) *)\nlet eRecordUnset =\n  fun(key: String) =>\n    {_eventname: \"RecordUnset\"; key: key}\nlet eRecordsSet =\n  fun(registry: ByStr20) =>\n  fun(node: ByStr32) =>\n    {_eventname: \"RecordsSet\"; registry: registry; node: node}\nlet eError =\n  fun(message: String) =>\n    {_eventname: \"Error\"; message: message}\nlet emptyValue = \"\"\nlet mOnResolverConfigured =\n  fun(registry: ByStr20) =>\n  fun(node: ByStr32) =>\n    let m = {_tag: \"onResolverConfigured\"; _amount: Uint128 0; _recipient: registry; node: node} in\n      oneMsg m\nlet copyRecordsFromList =\n  fun (recordsMap: Map String String) =>\n  fun (recordsList: List RecordKeyValue) =>\n    let foldl = @list_foldl RecordKeyValue Map String String in\n      let iter =\n        fun (recordsMap: Map String String) =>\n        fun (el: RecordKeyValue) =>\n          match el with\n          | RecordKeyValue key val =>\n            let isEmpty = builtin eq val emptyValue in\n              match isEmpty with\n              | True => builtin remove recordsMap key\n              | False => builtin put recordsMap key val\n              end\n          end\n      in\n        foldl iter recordsMap recordsList\ncontract Resolver(\n  initialOwner: ByStr20,\n  registry: ByStr20,\n  node: ByStr32,\n  initialRecords: Map String String\n)\nfield vendor: String = \"UD\"\nfield version: String = \"0.1.1\"\nfield owner: ByStr20 = initialOwner\nfield records: Map String String = initialRecords\n(* Sets owner address *)\n(* @ensures a sender address is an owner of the contract *)\n(* @param address *)\n(* @emits OwnerSet if the operation was successful *)\n(* @emits Error if a sender address has no permission for the operation *)\ntransition setOwner(address: ByStr20)\n  currentOwner <- owner;\n  isOkSender = builtin eq currentOwner _sender;\n  match isOkSender with\n  | True =>\n    owner := address;\n    e = eOwnerSet address;\n    event e\n  | _ =>\n    e = let m = \"Sender not owner\" in eError m;\n    event e\n  end\nend\n(* Sets a key value pair *)\n(* @ensures a sender address is an owner of the contract *)\n(* @param key *)\n(* @param value *)\n(* @emits RecordSet if the operation was successful *)\n(* @emits Error if a sender address has no permission for the operation *)\n(* @sends onResolverConfigured to the registry *)\ntransition set(key: String, value: String)\n  currentOwner <- owner;\n  isOkSender = builtin eq currentOwner _sender;\n  match isOkSender with\n  | True =>\n    records[key] := value;\n    e = eRecordsSet registry node;\n    event e;\n    msgs = mOnResolverConfigured registry node;\n    send msgs\n  | _ =>\n    e = let m = \"Sender not owner\" in eError m;\n    event e\n  end\nend\n(* Remove a key from records map *)\n(* @ensures a sender address is an owner of the contract *)\n(* @param key *)\n(* @emits RecordUnset if the operation was successful *)\n(* @emits Error if a sender address has no permission for the operation *)\n(* @sends onResolverConfigured to the registry *)\ntransition unset(key: String)\n  keyExists <- exists records[key];\n  currentOwner <- owner;\n  isOk =\n    let isOkSender = builtin eq currentOwner _sender in\n      andb isOkSender keyExists;\n  match isOk with\n  | True =>\n    delete records[key];\n    e = eRecordsSet registry node;\n    event e;\n    msgs = mOnResolverConfigured registry node;\n    send msgs\n  | _ =>\n    e = let m = \"Sender not owner or key does not exist\" in\n      eError m;\n    event e\n  end\nend\n(* Set multiple keys to records map *)\n(* Removes records from the map if according passed value is empty *)\n(* @ensures a sender address is an owner of the contract *)\n(* @param newRecords *)\n(* @emits RecordsSet if the operation was successful *)\n(* @emits Error if a sender address has no permission for the operation *)\n(* @sends onResolverConfigured to the registry *)\ntransition setMulti(newRecords: List RecordKeyValue)\n  currentOwner <- owner;\n  isOkSender = builtin eq currentOwner _sender;\n  match isOkSender with\n  | True =>\n    oldRecords <- records;\n    newRecordsMap = copyRecordsFromList oldRecords newRecords;\n    records := newRecordsMap;\n    e = eRecordsSet registry node;\n    event e;\n    msgs = mOnResolverConfigured registry node;\n    send msgs\n  | _ =>\n    e = let m = \"Sender not owner\" in eError m;\n    event e\n  end\nend\n",
                    "data": "[{\"vname\":\"_scilla_version\",\"type\":\"Uint32\",\"value\":\"0\"},{\"vname\":\"initialOwner\",\"type\":\"ByStr20\",\"value\":\"0x4887fb6920a8ae50886543ee8aa504da6c9f83bf\"},{\"vname\":\"registry\",\"type\":\"ByStr20\",\"value\":\"0x9611c53be6d1b32058b2747bdececed7e1216793\"},{\"vname\":\"node\",\"type\":\"ByStr32\",\"value\":\"0xd72c3c6e1e3b1b1238b5ba82ff7afe688f542b1cdbfee692a912dd88b1d31f76\"},{\"vname\":\"initialRecords\",\"type\":\"Map String String\",\"value\":[{\"key\":\"ZIL\",\"val\":\"0x803637d03997e4c29729e9ce9e4bc41c0c867354\"}]}]",
                    "gasLimit": "10000",
                    "gasPrice": "1000000000",
                    "nonce": "2007",
                    "receipt": {
                        "accept": false,
                        "errors": null,
                        "exceptions": null,
                        "success": true,
                        "cumulative_gas": "6024",
                        "epoch_num": "670379",
                        "event_logs": null,
                        "transitions": null
                    },
                    "senderPubKey": "0x032E38FCA06A680FFE1BA40956ADA08CB94236FC985B4F7571D455408A0A27E1A2",
                    "signature": "0xB665902059A7519F9A8E118B87ACE4EFDC0FB434475617B19B94E38ABAB68AE8DC85650E781C52CBE281FA527E7556EE9BC593531743A3594BF25C4330EC0165",
                    "version": "65537"
                }
            }
        ]
    }
}
```

### 显示区块交易的合约调用信息
合约调用可以定义为以下两种形式之一：
1. 账户调用了合约中的函数
2. 一个账户调用了合约中的一个函数，该函数进一步调用了另一个合约中的另一个函数（又名链式调用）

根据合约调用的功能，合约调用可能会向某些账户执行额外的智能合约存款。 这些智能合约存款将显示在 `operations []` 下，这与典型支付交易的显示方式相同。 *合约地址*和 *gas 数量*等与交易相关的额外元数据信息仅在 __final 操作块__ 中显示，以减少元数据的混乱。

*获取区块交易 - 无需智能合约存款的合约调用*

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "block_identifier": {
    	"index": 1558244,
    	"hash": "4f00a6059b22ebd73e6a60d77fbc20f65bfa3be3f5ae57712422699e3bb031ac"
    },
    "transaction_identifier": {
    	"hash": "ad8a8aa7c1aff0a59a3d56f9c9a72176c344e8a35bbd66e69b2bc7011b44e637"
    }
}
```

响应：

示例
__注意__：操作类型是 `contract_call`。

```json
{
    "transaction": {
        "transaction_identifier": {
            "hash": "ad8a8aa7c1aff0a59a3d56f9c9a72176c344e8a35bbd66e69b2bc7011b44e637"
        },
        "operations": [
            {
                "operation_identifier": {
                    "index": 0
                },
                "type": "contract_call",
                "status": "SUCCESS",
                "account": {
                    "address": "zil1ha4z3qu69uxr6h2m7v9ggcjt332cjupzp7c2ae",
                    "metadata": {
                        "base16": "Bf6a28839a2f0c3d5d5Bf30A84624B8c55897022"
                    }
                },
                "amount": {
                    "value": "0",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                },
                "metadata": {
                    "contractAddress": "c36087407e6474e038d7c316a620afe2a752ad0e",
                    "data": "{\"_tag\":\"SubmitHeaderBlock\",\"params\":[{\"vname\":\"new_hash\",\"type\":\"ByStr32\",\"value\":\"0x62c8b569f485f22878f8b31f6e159981be4ea78bdeb09062fbcdcbc4802deae2\"},{\"vname\":\"block\",\"type\":\"Uint64\",\"value\":\"178656\"}]}",
                    "gasLimit": "40000",
                    "gasPrice": "1000000000",
                    "nonce": "352",
                    "receipt": {
                        "accept": false,
                        "errors": null,
                        "exceptions": null,
                        "success": true,
                        "cumulative_gas": "841",
                        "epoch_num": "1558244",
                        "event_logs": [
                            {
                                "_eventname": "SubmitHashSuccess",
                                "address": "0xc36087407e6474e038d7c316a620afe2a752ad0e",
                                "params": [
                                    {
                                        "type": "ByStr32",
                                        "value": "0x62c8b569f485f22878f8b31f6e159981be4ea78bdeb09062fbcdcbc4802deae2",
                                        "vname": "hash"
                                    },
                                    {
                                        "type": "Int32",
                                        "value": "2",
                                        "vname": "code"
                                    }
                                ]
                            }
                        ],
                        "transitions": null
                    },
                    "senderPubKey": "0x025A5A6AFBB5797E44F29FEFA81B43EB3600C70F021B78ABCE7CF2D4D01D467AFF",
                    "signature": "0xA9FA2B79A0927B544528693D51BB7FCAD1E283146310CE3B12167EAA982AF69EB879942A8310D66F4D5E46655C930DFB4664861435F7CCC2E3DACA653A3966FF",
                    "version": "21823489"
                }
            }
        ]
    }
}
```

*获取区块交易 - 使用智能合约存款的合约调用（使用链式调用）*

请求：

```json
{
    "network_identifier": {
        "blockchain": "zilliqa",
        "network": "testnet"
    },
    "block_identifier": {
    	"index": 1406004,
    	"hash": "84c14dc0685e01b3c7d06f2f2dd9198880b182a82d16ed62a67752560badc6b7"
    },
    "transaction_identifier": {
    	"hash": "17c46c252569a4f3fc41ae45fc6a898892b3f75dde11d517f8b7a037caf658e3"
    }
}
```

响应：


示例
__注意__：操作类型为 `contract_call`，后面跟着`contract_call_transfer`，用于后续智能合约充值操作。


在示例中，操作顺序如下：
- 发起者 `zil16ura3fhsf84h60s7w6xjy4u2wxel892n7sq5dp` -> 合约`zil135gsjk2wqxwecn00axm2s40ey6g6ne8668046h`（调用合约调用以增加资金）
- 合约 `zil135gsjk2wqxwecn00axm2s40ey6g6ne8668046h`（`8d1109594e019d9c4defe9b6a855f92691a9e4fa`） -> 接收者 `zil12n6h5gqhlpw87gtzlqe5sq5r7pq2spj8x2g8pe`（金额从合约余额中扣除并转给接收者）

```json
{
    "transaction": {
        "transaction_identifier": {
            "hash": "17c46c252569a4f3fc41ae45fc6a898892b3f75dde11d517f8b7a037caf658e3"
        },
        "operations": [
            {
                "operation_identifier": {
                    "index": 0
                },
                "type": "contract_call",
                "status": "SUCCESS",
                "account": {
                    "address": "zil16ura3fhsf84h60s7w6xjy4u2wxel892n7sq5dp",
                    "metadata": {
                        "base16": "d707D8a6F049Eb7d3E1e768D22578A71b3f39553"
                    }
                },
                "amount": {
                    "value": "0",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                }
            },
            {
                "operation_identifier": {
                    "index": 1
                },
                "related_operations": [
                    {
                        "index": 0
                    }
                ],
                "type": "contract_call_transfer",
                "status": "SUCCESS",
                "account": {
                    "address": "zil135gsjk2wqxwecn00axm2s40ey6g6ne8668046h",
                    "metadata": {
                        "base16": "8D1109594E019D9C4DEFe9b6A855F92691A9E4fA"
                    }
                },
                "amount": {
                    "value": "-123073860347289351",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                }
            },
            {
                "operation_identifier": {
                    "index": 2
                },
                "related_operations": [
                    {
                        "index": 1
                    }
                ],
                "type": "contract_call_transfer",
                "status": "SUCCESS",
                "account": {
                    "address": "zil12n6h5gqhlpw87gtzlqe5sq5r7pq2spj8x2g8pe",
                    "metadata": {
                        "base16": "54F57A2017F85c7F2162f833480283f040a80647"
                    }
                },
                "amount": {
                    "value": "123073860347289351",
                    "currency": {
                        "symbol": "ZIL",
                        "decimals": 12
                    }
                },
                "metadata": {
                    "contractAddress": "8d1109594e019d9c4defe9b6a855f92691a9e4fa",
                    "data": "{\"_tag\": \"AddFunds\", \"params\": []}",
                    "gasLimit": "10000",
                    "gasPrice": "1000000000",
                    "nonce": "8",
                    "receipt": {
                        "accept": false,
                        "errors": null,
                        "exceptions": null,
                        "success": true,
                        "cumulative_gas": "1402",
                        "epoch_num": "1406004",
                        "event_logs": [
                            {
                                "_eventname": "Verifier add funds",
                                "address": "0x54f57a2017f85c7f2162f833480283f040a80647",
                                "params": [
                                    {
                                        "type": "ByStr20",
                                        "value": "0xd707d8a6f049eb7d3e1e768d22578a71b3f39553",
                                        "vname": "verifier"
                                    }
                                ]
                            }
                        ],
                        "transitions": [
                            {
                                "accept": false,
                                "addr": "0x8d1109594e019d9c4defe9b6a855f92691a9e4fa",
                                "depth": 0,
                                "msg": {
                                    "_amount": "123073860347289351",
                                    "_recipient": "0x54f57a2017f85c7f2162f833480283f040a80647",
                                    "_tag": "AddFunds",
                                    "params": [
                                        {
                                            "vname": "initiator",
                                            "type": "ByStr20",
                                            "value": "0xd707d8a6f049eb7d3e1e768d22578a71b3f39553"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "senderPubKey": "0x02BCD59F13A3DF40DE7D6B901B10DA416D2EFDD41E9A3631D6673809D7F5B9C4EF",
                    "signature": "0xB0B321303D8CABDC3E1AD6B3ECD5CECD90A7D0A839C69C1C23A68CC0AFD283DCC9696EB503EBAE167C3DF3943A54E6EAA1D35D28D9F414FBA44109DAAAEF4F56",
                    "version": "21823489"
                }
            }
        ]
    }
}
