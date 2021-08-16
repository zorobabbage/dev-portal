---
id: dev-rentonzilliqa-components
title: 组件
keywords:
    - react
    - rentonzilliqa
    - components
    - frontend
description: Creating the React Components for the RentOnZilliqa frontend application
---

---

在本节中，我们将构建在前端应用程序上使用的所有组件。

## 通用组件

### Button

我们从 [`/src/components/componentButton.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentButton.tsx) 中的一个基本按钮组件开始，此组件提供了各种自定义选项。

```tsx
import React from "react";

type props = {
    text: string;
    onClick(e: any): void;
    white?: boolean;
    header?: boolean;
    modal?: boolean;
    padding?: boolean;
    alert?: boolean;
};

const Button: React.FC<props> = (props) => {
    const {
        text,
        white = false,
        modal = false,
        onClick,
        padding = false,
        alert = false,
    } = props;
    const colours = white
        ? "text-gray-900 bg-white"
        : alert
        ? "text-white bg-red-600"
        : "text-white bg-gray-900";

    return (
        <button
            className={`font-medium py-3 text-sm lg:text-base rounded-button shadow-button ${colours} ${
                modal ? "w-full lg:text-base" : "px-3 lg:px-6"
            } ${padding ? "mb-10" : ""}`}
            {...{ onClick }}
        >
            {text}
        </button>
    );
};

export default Button;
```

[/src/components/componentButton.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentButton.tsx)

<br/>

### Header 

然后我们在 [`/src/components/componentHeader.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentHeader.tsx) 中创建一个 Header 组件，并将其作为在所有页面上使用的头部组件。

```tsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "./componentButton";

type props = {
    setShowSignUp(showSignUp: boolean): void;
};

const Header: React.FC<props> = (props) => {
    const { setShowSignUp } = props;

    return (
        <header className="bg-gray-900 sticky top-0 z-10">
            <div className="container mx-auto px-4 lg:px-2 py-3 flex justify-between items-center">
                <Link
                    className="text-white text-2xl font-medium cursor-pointer"
                    to="/listings"
                >
                    RentOnZilliqa
                </Link>
                <Button
                    text={"Create Account"}
                    onClick={() => setShowSignUp(true)}
                    white
                    header
                />
            </div>
        </header>
    );
};

export default Header;
```

[/src/components/componentHeader.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentHeader.tsx)

<br/>

### Modal

