(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{198:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return s}));var n=a(2),r=a(6),l=(a(0),a(257)),c=a(261),i=a(262),b={id:"api-blockchain-get-prev-ds-difficulty",title:"GetPrevDSDifficulty"},o={id:"apis/api-blockchain-get-prev-ds-difficulty",isDocsHomePage:!1,title:"GetPrevDSDifficulty",description:"---",source:"@site/docs/apis/api-blockchain-get-prev-ds-difficulty.mdx",permalink:"/docs/apis/api-blockchain-get-prev-ds-difficulty",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/apis/api-blockchain-get-prev-ds-difficulty.mdx",sidebar:"APIsSideBar",previous:{title:"GetPrevDifficulty",permalink:"/docs/apis/api-blockchain-get-prev-difficulty"},next:{title:"GetTotalCoinSupply",permalink:"/docs/apis/api-blockchain-get-total-coin-supply"}},p=[{value:"Example Request",id:"example-request",children:[]},{value:"Example Response",id:"example-response",children:[]},{value:"HTTP Request",id:"http-request",children:[]},{value:"Arguments",id:"arguments",children:[]}],u={rightToc:p};function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(n.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(l.b)("hr",null),Object(l.b)("p",null,"Returns the minimum DS difficulty of the previous block. This is represented as an ",Object(l.b)("inlineCode",{parentName:"p"},"Number"),"."),Object(l.b)("h3",{id:"example-request"},"Example Request"),Object(l.b)(c.a,{defaultValue:"cURL",values:[{label:"cURL",value:"cURL"},{label:"node.js",value:"node.js"},{label:"java",value:"java"},{label:"python",value:"python"},{label:"go",value:"go"}],mdxType:"Tabs"},Object(l.b)(i.a,{value:"cURL",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),'curl -d \'{\n    "id": "1",\n    "jsonrpc": "2.0",\n    "method": "GetPrevDSDifficulty",\n    "params": [""]\n}\' -H "Content-Type: application/json" -X POST "https://api.zilliqa.com/"\n'))),Object(l.b)(i.a,{value:"node.js",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const prevDSDifficulty = await zilliqa.blockchain.getPrevDSDifficulty();\nconsole.log(prevDSDifficulty.result);\n"))),Object(l.b)(i.a,{value:"java",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-java"}),'public class App {\n    public static void main(String[] args) throws IOException {\n        HttpProvider client = new HttpProvider("https://api.zilliqa.com/");\n        Rep<Integer> prevDSDifficulty = client.getPrevDSDifficulty();\n        System.out.println(new Gson().toJson(prevDSDifficulty));\n    }\n}\n'))),Object(l.b)(i.a,{value:"python",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-python"}),"from pyzil.zilliqa import chain\nchain.set_active_chain(chain.MainNet)\nprint(chain.active_chain.api.GetPrevDSDifficulty())\n"))),Object(l.b)(i.a,{value:"go",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-go"}),'func GetPrevDSDifficulty() {\n    provider := NewProvider("https://api.zilliqa.com/")\n    response := provider.GetPrevDSDifficulty()\n    result, _ := json.Marshal(response)\n    fmt.Println(string(result))\n}\n')))),Object(l.b)("h3",{id:"example-response"},"Example Response"),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),'{\n  "id": "1",\n  "jsonrpc": "2.0",\n  "result": 149\n}\n')),Object(l.b)("h3",{id:"http-request"},"HTTP Request"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Chain(s)"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"URL(s)"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("strong",{parentName:"td"},"Zilliqa mainnet")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("a",Object(n.a)({parentName:"td"},{href:"https://api.zilliqa.com/"}),"https://api.zilliqa.com/"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("strong",{parentName:"td"},"Developer testnet")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("a",Object(n.a)({parentName:"td"},{href:"https://dev-api.zilliqa.com/"}),"https://dev-api.zilliqa.com/"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("strong",{parentName:"td"},"Local testnet")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"http://localhost:4201/")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("strong",{parentName:"td"},"Isolated server")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"http://localhost:5555/")))),Object(l.b)("h3",{id:"arguments"},"Arguments"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameter"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Required"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"id")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Required"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},'"1"'))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"jsonrpc")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Required"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},'"2.0"'))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"method")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Required"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},'"GetPrevDSDifficulty"'))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"params")),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Required"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Empty string ",Object(l.b)("inlineCode",{parentName:"td"},'""'))))))}s.isMDXComponent=!0},257:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function b(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=r.a.createContext({}),p=function(e){var t=r.a.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return r.a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,c=e.parentName,o=b(e,["components","mdxType","originalType","parentName"]),u=p(a),d=n,m=u["".concat(c,".").concat(d)]||u[d]||s[d]||l;return a?r.a.createElement(m,i(i({ref:t},o),{},{components:a})):r.a.createElement(m,i({ref:t},o))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,c=new Array(l);c[0]=d;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var o=2;o<l;o++)c[o]=a[o];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},258:function(e,t,a){"use strict";function n(e){var t,a,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(r&&(r+=" "),r+=a);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,a=0,r="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(r&&(r+=" "),r+=t);return r}},259:function(e,t,a){"use strict";var n=a(0);const r=Object(n.createContext)({tabGroupChoices:{},setTabGroupChoices:()=>{},isAnnouncementBarClosed:!1,closeAnnouncementBar:()=>{}});t.a=r},260:function(e,t,a){"use strict";var n=a(0),r=a(259);t.a=function(){return Object(n.useContext)(r.a)}},261:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(260),c=a(258),i=a(92),b=a.n(i);const o=37,p=39;t.a=function(e){const{block:t,children:a,defaultValue:i,values:u,groupId:s}=e,{tabGroupChoices:d,setTabGroupChoices:m}=Object(l.a)(),[j,O]=Object(n.useState)(i);if(null!=s){const e=d[s];null!=e&&e!==j&&u.some(t=>t.value===e)&&O(e)}const f=e=>{O(e),null!=s&&m(s,e)},g=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(c.a)("tabs",{"tabs--block":t})},u.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":j===e,className:Object(c.a)("tabs__item",b.a.tabItem,{"tabs__item--active":j===e}),key:e,ref:e=>g.push(e),onKeyDown:e=>((e,t,a)=>{switch(a.keyCode){case p:((e,t)=>{const a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()})(e,t);break;case o:((e,t)=>{const a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()})(e,t)}})(g,e.target,e),onFocus:()=>f(e),onClick:()=>f(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(a).filter(e=>e.props.value===j)[0]))}},262:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("div",null,e.children)}}}]);