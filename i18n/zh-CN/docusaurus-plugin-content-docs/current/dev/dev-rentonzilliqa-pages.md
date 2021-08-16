---
id: dev-rentonzilliqa-pages
title: 页面
keywords:
    - react
    - rentonzilliqa
    - pages
    - frontend
description: Building the Pages for the RentOnZilliqa frontend application
---

---

在本节中，我们将为前端应用程序构建页面。

## App 组件

我们从 `App` 组件开始。

我们使用 [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) 为我们的页面创建路由。

我们从 [`react-hot-toast`](https://react-hot-toast.com) 设置了 `Toaster`。

使用 `useEffect` 钩子，我们设置以下内容：

- 检查 ZilPay 在浏览器上是否可用，并使用 `setZilPay` 将其存储在上下文中。 如果 ZilPay 不可用，则会弹出错误。
- 我们使用 `setContract` 获取合约的状态并将其存储在上下文中
- 设置订阅，使我们能够
     - 使用 [`zilPay.wallet.observableBlock`](https://zilpay.github.io/zilpay-docs/zilliqa-provider/#methods) 有区块更新时更新合约状态和区块高度
     - 使用 [`zilPay.wallet.observableAccount`](https://zilpay.github.io/zilpay-docs/zilliqa-provider/#methods) 更改时更新 ZilPay 帐户

```tsx
import React, { useEffect, useState } from "react";
import Header from "./components/componentHeader";
import Listing from "./components/componentListing";
import Listings from "./components/componentListings";
import CreateAccountModal from "./components/componentCreateAccountModal";
import ContextContainer from "./functions/contextContainer";
import { Toaster } from "react-hot-toast";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const App: React.FC = () => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false);
    const [zilPayCheck, setZilPayCheck] = useState<number>(0);
    const {
        zilPay,
        setZilPay,
        error,
        setError,
        setContract,
        setContractState,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();

    const getContractState = async () => {
        const contract = await zilPay.contracts.at(
            process.env.REACT_APP_SMART_CONTRACT_ADDRESS
        );
        setContract(contract);
        const contractState = await contract.getState();
        setContractState(contractState);
    };

    useEffect(() => {
        if (error === false) return;
        // @ts-ignore
        const zilPay = window.zilPay;
        if (zilPay === undefined) {
            setError(true);
            return;
        }
        setZilPay(zilPay);
        setError(false);
    }, [error]);

    useEffect(() => {
        if (error && zilPayCheck < 100) {
            setZilPayCheck(zilPayCheck + 1);
            setError(undefined);
            return;
        }
        if (error !== false) return;

        let block: any = undefined;
        let account: any = undefined;

        if (!zilPay.wallet.isConnect) return;
        try {
            block = zilPay.wallet.observableBlock().subscribe((block: any) => {
                const blockNumber = parseInt(block.TxBlock.header.BlockNum);
                setCurrentBlockNumber(blockNumber);
                getContractState();
            });
            account = zilPay.wallet
                .observableAccount()
                .subscribe(() => getContractState());

            getContractState();
        } catch (e) {
            console.log(e);
        }
        return function cleanup() {
            block?.unsubscribe?.();
            account?.unsubscribe?.();
        };
    }, [error]);

    return zilPay ? (
        <div className="rentonzilliqa">
            <Router>
                <Header {...{ setShowSignUp }} />
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to={"/listings"} />
                        </Route>
                        <Route path="/listings">
                            <Listings />
                        </Route>
                        <Route path="/listing/:id">
                            <Listing />
                        </Route>
                        <Redirect to={"/listings"} />
                    </Switch>
                    <CreateAccountModal {...{ showSignUp, setShowSignUp }} />
                </main>
            </Router>
            <Toaster
                toastOptions={{
                    success: { duration: 6000 },
                    error: { duration: 8000 },
                    loading: { duration: 130000 },
                }}
            />
        </div>
    ) : (
        <main className="h-screen flex justify-center items-center text-xl">
            Please install ZilPay
        </main>
    );
};

export default App;
```

[/src/App.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/App.tsx)

<br/>

## `index.tsx`

接下来，我们用之前创建的 [`ContextContainer`](dev-rentonzilliqa-scripting#contextcontainer) 包裹 [`App`](#app) 组件。

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextContainer from "./functions/contextContainer";

ReactDOM.render(
    <React.StrictMode>
        <ContextContainer.Provider>
            <App />
        </ContextContainer.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
```

[/src/index.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/index.tsx)

## 房源页面

现在我们进入 [房源页面](dev-rentonzilliqa-frontend#listings-page)。

当 `contractState` 或 `blockNumber` 发生变化时，使用 `useEffect` 钩子，我们更新页面上显示的 `listings`。 我们创建了一个 `hostedListings` 对象，用于过滤掉当前用户托管的房源。

房源使用 [`ListingCard`](dev-rentonzilliqa-components#listingcard) 组件呈现。

使用 `useState` 钩子，我们创建 `boolean` 状态变量以根据需要显示和隐藏模态。 基于这些变量有条件地安装模态。 为了触发模态，我们设置 `onClick` 监听器如下：

- 在 `新建房源` [`Button`](dev-rentonzilliqa-components#button) 上，触发 [`CreateListing`](dev-rentonzilliqa-modals#create-listing-modal) 模态
- 在每个列表卡上，触发 [`ManageListing`](dev-rentonzilliqa-modals/#manage-listing-modal) 模态

```tsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import CreateListingModal from "./componentCreateListingModal";
import ListingCard from "./componentListingCard";
import ManageListingModal from "./componentManageListingModal";

const Listings: React.FC = () => {
    const [showCreateListing, setShowCreateListing] = useState<boolean>(false);
    const [showManageListing, setShowManageListing] = useState<boolean>(false);
    const [modalListing, setModalListing] =
        useState<any | undefined>(undefined);
    const {
        contractState,
        zilPay,
        currentUser,
        setCurrentUser,
        currentBlockNumber,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();
    const [listings, setListings] = useState<any | undefined>(undefined);
    const history = useHistory();

    const hostedListings = listings?.filter((listing: any) => {
        return listing.user_is_host;
    });

    useEffect(() => {
        (async () => {
            if (!contractState) return;
            const currentEpochNumber = await getCurrentEpochNumber(zilPay);
            setCurrentBlockNumber(currentEpochNumber);
            const currentUser = getCurrentUser(contractState, zilPay);
            setCurrentUser(currentUser);
            setListings(
                formatListings(
                    contractState,
                    currentEpochNumber,
                    currentUser.address
                )
            );
        })();
    }, [contractState, currentBlockNumber]);

    return (
        <div className="container mx-auto px-4 lg:px-2 pb-20">
            <div className="pt-20 pb-10 flex justify-between items-center">
                <h1 className="text-gray-900 text-2xl font-medium">Listings</h1>
            </div>
            {listings ? (
                <>
                    {listings.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-5 gap-6">
                                {listings.map((listing: any, index: number) => {
                                    return (
                                        <ListingCard
                                            {...listing}
                                            onClick={() => {
                                                history.push(
                                                    `/listing/${listing.id}`
                                                );
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-xl text-center">No listings</p>
                    )}
                    {currentUser?.role === "host" && (
                        <>
                            <div className="pt-32 pb-10 flex justify-between items-center">
                                <h1 className="text-gray-900 text-2xl font-medium">
                                    Hosted
                                </h1>
                                <Button
                                    text={"New Listing"}
                                    onClick={() => setShowCreateListing(true)}
                                />
                            </div>
                            {hostedListings.length > 0 ? (
                                <div className="grid md:grid-cols-5 gap-6">
                                    {hostedListings.map(
                                        (listing: any, index: number) => {
                                            return (
                                                <ListingCard
                                                    {...listing}
                                                    onClick={() => {
                                                        setModalListing(
                                                            listing
                                                        );
                                                        setShowManageListing(
                                                            true
                                                        );
                                                    }}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            ) : (
                                <p className="text-xl text-center">
                                    No listings
                                </p>
                            )}
                        </>
                    )}
                </>
            ) : zilPay.wallet.isConnect ? (
                <p className="text-xl text-center">Loading</p>
            ) : (
                <p className="text-xl text-center">Please connect ZilPay</p>
            )}
            <CreateListingModal
                {...{ showCreateListing, setShowCreateListing }}
            />
            {modalListing && (
                <ManageListingModal
                    {...{
                        modalListing,
                        showManageListing,
                        setShowManageListing,
                    }}
                />
            )}
        </div>
    );
};

export default Listings;
```

[/src/components/componentListings.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentListings.tsx)

<br/>

## 房源详情页面

此组件在 [房源页面](dev-rentonzilliqa-frontend#listing-page) 上呈现单个房源的详细视图。

描述、房间、设施、地图都以详细的方式呈现。 [`ListingIcons`](dev-rentonzilliqa-components#listing-icons) 用于提供房间和便利设施部分的清晰视图。

用户可以在此组件中预订房源，该组件使用 [`bookListingTransition`](dev-rentonzilliqa-scripting#booklistingtransition) 函数。

地图的嵌入网址是使用 [Google Maps Plus Code](https://maps.google.com/pluscodes/) 和 [Google Maps API Key](https://developers.google.com/maps/documentation/embed/get-api-keys)。

```tsx
import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import { useHistory, useParams } from "react-router-dom";
import bookListingTransition from "../functions/bookListingTransition";
import {
    BathroomIcon,
    BedroomIcon,
    HvacIcon,
    KitchenIcon,
    LaundryIcon,
    TvIcon,
    WifiIcon,
} from "./componentListingIcons";

const Listing: React.FC = () => {
    const [listing, setListing] = useState<any | undefined>(undefined);
    const {
        contract,
        contractState,
        zilPay,
        setCurrentUser,
        currentBlockNumber,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const plusCode = listing?.location.replace(" ", "+").replace("+", "%2B");
    const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=${plusCode}&zoom=18`;

    useEffect(() => {
        (async () => {
            if (!contractState) return;
            const currentEpochNumber = await getCurrentEpochNumber(zilPay);
            setCurrentBlockNumber(currentEpochNumber);
            const currentUser = getCurrentUser(contractState, zilPay);
            setCurrentUser(currentUser);
            const listing = formatListings(
                contractState,
                currentEpochNumber,
                currentUser.address
            ).filter((listing) => {
                return listing.id === id;
            })?.[0];
            if (!listing) history.push("/listings");
            setListing(listing);
        })();
    }, [contractState, currentBlockNumber]);

    const makeReservation = () => {
        bookListingTransition(contract, zilPay, listing.id, listing.price);
    };

    return (
        <>
            {listing ? (
                <div className="container mx-auto px-4 lg:px-2 pb-20">
                    <div className="pt-20 pb-10">
                        <h1 className="text-gray-900 text-3xl font-medium">
                            {listing.name}
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        <div className="order-2 lg:order-none lg:col-span-2">
                            <img
                                className="rounded-xl bg-gray-100"
                                src={listing.image}
                            />
                            <div className="max-w-prose mt-20 mb-12">
                                <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                    About
                                </h2>
                                <p className="text-gray-700">
                                    {listing.description}
                                </p>
                            </div>
                            <div className="h-px bg-gray-300"></div>
                            <div className="my-12">
                                <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                    Rooms
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                                    <div className="border p-6 rounded-lg">
                                        <BedroomIcon />
                                        <p className="text-lg text-gray-900 pt-1">
                                            {listing.rooms} Bedroom
                                            {listing.rooms > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="border p-6 rounded-lg">
                                        <BathroomIcon />
                                        <p className="text-lg text-gray-900 pt-1">
                                            {listing.bathrooms} Bathroom
                                            {listing.bathrooms > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-300"></div>
                            {Object.values(listing.amenities).filter?.(
                                (amenity: any) => {
                                    return amenity;
                                }
                            ).length > 0 && (
                                <div className="my-12">
                                    <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                        Amenities
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        {listing.amenities.wifi && (
                                            <div className="flex items-center">
                                                <WifiIcon />
                                                <p className="pl-4">WiFi</p>
                                            </div>
                                        )}
                                        {listing.amenities.kitchen && (
                                            <div className="flex items-center">
                                                <KitchenIcon />
                                                <p className="pl-4">Kitchen</p>
                                            </div>
                                        )}
                                        {listing.amenities.tv && (
                                            <div className="flex items-center">
                                                <TvIcon />
                                                <p className="pl-4">
                                                    Television
                                                </p>
                                            </div>
                                        )}
                                        {listing.amenities.laundry && (
                                            <div className="flex items-center">
                                                <LaundryIcon />
                                                <p className="pl-4">Laundry</p>
                                            </div>
                                        )}
                                        {listing.amenities.hvac && (
                                            <div className="flex items-center">
                                                <HvacIcon />
                                                <p className="pl-4">HVAC</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {plusCode && (
                                <>
                                    <div className="h-px bg-gray-300"></div>
                                    <div className="my-12">
                                        <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                            Location
                                        </h2>
                                        <iframe
                                            className="w-full h-96 bg-gray-100"
                                            src={mapEmbedUrl}
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="order-1">
                            <div className="sticky top-32 p-6 rounded-xl border-2 w-full">
                                <div className="text-center">
                                    <p className="mt-4 mb-8 text-xl text-gray-900 font-medium">
                                        {listing.price} ZIL
                                        <span className="text-gray-700 font-normal">
                                            {" "}
                                            / night
                                        </span>
                                    </p>
                                    {listing.rented && (
                                        <p className="mb-10 px-2 py-1 bg-gray-200 text-gray-600 rounded uppercase text-xs tracking-wide font-semibold  inline-block">
                                            Unavailable
                                        </p>
                                    )}
                                </div>
                                <Button
                                    modal
                                    onClick={makeReservation}
                                    text="Make Reservation"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : zilPay.wallet.isConnect ? (
                <p className="pt-20 text-xl text-center">Loading</p>
            ) : (
                <p className="pt-20 text-xl text-center">
                    Please connect ZilPay
                </p>
            )}
        </>
    );
};

export default Listing;
```

[/src/components/componentListing.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentListing.tsx)
