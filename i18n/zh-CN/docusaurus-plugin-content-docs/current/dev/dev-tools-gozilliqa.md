---
id: dev-tools-gozilliqa
title: gozilliqa
keywords: 
- go
- gozilliqa
- sdk
- installation
- apis
- examples
- zilliqa
description: gozilliqa
---

---
## 介绍
[gozilliqa](https://github.com/Zilliqa/gozilliqa-sdk) is a Golang library for interacting with the Zilliqa network. It can create wallets, deploy contracts, and invoke transitions to interact with smart contracts on the Zilliqa network.

## 源代码

可以在 [https://github.com/Zilliqa/gozilliqa-sdk](https://github.com/Zilliqa/gozilliqa-sdk) 找到 github 仓库

## 发行版本

gozilliqa 的所有版本都可以在 [https://github.com/Zilliqa/gozilliqa-sdk/releases](https://github.com/Zilliqa/gozilliqa-sdk/releases) 找到

## 获取 gozilliqa

运行以下命令将仓库克隆到本地计算机
```
git clone https://github.com/Zilliqa/gozilliqa-sdk.git
```

> 如果你希望使用发布版本，请将您的分支切换到特定的发布版本。 你可以在 [https://github.com/Zilliqa/gozilliqa-sdk/releases](https://github.com/Zilliqa/gozilliqa-sdk/releases) 找到有关发布的更多信息

## 安装

这个 SDK 使用 `go mod` 来管理它的依赖库，所以如果你确实想处理这个仓库的源代码，请确保你有支持 `go mod` 的最小 `golang` 版本并启用它。

安装依赖库：

```go
go get ./...
```

SDK 本身不能内置到二进制文件中，因为它不包含任何 `main` 函数，你可以将其作为库直接添加到你自己的项目中。 此外，我们建议你在开始使用此 SDK 之前，可以先运行 `golang uint test` 或先阅读 `quick start` 部分以获得基本的了解。

## 方法和 API

##### 账户 API

- fromFile
- toFile
- newHDAccount (with default derivation path "m/44'/313'/0'/0/${index}")
- newHDAccountWithDerivationPath

##### 钱包 API

- createAccount
- addByPrivateKey addByKeyStore
- remove
- setDefault
- signTransaction (default account)
- signTransactionWith (specific account)

##### TransactionFactory 交易

- sendTransaction
- trackTx
- confirm
- isPending isInitialised isConfirmed isRejected

##### ContractFactory 合约

- deploy
- call
- isInitialised isDeployed isRejected
- getState
- getAddressForContract


##### 加密 API

- getDerivedKey (PBKDF2 and Scrypt)
- generatePrivateKey
- Schnorr.sign
- Schnorr.verify
- getPublicKeyFromPrivateKey
- getAddressFromPublicKey
- getAddressFromPrivateKey
- encryptPrivateKey
- decryptPrivateKey

##### JSON-RPC API

区块链相关方法

- getNetworkId
- getBlockchainInfo
- getShardingStructure
- getDsBlock
- getLatestDsBlock
- getNumDSBlocks
- getDSBlockRate
- getDSBlockListing
- getTxBlock
- getLatestTxBlock
- getNumTxBlocks
- getTxBlockRate
- getTxBlockListing
- getNumTransactions
- getTransactionRate
- getCurrentMiniEpoch
- getCurrentDSEpoch
- getPrevDifficulty
- getPrevDSDifficulty

交易相关方法

- createTransaction
- getTransaction
- getRecentTransactions
- getTransactionsForTxBlock
- getNumTxnsTxEpoch
- getNumTxnsDSEpoch
- getMinimumGasPrice

合约相关方法

- getSmartContractCode
- getSmartContractInit
- getSmartContractState
- getSmartContracts
- getContractAddressFromTransactionID

账户相关方法

- getBalance

##### 验证

- isAddress
- isPublicjKey
- isPrivateKey
- isSignature

##### 实用程序

- byteArrayToHexString
- hexStringToByteArray
- generateMac
- isByteString
- encodeTransactionProto
- toChecksumAddress
- isValidChecksumAddress
- bech32 encode decode
- isBech32
- fromBech32Address toBech32Address




## 演示
在 [ZRC-2 钱包仓库](https://github.com/arnavvohra/dev-portal-examples/tree/master/zrc-2-wallet) 中可以找到 zilliqa-js 方法的 Golang 代码


##### 从密钥库文件解密私钥

```go
func TestKeystore_DecryptPrivateKey(t *testing.T) {
	json := "{\"address\":\"b5c2cdd79c37209c3cb59e04b7c4062a8f5d5271\",\"id\":\"979daaf9-daf1-4002-8656-3cea134c9518\",\"version\":3,\"crypto\":{\"cipher\":\"aes-128-ctr\",\"ciphertext\":\"26be10cdae0f397bdeead38e7fcc179957dd5e7ef95a1f0f53f37b7ad1355159\",\"kdf\":\"pbkdf2\",\"mac\":\"81d8e60bc08237e4ba154c0b27ad08562821d8c602ee8a492434128de48b66bc\",\"cipherparams\":{\"iv\":\"fc714ad6267c35a2df4cb3f8b8b3cc0d\"},\"kdfparams\":{\"n\":8192,\"c\":262144,\"r\":8,\"p\":1,\"dklen\":32,\"salt\":\"e22ef8a67a59299cee1532b6c6967bdfb0e75ca3c5dff852f9d8daa04683b0c1\"}}}"

	ks := NewDefaultKeystore()
	privateKey, err := ks.DecryptPrivateKey(json, "xiaohuo")
	if err != nil {
		t.Error(err.Error())
	} else {
		if strings.Compare(strings.ToLower(privateKey), "24180e6b0c3021aedb8f5a86f75276ee6fc7ff46e67e98e716728326102e91c9") != 0 {
			t.Error("decrypt private key failed")
		}
	}
}
```
#### 获取用户的 $Zil 余额

```go
func TestGetBalance() {
    provider := NewProvider("https://dev-api.zilliqa.com/")
    response := provider.GetBalance("9bfec715a6bd658fcb62b0f8cc9bfa2ade71434a")
    result, _ := json.Marshal(response)
    fmt.Println(string(result))
}
```

##### 发送转账交易

```go
func TestSendTransaction(t *testing.T) {
	if os.Getenv("CI") != "" {
		t.Skip("Skipping testing in CI environment")
	}
	wallet := NewWallet()
	wallet.AddByPrivateKey("e19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930")
	provider := provider2.NewProvider("https://dev-api.zilliqa.com/")

	gasPrice, err := provider.GetMinimumGasPrice()
	assert.Nil(t, err, err)

	tx := &transaction.Transaction{
		Version:      strconv.FormatInt(int64(util.Pack(333, 1)), 10),
		SenderPubKey: "0246E7178DC8253201101E18FD6F6EB9972451D121FC57AA2A06DD5C111E58DC6A",
		ToAddr:       "4BAF5faDA8e5Db92C3d3242618c5B47133AE003C",
		Amount:       "10000000",
		GasPrice:     gasPrice,
		GasLimit:     "50",
		Code:         "",
		Data:         "",
		Priority:     false,
	}

	err2 := wallet.Sign(tx, *provider)
	assert.Nil(t, err2, err2)

	rsp, err3 := provider.CreateTransaction(tx.ToTransactionPayload())
	assert.Nil(t, err3, err3)
	assert.Nil(t, rsp.Error, rsp.Error)

	resMap := rsp.Result.(map[string]interface{})
	hash := resMap["TranID"].(string)
	fmt.Printf("hash is %s\n", hash)
	tx.Confirm(hash, 1000, 3, provider)
	assert.True(t, tx.Status == core.Confirmed)
}
```

