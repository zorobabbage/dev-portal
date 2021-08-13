---
id: dev-tools-java
title: laksaj - java sdk
keywords: 
- sdk
- java
- laksaj
- installation
- apis
- exmample
- zilliqa
description: Zilliqa Java SDK LaksaJ
---

---


## 源代码

Github 仓库可以在 [https://github.com/FireStack-Lab/LaksaJ](https://github.com/FireStack-Lab/LaksaJ) 找到

## 入门（安装和软件包说明）

你可以使用 Maven、Gradle 或手动构建 `jar` 文件来开始安装。

## Maven
```xml
<dependency>
  <groupId>org.firestack</groupId>
  <artifactId>laksaj</artifactId>
  <version>1.0.5-RELEASE</version>
</dependency>
```

## Gradle

```groovy

dependencies {
    compile group: 'org.firestack', name: 'laksaj', version: '1.0.5-RELEASE'
}

```

## 手动构建 Jar 文件

首先克隆 `laksaj` 仓库
```bash
git clone https://github.com/FireStack-Lab/LaksaJ.git
```

接下来，使用以下命令构建 `jar`

```
gradle build -x test
```

## 方法和 API

### 账户 API

- fromFile
- toFile

### 钱包 API

- createAccount
- addByPrivateKey addByKeyStore
- remove
- setDefault
- signTransaction (default account)
- signTransactionWith (specific account)

### TransactionFactory 交易

- sendTransaction
- trackTx
- confirm
- isPending isInitialised isConfirmed isRejected

### ContractFactory 合约

- deploy
- call
- isInitialised isDeployed isRejected
- getState
- getAddressForContract


### 加密 API

- getDerivedKey (PBKDF2 and Scrypt)
- generatePrivateKey
- Schnorr.sign
- Schnorr.verify
- getPublicKeyFromPrivateKey
- getPublicKeyFromPrivateKey
- getAddressFromPublicKey
- getAddressFromPrivateKey
- encryptPrivateKey
- decryptPrivateKey

### JSON-RPC API

#### 区块链相关方法

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

#### 交易相关方法

- createTransaction
- getTransaction
- getRecentTransactions
- getTransactionsForTxBlock
- getNumTxnsTxEpoch
- getNumTxnsDSEpoch
- getMinimumGasPrice

#### 合约相关方法

- getSmartContractCode
- getSmartContractInit
- getSmartContractState
- getSmartContracts
- getContractAddressFromTransactionID

#### 账户相关方法

- getBalance

### 验证

- isAddress
- isPublicjKey
- isPrivateKey
- isSignature

### 实用程序

- byteArrayToHexString
- hexStringToByteArray
- generateMac
- isByteString
- encodeTransactionProto
- toChecksumAddress
- isValidChecksumAddress
- base58.encode
- base58.decode
- isBase58
- bech32 encode decode
- fromBech32Address toBech32Address


## 演示

### 生成大量地址

```java

package com.firestack.example;

import com.firestack.laksaj.crypto.KeyTools;
import com.firestack.laksaj.utils.ByteUtil;
import org.web3j.crypto.ECKeyPair;

import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

public class GenerateAddress {
    //How to generate large amount of addresses
    public static void main(String[] args) throws InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchProviderException {
        int n = 0;
        while (n < 100) {
            System.out.println("--------------------------");
            System.out.println("generate nth keypair:");
            ECKeyPair keyPair = KeyTools.generateKeyPair();
            BigInteger privateInteger = keyPair.getPrivateKey();
            BigInteger publicInteger = keyPair.getPublicKey();
            System.out.println("private key is: " + privateInteger.toString(16));
            System.out.println("public key is: " + publicInteger.toString(16));
            System.out.println("address is: " + KeyTools.getAddressFromPublicKey(ByteUtil.byteArrayToHexString(publicInteger.toByteArray())));
        }
    }

```

### 验证地址

```java
package com.firestack.example;

import com.firestack.laksaj.utils.Validation;

public class ValidateAddress {
    public static void main(String[] args) {
        String address = "2624B9EA4B1CD740630F6BF2FEA82AAC0067070B";
        boolean isAddress = Validation.isAddress(address);
        System.out.println("is address: " + isAddress);
    }
}
```

### 验证校验和地址

```java
package com.firestack.example;

import com.firestack.laksaj.utils.Validation;

public class ValidChecksumAddress {
    public static void main(String[] args) {
        String checksumAddress = "0x4BAF5faDA8e5Db92C3d3242618c5B47133AE003C";
        boolean isChecksumAddress = Validation.isValidChecksumAddress(checksumAddress);
        System.out.println("is checksum address: " + isChecksumAddress);
    }
}
```

### 交易操作（构建交易、计算交易费用、序列化、签署交易、广播）

```java
package com.firestack.example;

import com.firestack.laksaj.account.Wallet;
import com.firestack.laksaj.contract.Contract;
import com.firestack.laksaj.contract.ContractFactory;
import com.firestack.laksaj.contract.DeployParams;
import com.firestack.laksaj.contract.Value;
import com.firestack.laksaj.jsonrpc.HttpProvider;
import com.firestack.laksaj.transaction.Transaction;
import com.firestack.laksaj.transaction.TransactionFactory;
import javafx.util.Pair;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import static com.firestack.laksaj.account.Wallet.pack;

public class TransactionOperation {
    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {
        Wallet wallet = new Wallet();
        String ptivateKey = "e19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930";
        // Populate the wallet with an account
        String address = wallet.addByPrivateKey(ptivateKey);
        System.out.println("address is: " + address);

        HttpProvider provider = new HttpProvider("https://api.zilliqa.com");
        //get balance
        HttpProvider.BalanceResult balanceResult = provider.getBalance(address);
        System.out.println("balance is: " + balanceResult.getBalance());

        //construct non-contract transaction
        Transaction transaction = Transaction.builder()
                .version(String.valueOf(pack(333, 1)))
                .toAddr("zil16jrfrs8vfdtc74yzhyy83je4s4c5sqrcasjlc4")
                .senderPubKey("0246e7178dc8253201101e18fd6f6eb9972451d121fc57aa2a06dd5c111e58dc6a")
                .amount("10000000")
                .gasPrice("2000000000")
                .gasLimit("50")
                .code("")
                .data("")
                .provider(new HttpProvider("https://api.zilliqa.com/"))
                .build();

        //sign transaction
        transaction = wallet.sign(transaction);
        System.out.println("signature is: " + transaction.getSignature());

        //broadcast transaction
        HttpProvider.CreateTxResult result = TransactionFactory.sendTransaction(transaction);
        System.out.println(result);

        //hello-world contract
        String code = "scilla_version 0\n" +
                "\n" +
                "    (* HelloWorld contract *)\n" +
                "\n" +
                "    import ListUtils\n" +
                "\n" +
                "    (***************************************************)\n" +
                "    (*               Associated library                *)\n" +
                "    (***************************************************)\n" +
                "    library HelloWorld\n" +
                "\n" +
                "    let one_msg =\n" +
                "      fun (msg : Message) =>\n" +
                "      let nil_msg = Nil {Message} in\n" +
                "      Cons {Message} msg nil_msg\n" +
                "\n" +
                "    let not_owner_code = Int32 1\n" +
                "    let set_hello_code = Int32 2\n" +
                "\n" +
                "    (***************************************************)\n" +
                "    (*             The contract definition             *)\n" +
                "    (***************************************************)\n" +
                "\n" +
                "    contract HelloWorld\n" +
                "    (owner: ByStr20)\n" +
                "\n" +
                "    field welcome_msg : String = \"\"\n" +
                "\n" +
                "    transition setHello (msg : String)\n" +
                "      is_owner = builtin eq owner _sender;\n" +
                "      match is_owner with\n" +
                "      | False =>\n" +
                "        msg = {_tag : \"TransactionOperation\"; _recipient : _sender; _amount : Uint128 0; code : not_owner_code};\n" +
                "        msgs = one_msg msg;\n" +
                "        send msgs\n" +
                "      | True =>\n" +
                "        welcome_msg := msg;\n" +
                "        msg = {_tag : \"TransactionOperation\"; _recipient : _sender; _amount : Uint128 0; code : set_hello_code};\n" +
                "        msgs = one_msg msg;\n" +
                "        send msgs\n" +
                "      end\n" +
                "    end\n" +
                "\n" +
                "\n" +
                "    transition getHello ()\n" +
                "        r <- welcome_msg;\n" +
                "        e = {_eventname: \"getHello()\"; msg: r};\n" +
                "        event e\n" +
                "    end";
        List<Value> init = Arrays.asList(Value.builder().vname("_scilla_version").type("Uint32").value("0").build(), Value.builder().vname("owner").type("ByStr20").value("0x9bfec715a6bd658fcb62b0f8cc9bfa2ade71434a").build());

        ContractFactory factory = ContractFactory.builder().provider(new HttpProvider("https://api.zilliqa.com/")).signer(wallet).build();
        Contract contract = factory.newContract(code, (Value[]) init.toArray(), "");
        DeployParams deployParams = DeployParams.builder().version(String.valueOf(pack(2, 8))).gasPrice("1000000000").gasLimit("10000").senderPubKey("0246e7178dc8253201101e18fd6f6eb9972451d121fc57aa2a06dd5c111e58dc6a").build();

        //deploy contract, this will take a while to track transaction util it has been confirmed or failed
        Pair<Transaction, Contract> deployResult = contract.deploy(deployParams, 300, 3);
        System.out.println("result is: " + deployResult);
        
        //calculate transaction fee
        String transactionFee = new BigInteger(deployResult.getKey().getReceipt().getCumulative_gas()).multiply(new BigInteger(deployResult.getKey().getGasPrice())).toString();
        System.out.println("transaction fee is: " + transactionFee);
    }
}

```

### 了解智能合约存款

```java

package com.firestack.example;

import com.firestack.laksaj.blockchain.Contract;
import com.firestack.laksaj.jsonrpc.HttpProvider;

import java.io.IOException;
import java.util.List;

public class SmartContractDeposit {
    public static void main(String[] args) throws IOException, InterruptedException {
        HttpProvider client = new HttpProvider("https://api.zilliqa.com/");
        String lastEpoch = client.getNumTxnsTxEpoch();
        List<Contract.State> lastStateList = client.getSmartContractState("D6606D02DFF929593312D8D0D36105E376F95AA0");

        System.out.println("last epoch is " + lastEpoch);
        System.out.println("last state:" + lastStateList);

        int n = 0;

        while (true) {
            String epoch = client.getNumTxnsTxEpoch();
            System.out.println(n + "th current epoch is: " + epoch);
            if (!lastEpoch.equals(epoch)) {
                System.out.println("epoch hash changed");
                List<Contract.State> stateList = client.getSmartContractState("D6606D02DFF929593312D8D0D36105E376F95AA0");
                System.out.println("last state: " + lastStateList);
                System.out.println("current state: " + stateList);
                lastEpoch = epoch;
                lastStateList = stateList;
            }
            Thread.sleep(3000);
            n += 1;
        }
    }
}

```