我们在 [`/src/components/componentModal.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentModal.tsx) 创建了一个 Modal 组件。 大多数 transition 通过模态来产生作用。 该组件负责基本的 Modal 功能和样式。

`title`; 主按钮设置为 `buttonText`； 关闭按钮； 和遮罩层都是这个组件的一部分。

传递给这个组件的 `children` 是模态中的内容。

`onClick` 函数将在主按钮被点击时被调用。

```tsx
import React, { useEffect } from "react";
import Button from "./componentButton";

type props = {
    title: string;
    children: JSX.Element | JSX.Element[];
    setVisible(visible: boolean): void;
    visible: boolean;
    buttonText: string;
    onClick(): void;
};

const Modal: React.FC<props> = (props) => {
    const { title, children, setVisible, visible, buttonText, onClick } = props;

    useEffect(() => {
        document.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onClick();
            }
        };
    }, []);

    return (
        <div
            className={
                "w-screen h-screen bg-black bg-opacity-25 fixed top-0 left-0 z-20 transition-all"
            }
            style={
                visible
                    ? {
                          opacity: 1,
                          visibility: "visible",
                          transform: "translateY(0)",
                      }
                    : {
                          opacity: 0,
                          visibility: "hidden",
                          transform: "translateY(30px)",
                      }
            }
            onClick={() => setVisible(false)}
        >
            <div className="w-full h-full flex justify-center items-center px-4 lg:px-2 py-2">
                <div
                    className="w-full lg:w-1/3 bg-white shadow-xl rounded-2xl max-h-full flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-8">
                        <p className="text-xl font-bold text-gray-900">
                            {title}
                        </p>
                        <button
                            className="p-1 rounded hover:bg-gray-100 transition-colors -mr-1"
                            onClick={() => setVisible(false)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="w-full px-8 pt-0 overflow-y-scroll flex-grow">
                        {children}
                    </div>
                    <div className="p-8">
                        <Button
                            modal
                            text={buttonText}
                            onClick={(e: any) => {
                                onClick();
                                setVisible(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
```

[/src/components/componentModal.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentModal.tsx)

<br/>

### ListingCard

我们在 [`/src/components/componentListingCard.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentListingCard.tsx) 创建了一个 ListingCard 组件。 此组件创建在房源页面上使用的列表卡。

```tsx
import React from "react";

type props = {
    id: string;
    name: string;
    price: string | number;
    rooms: string | number;
    bathrooms: string | number;
    image: string;
    renter: string | undefined;
    rented_till: string;
    accumulated_rent: string;
    rented: boolean;
    user_is_host: boolean;
    onClick(): void;
};

const ListingCard: React.FC<props> = (props) => {
    const { name, price, rooms, bathrooms, image, rented, onClick } = props;
    return (
        <div className="w-full rounded-2xl cursor-pointer" onClick={onClick}>
            <div
                className="w-full h-48 rounded-lg mb-4 bg-gray-100 flex justify-end items-start p-2"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                }}
            >
                {rented && (
                    <div>
                        <div className="px-2 py-1 bg-gray-200 text-gray-600 rounded uppercase text-xs tracking-wide font-semibold">
                            Unavailable
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center text-base font-light text-gray-600">
                <p>
                    {rooms} Room{rooms > 1 ? "s" : ""}
                </p>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2"></div>
                <p>
                    {bathrooms} Bathroom{bathrooms > 1 ? "s" : ""}
                </p>
            </div>
            <h3 className="text-gray-900 text-xl">{name}</h3>
            <p className="text-gray-900 font-semibold">
                {price} ZIL
                <span className="text-gray-600 font-light"> / night</span>
            </p>
        </div>
    );
};

export default ListingCard;
```

[/src/components/componentListingCard.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentListingCard.tsx)

<br/>

## 表单组件

### Input

我们在 [`/src/components/componentInput.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentInput.tsx) 创建一个 Input 组件。 这适用于将在其父组件中使用 `useState` 钩子创建的状态变量。 我们接受输入字段的 `name`。 输入的 `type` 和 `unit` 也被接受为可选的 props。

```tsx
import React from "react";

type props = {
    name: string;
    unit?: string;
    value?: string;
    setValue(value: string): void;
    type?: string;
};

const Input: React.FC<props> = (props) => {
    const { name, unit = "", value = "", setValue, type = "text" } = props;

    return (
        <div className="">
            <div className="flex justify-between items-center py-2 text-xs tracking-wide uppercase">
                <h4 className="font-semibold text-gray-500">{name}</h4>
                <p className="font-medium text-gray-400">{unit}</p>
            </div>
            <input
                className="w-full mb-6 border-2 border-gray-300 focus:border-gray-900 rounded-button outline-none text-gray-900 lg:text-lg px-4 py-3"
                placeholder={name}
                type={"text"}
                inputMode={type === "number" ? "decimal" : "text"}
                min={type === "number" ? 1 : undefined}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></input>
        </div>
    );
};

export default Input;
```

[/src/components/componentInput.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentInput.tsx)

<br/>

### CheckBox

我们在 [`/src/components/componentCheckBox.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentCheckBox.tsx) 创建一个 CheckBox 组件。 该组件在模态中使用。 CreateAccount 模态将其用于用户角色选择。 它还用于在 CreateListing 和 ManageListing 模态中选择便利设施。

```tsx
import React from "react";
import Tick from "./componentTick";

type props = {
    checked: boolean;
    setChecked(checked: boolean): void;
    children: any;
    name: String;
};

const CheckBox: React.FC<props> = (props) => {
    const { checked, setChecked, children, name } = props;
    return (
        <>
            <div
                className="flex justify-between items-center cursor-pointer mt-3"
                onClick={() => setChecked(!checked)}
            >
                <div className="flex items-center">
                    {children}
                    <p className="text-lg text-gray-800 pl-4">{name}</p>
                </div>
                <div
                    className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                        checked ? "" : "hover:bg-gray-300"
                    }`}
                >
                    <div
                        className={`w-full h-full rounded transition-colors text-transparent ${
                            checked ? "bg-gray-900 text-white" : ""
                        }`}
                    >
                        {checked && <Tick />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckBox;
```

[/src/components/componentCheckBox.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentCheckBox.tsx)

<br/>

### AmenitiesInput

我们在 [`/src/components/componentAmenitiesInput.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentAmenitiesInput.tsx) 创建了一个 AmenitiesInput 组件。 它对多个复选框进行分组，以在 CreateListing 和 ManageListing 模态中收集便利设施的可用性。 我们创建这个组件来简化代码。

```tsx
import React, { useEffect, useState } from "react";
import {
    HvacIcon,
    KitchenIcon,
    LaundryIcon,
    TvIcon,
    WifiIcon,
} from "./componentListingIcons";
import CheckBox from "./componentCheckBox";

type props = {
    wifi: boolean;
    setWifi(wifi: boolean): void;
    kitchen: boolean;
    setKitchen(kitchen: boolean): void;
    tv: boolean;
    setTv(tv: boolean): void;
    laundry: boolean;
    setLaundry(laundry: boolean): void;
    hvac: boolean;
    setHvac(hvac: boolean): void;
};

const AmenitiesInput: React.FC<props> = (props) => {
    const {
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
    } = props;
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        setSelectAll(!(wifi || kitchen || tv || laundry || hvac));
    }, [wifi, kitchen, tv, laundry, hvac]);

    const setAll = (value: boolean) => {
        setWifi(value);
        setKitchen(value);
        setTv(value);
        setLaundry(value);
        setHvac(value);
    };

    return (
        <>
            <div className="flex justify-between text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                <h4>Amenities</h4>
                <p
                    className="font-medium text-gray-400 cursor-pointer hover:text-gray-500 transition-colors"
                    onClick={() => setAll(selectAll)}
                >
                    {selectAll ? "Select All" : "Select None"}
                </p>
            </div>
            <CheckBox name="WiFi" checked={wifi} setChecked={setWifi}>
                <WifiIcon />
            </CheckBox>
            <CheckBox name="Kitchen" checked={kitchen} setChecked={setKitchen}>
                <KitchenIcon />
            </CheckBox>
            <CheckBox name="Television" checked={tv} setChecked={setTv}>
                <TvIcon />
            </CheckBox>
            <CheckBox name="Laundry" checked={laundry} setChecked={setLaundry}>
                <LaundryIcon />
            </CheckBox>
            <CheckBox name="HVAC" checked={hvac} setChecked={setHvac}>
                <HvacIcon />
            </CheckBox>
        </>
    );
};

export default AmenitiesInput;
```

[/src/components/componentAmenitiesInput.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentAmenitiesInput.tsx)

<br/>

## SVG 组件

### Tick

这个位于 [`/src/components/componentTick.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentTick.tsx) 的 Tick 组件用于制作 SVG，它可轻松用于 [CheckBox](#checkbox) 组件。

```tsx
import React from "react";

const Tick: React.FC = () => {
    return (
        <div className="w-full h-full grid place-items-center">
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </div>
    );
};

export default Tick;
```

[/src/components/componentTick.tsx](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentTick.tsx)

<br/>

### 房源 Icons

这个 [`/src/components/componentListingIcons.tsx`](https://github.com/Quinence/zilliqa-fullstack-app/blob/main/src/components/componentListingIcons.tsx) 文件包含几个 SVG 组件，用于房源页面以及房源管理模态。

这个组件包含以下：

-   `Wifi`
-   `Kitchen`
-   `TV`
-   `Laundry`
-   `HVAC`
-   `Bedroom`
-   `Bathroom`
