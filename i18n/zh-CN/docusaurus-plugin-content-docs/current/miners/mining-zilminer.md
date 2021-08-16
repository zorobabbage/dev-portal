---
id: mining-zilminer
title: 为矿机运行 ZILMiner
keywords: 
- mining steps
- driver setup for zilminer
- mining rigs
- zilminer
- zilliqa	
description: Running ZILMiner for Mining Rigs
---

---
## 硬件要求

[**ZilMiner**](https://github.com/DurianStallSingapore/ZILMiner) 软件在 Ubuntu 和 Windows 操作系统上都得到官方支持。

Zilliqa PoW 过程支持 **AMD**（使用 OpenCL）和 **Nvidia**（使用 OpenCL 或 CUDA）GPU。

运行 **ZilMiners** 的**最低**要求是：
- x64 操作系统（Ubuntu 或 Windows）
- 双核处理器或更高版本
- 4GB DDR3 内存或更高版本
- 任何具有至少 2 GB RAM 的 GPU

## ZilMiner 的 GPU 驱动程序设置

### OpenCL 驱动程序设置（适用于 AMD/Nvidia GPU）

如果你希望将 OpenCL 支持的 GPU 用于 PoW，请运行以下命令来安装 OpenCL 开发包：

   ```shell
   sudo apt install ocl-icd-opencl-dev
   ```

你可能需要重新启动 PC 才能使安装生效。 重新启动后，使用以下命令检查你的驱动程序是否正确安装：

   ```shell
   clinfo
   ```

### CUDA 驱动程序设置（仅适用于 Nvidia GPU）

如果你希望使用支持 CUDA 的 GPU 进行 PoW，请从 [**NVIDIA 官方网页**](https://developer.nvidia.com/cuda-downloads) 下载并安装 CUDA 软件包。 你可能需要重新启动 PC 才能使安装生效。

## 挖矿步骤

1. 在你的 GPU 设备上安装 **ZilMiner**：

     - **对于 Windows 操作系统：** [**在此处下载最新版本**](https://github.com/DurianStallSingapore/ZILMiner/releases/)
     - **对于 Ubuntu 操作系统：** [**在此处下载最新版本**](https://github.com/DurianStallSingapore/ZILMiner/releases/)

2. 使用以下命令在 GPU 设备上设置 **ZilMiner**：

    ```shell
    zilminer -P zil://wallet_address.worker_name@zil_node_ip:get_work_port
    ```
:::note
你必须相应地更改 *wallet_address*、*worker_name*、*zil_node_ip* 和 *get_work_port*。
:::

- 对于 `wallet_address`：你可以输入任意 Zilliqa 地址。 这仅是矿池主用于记帐目的。 如果是单人挖矿，可以忽略这个参数。
     - 对于 `worker_name`：你可以输入任何你想要的任意工人名称。
     - 对于 `zil_node_ip`：请输入运行 Zilliqa 客户端的 CPU 节点的 IP 地址。
     - 对于 `get_work_port`：请输入`GETWORK_SERVER_PORT` 中使用的端口。 默认值为 `4202`。

## 停止挖矿过程

要停止挖矿，你需要终止 GPU 设备上的 **ZilMiner** 进程。
