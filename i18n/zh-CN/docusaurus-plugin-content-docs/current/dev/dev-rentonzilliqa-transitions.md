---
id: dev-rentonzilliqa-transitions
title: Transition
keywords:
    - scilla
    - transitions
    - rentonzilliqa
description: The Transitions of the Scilla Contract for the RentOnZilliqa Application
---

---

我们终于进入了智能合约中的 transition。 我们将 transition 分为以下类型。 [源代码](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/main/src/scilla/RentOnZilliqa.scilla)。

- [用户 Transition](#user-transitions)
- [列表 Transition](#listing-transitions)
- [所有者 Transition](#owner-transitions)

## 用户 Transition

### `create_user`

此 transition 接受新用户的 `name` 和 `role`。

如果用户已经存在，则返回消息 [`user_exists`](dev-rentonzilliqa-library#account-codes)。

如果不存在，则设置字段 [`user_name`](dev-rentonzilliqa-mutable-variables#user-details-fields) 和 [`user_role`](dev-rentonzilliqa-mutable-variables#user-details-fields)。消息 [`user_created`](dev-rentonzilliqa-library#account-codes) 被发回。

| 参数 | 描述                                       | 类型     |
| --------- | ------------------------------------------------- | -------- |
| `name`    | 用户名                             | `String` |
| `role`    | 用户角色<br/>(`0`：租户，`1`：房东) | `Uint32` |

```ocaml
transition create_user (name: String, role: Uint32)
  user_exists_check <- exists user_name[_sender];
  match user_exists_check with
  | True =>
    send_message zero user_exists
  | False =>
    user_name[_sender] := name;
    user_role[_sender] := role;
    send_message zero user_created
  end
end
```

<br />

## 房源 Transition

这组 transition 用于房东帐户用户管理其列表的 transition。

### `create_listing`

房东用户使用此 transition 来创建房源。

[`user_role`](dev-rentonzilliqa-mutable-variables#user-details-fields) 被检查。

[`listing_id_generator`](dev-rentonzilliqa-mutable-variables#owner-fields) 用于为房源设置一个新的递增 id。

调用 procedure  [`set_listing_details`](dev-rentonzilliqa-procedures#set_listing_details) 来创建房源，并初始化一些列表字段，包括 [`listing_host`](dev-rentonzilliqa-mutable-variables#listing-details-fields)、[`listing_rented_till`](dev-rentonzilliqa-mutable-variables#user-details-fields) 和 [`listing_accumulated_rent`](dev-rentonzilliqa-mutable-variables#user-details-fields)。

成功时，发送消息 [`listing_created`](dev-rentonzilliqa-library#host-account-codes)。

失败时，发送消息 [`user_is_renter`](dev-rentonzilliqa-library#renter-account-codes) 或 [`user_does_not_exist`](dev-rentonzilliqa-library#account-codes)。

| 参数     | 描述                                                                                   | 类型      |
| ------------- | --------------------------------------------------------------------------------------------- | --------- |
| `name`        | 房源名称                                                                       | `String`  |
| `description` | 房源说明                                                               | `String`  |
| `price`       | 房源价格                                                                      | `Uint128` |
| `rooms`       | 房源数量                                                            | `Uint32`  |
| `bathrooms`   | 房源中的浴室数量                                                        | `Uint32`  |
| `image`       | 房源图像的 URL                                                              | `String`  |
| `location`    | 用于房源位置的 [Google Maps Plus Code](https://maps.google.com/pluscodes/) | `String`  |
| `wifi`        | 房源中 WiFi 的可用性                                                        | `String`  |
| `laundry`     | 房源中洗衣房的可用性                                                   | `String`  |
| `hvac`        | 房源中 HVAC 的可用性                                                    | `String`  |
| `tv`          | 房源中电视的可用性                                                       | `String`  |
| `kitchen`     | 房源中厨房的可用性                                                  | `String`  |

```ocaml
transition create_listing (
  name: String, description: String, price: Uint128,
  rooms: Uint32, bathrooms: Uint32, image: String, location: String,
  wifi: String, laundry: String, hvac: String, tv: String, kitchen: String
)
  user_exists_check <- exists user_name[_sender];
  match user_exists_check with
  | True =>
    role <- user_role[_sender];
    match role with
    | Some role =>
      user_role_check = builtin eq role user_role_host;
      match user_role_check with
      | True =>
        id <- listing_id_generator;
        current_block_number <- & BLOCKNUMBER;
        listing_host[id] := _sender;
        set_listing_details id name description price rooms bathrooms image location wifi laundry hvac tv kitchen;
        listing_rented_till[id] := current_block_number;
        listing_accumulated_rent[id] := zero;
        next_listing_id = builtin add id one;
        listing_id_generator := next_listing_id;
        send_message zero listing_created
      | False =>
        send_message zero user_is_renter
      end
    | None =>
      send_message zero user_does_not_exist
    end
  | False =>
    send_message zero user_does_not_exist
  end
end
```

<br />

### `update_listing`

房东用户使用此 transition 来更新给定房源的 [房源详细信息](dev-rentonzilliqa-mutable-variables#listing-details-fields)。

检查 `_sender` 钱包地址是否确实是房源的房东。

procedure  [`set_listing_details`](dev-rentonzilliqa-procedures#set_listing_details) 用于更新详细信息。

| 参数     | 描述                                                                                   | 类型      |
| ------------- | --------------------------------------------------------------------------------------------- | --------- |
| `id`          | 房源 ID                                                                         | `Uint128` |
| `name`        | 房源名称                                                                       | `String`  |
| `description` | 房源说明                                                               | `String`  |
| `price`       | 房源价格                                                                      | `Uint128` |
| `rooms`       | 房源数量                                                            | `Uint32`  |
| `bathrooms`   | 房源中的浴室数量                                                        | `Uint32`  |
| `image`       | 房源图像的 URL                                                              | `String`  |
| `location`    | 用于房源位置的 [Google Maps Plus Code](https://maps.google.com/pluscodes/) | `String`  |
| `wifi`        | 房源中 WiFi 的可用性                                                        | `String`  |
| `laundry`     | 房源中洗衣房的可用性                                                   | `String`  |
| `hvac`        | 房源中 HVAC 的可用性                                                    | `String`  |
| `tv`          | 房源中电视的可用性                                                       | `String`  |
| `kitchen`     | 房源中厨房的可用性                                                  | `String`  |

```ocaml
transition update_listing (
  id: Uint128, name: String, description: String, price: Uint128,
  rooms: Uint32, bathrooms: Uint32, image: String, location: String,
  wifi: String, laundry: String, hvac: String, tv: String, kitchen: String
)
  host <- listing_host[id];
  match host with
  | Some host =>
    user_is_host_check = builtin eq host _sender;
    match user_is_host_check with
    | True =>
      set_listing_details id name description price rooms bathrooms image location wifi laundry hvac tv kitchen;
      send_message zero listing_updated
    | False =>
      send_message zero user_is_not_host
    end
  | None =>
    send_message zero listing_does_not_exist
  end
end
```

<br />

### `delete_listing`

房东用户使用此 transition 来删除特定房源。

检查 `_sender` 钱包地址是否确实是房源的房东。

它检查房源的累计租金是否为空。

procedure  [`delete_listing_by_id`](dev-rentonzilliqa-procedures#delete_listing_by_id) 用于删除房源。

| 参数     | 描述                                                                                   | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
transition delete_listing (id: Uint128)
  host <- listing_host[id];
  match host with
  | Some host =>
    user_is_host_check = builtin eq host _sender;
    match user_is_host_check with
    | True =>
      accumulated_rent_value <- listing_accumulated_rent[id];
      match accumulated_rent_value with
      | Some accumulated_rent_value =>
        no_rent = builtin eq accumulated_rent_value zero;
        match no_rent with
        | True =>
          delete_listing_by_id id;
          send_message zero listing_deleted
        | False =>
          send_message zero rent_not_empty
        end
      | None =>
        send_message zero listing_details_missing
      end
    | False =>
      send_message zero user_is_not_host
    end
  | None =>
    send_message zero listing_does_not_exist
  end
end
```

<br />

### `book_listing`

租户用户使用此 transition 来预订房源。

检查 `_sender` 钱包地址以确保它不是房源的房东。

[`check_listing_available`](dev-rentonzilliqa-procedures#check_listing_available)、[`check_amount_and_book`](dev-rentonzilliqa-procedures#check_amount_and_book) 和 [`book_listing_by_id`](dev-rentonzilliqa-procedures #check_listing_available) 是预订房源依次使用的 procedure。

| 参数     | 描述                                                                                   | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
transition book_listing (id: Uint128)
  user_exists_check <- exists user_name[_sender];
  match user_exists_check with
  | True =>
    host <- listing_host[id];
    match host with
    | Some host =>
      user_is_host_check = builtin eq host _sender;
      match user_is_host_check with
      | True =>
        send_message zero user_is_host
      | False =>
        check_listing_available id
      end
    | None =>
      send_message zero listing_does_not_exist
    end
  | False =>
    send_message zero user_does_not_exist
  end
end
```

<br />

### `claim_rent`

房东用户使用此 transition 从他们拥有的房源中提取累积租金。

检查 `_sender` 钱包地址以确保它确实是房源的房东。

procedure  [`claim_rent_by_id`](dev-rentonzilliqa-procedures#claim_rent_by_id) 用于提取租金。

| 参数     | 描述                                                                                   | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
transition claim_rent (id: Uint128)
  user_exists_check <- exists user_name[_sender];
  match user_exists_check with
  | True =>
    host <- listing_host[id];
    match host with
    | Some host =>
      user_is_host_check = builtin eq host _sender;
      match user_is_host_check with
      | True =>
        claim_rent_by_id id
      | False =>
        send_message zero user_is_not_host
      end
    | None =>
      send_message zero listing_does_not_exist
    end
  | False =>
    send_message zero user_does_not_exist
  end
end
```

<br />

## 所有者 Transition

所有者使用这组 transition 来管理平台。

### `claim_commission`

此 transition 用于提取在平台上收取的佣金。

检查 `_sender` 钱包地址以确保它是合约的所有者。

合约中的 `_balance` 通过消息发送给所有者。

```ocaml
transition claim_commission ()
  is_owner = builtin eq owner _sender;
  match is_owner with
  | False =>
    send_message zero user_is_not_owner
  | True =>
    balance <- _balance;
    send_message balance commission_claimed
  end
end
```

<br />

### `update_commission`

此 transition 用于更新从每次租赁中收取的佣金。

检查 `_sender` 钱包地址以确保它是合约的所有者。

[`owners-commission`](dev-rentonzilliqa-mutable-variables#owner-fields) 字段更新为 `new_commission`。

| 参数        | 描述                    | 类型      |
| ---------------- | ------------------------------ | --------- |
| `new_commission` | 佣金的新值 | `Uint128` |

```ocaml
transition update_commission (new_commission: Uint128)
  is_owner = builtin eq owner _sender;
  match is_owner with
  | False =>
    send_message zero user_is_not_owner
  | True =>
    owners_commission := new_commission;
    send_message zero commission_updated
  end
end
```

<br />

### `update_night_duration`

此 transition 用于更新添加到 `BLOCKNUMBER` 以创建时间概念的夜间持续时间值。

检查 `_sender` 钱包地址以确保它是合约的所有者。

[`night_duration`](dev-rentonzilliqa-mutable-variables#owner-fields) 字段更新为 `new_night_duration`。

| 参数            | 描述                    | 类型     |
| -------------------- | ------------------------------ | -------- |
| `new_night_duration` | 夜间持续时间的新值 | `Uint32` |

```ocaml
transition update_night_duration (new_night_duration: Uint32)
  is_owner = builtin eq owner _sender;
  match is_owner with
  | False =>
    send_message zero user_is_not_owner
  | True =>
    night_duration := new_night_duration;
    send_message zero night_duration_updated
  end
end
```
