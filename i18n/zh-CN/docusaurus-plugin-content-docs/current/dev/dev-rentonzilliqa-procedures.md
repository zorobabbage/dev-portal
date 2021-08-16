---
id: dev-rentonzilliqa-procedures
title: Procedure
keywords:
    - scilla
    - procedures
    - rentonzilliqa
description: The Procedures of the Scilla Contract for the RentOnZilliqa Application
---

---

我们继续声明我们将在 RentOnZilliqa 智能合约中使用的 procedure。 我们将在本节中声明以下类型的 procedure。 [源代码](https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/main/src/scilla/RentOnZilliqa.scilla)。

- [一般 Procedure](#general-procedures)
- [房源管理 Procedure](#listing-management-procedures)
- [房源预订 Procedure](#listing-booking-procedures)

## 一般 Procedure

由于我们将在合约中多次发送消息，因此我们创建了 procedure  `send_message` 来发送消息。

### `send_message`

此 procedure 使用传递的参数创建消息。 它使用 `one_msg` 库函数来创建一个消息列表，然后继续发送它。 请注意，`_recipient` 始终是隐式变量 `_sender`。

| 参数 | 描述                                                                             | 类型      |
| --------- | --------------------------------------------------------------------------------------- | --------- |
| `amount`  | 与消息一起发送的金额                                                  | `Uint128` |
| `code`    | 与消息一起发送的 [消息 code](dev-rentonzilliqa-library#message-codes) | `Int32`   |

```ocaml
procedure send_message (amount: Uint128, code: Int32)
  msg = {
    _tag: "";
    _recipient: _sender;
    _amount: amount;
    code: code
  };
  msgs = one_msg msg;
  send msgs
end
```

<br />

## 房源管理 procedure

这组 procedure 用于房东帐户用户管理其房源的 transition。

### `set_listing_details`

此 procedure 创建或更新给定 ID 的 [房源详细信息](dev-rentonzilliqa-mutable-variables#listing-details-fields)。 它由 transition `create_listing` 和 `update_listing` 使用。

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
procedure set_listing_details (
  id: Uint128, name: String, description: String, price: Uint128,
  rooms: Uint32, bathrooms: Uint32, image: String, location: String,
  wifi: String, laundry: String, hvac: String, tv: String, kitchen: String
)
  listing_name[id] := name;
  listing_description[id] := description;
  listing_price[id] := price;
  listing_rooms[id] := rooms;
  listing_bathrooms[id] := bathrooms;
  listing_image[id] := image;
  listing_location[id] := location;
  listing_wifi[id] := wifi;
  listing_laundry[id] := laundry;
  listing_hvac[id] := hvac;
  listing_tv[id] := tv;
  listing_kitchen[id] := kitchen
end
```

<br />

### `claim_rent_by_id`

此 procedure  与 transition `claim_rent` 结合使用。 在 [`listing_accumulated_rent`](dev-rentonzilliqa-mutable-variables#listing-details-fields) 字段中检查具有给定 ID 的房源累积租金。 如果租金丢失或为空，则使用 procedure `send_message` 发送相应的消息。 如果有非零累积租金，则使用 procedure `send_message` 将其发送到 `_sender`。 累积租金作为参数传递给 `send_message`，连同 `rent_claimed` 消息 code。 还会发出 `提取租金` 事件。 [`listing_accumulated_rent`](dev-rentonzilliqa-mutable-variables#listing-details-fields) 字段中对于该 ID 的累积租金设置为零，因为它已经被房东帐户提走了。

| 参数 | 描述           | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
procedure claim_rent_by_id (id: Uint128)
  accumulated_rent <- listing_accumulated_rent[id];
  match accumulated_rent with
  | Some accumulated_rent =>
    no_accumulated_rent = builtin eq accumulated_rent zero;
    match no_accumulated_rent with
    | True =>
      send_message zero rent_empty
    | False =>
      listing_accumulated_rent[id] := zero;
      e = { _eventname: "RentClaimed"; listing_id: id; renter: _sender; amount: accumulated_rent };
      event e;
      send_message accumulated_rent rent_claimed
    end
  | None =>
    send_message zero listing_details_missing
  end
end
```

<br />

### `delete_listing_by_id`

此 procedure 与 transition `delete_listing` 结合使用。 它删除具有给定 ID 的房源的 [房源详细信息](dev-rentonzilliqa-mutable-variables#listing-details-fields) 条目。

| 参数 | 描述           | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
procedure delete_listing_by_id (id: Uint128)
  delete listing_name[id];
  delete listing_description[id];
  delete listing_price[id];
  delete listing_rooms[id];
  delete listing_image[id];
  delete listing_host[id];
  delete listing_renter[id];
  delete listing_rented_till[id];
  delete listing_accumulated_rent[id];
  delete listing_bathrooms[id];
  delete listing_location[id];
  delete listing_wifi[id];
  delete listing_laundry[id];
  delete listing_hvac[id];
  delete listing_tv[id];
  delete listing_kitchen[id]
end
```

<br />

## 房源预订 Procedure

<br />

### `check_listing_available`

此 procedure 与 transition `book_listing` 结合使用。 它通过检查 [`listing_rented_till`](dev-rentonzilliqa-mutable-variables#listing-details-fields) 字段来检查房源是否可用。 如果不可用，则发送 [`listing_unavailable`](dev-rentonzilliqa-library#renter-account-codes) 消息。 当房源可用时， 调用 procedure [`check_amount_and_book`](#check_amount_and_book)，并携带参数 `id`。

| 参数 | 描述           | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
procedure check_listing_available (id: Uint128)
  current_block_number <- & BLOCKNUMBER;
  listing_rented_till_value <- listing_rented_till[id];
  match listing_rented_till_value with
  | Some listing_rented_till_value =>
    is_rented_lt = builtin blt current_block_number listing_rented_till_value;
    is_rented_eq = builtin eq current_block_number listing_rented_till_value;
    listing_is_rented_check = orb is_rented_lt is_rented_eq;
    match listing_is_rented_check with
    | True =>
      send_message zero listing_unavailable
    | False =>
      check_amount_and_book id
    end
  | None =>
    send_message zero listing_details_missing
  end
end
```

<br />

### `check_amount_and_book`

此 procedure 与 transition `book_listing` 结合使用。 在 procedure  [`check_listing_available`](#check_listing_available) 检查房源的可用性后调用它。 它检查发送的金额是否等于 [`listing_price`](dev-rentonzilliqa-mutable-variables#listing-details-fields)。 如果没有，[`wrong_amount_sent`](dev-rentonzilliqa-library#renter-account-codes) 被发回。 如果发送的金额正确，则使用 `id` 调用 procedure [`book_listing_by_id`](#book_listing_by_id)。

| 参数 | 描述           | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
procedure check_amount_and_book (id: Uint128)
  listing_price_value <- listing_price[id];
  match listing_price_value with
  | Some listing_price_value =>
    correct_amount_check = builtin eq _amount listing_price_value;
    match correct_amount_check with
    | True =>
      book_listing_by_id id
    | False =>
      send_message zero wrong_amount_sent
    end
  | None =>
    send_message zero listing_details_missing
  end
end
```

<br />

### `book_listing_by_id`

此 procedure 与 transition `book_listing` 结合使用。在这个 procedure 中，调用了 `accept` 命令。 [`night_duration`](dev-rentonzilliqa-mutable-variables#owner-fields) 被添加到当前的 `BLOCKNUMBER` 并分配给字段 [`listing_rented_till`](dev-rentonzilliqa-mutable-variables#listing-details-fields)。 `_sender` 钱包地址分配给字段  [`listing_renter`](dev-rentonzilliqa-mutable-variables#listing-details-fields)。在减去在字段 [`owners_commission`](dev-rentonzilliqa-mutable-variables#所有者字段)。触发事件 `ListingBooked` 并发送消息 [`listing_booked`](dev-rentonzilliqa-library#renter-account-codes)。

由于佣金金额存储在合约余额中，因此合约所有者可以通过 `_balance`隐式变量提取。

| 参数 | 描述           | 类型      |
| --------- | --------------------- | --------- |
| `id`      | 房源 ID | `Uint128` |

```ocaml
procedure book_listing_by_id (id: Uint128)
  accumulated_rent <- listing_accumulated_rent[id];
  match accumulated_rent with
  | Some accumulated_rent =>
    accept;
    current_block_number <- & BLOCKNUMBER;
    night_duration_value <- night_duration;
    rented_till = builtin badd current_block_number night_duration_value;
    listing_rented_till[id] := rented_till;
    listing_renter[id] := _sender;
    commission <- owners_commission;
    rent = builtin sub _amount commission;
    new_accumulated_rent = builtin add accumulated_rent rent;
    listing_accumulated_rent[id] := new_accumulated_rent;
    e = { _eventname: "ListingBooked"; listing_id: id; renter: _sender; amount: _amount };
    event e;
    send_message zero listing_booked
  | None =>
    send_message zero listing_details_missing
  end
end
```
