---
id: dev-rentonzilliqa-library
title: 库
keywords:
    - scilla
    - library
    - rentonzilliqa
description: The Library of the Scilla Contract for the RentOnZilliqa Application
---

---

我们从 RentOnZilliqa 的库开始。 我们声明了 `one_msg` 辅助函数。 [源代码可以在这里找到](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/93273d0af6776e28f998ba4a63df3053545a1eeb/src/scilla/RentOnZilliqa.scilla#L6)。

## 消息 code

然后我们开始创建一些用于与前端通信的消息代码。 code 类型为 `Int32`。

code 分为三类：

- [账户 code](#account-codes)
- [房东帐户 code](#host-account-codes)
- [租客帐户 code](#renter-account-codes)

### 帐户 code

这些 code 是适用于所有与合约通信的用户的通用 code [（源代码）](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/93273d0af6776e28f998ba4a63df3053545a1eeb/src/scillaqaent.scilla#L12)。

| 名称                     | Code | 描述                                         | 类型    |
| ------------------------ | :--: | --------------------------------------------------- | ------- |
| `user_created` | `01` | 成功创建用户 | `Int32` |
| `user_exists` | `02` | 用户已存在 | `Int32` |
| `user_does_not_exist` | `03` | 用户不存在 | `Int32` |
| `user_is_not_owner` | `04` | 无法更新/提取佣金，因为用户不是所有者 | `Int32` |
| `commission_claimed` | `05` | owner 提取的佣金| `Int32` |
| `commission_updated` | `06` | owner 更新佣金 | `Int32` |
| `night_duration_updated` | `07` | 由 owner 更新的夜间持续时间 | `Int32` |

### 房东帐户 code

这些 code 是专门用于在与房东帐户相关的操作后进行通信的 code [（源代码）](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/93273d0af6776e28f998ba4a63df3053545a1eeb/src/scilliqa/Rent.scilla#L21)。

| 名称                     | Code | 描述                                         | 类型    |
| ------------------ | :--: | ------------------------------------------------ | ------- |
| `listing_created` | `11` | 成功创建房源 | `Int32` |
| `listing_updated` | `12` | 成功更新房源 | `Int32` |
| `listing_deleted` | `13` | 成功删除房源 | `Int32` |
| `rent_claimed` | `14` | 成功提取房源租金 | `Int32` |
| `rent_empty` | `15` | 提取房源租金时，无累计 | `Int32` |
| `rent_not_empty` | `16` | 不能删除房源，因为它已经累积了租金| `Int32` |
| `user_is_host` | `17` | 无法预订房源，因为用户是房东 | `Int32` |
| `user_is_not_host` | `18` | 无法管理房源，因为发起人不是房东 | `Int32` |

### 租户帐户 code

这些 code 是专门用于在与租户帐户相关的操作后进行通信的 code [（源代码）](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/93273d0af6776e28f998ba4a63df3053545a1eeb/src/scilla/RentOnZilliqa.scilla#L31)。

| 名称                     | Code | 描述                                         | 类型    |
| ------------------------- | :--: | ------------------------------------------------- | ------- |
| `listing_booked` | `21` | 成功预订房源 | `Int32` |
| `listing_unavailable` | `22` | 无法预订房源，因为它已出租 | `Int32` |
| `user_is_renter` | `23` | 无法创建房源，因为用户是租户帐户 | `Int32` |
| `wrong_amount_sent` | `24` | 无法预订房源，因为数量错误 | `Int32` |
| `listing_does_not_exist` | `25` | 无法预订房源，因为它不存在 | `Int32` |
| `listing_details_missing` | `26` | 缺少房源详细信息 | `Int32` |

## 附加常量

我们定义了一些需要在合约中使用的额外的常量。 我们创建用于存储帐户角色的常量。 以及一些常用的常量。 [（源代码）](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/93273d0af6776e28f998ba4a63df3053545a1eeb/src/scilla/RentOnZilliqa.scilla#L39)。

| 名称               |  Code   | 类型      |
| ------------------ | :-----: | --------- |
| `user_role_renter` |   `0`   | `Uint32`  |
| `user_role_host`   |   `1`   | `Uint32`  |
| `one`              |   `1`   | `Uint128` |
| `zero`             |   `0`   | `Uint128` |
| `true`             | `True`  | `Bool`    |
| `false`            | `False` | `Bool`    |
