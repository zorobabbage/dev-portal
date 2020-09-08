(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{152:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return d}));var a=n(2),r=n(6),i=(n(0),n(257)),o={id:"staking-ssn-maintenance",title:"SSN Maintenance",keywords:["staking","ssn","maintenance","resync node","upgrading node","zilliqa"],description:"Staking SSN Maintenance"},c={id:"staking/phase0/staking-ssn-maintenance",isDocsHomePage:!1,title:"SSN Maintenance",description:"Staking SSN Maintenance",source:"@site/docs/staking/phase0/staking-ssn-maintenance.md",permalink:"/docs/staking/phase0/staking-ssn-maintenance",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/staking/phase0/staking-ssn-maintenance.md",sidebar:"StakingSidebar",previous:{title:"Smart contract operations",permalink:"/docs/staking/phase0/staking-ssn-operations"},next:{title:"Frequently asked question (FAQ)",permalink:"/docs/staking/phase0/staking-faq"}},s=[{value:"Seed Node Status Page",id:"seed-node-status-page",children:[]},{value:"How to Resync Node",id:"how-to-resync-node",children:[{value:"Upgrading the Seed Node",id:"upgrading-the-seed-node",children:[]}]}],l={rightToc:s};function d(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("hr",null),Object(i.b)("h2",{id:"seed-node-status-page"},"Seed Node Status Page"),Object(i.b)("p",null,"We provide a web application, Zilliqa Staking Viewer, to track all available seed node operators. You can access it at:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Network"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Link"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Testnet"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"https://stg-staking-viewer.zilliqa.com/"}),"https://stg-staking-viewer.zilliqa.com/"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Mainnet"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"https://staking-viewer.zilliqa.com/"}),"https://staking-viewer.zilliqa.com/"))))),Object(i.b)("h2",{id:"how-to-resync-node"},"How to Resync Node"),Object(i.b)("p",null,"The node might go out of sync if it fails to receive new blocks from the network. In this case, the node would ideally automatically sync without any manual intervention."),Object(i.b)("p",null,"However, if the node is unable to resync on its own, it will need to be launched again in a fresh mode (i.e. clean start). Please refer to the section  ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"staking-getting-started#preparing-the-node"}),"Preparing the node")," at Getting started page"),Object(i.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Make sure to back up your keys."))),Object(i.b)("h3",{id:"upgrading-the-seed-node"},"Upgrading the Seed Node"),Object(i.b)("h4",{id:"docker"},"Docker"),Object(i.b)("p",null,"Please refer to the section  ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"staking-getting-started#launching-the-node-using-docker"}),"Preparing the node for docker build"),"."),Object(i.b)("h4",{id:"native-build"},"Native Build"),Object(i.b)("p",null,"Please refer to the section  ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"staking-getting-started#launching-the-node-using-docker"}),"Preparing the node for native build"),"."))}d.isMDXComponent=!0},257:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return g}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),d=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=d(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=d(n),u=a,g=b["".concat(o,".").concat(u)]||b[u]||p[u]||i;return n?r.a.createElement(g,c(c({ref:t},l),{},{components:n})):r.a.createElement(g,c({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);