---
id: dev-rentonzilliqa-scripting
title: 脚本
keywords:
    - scripting
    - rentonzilliqa
    - scilla
description: Connecting the RentOnZillqa frontend application with the Scilla contract
---

---

在本节中，我们准备用于连接前端与 Scilla 合约的 TypeScript。 如前所述，我们使用 [ZilPay](https://zilpay.io) 来访问 Zilliqa JS 实用程序，这反过来又允许我们与已部署的合约进行交互。

## 环境变量

我们将智能合约的地址存储在 [`.env`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/.env) 文件中的环境变量中。 我们还存储了一个 [Google Maps API Key](https://developers.google.com/maps/documentation/embed/get-api-key)，用于在房源详情页面上嵌入地图。

```
REACT_APP_SMART_CONTRACT_ADDRESS=zil1tug5k2la6xrjqc78ysfacskgt2m72uzdwmd86z
REACT_APP_MAPS_API_KEY=XXXXXXXXXXXXXXXX
```

<br/>

## 辅助函数

我们创建了大量辅助函数来促进合约连接。 我们将在 [`/src/functions/`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/) 目录中定义它们。

### `ContextContainer`

我们使用 [`unstated-next`](https://github.com/jamiebuilds/unstated-next) 为应用程序创建一个 Context Provider。 我们使用它使一些对象在应用程序的所有组件中可用。 我们将在接下来的部分中看到它是如何使用的。

```ts
import { useState } from "react";
import { createContainer } from "unstated-next";

const useContext = () => {
    const [zilPay, setZilPay] = useState<any | undefined>(undefined);
    const [listings, setListings] = useState<any | undefined>(undefined);
    const [error, setError] = useState<boolean | undefined>(undefined);
    const [contract, setContract] = useState<any | undefined>(undefined);
    const [contractState, setContractState] =
        useState<any | undefined>(undefined);
    const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
    const [currentBlockNumber, setCurrentBlockNumber] =
        useState<number | undefined>(undefined);

    return {
        zilPay,
        setZilPay,
        listings,
        setListings,
        error,
        setError,
        contract,
        setContract,
        contractState,
        setContractState,
        currentUser,
        setCurrentUser,
        currentBlockNumber,
        setCurrentBlockNumber,
    };
};
const ContextContainer = createContainer(useContext);
export default ContextContainer;
```

[/src/functions/contextContainer.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/contextContainer.ts)

<br/>

### `getCallParameters`

此函数返回一个对象，其中包含调用 transition 所需的参数。
发送非零金额的消息时，可以使用可选的 `amountValue` 参数。
这些值使用 [`zilPay.utils`](https://zilpay.github.io/zilpay-docs/zilliqa-api-utils/#window-zilpay-utils) 将其转换为适当的单位。

```ts
const getCallParameters = (zilPay: any, amountValue: string = "0") => {
    const { units, bytes } = zilPay.utils;

    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const GAS_PRICE = 60000000000;
    const GAS_LIMIT = 50000;

    const version = bytes.pack(CHAIN_ID, MSG_VERSION);
    const amount = units.toQa(amountValue, units.Units.Zil);
    const gasPrice = units.fromQa(GAS_PRICE, units.Units.Qa);
    const gasLimit = units.fromQa(GAS_LIMIT, units.Units.Qa);

    return { version, amount, gasPrice, gasLimit };
};

export default getCallParameters;
```

[/src/functions/getCallParameters.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/getCallParameters.ts)

<br/>

### `getCurrentUser`

此函数获取激活的 ZilPay 用户的钱包地址。 它从合约状态中获取用户的 `name` 和 `role`。

```ts
const getCurrentUser = (contractState: any, zilPay: any) => {
    const currentUser = zilPay.wallet.defaultAccount.base16;
    const address = currentUser.toLowerCase();
    const name = contractState.user_name[address];
    const role = contractState.user_role?.[address] === "1" ? "host" : "renter";
    return { address, name, role };
};

export default getCurrentUser;
```

[/src/functions/getCurrentUser.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/getCurrentUser.ts)

<br/>

### `getCurrentEpochNumber`

此函数获取调起 ZilPay 的当前最小时期。

```ts
const getCurrentEpochNumber = async (zilPay: any) => {
    const data = await zilPay.blockchain.getCurrentMiniEpoch();
    return await data.result;
};

export default getCurrentEpochNumber;
```

[/src/functions/getCurrentEpochNumber.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/getCurrentEpochNumber.ts)

<br/>

### `formatListings`

该函数采用合约状态下的多个 Map 对象并返回一个方便的用户对象。
它检查当前 ZilPay 用户的钱包地址是否与列房源房东的地址匹配。
它还检查房源的租用状态。 价格和租金从 `Qa` 转换而来。 便利设施被转换为 `boolean`。

```ts
const formatListings = (
    contractState: any,
    currentEpochNumber: number,
    currentUser: string
) => {
    const {
        listing_name,
        listing_description,
        listing_host,
        listing_price,
        listing_rooms,
        listing_bathrooms,
        listing_image,
        listing_location,
        listing_renter,
        listing_rented_till,
        listing_accumulated_rent,
        listing_wifi,
        listing_kitchen,
        listing_tv,
        listing_laundry,
        listing_hvac,
    } = contractState;

    const formattedListings = Object.keys(listing_name).map(
        (key: any, index: any) => {
            return {
                id: key,
                name: listing_name[key],
                description: listing_description[key],
                price: (parseInt(listing_price[key]) / 10 ** 12).toString(),
                rooms: listing_rooms[key],
                bathrooms: listing_bathrooms[key],
                image: listing_image[key],
                location: listing_location[key],
                renter: listing_renter[key],
                rented_till: listing_rented_till[key],
                accumulated_rent: (
                    parseInt(listing_accumulated_rent[key]) /
                    10 ** 12
                ).toString(),
                rented:
                    parseInt(listing_rented_till[key]) >= currentEpochNumber,
                user_is_host: listing_host[0] === currentUser.toLowerCase(),
                amenities: {
                    wifi: listing_wifi[key] === "yes",
                    kitchen: listing_kitchen[key] === "yes",
                    tv: listing_tv[key] === "yes",
                    laundry: listing_laundry[key] === "yes",
                    hvac: listing_hvac[key] === "yes",
                },
            };
        }
    );

    return formattedListings;
};

export default formatListings;
```

[/src/functions/formatListings.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/formatListings.ts)

<br/>

### `transitionMessageAlert`

此函数使用 [`react-hot-toast`](https://react-hot-toast.com) 创建一个 toast，它使用 [`zilPay.wallet`](https://zilpay.github.io/zilpay -docs/getting-started/#basic-lookingations) 订阅交易。 使用交易状态更新 toast 并根据我们之前定义的 [消息 code](dev-rentonzilliqa-library#message-codes) 显示一条消息。

请注意，在此函数中，我们使用另一个辅助函数 `decodeMessage`，从消息代码中获取人类可读的消息。 由于此功能非常基础，因此这里不做展示。 你可以看看 [`/src/functions/decodeMessage.ts`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/decodeMessage.ts)。 它还包括一个我们将在接下来的部分中使用的 `decodeZilPayError` 函数。

```ts
import toast from "react-hot-toast";
import decodeMessage from "./decodeMessage";

const transitionMessageAlert = (
    zilPay: any,
    transactionId: string,
    transitionName: string
) => {
    const transition = new Promise<string>((success, error) => {
        const subscription = zilPay.wallet
            .observableTransaction(transactionId)
            .subscribe(async (hash: any) => {
                subscription.unsubscribe();
                try {
                    const Tx = await zilPay.blockchain.getTransaction(hash[0]);
                    const code = Tx.receipt.transitions[0].msg.params[0].value;
                    const message = decodeMessage(code);
                    if (message.type === "success") success(message.alert);
                    error(message.alert);
                } catch (err) {
                    error("Transaction error");
                }
            });
    });
    toast.promise(transition, {
        loading: `${transitionName}`,
        success: (message: string) => message,
        error: (message: string) => message,
    });
};

export default transitionMessageAlert;
```

[/src/functions/transitionMessageAlert.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/transitionMessageAlert.ts)

<br/>

## Transition 函数

我们终于来到了使用 [`zilPay.contract`](https://zilpay.github.io/zilpay-docs/zilliqa-contracts/#window-zilpay-contracts) 调用合约 transition 的 Transition 函数。 [`transitionMessageAlert`](#transitionmessagealert) 也会在触发 transition 后设置。

以下函数在 [`/src/functions/`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/) 创建，用于调用各自的 transition。

| 函数                                                                                                                          | Transition                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`createUserTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/createUserTransition.ts)       | [`create_user`](dev-rentonzilliqa-transitions#create_user)       |
| [`createListingTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/createListingTransition.ts) | [`create_listing`](dev-rentonzilliqa-transitions#create_listing) |
| [`updateListingTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/updateListingTransition.ts) | [`update_listing`](dev-rentonzilliqa-transitions#update_listing) |
| [`deleteListingTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/deleteListingTransition.ts) | [`delete_listing`](dev-rentonzilliqa-transitions#delete_listing) |
| [`bookListingTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/bookListingTransition.ts)     | [`book_listing`](dev-rentonzilliqa-transitions#book_listing)     |
| [`claimRentTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/claimRentTransition.ts)         | [`claim_rent`](dev-rentonzilliqa-transitions#claim_rent)         |

让我们以 [`createUserTransition`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/createUserTransition.ts) 函数为例。 我们使用我们之前定义的 [`decodeZilPayError`](#transitionmessagealert)。

```ts
import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

const createUserTransition = async (
    contract: any,
    zilPay: any,
    name: string | undefined,
    role: string
) => {
    try {
        const callTransition = await contract.call(
            "create_user",
            [
                {
                    vname: "name",
                    type: "String",
                    value: name,
                },
                {
                    vname: "role",
                    type: "Uint32",
                    value: role,
                },
            ],
            getCallParameters(zilPay)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Creating user");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default createUserTransition;
```

[/src/functions/createUserTransition.ts](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/functions/createUserTransition.ts)
