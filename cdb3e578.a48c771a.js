(window.webpackJsonp=window.webpackJsonp||[]).push([[158],{261:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(2),i=n(6),a=(n(0),n(299)),o={id:"dev-rentonzilliqa-contract",title:"Introduction",keywords:["scilla","contract","rentonzilliqa"],description:"The Scilla Contract for the RentOnZilliqa Application"},c={id:"dev/dev-rentonzilliqa-contract",isDocsHomePage:!1,title:"Introduction",description:"The Scilla Contract for the RentOnZilliqa Application",source:"@site/docs/dev/dev-rentonzilliqa-contract.mdx",permalink:"/docs/dev/dev-rentonzilliqa-contract",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/dev/dev-rentonzilliqa-contract.mdx",sidebar:"DevelopersSidebar",previous:{title:"Introduction",permalink:"/docs/dev/dev-rentonzilliqa-introduction"},next:{title:"Library",permalink:"/docs/dev/dev-rentonzilliqa-library"}},l=[{value:"Contract Planning",id:"contract-planning",children:[{value:"Listings",id:"listings",children:[]},{value:"Renter Accounts",id:"renter-accounts",children:[]},{value:"Host Accounts",id:"host-accounts",children:[]},{value:"The Notion of Time",id:"the-notion-of-time",children:[]}]},{value:"Building the Contract",id:"building-the-contract",children:[]}],s={rightToc:l};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("hr",null),Object(a.b)("p",null,"In this section, we will go through the process of writing the Scilla Contract for RentOnZilliqa. The contract will be deployed using the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://ide.zilliqa.com"}),"Scilla IDE"),"."),Object(a.b)("h2",{id:"contract-planning"},"Contract Planning"),Object(a.b)("p",null,"The logic of the contract is planned with the point of view of a renting platform. As such, we act as the renting platform and hence the owner of the contract. We collect a fixed commission from every rental transaction on the contract. The source code for the contract ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Quinence/zilliqa-fullstack-app-rentOnZilliqa/blob/main/src/scilla/RentOnZilliqa.scilla"}),"can be found here"),"."),Object(a.b)("h3",{id:"listings"},"Listings"),Object(a.b)("p",null,"Listings are the houses that can be posted on the platform, which are subsequently made available to the renters."),Object(a.b)("p",null,"We allow the creation of user accounts to facilitate using the platform. The accounts can have one of two roles:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"A Renter Account"),Object(a.b)("li",{parentName:"ul"},"A Host Account")),Object(a.b)("h3",{id:"renter-accounts"},"Renter Accounts"),Object(a.b)("p",null,"Renter Accounts can rent listings that are created on the platform. When the correct amount is sent for booking an available listing, the listing is made available to the renter account."),Object(a.b)("h3",{id:"host-accounts"},"Host Accounts"),Object(a.b)("p",null,"Host Accounts can create and manage listings on the platform. They can collect revenue from their listings. Hosts can also rent listings as long as they do not own the listing."),Object(a.b)("p",null,"Our contract has one immutable variable, i.e., ",Object(a.b)("inlineCode",{parentName:"p"},"owner")," of type ",Object(a.b)("inlineCode",{parentName:"p"},"ByStr20"),". We use this to store the wallet address of the contract owner."),Object(a.b)("h3",{id:"the-notion-of-time"},"The Notion of Time"),Object(a.b)("p",null,"Since listings can be rented for a limited amount of time, we need to devise a way of tracking the passage of time. We do this by measuring the change in the ",Object(a.b)("inlineCode",{parentName:"p"},"BLOCKNUMBER"),". In the following sections, we will see in detail how this is achieved."),Object(a.b)("h2",{id:"building-the-contract"},"Building the Contract"),Object(a.b)("p",null,"In the coming sections, we will build the contract. We will go through the following stages in detail:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-library"}),"Library")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-mutable-variables"}),"Mutable Variables")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-procedures"}),"Procedures")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-transitions"}),"Transitions"))))}u.isMDXComponent=!0},299:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),u=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=u(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},p=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=u(n),p=r,h=b["".concat(o,".").concat(p)]||b[p]||d[p]||a;return n?i.a.createElement(h,c(c({ref:t},s),{},{components:n})):i.a.createElement(h,c({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<a;s++)o[s]=n[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);