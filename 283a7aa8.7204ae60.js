(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return d}));var a=n(2),i=n(6),r=(n(0),n(299)),l=n(306),c={id:"dev-rentonzilliqa-frontend",title:"Introduction to the frontend",keywords:["react","rentonzilliqa","frontend"],description:"Creating the RentOnZilliqa frontend application"},o={id:"dev/dev-rentonzilliqa-frontend",isDocsHomePage:!1,title:"Introduction to the frontend",description:"Creating the RentOnZilliqa frontend application",source:"@site/docs/dev/dev-rentonzilliqa-frontend.mdx",permalink:"/docs/dev/dev-rentonzilliqa-frontend",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/dev/dev-rentonzilliqa-frontend.mdx",sidebar:"DevelopersSidebar",previous:{title:"Transitions",permalink:"/docs/dev/dev-rentonzilliqa-transitions"},next:{title:"Components",permalink:"/docs/dev/dev-rentonzilliqa-components"}},b=[{value:"Technology",id:"technology",children:[]},{value:"Pages",id:"pages",children:[{value:"Listings Page",id:"listings-page",children:[]},{value:"Individual Listing Page",id:"individual-listing-page",children:[]}]},{value:"Modals",id:"modals",children:[{value:"Account creation and ZilPay",id:"account-creation-and-zilpay",children:[]},{value:"Creating and Managing Listings",id:"creating-and-managing-listings",children:[]}]},{value:"Building the Frontend",id:"building-the-frontend",children:[]},{value:"Built by Quinence",id:"built-by-quinence",children:[]}],s={rightToc:b};function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("hr",null),Object(r.b)("p",null,"In this section, we will build the frontend application for accessing RentOnZilliqa."),Object(r.b)("h2",{id:"technology"},"Technology"),Object(r.b)("p",null,"The frontend is built using ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebook/create-react-app"}),"Create React App")," with ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.typescriptlang.org"}),"TypeScript")," enabled. We rely on ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com"}),"Tailwind CSS")," for styling the application. The setup for these is freely available on the respective documentations."),Object(r.b)("p",null,"Using ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://zilpay.io"}),"ZilPay"),", we will connect the frontend elements to the transitions and state of the Smart Contract."),Object(r.b)("h2",{id:"pages"},"Pages"),Object(r.b)("p",null,"The frontend will consist of a homepage which shows all the available listings. Details about each listing will be displayed on a separate listing page."),Object(r.b)("h3",{id:"listings-page"},"Listings Page"),Object(r.b)("p",null,"This page lists all the houses that have been posted on the platform. For users with a host account, it also shows the listings managed by them."),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Listings Page",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/listings.png")})))),Object(r.b)("tbody",{parentName:"table"})),Object(r.b)("br",null),Object(r.b)("h3",{id:"individual-listing-page"},"Individual Listing Page"),Object(r.b)("p",null,"This page presents the details about the listing. Users can make a reservation for the listing from this page."),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Individual Listing Page",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/listing-1.png")})))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Individual Listing Page",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/listing-2.png")}))))),Object(r.b)("br",null),Object(r.b)("h2",{id:"modals"},"Modals"),Object(r.b)("p",null,"Most actions, including account and listing creation, booking, etc., will be accessible via modals."),Object(r.b)("h3",{id:"account-creation-and-zilpay"},"Account creation and ZilPay"),Object(r.b)("p",null,"On the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"#listings-page"}),"Listings Page"),", the user can create an account. This is done via a modal, which provides options to connect ZilPay and the form for account creation."),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Account Modal",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/account.png")})))),Object(r.b)("tbody",{parentName:"table"})),Object(r.b)("br",null),Object(r.b)("h3",{id:"creating-and-managing-listings"},"Creating and Managing Listings"),Object(r.b)("p",null,"From the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"#listings-page"}),"Listings Page"),", a host user can create listings and manage existing listings via modals."),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Create Listing Modal",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/create-listing.png")})))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(r.b)("img",{alt:"Update Listing Modal",width:"1600",src:Object(l.a)("img/dev/rentonzilliqa/update-listing.png")}))))),Object(r.b)("h2",{id:"building-the-frontend"},"Building the Frontend"),Object(r.b)("p",null,"In the coming sections, we will build the frontend in the following stages:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-library"}),"Components")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-scripting"}),"Scripting")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-modals"}),"Modals")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/dev/dev-rentonzilliqa-pages"}),"Pages"))),Object(r.b)("h2",{id:"built-by-quinence"},"Built by Quinence"),Object(r.b)("img",{alt:"Quinence Logo",src:"https://quinence.com/favicon-196x196.png",width:"60"}),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://quinence.com"}),"Quinence - Digital product specialists from Singapore"),"."))}d.isMDXComponent=!0},299:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return g}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),s=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=s(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,b=o(e,["components","mdxType","originalType","parentName"]),d=s(n),u=a,g=d["".concat(l,".").concat(u)]||d[u]||p[u]||r;return n?i.a.createElement(g,c(c({ref:t},b),{},{components:n})):i.a.createElement(g,c({ref:t},b))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=u;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var b=2;b<r;b++)l[b]=n[b];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},305:function(e,t,n){"use strict";var a=n(0),i=n(35);t.a=function(){return Object(a.useContext)(i.a)}},306:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(305),i=n(307);function r(e,{forcePrependBaseUrl:t=!1,absolute:n=!1}={}){const{siteConfig:{baseUrl:r="/",url:l}={}}=Object(a.a)();if(!e)return e;if(t)return r+e;if(!Object(i.a)(e))return e;const c=r+e.replace(/^\//,"");return n?l+c:c}},307:function(e,t,n){"use strict";function a(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}n.d(t,"a",(function(){return a}))}}]);