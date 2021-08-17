---
id: exchange-ip-whitelisting
title: IP 白名单 
keywords:
- exchanges
- docker setup
- zilliqa
description: Run seed node in IP Whitelisting mode. 
---

在 IP 白名单模式下，区块链数据每隔一段时间直接推送到交易所。 交易所 IP 地址必须由 Zilliqa Research 列入白名单才能接收这些数据广播。

## 准备机器

在开始之前，请确保已完成以下步骤。
1. 选择并记下你希望为种子节点保留的端口，此端口接收传入的区块链数据。
2. 与 Zilliqa 支持团队共享节点的静态 IP 地址和端口以进行白名单。 此步骤至关重要，因为未能提供正确的 IP 和端口将导致无法接收区块链数据。 静态 IP 地址和选择的端口必须以 KYC 形式与 Zilliqa 团队共享。

:::important
选择的端口必须对入站连接开放。 否则，种子节点将无法访问。
:::

### Docker 设置

我们强烈建议使用 [Docker](https://docker.com) 来设置种子节点，因为我们提供了一个经过测试的、可用于生产的镜像供你使用。 如果你还没有设置 docker，请按照 [官方文档](https://docs.docker.com/install/) 上的说明进行操作。

设置 Docker 后，你可以继续下载主网的配置 tarball：

```sh
# create a directory
$ mkdir my_seed && cd my_seed
# download the seed node configuration files
$ curl -O https://mainnet-join.zilliqa.com/seed-configuration.tar.gz
$ tar -zxvf seed-configuration.tar.gz

# Contents:
#
# launch.sh
# constants.xml
# launch_docker.sh
# dsnodes.xml
# config.xml
```

### 本机设置

:::note
此方法已在 **Ubuntu 18.04** 上进行了测试，涉及编译 C++。 我们强烈建议你考虑使用上面提供的 Docker 镜像。
:::

如果你不能或不想使用 Docker，你也可以从源代码构建 Zilliqa 二进制文件并按原样运行它。

```sh
# clone Zilliqa source files
$ git clone https://github.com/Zilliqa/Zilliqa.git && cd Zilliqa && git checkout
tags/<tag_id>

# install system dependencies
$ sudo apt-get update && sudo apt-get install \
    git \
    libboost-system-dev \
    libboost-filesystem-dev \
    libboost-test-dev \
    libssl-dev \
    libleveldb-dev \
    libjsoncpp-dev \
    libsnappy-dev \
    cmake \
    libmicrohttpd-dev \
    libjsonrpccpp-dev \
    build-essential \
    pkg-config \
    libevent-dev \
    libminiupnpc-dev \
    libcurl4-openssl-dev \
    libboost-program-options-dev \
    libboost-python-dev \
    python3-dev         \
    python3-setuptools  \
    python3-pip         \
    gawk

# Run the following to install latest version of cmake.
# We suggest to install cmake 3.19 or any version >=3.16:
wget https://github.com/Kitware/CMake/releases/download/v3.19.3/cmake-3.19.3-Linux-x86_64.sh
mkdir -p "${HOME}"/.local
bash ./cmake-3.19.3-Linux-x86_64.sh --skip-license --prefix="${HOME}"/.local/
export PATH=$HOME/.local/bin:$PATH
cmake --version
rm cmake-3.19.3-Linux-x86_64.sh

$ export LC_ALL=C
$ pip3 install requests clint futures

# build the binary. this may take a while.
$ ./build.sh
```

构建退出时，应该没有错误。 完成后，下载配置 tarball：

```sh
# make a separate folder for keys and configuration
$ cd ../ && mkdir my_seed && cd my_seed
# download the seed node configuration files
$ curl -O https://mainnet-join.zilliqa.com/seed-configuration.tar.gz
$ tar -zxvf seed-configuration.tar.gz

# Contents:
#
# launch.sh
# constants.xml
# launch_docker.sh
# dsnodes.xml
# config.xml
```

## 配置节点

节点需要一些配置才能成功加入网络。 大多数配置包含在 `constants.xml` 中，它应该在我们提取 `seed-configuration.tar.gz` 的目录中。 至少需要进行以下更改：

- 如果你的种子节点支持 websockets，请将 `ENABLE_WEBSOCKET` 的值更改为 `true`（请参阅 [Zilliqa Websocket 服务器](https://github.com/Zilliqa/dev-portal/tree/master/docs/api-websocket.md) 文档）。

## 加入网络

:::note
在继续此步骤之前，请确保你已完成必要的 KYC（针对个人）。
:::

一旦完成了初始步骤，加入网络就相对简单了。

```sh
# NOTE: run only ONE of the following.
# for Docker setup
$ ./launch_docker.sh
# for native setup
$ ./launch.sh
```

你会被问到一系列问题。 当要求输入你的 IP 地址和侦听端口时，请输入你在提交 KYC 表单时提供给我们的值。 这很重要，因为会因为匹配不到你提交的值而导致你的节点 ** 无法工作**。

下面提供了启动时要遵循的示例说明。

- 启动 _docker.sh

```sh
$ ./launch_docker.sh
Assign a name to your container (default: zilliqa): <container_name>
Enter your IP address ('NAT' or *.*.*.*): <static ip address>
Enter your listening port (default: 33133): <33133 or other selected port>
Use IP whitelisting registration approach (default: Y): Y
```

- launch.sh

```sh
$ ./launch.sh
Enter the full path of your zilliqa source code directory: <zilliqa code directory path>
Enter the full path for persistence storage (default: current working directory): <default or custom path>
Enter your IP address ('NAT' or *.*.*.*): <static ip address>
Enter your listening port (default: 33133): <33133 or other selected port>
Use IP whitelisting registration approach (default: Y): Y
```

## 下一步

如果你已成功完成上述步骤，你应该有一个正常运行的种子节点了，它在 `localhost:4201` 上公开了一个 RPC API。 你可以进一步检查 `zilliqa-00001-log.txt` 中的日志。

本系列的以下文章将演示一组简单的函数，这些函数可用作交易所开发人员围绕 Zilliqa 区块链实现自己的自定义业务逻辑的起点。 你可以在 [仓库](https://github.com/Zilliqa/dev-portal/tree/master/examples/exchange) 中找到示例应用程序的完整源代码。