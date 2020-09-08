(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{190:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return p}));var n=a(2),r=a(6),i=(a(0),a(257)),c=a(261),b=a(262),l={id:"staking-ssn-operations",title:"Smart contract operations",keywords:["staking","ssn","smart contract","resync node","upgrading node","zilliqa"],description:"Staking Smart Contract"},o={id:"staking/phase0/staking-ssn-operations",isDocsHomePage:!1,title:"Smart contract operations",description:"Staking Smart Contract",source:"@site/docs/staking/phase0/staking-ssn-operations.mdx",permalink:"/docs/staking/phase0/staking-ssn-operations",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/staking/phase0/staking-ssn-operations.mdx",sidebar:"StakingSidebar",previous:{title:"Setting up the SSN",permalink:"/docs/staking/phase0/staking-getting-started"},next:{title:"SSN Maintenance",permalink:"/docs/staking/phase0/staking-ssn-maintenance"}},s=[{value:"Security Audit of Smart Contract",id:"security-audit-of-smart-contract",children:[]},{value:"Enrollment Into the Smart Contract",id:"enrollment-into-the-smart-contract",children:[]},{value:"Getting Testnet $ZIL (Testnet only)",id:"getting-testnet-zil-testnet-only",children:[]},{value:"Introduction to Staked Seed Node Smart Contract",id:"introduction-to-staked-seed-node-smart-contract",children:[]},{value:"Smart Contract Information",id:"smart-contract-information",children:[]},{value:"SSN Address and Key Pair Management",id:"ssn-address-and-key-pair-management",children:[]},{value:"Stake Deposit",id:"stake-deposit",children:[{value:"Why a Stake Deposit is Required",id:"why-a-stake-deposit-is-required",children:[]},{value:"Stake Deposit Process",id:"stake-deposit-process",children:[]},{value:"How to Check the Current Stake Deposit and Stake Buffered Amount?",id:"how-to-check-the-current-stake-deposit-and-stake-buffered-amount",children:[]},{value:"Withdrawal of Stake Deposit",id:"withdrawal-of-stake-deposit",children:[]}]},{value:"Getting Rewards",id:"getting-rewards",children:[{value:"How Rewards are Given",id:"how-rewards-are-given",children:[]},{value:"Reward Estimator Utility",id:"reward-estimator-utility",children:[]},{value:"Penalty for Rewards",id:"penalty-for-rewards",children:[]},{value:"CLI Way to Check Current Rewards",id:"cli-way-to-check-current-rewards",children:[]}]},{value:"Withdrawing Rewards",id:"withdrawing-rewards",children:[{value:"Withdraw Reward Process",id:"withdraw-reward-process",children:[]},{value:"CLI Way to Withdraw Current Rewards",id:"cli-way-to-withdraw-current-rewards",children:[]}]}],d={rightToc:s};function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("hr",null),Object(i.b)("h2",{id:"security-audit-of-smart-contract"},"Security Audit of Smart Contract"),Object(i.b)("p",null,"The smart contracts have been audited by ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://quantstamp.com/"}),"Quantstamp"),". A copy of the security audit report can be found in our ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/Staked_Seed_Node_SSN_Operations-Report.pdf"}),"Github repository")," or on ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://certificate.quantstamp.com/"}),"Quantstamp certification website"),"."),Object(i.b)("h2",{id:"enrollment-into-the-smart-contract"},"Enrollment Into the Smart Contract"),Object(i.b)("p",null,"We will require you to provide us the following information via the communication channel we have established with you"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Zilliqa address where you will deposit/withdraw stake and receive rewards*"),Object(i.b)("li",{parentName:"ul"},"Your IP address"),Object(i.b)("li",{parentName:"ul"},"Your port(s) if you have changed any of default ports")),Object(i.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"We highly recommend to use a secured keypair for depositing stake, withdrawing stake and withdrawing reward. Please do not reuse the keypair you use for running your staked seed node."))),Object(i.b)("p",null,"Upon providing the information, the Zilliqa team will proceed to add your staked seed node information into the smart contract and informed you once it is done."),Object(i.b)("h2",{id:"getting-testnet-zil-testnet-only"},"Getting Testnet $ZIL (Testnet only)"),Object(i.b)("p",null,"To get you started, let us know the amount of testnet $ZIL you wish to get and we will send to your address. We recommend the following values"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"$ZIL"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Purpose"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"50,000 testnet $ZIL"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"For depositing stake")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"5,000 testnet $ZIL"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"For gas fees")))),Object(i.b)("p",null,"Also, if you need a small amount of testnet $ZIL from time to time, you can go to our ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://dev-wallet.zilliqa.com/faucet"}),"Testnet Faucet")," to request for it."),Object(i.b)("h2",{id:"introduction-to-staked-seed-node-smart-contract"},"Introduction to Staked Seed Node Smart Contract"),Object(i.b)("p",null,"The following guide will use Zilliqa ZLI and SDK as an example for interacting with the smart contract. "),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"tip")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"For ZLI installation and initialisation of the wallet in ZLI, please refer to the README documentation at ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/Zilliqa/zli"}),"https://github.com/Zilliqa/zli")))),Object(i.b)("p",null,"The staked seed node smart contract will be used in the following ways:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Allows addition/removal of staked seed node"),Object(i.b)("li",{parentName:"ul"},"Allows for deposit of stake reward to staked seed node operator"),Object(i.b)("li",{parentName:"ul"},"Allows staked seed node operator to deposit stake deposit"),Object(i.b)("li",{parentName:"ul"},"Allows staked seed node operator to withdraw stake deposit"),Object(i.b)("li",{parentName:"ul"},"Allows staked seed node operator to withdraw stake reward")),Object(i.b)("p",null,"For staked seed node operators, a number of smart contract transition is available for them, namely:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"stake_deposit()")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"withdraw_stake_rewards()")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"withdraw_stake_amount()"))),Object(i.b)("h2",{id:"smart-contract-information"},"Smart Contract Information"),Object(i.b)("p",null,"We have two smart contracts, namely ",Object(i.b)("inlineCode",{parentName:"p"},"proxy")," and ",Object(i.b)("inlineCode",{parentName:"p"},"ssnlist"),". Proxy contract stores the implementation address of ",Object(i.b)("inlineCode",{parentName:"p"},"ssnlist")," and forwards all calls to the logic contract, ",Object(i.b)("inlineCode",{parentName:"p"},"ssnlist"),"."),Object(i.b)("p",null,"As such, any user who wishes to interact with the contract, should interact with ",Object(i.b)("inlineCode",{parentName:"p"},"proxy")," contract only."),Object(i.b)(c.a,{defaultValue:"testnet",values:[{label:"Testnet",value:"testnet"},{label:"Mainnet",value:"mainnet"}],mdxType:"Tabs"},Object(i.b)(b.a,{value:"testnet",mdxType:"TabItem"},Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Address"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"proxy"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Bech32: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil135gsjk2wqxwecn00axm2s40ey6g6ne8668046h?network=testnet"}),"zil135gsjk2wqxwecn00axm2s40ey6g6ne8668046h")," ",Object(i.b)("br",null)," Base16: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/0x8d1109594e019d9c4defe9b6a855f92691a9e4fa?network=testnet"}),"0x8d1109594e019d9c4defe9b6a855f92691a9e4fa"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ssnlist"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Bech32: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil106pzq6thrzhxq2xuepa6807pmkrsepqdf0yrd6?network=testnet"}),"zil106pzq6thrzhxq2xuepa6807pmkrsepqdf0yrd6")," ",Object(i.b)("br",null)," Base16: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/0x7e8220697718ae6028dcc87ba3bfc1dd870c840d?network=testnet"}),"0x7e8220697718ae6028dcc87ba3bfc1dd870c840d"))))),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameters"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Value"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Min stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"10k")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Max stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"100k")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Overall contract max stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"1M")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Reward cycle"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"3 DS blocks"))))),Object(i.b)(b.a,{value:"mainnet",mdxType:"TabItem"},Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Address"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"proxy"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Bech32: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil18r80y2g5yaazfxfjxhh0jtz2pvl8ushd7224ma"}),"zil18r80y2g5yaazfxfjxhh0jtz2pvl8ushd7224ma")," ",Object(i.b)("br",null)," Base16: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil18r80y2g5yaazfxfjxhh0jtz2pvl8ushd7224ma"}),"0x38Cef22914277a24993235Eef92C4A0b3e7E42ed"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ssnlist"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Bech32: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil16c4aejmulkx4vnnyt7m55rgsws088f8j5dl2rq"}),"zil16c4aejmulkx4vnnyt7m55rgsws088f8j5dl2rq")," ",Object(i.b)("br",null)," Base16: ",Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://viewblock.io/zilliqa/address/zil16c4aejmulkx4vnnyt7m55rgsws088f8j5dl2rq"}),"0xD62bDccb7CfD8D564e645FB74a0D10741e73a4f2"))))),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Parameters"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Value"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Min stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"10M")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Max stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"61M")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Overall contract max stake"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"610M")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Reward cycle"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"17 DS blocks")))))),Object(i.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"Notice")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Please use proxy contract address if you need to call the smart contract."))),Object(i.b)("h2",{id:"ssn-address-and-key-pair-management"},"SSN Address and Key Pair Management"),Object(i.b)("p",null,"Each staked seed node registered in the contract is associated with a Zilliqa mainnet address. This address is used to both deposit and withdraw funds as well as withdraw the rewards using the smart contract transitions listed above. Operators should take care to exercise whatever policies are in place in their organizations for managing the key pair associated with this address."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"Key management")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"The key pair used for staking the seed node has no relation to the operational key pair used by the seed node for communicating with other nodes in the network (i.e., the key pair contained in the mykey.txt file generated when launching the seed node). It is highly recommended not to use a single key pair for both purposes."))),Object(i.b)("h2",{id:"stake-deposit"},"Stake Deposit"),Object(i.b)("h3",{id:"why-a-stake-deposit-is-required"},"Why a Stake Deposit is Required"),Object(i.b)("p",null,'Having each operator deposit an amount in the contract ensures that rewarding is done on the basis of the staked seed node providing its API service uninterrupted. This is achieved by staking (the proportion of \u201cskin in the game\u201d). By depositing $ZILs, a seed node operator shows its commitment towards providing the seed node service. Without this "skin in the game", a seed node operator could decide to stop the service at will and may impact the ecosystem and the end-users.'),Object(i.b)("h3",{id:"stake-deposit-process"},"Stake Deposit Process"),Object(i.b)("p",null,"Currently, our rewarding cycle is paid out once ",Object(i.b)("strong",{parentName:"p"},"every 15 DS epochs"),". To deter abuse or gaming of the reward cycle, ",Object(i.b)("strong",{parentName:"p"},"the stake deposit will first be entered as a buffered deposit"),". At the next multiple of 15 DS epoch, the buffered deposit will be transferred to the stake deposit. From then on, the stake deposit will be eligible for rewards."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"CLI way to deposit stake amount")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a <proxy contract_address> -t stake_deposit -r "[]" -m <funds_in_Qa> -f true\n')),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a 0123456789012345678901234567890123456789 -t stake_deposit -r "[]" -m 10000000000000 -f true\n')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/stake_deposit.js"}),"stake_deposit.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/12b9e594578429db5699e5f2e116c1ed825fca23/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L67"}),"stakeDeposit()"))))),Object(i.b)("h3",{id:"how-to-check-the-current-stake-deposit-and-stake-buffered-amount"},"How to Check the Current Stake Deposit and Stake Buffered Amount?"),Object(i.b)("p",null,"The current stake deposit and stake buffered amount can be retrieved by querying the staking contract state:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),'curl -d \'{"id":"1", "jsonrpc": "2.0", "method": "GetSmartContractState", "params":["<staking_contract_address>"]}\' -H "Content-Type: application/json" -X POST "https://api.zilliqa.com" \n')),Object(i.b)("p",null,"In the response, under \u201cssnlist: {...}\u201d, look for your staked seed node address. The first numeric value listed is the current stake deposit, and the second numeric value is the amount of accrued rewards."),Object(i.b)("p",null,"Example of stake deposit for a particular ssn address:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'{\n ...\n ...\n    "ssnlist" : {\n        "0xced263257fa2d12ed0d1fad74ac036162cec7989" : {\n            "arguments" : [\n            {\n                "argtypes" : [],\n                "arguments" : [],\n                "constructor" : "True"\n            },\n            "1000000001", \u2190 stake deposit\n            "0", \u2190 reward amount\n            "devapiziiliqacom",\n            "ziiliqacom",\n            "0" - stake buffered amount\n            ],\n            "argtypes" : [],\n            "constructor" : "Ssn"\n        }\n    },\n    ...\n    ...\n   }\n}\n')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code for getting stake buffered amount")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/get_stake_buffered_amount.js"}),"get_stake_buffered_amount.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/12b9e594578429db5699e5f2e116c1ed825fca23/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L184"}),"getStakeBufferedAmount()"))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code for getting stake amount (non-buffered)")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/get_stake_amount.js"}),"get_stake_amount.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/12b9e594578429db5699e5f2e116c1ed825fca23/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L180"}),"getStakeAmount()"))))),Object(i.b)("h3",{id:"withdrawal-of-stake-deposit"},"Withdrawal of Stake Deposit"),Object(i.b)("h4",{id:"what-happens-when-the-stake-deposit-is-withdrawn"},"What Happens When the Stake Deposit is Withdrawn?"),Object(i.b)("p",null,"For partial withdrawal, you will need to ensure that your stake deposit is larger than the minimum stake amount (",Object(i.b)("strong",{parentName:"p"},"10,000,000 ZIL"),") for the withdrawal to be successful."),Object(i.b)("p",null,"For full withdrawal, with the rewards not yet fully withdrawn, your staked seed node will become inactive. It can be reactivated by doing another stake deposit into the contract."),Object(i.b)("p",null,"For full withdrawal, with the rewards also fully withdrawn, your staked seed node will be removed from the list of staked seed nodes. The Zilliqa team will need to re-add your seed node into the contract should you wish to participate once again in staking."),Object(i.b)("h4",{id:"cli-way-to-withdraw-stake-deposit"},"CLI Way to Withdraw Stake Deposit"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Zli command: withdraw_stake_amount")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a <proxy contract_address> -t withdraw_stake_amount -r "[{\\"vname\\":\\"amount\\",\\"type\\":\\"Uint128\\",\\"value\\":\\"<amount>\\"}]" -f true\n')),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a 0123456789012345678901234567890123456789 -t withdraw_stake_amount -r "[{\\"vname\\":\\"amount\\",\\"type\\":\\"Uint128\\",\\"value\\":\\"500000000000\\"}]" -f true\n')),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Param ",Object(i.b)("inlineCode",{parentName:"p"},"amount")," here is expressed in ",Object(i.b)("inlineCode",{parentName:"p"},"Qa")," units (1 ",Object(i.b)("inlineCode",{parentName:"p"},"$ZIL")," = 1,000,000,000,000 ",Object(i.b)("inlineCode",{parentName:"p"},"Qa"),")."))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/withdraw_stake_amount.js"}),"withdraw_stake_amount.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/12b9e594578429db5699e5f2e116c1ed825fca23/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L104"}),"withdrawStakeAmount()"))))),Object(i.b)("h2",{id:"getting-rewards"},"Getting Rewards"),Object(i.b)("h3",{id:"how-rewards-are-given"},"How Rewards are Given"),Object(i.b)("p",null,"In order to be eligible for rewards, the staked seed node must satisfy all of the following criteria:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"It must be recognized as an active staked seed node in the staking smart contract."),Object(i.b)("li",{parentName:"ol"},"It must pass the checks for raw data storage requested by the Verifier."),Object(i.b)("li",{parentName:"ol"},"It must pass the checks for servicing API requests by the Verifier.")),Object(i.b)("p",null,"Rewards are given once ",Object(i.b)("strong",{parentName:"p"},"every 15 DS epochs"),". Over a period of a year, it is estimated that the staked seed node will receive approximately ",Object(i.b)("strong",{parentName:"p"},"10.42%")," of the stake deposit as reward, if the staked seed node has an uptime of 100%. "),Object(i.b)("p",null,"Rewards are not added to the stake deposit; they are stored separately from the stake deposit. When calculating the reward, the Verifier only takes the stake deposit into account. As such, there is ",Object(i.b)("strong",{parentName:"p"},"no \u201ccompounding\u201d effect")," for the rewards."),Object(i.b)("h3",{id:"reward-estimator-utility"},"Reward Estimator Utility"),Object(i.b)("p",null,"The reward estimator utility is accessible at ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://zilliqa.github.io/staking-calculator-plugin/index.html"}),"https://zilliqa.github.io/staking-calculator-plugin/index.html")),Object(i.b)("h3",{id:"penalty-for-rewards"},"Penalty for Rewards"),Object(i.b)("p",null,"If the staked seed node did not achieve 100% uptime, the reward will be reduced proportionally based on the number of checks passed."),Object(i.b)("h3",{id:"cli-way-to-check-current-rewards"},"CLI Way to Check Current Rewards"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Zli staking reward utility:")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"zli staking rewards -s ssn_operator -c <proxy contract_address> -a api_endpoint\n")),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"zli staking rewards -s 0x53e954391539f276c36a09167b795ab7e654fdb7 -c 343407558c9bb1f7ae737af80b90e1edf741a37a -a https://api.zilliqa.com\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/get_stake_rewards.js"}),"get_stake_rewards.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/12b9e594578429db5699e5f2e116c1ed825fca23/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L188"}),"getStakeRewards()"))))),Object(i.b)("h2",{id:"withdrawing-rewards"},"Withdrawing Rewards"),Object(i.b)("h3",{id:"withdraw-reward-process"},"Withdraw Reward Process"),Object(i.b)("p",null,"The withdrawal of the reward process is straightforward. The staked seed node operator will need to only invoke ",Object(i.b)("inlineCode",{parentName:"p"},"withdraw_stake_rewards()")," using the operator key, and the reward will be sent to the staked seed node operator address."),Object(i.b)("p",null,"For reward withdrawal, with full stake amount already withdrawn, your staked seed node will be removed from the list of staked seed nodes."),Object(i.b)("h3",{id:"cli-way-to-withdraw-current-rewards"},"CLI Way to Withdraw Current Rewards"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"zli command: withdraw_stake_rewards")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a <proxy contract_address> -t withdraw_stake_rewards -r "[]" -f true\n')),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'zli contract call -a 0123456789012345678901234567890123456789 -t withdraw_stake_rewards -r "[]" -f true\n')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"SDK sample code")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Language"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Link to sample code"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"NodeJS"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/NodeJS/SSN-Operators/withdraw_stake_rewards.js"}),"withdraw_stake_rewards.js"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Java"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/Zilliqa/staking-contract/blob/master/scripts/Java/src/main/java/com/zilliqa/staking/SSNOperator.java#L104"}),"withdrawStakeRewards()"))))))}p.isMDXComponent=!0},257:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return u}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=r.a.createContext({}),s=function(e){var t=r.a.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},d=function(e){var t=s(e.components);return r.a.createElement(o.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),d=s(a),m=n,u=d["".concat(c,".").concat(m)]||d[m]||p[m]||i;return a?r.a.createElement(u,b(b({ref:t},o),{},{components:a})):r.a.createElement(u,b({ref:t},o))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,c=new Array(i);c[0]=m;var b={};for(var l in t)hasOwnProperty.call(t,l)&&(b[l]=t[l]);b.originalType=e,b.mdxType="string"==typeof e?e:n,c[1]=b;for(var o=2;o<i;o++)c[o]=a[o];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},258:function(e,t,a){"use strict";function n(e){var t,a,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(r&&(r+=" "),r+=a);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,a=0,r="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(r&&(r+=" "),r+=t);return r}},259:function(e,t,a){"use strict";var n=a(0);const r=Object(n.createContext)({tabGroupChoices:{},setTabGroupChoices:()=>{},isAnnouncementBarClosed:!1,closeAnnouncementBar:()=>{}});t.a=r},260:function(e,t,a){"use strict";var n=a(0),r=a(259);t.a=function(){return Object(n.useContext)(r.a)}},261:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(260),c=a(258),b=a(92),l=a.n(b);const o=37,s=39;t.a=function(e){const{block:t,children:a,defaultValue:b,values:d,groupId:p}=e,{tabGroupChoices:m,setTabGroupChoices:u}=Object(i.a)(),[j,O]=Object(n.useState)(b);if(null!=p){const e=m[p];null!=e&&e!==j&&d.some(t=>t.value===e)&&O(e)}const h=e=>{O(e),null!=p&&u(p,e)},g=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(c.a)("tabs",{"tabs--block":t})},d.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":j===e,className:Object(c.a)("tabs__item",l.a.tabItem,{"tabs__item--active":j===e}),key:e,ref:e=>g.push(e),onKeyDown:e=>((e,t,a)=>{switch(a.keyCode){case s:((e,t)=>{const a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()})(e,t);break;case o:((e,t)=>{const a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()})(e,t)}})(g,e.target,e),onFocus:()=>h(e),onClick:()=>h(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(a).filter(e=>e.props.value===j)[0]))}},262:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("div",null,e.children)}}}]);