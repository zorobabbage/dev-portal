---
id: dev-rentonzilliqa-modals
title: 模态
keywords:
    - react
    - rentonzilliqa
    - modals
    - frontend
description: Creating the Modals for the RentOnZilliqa frontend application
---

---

在本节中，我们将为前端应用程序创建模态。 我们使用之前创建的 [`Modal`](dev-rentonzilliqa-components/#modal) 组件。

## 创建帐户模态

我们从 [创建帐户模态](dev-rentonzilliqa-frontend#account-creation-and-zilpay) 开始，它将用于连接到 ZilPay 钱包以及访问智能合约。

使用 [`Input`](dev-rentonzilliqa-components/#input) 和 [`Button`](dev-rentonzilliqa-components/#button) 组件。
使用 [`CheckBox`](dev-rentonzilliqa-components/#checkbox) 来选择用户角色。 需要时会显示一个用于连接 ZilPay 的按钮。

使用了 [`createAccountTransition`](#createaccounttransition) 函数。

```tsx
import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createUserTransition from "../functions/createUserTransition";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";
import Tick from "./componentTick";

type props = {
    showSignUp: boolean;
    setShowSignUp(visible: boolean): void;
};

const CreateAccountModal: React.FC<props> = (props) => {
    const { showSignUp, setShowSignUp } = props;
    const [name, setName] = useState<string | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>("host");
    const { zilPay, contract } = ContextContainer.useContainer();

    const createUser = async () => {
        const role = userRole === "host" ? "1" : "0";
        createUserTransition(contract, zilPay, name, role);
    };

    const connectZilPay = async () => {
        await zilPay.wallet.connect();
        window.location.reload();
    };

    useEffect(() => {
        setName(undefined);
        setUserRole("host");
    }, [setShowSignUp]);

    return (
        <Modal
            title="Create Account"
            visible={showSignUp}
            setVisible={setShowSignUp}
            buttonText={"Create Account"}
            onClick={createUser}
        >
            <>
                {!zilPay.wallet.isConnect && (
                    <>
                        <h4 className="text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                            ZilPay
                        </h4>
                        <Button
                            text={"Connect ZilPay"}
                            padding
                            onClick={connectZilPay}
                            modal
                        />
                    </>
                )}
                <Input name="Your name" value={name} setValue={setName} />
                <h4 className="text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Please select one
                </h4>
                <div className="flex gap-12 mb-8">
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setUserRole("host")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Host</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                userRole === "host" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    userRole === "host"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {userRole === "host" && <Tick />}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setUserRole("renter")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Rent</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                userRole !== "host" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    userRole !== "host"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {userRole !== "host" && <Tick />}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Modal>
    );
};

export default CreateAccountModal;
```

[`/src/components/componentCreateAccountModal.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentCreateAccountModal.tsx)

<br/>

## 创建房源模态

我们现在进入 [创建房源模态](dev-rentonzilliqa-frontend#creating-and-managing-listings)，房东用户将使用它来发布新房源。

使用 [`Input`](dev-rentonzilliqa-components/#input) 和 [`Button`](dev-rentonzilliqa-components/#button) 组件。
使用 [`AmenitiesInput`](dev-rentonzilliqa-components/#amenitiesinput) 来选择可用的便利设施。 需要时会显示一个用于连接 ZilPay 的按钮。

使用了 [`createListingTransition`](#createlistingtransition) 函数。

```tsx
import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createListingTransition from "../functions/createListingTransition";
import AmenitiesInput from "./componentAmenitiesInput";
import Input from "./componentInput";
import Modal from "./componentModal";

type props = {
    showCreateListing: boolean;
    setShowCreateListing(visible: boolean): void;
};

const CreateListingModal: React.FC<props> = (props) => {
    const { showCreateListing, setShowCreateListing } = props;

    const [name, setName] = useState<string | undefined>(undefined);
    const [description, setDescription] =
        useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [rooms, setRooms] = useState<string | undefined>(undefined);
    const [bathrooms, setBathrooms] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<string | undefined>(undefined);

    const [wifi, setWifi] = useState<boolean>(false);
    const [kitchen, setKitchen] = useState<boolean>(false);
    const [tv, setTv] = useState<boolean>(false);
    const [laundry, setLaundry] = useState<boolean>(false);
    const [hvac, setHvac] = useState<boolean>(false);

    const { contract, zilPay } = ContextContainer.useContainer();

    const createListing = () => {
        if (
            !name ||
            !description ||
            !price ||
            !rooms ||
            !bathrooms ||
            !location ||
            !image
        )
            return;
        createListingTransition(
            contract,
            zilPay,
            name,
            description,
            price,
            rooms,
            bathrooms,
            image,
            location,
            wifi,
            kitchen,
            tv,
            laundry,
            hvac
        );
    };

    useEffect(() => {
        setName(undefined);
        setDescription(undefined);
        setPrice(undefined);
        setRooms(undefined);
        setBathrooms(undefined);
        setLocation(undefined);
        setImage(undefined);
        setWifi(false);
        setKitchen(false);
        setTv(false);
        setLaundry(false);
        setHvac(false);
    }, [showCreateListing]);

    return (
        <Modal
            title="Create Listing"
            visible={showCreateListing}
            setVisible={setShowCreateListing}
            buttonText={"Create"}
            onClick={createListing}
        >
            <Input name="Name" value={name} setValue={setName} />
            <Input
                name="Description"
                value={description}
                setValue={setDescription}
            />
            <Input
                name="Rooms"
                value={rooms}
                type="number"
                setValue={setRooms}
            />
            <Input
                name="Bathrooms"
                value={bathrooms}
                type="number"
                setValue={setBathrooms}
            />
            <Input
                name="Price (ZIL)"
                unit="per night"
                value={price}
                type="number"
                setValue={setPrice}
            />
            <Input
                name="Image URL"
                value={image}
                type="text"
                setValue={setImage}
            />
            <Input
                name="Google Maps Plus Code"
                value={location}
                type="text"
                setValue={setLocation}
            />
            <AmenitiesInput
                {...{
                    wifi,
                    setWifi,
                    kitchen,
                    setKitchen,
                    tv,
                    setTv,
                    laundry,
                    setLaundry,
                    hvac,
                    setHvac,
                }}
            />
        </Modal>
    );
};

export default CreateListingModal;
```

[`/src/components/componentCreateListingModal.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentCreateListingModal.tsx)

<br/>

## 管理房源模态

我们现在进入 [管理房源模态](dev-rentonzilliqa-frontend#creating-and-managing-listings)，房东用户将使用它来管理房源。

使用 [`Input`](dev-rentonzilliqa-components/#input) 和 [`Button`](dev-rentonzilliqa-components/#button) 组件。
使用 [`AmenitiesInput`](dev-rentonzilliqa-components/#amenitiesinput) 来选择可用的便利设施。 需要时会显示一个用于连接 ZilPay 的按钮。

根据需要调用 [`deleteListingTransition`](#createlistingtransition)、[`updateListingTransition`](#updatelistingtransition) 和 [`claimRentTransition`](#claimrenttransition) 函数。

```tsx
import React, { useEffect, useState } from "react";
import claimRentTransition from "../functions/claimRentTransition";
import ContextContainer from "../functions/contextContainer";
import deleteListingTransition from "../functions/deleteListingTransition";
import updateListingTransition from "../functions/updateListingTransition";
import AmenitiesInput from "./componentAmenitiesInput";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";

type props = {
    modalListing: any;
    showManageListing: boolean;
    setShowManageListing(visible: boolean): void;
};

const ManageListingModal: React.FC<props> = (props) => {
    const { showManageListing, setShowManageListing, modalListing } = props;
    const { id, accumulated_rent } = modalListing;

    const [name, setName] = useState<string | undefined>(undefined);
    const [description, setDescription] =
        useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [rooms, setRooms] = useState<string | undefined>(undefined);
    const [bathrooms, setBathrooms] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<string | undefined>(undefined);

    const [wifi, setWifi] = useState<boolean>(false);
    const [kitchen, setKitchen] = useState<boolean>(false);
    const [tv, setTv] = useState<boolean>(false);
    const [laundry, setLaundry] = useState<boolean>(false);
    const [hvac, setHvac] = useState<boolean>(false);

    const { contract, zilPay } = ContextContainer.useContainer();

    const updateListing = () => {
        if (
            !name ||
            !description ||
            !price ||
            !rooms ||
            !bathrooms ||
            !location ||
            !image
        )
            return;
        updateListingTransition(
            contract,
            zilPay,
            id,
            name,
            description,
            price,
            rooms,
            bathrooms,
            image,
            location,
            wifi,
            kitchen,
            tv,
            laundry,
            hvac
        );
    };

    const claimRent = () => {
        claimRentTransition(contract, zilPay, id);
        setShowManageListing(false);
    };

    const deleteListing = () => {
        deleteListingTransition(contract, zilPay, id);
        setShowManageListing(false);
    };

    useEffect(() => {
        setName(modalListing.name);
        setDescription(modalListing.description);
        setPrice(modalListing.price);
        setRooms(modalListing.rooms);
        setBathrooms(modalListing.bathrooms);
        setLocation(modalListing.location);
        setImage(modalListing.image);
        setWifi(modalListing.amenities.wifi);
        setKitchen(modalListing.amenities.kitchen);
        setTv(modalListing.amenities.tv);
        setLaundry(modalListing.amenities.laundry);
        setHvac(modalListing.amenities.hvac);
    }, [showManageListing]);

    return (
        <Modal
            title="Manage Listing"
            visible={showManageListing}
            setVisible={setShowManageListing}
            buttonText={"Update Listing"}
            onClick={updateListing}
        >
            <>
                <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Accumulated Rent
                </h4>
                <div className="flex justify-between items-center pb-8">
                    <p className="text-2xl ">{accumulated_rent}</p>
                    <Button text={"Claim Rent"} onClick={claimRent} />
                </div>
            </>
            <>
                <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Delete Listing
                </h4>
                <Button
                    text={"Delete Listing"}
                    onClick={deleteListing}
                    alert
                    padding
                    modal
                />
            </>
            <Input name="Name" value={name} setValue={setName} />
            <Input
                name="Description"
                value={description}
                setValue={setDescription}
            />
            <Input
                name="Rooms"
                value={rooms}
                type="number"
                setValue={setRooms}
            />
            <Input
                name="Bathrooms"
                value={bathrooms}
                type="number"
                setValue={setBathrooms}
            />
            <Input
                name="Price (ZIL)"
                unit="per night"
                value={price}
                type="number"
                setValue={setPrice}
            />
            <Input
                name="Image URL"
                value={image}
                type="text"
                setValue={setImage}
            />
            <Input
                name="Google Maps Plus Code"
                value={location}
                type="text"
                setValue={setLocation}
            />
            <AmenitiesInput
                {...{
                    wifi,
                    setWifi,
                    kitchen,
                    setKitchen,
                    tv,
                    setTv,
                    laundry,
                    setLaundry,
                    hvac,
                    setHvac,
                }}
            />
        </Modal>
    );
};

export default ManageListingModal;
```

[`/src/components/componentManageListingModal.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentManageListingModal.tsx)
