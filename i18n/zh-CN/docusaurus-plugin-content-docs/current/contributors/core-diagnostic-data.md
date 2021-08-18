---
id: core-diagnostic-data
title: 诊断数据
keywords: 
- core
- diagnostic
description: Core protocol design - diagnostic data.
---

---
## 诊断数据

我们在 LevelDB 中存储了数量有限的一些有关网络的操作数据，这些数据旨在用于诊断任何主网的问题。

在全局范围内，存储的数据量由常量`MAX_ENTRIES_FOR_DIAGNOSTIC_DATA` 控制，该常量通常设置为 25 或 50。

这是为诊断目的存储的当前数据：

|LevelDB 位置 |数据存储 |存储时序 |数据提取工具|
|---------------------------|--------------------------------|-------------------|------------------------|
|persistence/diagnosticNodes|DS 和分片对等体            |每一个空纪元|getnetworkhistory       |
|persistence/diagnosticCoinb|Coinbase 的价值和分布|每个 DS 区块     |getrewardhistory        |

要使用诊断工具：

1. 确保你的当前目录中有一个 `persistence` 子文件夹
2. 确保 `persistence/diagnosticNodes` 和 `persistence/diagnosticCoinb` 包含你要提取的数据
3. 运行 `getnetworkhistory <输出 CSV 文件的名称>` 或 `getrewardhistory <输出 CSV 文件的名称>` 
4. 输出 CSV 文件将出现在当前目录中。 使用 Excel 或 LibreOffice Calc 打开它