---
id: rosetta-setting-up-no-seed-node
title: 设置 Zilliqa Rosetta 连接到公共 API 端点
keywords: 
- rosetta
- middleware
- exchanges
- zilliqa
- rosetta
- setup
- public
- api
- endpoint
- standalone
description: Setting up Zilliqa Rosetta connecting to public API endpoint
---

---

Zilliqa rosetta Standalone 提供了连接到公共种子节点服务的选项，例如 `api.zilliqa.com` 和 `dev-api.zilliqa.com`，而不是在你那边运行种子节点。

## 设置
### 第 1 步：从 https://github.com/Zilliqa/zilliqa-rosetta/releases 下载 `Zilliqa-rosetta` 最新版本。

### 第 2 步：构建 `Zilliqa-rosetta Standalone` Docker 镜像

#### 使用最新版本的 Zilliqa rosetta 运行
```bash
cd rosetta_standalone
sh ./build_standalone.sh .sh
```

#### 使用特定版本的 Zilliqa rosetta 运行
```bash
docker build \
--build-arg ROSETTA_COMMIT_OR_TAG=<ROSETTA_TAG> \
-f rosetta_standalone/Dockerfile_standalone
-t rosetta_standalone:1.0 .
```

### 第 3 步：配置 `Zilliqa-rosetta`（可选）
默认情况下，Zilliqa-rosetta Standalone 将连接到 Zilliqa 测试网和主网的公共端点。

如果你需要连接到其他 Zilliqa 端点，可以编辑 `Zilliqa-rosetta` 配置 yaml。 格式如下：

```yaml
* rosetta:
  * host: rosetta restful api host
  * port: resetta restful api port
  * version: rosetta sdk version
  * middleware_version: middleware version
* networks:
  * <network_name>:
    * api: api endpoint of mainnet
    * chain_id: chain id of mainnet
    * node_version: zilliqa node verion
  * <network_name>:
    * api: api endpoint of mainnet
    * chain_id: chain id of mainnet
    * node_version: zilliqa node verion
```

Zilliqa 测试网和主网组合的默认配置文件已包含在 Rosetta 根目录中。

| 网络 | 配置文件 |
| ------- | ----------- |
| 测试网, 主网 | `config.local.yaml` |

### 第 4 步：运行`Zilliqa-rosetta`

#### 使用默认配置独立运行 Zilliqa rosetta
```bash
run_standalone.sh
```

#### 使用自定义配置独立运行 Zilliqa rosetta
```bash
docker run -d -p 8080:8080 -v <absolute directory of config.local.yaml>:/rosetta/config.local.yaml --name rosetta_standalone rosetta_standalone:1.0
```


## 维护
### 重启 Zilliqa Rosetta
```bash
docker stop <container name>
docker start <container name>
```
