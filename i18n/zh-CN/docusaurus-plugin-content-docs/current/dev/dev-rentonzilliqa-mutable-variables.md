---
id: dev-rentonzilliqa-mutable-variables
title: 可变变量
keywords:
    - scilla
    - mutable
    - variables
    - rentonzilliqa
description: The Fields of the Scilla Contract for the RentOnZilliqa Application
---

---

在本节中，我们查看合约中声明的可变字段。 [源代码](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/main/src/scilla/RentOnZilliqa.scilla)。

## 声明可变字段

这些字段可以根据其用途分为以下类型。

### 所有者字段

合约的所有者可以修改这些字段。 它们决定了平台的行为。

| 字段                  | 描述                                                                | 类型      | 默认值 |
| ---------------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| `owners_commission` | 平台所有者每次租赁收取的佣金 | `Uint128` | `10` |
| `night_duration` | 可以理解为一夜的 `BLOCKNUMBER` 变化 | `Uint32` | `10` |
| `listing_id_generator` | 生成新房源的顺序 ID 的一个递增变量 | `Uint128` | `zero` |

### 用户详细信息字段

这些 `Map` 字段是字典，用于存储有关在平台上创建的用户帐户的详细信息。 他们每个人的 `key` 是用户的钱包地址。

| 字段       | 描述                                       | 类型                 | 默认值        |
| ----------- | ------------------------------------------------- | -------------------- | -------------------- |
| `user_name` | 用户名                           | `Map ByStr20 String` | `Emp ByStr20 String` |
| `user_role` | 用户角色<br/>(`0`：租户，`1`：房东) | `Map ByStr20 Uint32` | `Emp ByStr20 Uint32` |

### 房源详细信息字段

这些 `Map` 字段是用于存储每个房源的详细信息的字典。 它们中的每一个的 `key` 是如 [所有者字段](#owner-fields) 中的 `listing_id_generator` 所解释的 ID。 `value` 是字段对应的房源信息。

| 字段                      | Value 描述                                                                             | 类型                  | 默认值         |
| -------------------------- | --------------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| `listing_host`             | 创建房源的房东帐户的钱包地址                             | `Map Uint128 ByStr20` | `Emp Uint128 ByStr20` |
| `listing_renter`           | 房源当前租户的钱包地址                                     | `Map Uint128 ByStr20` | `Emp Uint128 ByStr20` |
| `listing_rented_till`      | 该房源被租用时的 `BLOCKNUMBER`                                          | `Map Uint128 BNum`    | `Emp Uint128 BNum`    |
| `listing_name`             | 房源名称                                                                      | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_description`      | 房源描述                                                               | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_price`            | 房源价格                                                                      | `Map Uint128 Uint128` | `Emp Uint128 Uint128` |
| `listing_rooms`            | 房源数量                                                           | `Map Uint128 Uint32`  | `Emp Uint128 Uint32`  |
| `listing_bathrooms`        | 房源中的浴室数量                                                       | `Map Uint128 Uint32`  | `Emp Uint128 Uint32`  |
| `listing_image`            | 房源图像的 URL                                                              | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_location`         | 用于房源位置的 [Google Maps Plus Code](https://maps.google.com/pluscodes/) | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_wifi`             | 房源中 WiFi 的可用性                                                       | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_laundry`          | 房源中洗衣房的可用性                                                  | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_hvac`             | 房源中 HVAC 的可用性                                                    | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_tv`               | 房源中电视的可用性                                                      | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_kitchen`          | 房源中厨房的可用性                                                 | `Map Uint128 String`  | `Emp Uint128 String`  |
| `listing_accumulated_rent` | 房源累计租金                                                          | `Map Uint128 Uint128` | `Emp Uint128 Uint128` |
