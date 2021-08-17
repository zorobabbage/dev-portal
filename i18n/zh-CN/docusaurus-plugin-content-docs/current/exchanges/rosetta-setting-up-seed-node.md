---
id: rosetta-setting-up-seed-node
title: 使用种子节点设置 Zilliqa Rosetta
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- rosetta
- setup
- seed
- node
description: Setting up Zilliqa Rosetta with Seed node
---

---

## 设置
:::info
请注意，操作 Zilliqa 种子节点需要白名单。 目前，白名单是根据具体情况授予的，通常是出于支持交易所基础设施等原因。
:::

### 第 1 步：从 https://github.com/Zilliqa/zilliqa-rosetta/releases 下载 `Zilliqa-rosetta` 最新版本。

### 第 2 步：从 Zilliqa 和 Scilla 源代码构建 `Zilliqa-rosetta` Docker 镜像
```bash
sh ./build_docker.sh
```
如果你需要使用特定的 Zilliqa 和 Scilla 版本构建 `Zilliqa-rosetta`，可以使用以下命令
```bash
docker build \
--build-arg ROSETTA_COMMIT_OR_TAG=<ROSETTA_TAG> \
--build-arg SCILLA_COMMIT_OR_TAG=<SCILLA_TAG> \
--build-arg COMMIT_OR_TAG=<ZILLIQA_TAG> \
-t rosetta:1.0 .
```
请注意编译 Zilliqa 和 Scilla 可能需要一些时间。

### 第 3 步：为 `Zilliqa-rosetta` 创建 `config.yaml`。 我们还提供了 [测试网](https://github.com/Zilliqa/zilliqa-rosetta/blob/master/testnet.config.local.yaml) 和 [主网](https://github.com/Zilliqa/zilliqa-rosetta/blob/master/mainnet.config.local.yaml) 配置。

### 第 4 步：生成白名单的 keypair（只针对公钥白名单方式）
如果你使用公钥白名单方法并希望生成密钥对，可以执行以下操作
```bash
mkdir secrets

docker run --rm \
--env GENKEYPAIR="true" \
rosetta:1.0 > secrets/mykey.txt
```
请记住将你的公钥通知 Zilliqa 团队，以便用于白名单

### 第 5 步：运行 `Zilliqa-rosetta`
```bash
docker run -d \
--env BLOCKCHAIN_NETWORK="<NETWORK_TO_USE>" \
--env IP_ADDRESS="<SEED_NODE_HOST_IP>" \
--env MULTIPLIER_SYNC="<Y_or_N>" \
--env SEED_PRIVATE_KEY="<SEED_PRIVATE_KEY>" \
--env TESTNET_NAME="<NAME_OF_THE_TESTNET>" \
--env BUCKET_NAME="<NAME_OF_THE_PERSISTENCE_BUCKET>" \
-v $(pwd)/secrets/mykey.txt:/run/zilliqa/mykey.txt \
-p 4201:4201 -p 4301:4301 -p 4501:4501 -p 33133:33133 -p 8080:8080 \
--name rosetta rosetta:1.0
```
| 变量 | 描述 |
| -------- | ----------- |
| `NETWORK_TO_USE` | `测试网` or `主网` |
| `SEED_NODE_HOST_IP` | Zilliqa 种子节点的公共 IP |
| `SEED_PRIVATE_KEY` | 列入白名单的密钥对的私钥。 可选字段 |
| `NAME_OF_THE_TESTNET` | 参考 [`network meta`](https://github.com/Zilliqa/zilliqa-rosetta/blob/master/network_meta.md)|
| `NAME_OF_THE_PERSISTENCE_BUCKET` | 参考 [`network meta`](https://github.com/Zilliqa/zilliqa-rosetta/blob/master/network_meta.md) |

## 维护
### 重启 Zilliqa Rosetta
```bash
docker stop <container name>
docker start <container name>
```