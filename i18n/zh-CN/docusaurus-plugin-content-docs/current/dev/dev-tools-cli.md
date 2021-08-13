---
id: dev-tools-cli
title: CLI-工具集
keywords: 
- cli tools
- go-zli
- zilliqa
description: Zilliqa CLI Tools
---

---

## go-zli

[zli](https://github.com/Zilliqa/zli) 是一个基于 Zilliqa [Golang SDK](https://github.com/Zilliqa/gozilliqa-sdk) 的命令行工具。

## 源代码

Github 仓库可以在 [https://github.com/Zilliqa/zli](https://github.com/Zilliqa/zli) 找到

## 获取 zli
运行以下命令将仓库克隆到本地计算机
```bash
git clone https://github.com/Zilliqa/zli.git
```

### 安装

#### 构建

运行以下命令以生成 `zli` 二进制文件：

```go
go build -o zli main/main.go
```

#### 安装

选项 1：通过在构建期间指定输出路径来安装 `zli` 二进制文件：

```go
go build -o $GOPATH/bin/zli main/main.go
```

选项 2：运行安装脚本：

```bash
sh install.sh
```

### 命令

运行 `zli -h` 以查看帮助消息以及可用命令列表：

```bash
A convenient command-line tool to generate accounts, run integration testings or run http server .etc
Usage:
  zli [flags]
  zli [command]
Available Commands:
  account     Generate or load multiple accounts
  contract    Deploy or call zilliqa smart contract
  help        Help about any command
  rpc         readonly json rpc of zilliqa
  transfer    Transfer zilliqa token to a specific account
  version     Print the version number of zli
  wallet      Init a new wallet or get exist wallet info
Flags:
  -h, --help   help for zli
Use "zli [command] --help" for more information about a command.
```

`zli` 的工作原理是将帐户信息存储在 `~/.zilliqa` 中的钱包配置文件中。

运行 `zli [command] --help` 以查看每个可用命令的使用详细信息。下面是一些常用的命令：

#### 钱包

* `zli wallet init`：生成一个新的钱包（配置文件）供 `zli` 使用。在钱包内创建一个默认帐户（使用随机生成的私钥）。
* `zli wallet echo`：打印出钱包的内容（即配置文件）。
* `zli wallet from [flags]`：从特定私钥生成新钱包。

#### 合约

* `zli contract deploy [flags]`：部署一个新合约。
* `zli contract call [flags]`：调用现有合约。
* `zli contract state [flags]`：获取特定智能合约的状态数据。

#### 帐户

* `zli account generate [flags]`：生成随机私钥。

#### 转移

* `zli transfer [flags]`：将 Zilliqa 代币转移到特定账户。

### RPC

* `zli rpc transaction [flags]`：获取特定交易 ID 的详细交易信息。

### 例子

#### 在一个小合约上执行极端情况测试

1.通过运行 `zli wallet init` 或 `zli wallet from -p [private_key]` 准备钱包（配置文件 `~/.zilliqa`）：

```json
{
	"api": "https://ipc-ud-api.dev.z7a.xyz",
	"chain_id": 2,
	"default_account": {
		"private_key": "227159779c78c9a920cba73086cf73fb3ee15cdd95380aa3b93757669e345300",
		"public_key": "0324cdd72db3de0e9f570d550631438d581056fb0d9c4daddbad2928eaf49f54ee",
		"address": "31f33d13ad6aa724cde1f3d12d75fb344a1df9de",
		"bech_32_address": "zil1x8en6yadd2njfn0p70gj6a0mx39pm7w7lz3kpm"
	},
	"accounts": [{
		"private_key": "227159779c78c9a920cba73086cf73fb3ee15cdd95380aa3b93757669e345300",
		"public_key": "0324cdd72db3de0e9f570d550631438d581056fb0d9c4daddbad2928eaf49f54ee",
		"address": "31f33d13ad6aa724cde1f3d12d75fb344a1df9de",
		"bech_32_address": "zil1x8en6yadd2njfn0p70gj6a0mx39pm7w7lz3kpm"
	}]
}
```

2. 通过运行 `sh scripts/deploy-tiny-contract.sh` 来部署一个小合约

3. 运行 `zli testsuit tiny -a [contract_address]` 或 `sh scripts/test-tiny-contract.sh` 来执行测试。 如果任何交易的接收返回 `false`，则执行停止并中止剩余的测试。

#### 调用合约

1. 准备好与上例类似的钱包。

2. 运行以下命令调用智能合约：

```bash
zli contract call -a <smart contract address> -t <transition name> -r <parameter>
```

例如：

```bash
zli contract call -a 305d5b3acaa2f4a56b5e149400466c58194e695f -t SubmitTransaction -r "[{\"vname\":\"recipient\",\"type\":\"ByStr20\",\"value\":\"0x381f4008505e940ad7681ec3468a719060caf796\"},{\"vname\":\"amount\",\"type\":\"Uint128\",\"value\":\"10\"},{\"vname\":\"tag\",\"type\":\"String\",\"value\":\"a\"}]"
```

:::note
`zli` 支持将私钥作为参数传递给 `zli contract deploy` 或 `zli contract call` 命令。 只需使用 `-k [private key]` 选项切换到不同的私钥来发送交易。
:::

#### 在 Docker 容器中运行 zli

将 `zli` 作为本地二进制文件运行的另一种方法是构建（或下载）`go-zli` Docker 镜像，并从容器内部运行 `zli`。 此选项需要事先安装 Docker（请参阅 [Docker 安装页面](https://docs.docker.com/install/)）。

1. 构建 `go-zli` Docker 镜像：

```bash
sh build_docker_image.sh
```

2. 在容器环境中运行 `zli`：

```bash
docker run --rm -it -v ~/contract:/contract docker.pkg.github.com/zilliqa/zli/zli bash
```