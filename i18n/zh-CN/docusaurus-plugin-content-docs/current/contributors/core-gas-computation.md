---
id: core-global-gas-price
title: 全局 Gas 价格
keywords: 
- gas 
- price
- computation
description: Core protocol design - computing global gas price.
---

---
每个矿工节点的 PoW 解决方案都带有节点愿意接受的提议的最低交易处理 gas 价格。在 DS 区块共识期间，DS 委员会运行一种算法来计算整个网络将运行的全局可接受的最低 gas 价格。然后 DS 委员会将商定的全局最低 gas 价格通知给分片、查找和种子（通过 DS 区块中的`m_gasPrice`）。网络将接受任何 gas 价格大于或等于最低 gas 价格的交易，并拒绝不符合的交易。

计算全局最低 gas 价格的算法考虑以下因素：

1. 过去 _n_ 个 DS 纪元使用的平均 `m_gasPrice`
2. 每个独立矿工为下一个 DS 纪元提出的 gas 价格的平均值（防止价格上涨是必要的）
3. 上一个 DS 纪元的网络拥塞趋势（即 Tx 区块中实际消耗的 gas）

本质上，该算法根据网络拥塞程度来决定 gas 价格：如果网络拥塞程度很高，那么矿工对 gas 价格有发言权；否则，最低 gas 价格不应过多依赖于他们提议的 gas 价格。

## 算法输入

| 全局参数 | 描述                                                |
|------------------------|-------------------------------------------------------------|
| `microblock_gas_limit` | 每个微块的 gas 限制                             |
| `num_shards`           | 网络中的分片数量，包括 DS 委员会 |
| `txblock_gas_limit`    | Tx 区块的 Gas 限制（为简单起见，使用 `num_shards x microblock_gas_limit`，尽管 DS 委员会与分片有不同的 Gas 限制值） |
| `default_min_gas_price` | gas 价格可以采取的最低值              |

| 来自当前 DS 纪元的数据 | 描述                                                |
|------------------------------|-------------------------------------------------------------|
| `num_nodes`                  | 网络中的节点数（包括 DS 委员会） |
| `proposed_min_price_node[i]` | 第 _i_ 个矿工节点提出的最低 gas 价格        |
 
| 来自最后 _n_ 个 DS 纪元的数据 | 描述                                                   |
|-------------------------------|------------------------------------------------------------------|
| `min_price_epoch[j]`          | 第 _j_ 个 DS 纪元中使用的全局最低 gas 价格值       |
| `consumed_gas_tx_block[j][k]` | 在第 _j_ 个 DS 纪元的第 _k_ 个 Tx 区块中消耗的 gas 总量 |

## 算法步骤

在下文中，我们将描述一种算法来计算下一个 DS 纪元的 `global_gas_price`。

1. 我们首先计算 `percentage_full_tx_blocks`，即在最后一个 DS 纪元中开采的 Tx 区块的数量，其中消耗的总 gas 至少为`txblock_gas_limit` 的 80%。 这个计算需要检查每个 `consumed_gas_tx_block[j][k]`。
2. 然后，我们根据下表决定如何设置 `global_gas_price`。

| 完整区块的百分比| 说明 | 对 gas 价格的影响|
|----------------------------|-------------------------------------------------------------------------------------|-------------|
| < 10%                      | 区块大多是空的； 需求低，因此矿工应该接受较低的价格 | 与上一纪元相比，**gas 价格上涨**
| Between 10% and 70%        | 区块大多被填满； 需求和供应已经达到临界点                 | 与前一纪元相比，**gas 格没有变化**
| > 70%                      | 区块被大量填满，因此有高需求的迹象                 | 与前一个纪元相比，**gas 价格下降**

### 降低 gas 价格

1. 丢弃所有 `proposed_min_price_node[i]` 的值
2. 计算过去 _n_ 个 DS 纪元的平均 gas 价格：
   ```
   average_gas_price_val = mean(min_price_epoch[j-1], ..., min_price_epoch[j-n])
   ```
3. 计算减少的 gas 价格值：
   ```
   decreased_gas_price_val = 99% of average_gas_price_val
   ```
4. 最后，计算新的 `global_gas_price`：
   ```
   global_gas_price = min_price_epoch[j] =
      max(default_min_gas_price, decreased_gas_price_val)
   ```

### 提高 gas 价格

1. 获取 _N_ 个矿工的所有值的中间值 `proposed_min_price_node[i]` 的值：
   ```
   median_proposed_min_price = median(proposed_min_price_node[1], ..., proposed_min_price_node[N])
   ```
2. 计算过去 _n_ 个 DS 纪元的平均 gas 价格：
   ```
   average_gas_price_val = mean(min_price_epoch[j-1], ..., min_price_epoch[j-n])
   ```
3. 计算增加的 gas 价格值的下限和上限：
   ```
   increased_gas_price_val_lower_bound = 100.5% of average_gas_price_val
   increased_gas_price_val_upper_bound = 101.5% of average_gas_price_val
   ```
4. 最后，计算新的 `global_gas_price`：
   ```
   global_gas_price = min_price_epoch[j] =
      max{
      	max[
      	     min(median_proposed_min_price, increased_gas_price_val_upper_bound),
      	     increased_gas_price_val_lower_bound
      	   ],
      	default_min_gas_price
      }
   ```
