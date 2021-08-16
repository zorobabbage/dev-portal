---
id: mining-zilclient
title: 运行 Zilliqa 客户端
keywords: 
- mining steps
- client setup
- zilclient
- zilliqa	
description: Running the Zilliqa Client Mining
---

---
## Hardware Requirements

[**Zilliqa 客户端**](https://github.com/Zilliqa/zilliqa) 在 Ubuntu 18.04 操作系统上得到官方支持。

运行 **Zilliqa 客户端** 的**最低**要求是：
- x64 Linux 操作系统（例如 Ubuntu 18.04.5）
- 最新的双核处理器 @ 2.2 GHZ。 如：Intel Xeon (Skylake)
- 4GB DRR3 RAM 或更高版本
- NAT 环境 **或者** 公共静态 IP 地址
- 任何具有至少 2 GB RAM 的 GPU
- 100MB/s 上传下载带宽

:::info
目前网络的哈希率非常高。 单个 GPU 是不够的。 你需要设置 [挖矿代理](mining-proxy.mdx) 连接到多个 GPU。
:::

## Zilliqa 客户端的网络设置

:::note
如果你使用的是家用路由器，那么你很可能处于 NAT 环境中。
:::

If you are in a NAT environment, you can either:

- Do single port forwarding using **Option 1a**. This should be your **DEFAULT OPTION**.
- Enable UPnP mode using **Option 1b** if your router does support UPnP.

If you have a public IP address, you can skip this network setup section entirely.

### 选项 1a

端口转发到端口 `33133`，用于外部端口（端口范围）和内部端口（本地端口）。 端口转发时，你还必须在路由器菜单中为 TCP 和 UDP 协议选项选择 **BOTH**。 <br/>可以在 [**此处**](https://www.linksys.com/us/support-article?articleNum=136711) 找到此过程的示例。 端口转发后，你可以使用此 [**Open Port Check Tool**](https://www.yougetsignal.com/tools/open-ports/) 检查是否成功进行了端口转发。

### 选项 1b

在你的家庭路由器上启用 UPnP 模式。 请搜索如何访问你的家庭路由器设置以启用 UPnP，可以 [**在这**](https://routerguide.net/how-to-enable-upnp-for-rt-ac66u/) 找到示例。 你可以通过安装以下工具来检查是否已启用 UPnP：
   ```shell
   sudo apt-get install miniupnpc
   ```
然后在命令行中输入以下内容：
   ```shell
   upnpc -s
   ```
你应该收到一条消息，显示如下：

   - "List of UPNP devices found on the network : ..."
   - **或者** "No IGD UPnP Device found on the network !".

第一条消息表示 UPnP 模式已成功启用，而后者则表示 UPnP 模式启用失败。 如果你收到后一条消息，请继续使用 [**选项 1a**](#option-1a)。

## 挖矿步骤

1. 按照 [**这里**](http://releases.ubuntu.com/bionic/) 的说明创建一个安装了 Ubuntu 18.04 操作系统的本地或远程 CPU 节点实例。

2. 按照 [**这里**](https://docs.docker.com/install/linux/docker-ce/ubuntu/) 的说明在你的 CPU 节点实例上安装 Docker CE for Ubuntu。

3. 在你的桌面上创建一个新目录并将目录更改为：

    ```shell
    cd ~/Desktop && mkdir join && cd join
    ```

4. 获取加入配置文件：

    ```shell
    wget https://mainnet-join.zilliqa.com/configuration.tar.gz
    tar zxvf configuration.tar.gz
    ```

5. 在命令提示符中找出你当前的 IP 地址并记录下来：

    ```shell
    curl https://ipinfo.io/ip
    ```

:::note
如果你是在 NAT 环境中，请参考前面的章节。
:::

6. 编辑配置文件夹中的 _constant.xml_ 文件：

     * 将 `GETWORK_SERVER_MINE` 设置为 `true`。
     * 将 `GETWORK_SERVER_PORT` 设置为你将用于 GetWork 的端口。 （默认为 `4202`）
     * 将以下挖掘参数设置为 `false`：

        ```shell
        <CUDA_GPU_MINE>false</CUDA_GPU_MINE>
        <FULL_DATASET_MINE>false</FULL_DATASET_MINE>
        <OPENCL_GPU_MINE>false</OPENCL_GPU_MINE>
        <REMOTE_MINE>false</REMOTE_MINE>
        ```
        
7. 安装 python 依赖项：
    
    ```shell
    sudo apt install python-pip
    export LC_ALL=C
    pip install request requests clint futures
    ```

8. 在你的命令提示符中运行 shell 脚本以启动你的 docker 镜像：

    ```shell
    ./launch_docker.sh
    ```

9. 系统将提示你输入一些信息，如下所示：

    :::note
    **不要**使用不同端口的同一个 IP 地址来创建不同的 CPU 节点。 如果这样做了，你将被网络列入黑名单，因此无法获得任何奖励。
    :::

    - `Assign a name to your container (default: zilliqa):` <br/> [如果使用默认值按 **Enter** 跳过]

    - `Enter your IP address ('NAT' or *.*.*.*):` <br/> [请输入你在第 5 步中找到的 IP 地址**或** `NAT`（如果你选择 [选项 1b](mining-zil client#option-1b) 进行网络设置） ]

    - `Enter your listening port (default: 33133):` <br/> [如果使用默认值按 **Enter** 跳过]

## 监控进度

你现在是 Zilliqa 主网的矿工了。 你可以使用以下方法监控 CPU 节点上的进度：

```shell
tail -f zilliqa-00001-log.txt
```

## 检查你生成的密钥对

要检查 _mykey.txt_ 文件中本地生成的公钥和私钥对，你可以在 CPU 节点的命令提示符中输入以下内容：

```shell
less mykey.txt
```

第一个十六进制字符串是你的 **公钥**，第二个十六进制字符串是你的 **私钥**。

:::note
此密钥对在你的磁盘上本地生成。 请记住将你的私钥保存在安全的地方！
:::

## 检查你的 $ZIL 余额

要查看你的挖矿余额，请在 https://viewblock.io/zilliqa 的搜索栏中输入位于你的 _myaddr.txt_ 文件中的地址：

```shell
less myaddr.txt
```

## 停止挖矿过程

要停止挖矿客户端，请停止在 CPU 节点上运行 **Zilliqa 客户端** 的 docker 容器：

```shell
sudo docker stop zilliqa
```