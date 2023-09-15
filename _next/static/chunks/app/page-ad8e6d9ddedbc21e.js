(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7418:function(e,n,i){Promise.resolve().then(i.bind(i,3829))},3829:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return N}});var a=i(7437),s=i(2265);let r=()=>(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("h1",{className:"text-3xl text-indigo-700",children:"Welcome to G-PST OpenSource Tool Entry Generator"}),(0,a.jsxs)("p",{className:"py-5 text-gray-700",children:[" Please use this form to fill out the details of your open source software record/s. At the end, you will be able to download JSON file containing the details of your entry. Please email this JSON file to ",(0,a.jsx)("span",{children:"gpst@gmail.com"}),". Our team will reach out to you once the record is approved and updated on the GPST website."]}),(0,a.jsx)("p",{className:"text-indigo-700",children:" Thanks for taking the time to submit your software tool for consideration."})]}),c=e=>{let{menu:n,activeMenu:i,setActiveMenu:s}=e;return(0,a.jsx)("div",{className:"",children:n.map(e=>(0,a.jsxs)("p",{className:"pb-5 hover:cursor-pointer hover:text-indigo-500 \n                    ".concat(i===e.name?"text-indigo-700 font-bold":""),onClick:()=>s(e.name),children:[" ",e.name]},e.name))})};var t=i(9222);let o=[{name:"Basic",component:e=>{let{formData:n,setFormData:i,errors:s}=e,r="outline-none text-orange-700 \n      px-2 py-1 border rounded-md outline-none w-full";return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-x-5",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" Name",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("input",{name:"name",value:n.name,type:"text",className:"".concat(r," ").concat(s.name?" border-red-500":""),placeholder:"Name of software tool.",onChange:e=>i(n=>({...n,[e.target.name]:e.target.value}))}),s.name&&(0,a.jsxs)("p",{className:"text-red-500 py-1 text-sm",children:[" ",s.name," "]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" URL",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("input",{name:"url",value:n.url,type:"text",className:"".concat(r," ").concat(s.url?" border-red-500":""),placeholder:"Web URL where the code is hosted.",onChange:e=>i(n=>({...n,[e.target.name]:e.target.value}))}),s.url&&(0,a.jsxs)("p",{className:"text-red-500 py-1 text-sm",children:[" ",s.url," "]})]})]}),(0,a.jsxs)("div",{className:"py-5",children:[(0,a.jsx)("p",{className:"pb-2",children:" Description "}),(0,a.jsx)("textarea",{name:"description",value:n.description,className:r,placeholder:"Long description for software tool.",onChange:e=>i(n=>({...n,[e.target.name]:e.target.value}))})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-x-5 gap-y-10",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" Year",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("input",{name:"created",type:"date",value:n.created,className:r,placeholder:"Date when software was open sourced.",onChange:e=>i(n=>({...n,[e.target.name]:e.target.value}))})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" License",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("select",{className:r,name:"license",value:n.license,onChange:e=>i(n=>({...n,[e.target.name]:e.target.value})),children:l.map(e=>(0,a.jsx)("option",{value:e.name,children:e.name},e.id))})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" Contact Email",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("input",{name:"email",value:n.email,type:"text",className:"".concat(r," ").concat(s.email?" border-red-500":""),placeholder:"Contact email if someone wants to reach out to you.",onChange:e=>i(n=>({...n,[e.target.name]:e.target.value}))}),s.email&&(0,a.jsxs)("p",{className:"text-red-500 py-1 text-sm",children:[" ",s.email," "]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" Organization",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("input",{name:"organization",value:n.organization,type:"text",className:r,onChange:e=>i(n=>({...n,[e.target.name]:e.target.value})),placeholder:"Name of organization which owns the copyright."})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"pb-2",children:[" Programming Language",(0,a.jsx)("span",{className:"text-red-500",children:" (required) "})]}),(0,a.jsx)("select",{className:r,name:"language",value:n.language,children:m.map(e=>(0,a.jsx)("option",{value:e.name,children:e.name},e.name))})]})]})]})}},{name:"Developers",component:e=>{let{formData:n,setFormData:i,errors:s}=e;return(0,a.jsx)("div",{children:"Developers"})}}],l=[{name:"1-clause BSD License",id:"BSD-1-Clause"},{name:"Academic Free License v. 3.0",id:"AFL-3.0"},{name:"Adaptive Public License 1.0",id:"APL-1.0"},{name:"Apache License, Version 2.0",id:"Apache-2.0"},{name:"Apache Software License, version 1.1",id:"Apache-1.1"},{name:"Apple Public Source License 2.0",id:"APSL-2.0"},{name:"Artistic License (Perl) 1.0",id:"Artistic-1.0-Perl"},{name:"Artistic License 1.0",id:"Artistic-1.0"},{name:"Artistic License 2.0",id:"Artistic-2.0"},{name:"Attribution Assurance License",id:"AAL"},{name:"Boost Software License 1.0",id:"BSL-1.0"},{name:"BSD+Patent",id:"BSD-2-Clause-Patent"},{name:"Cea Cnrs Inria Logiciel Libre License, version 2.1",id:"CECILL-2.1"},{name:"CERN Open Hardware Licence Version 2 Permissive",id:"CERN-OHL-P-2.0"},{name:"CERN Open Hardware Licence Version 2 Strongly Reciprocal",id:"CERN-OHL-S-2.0"},{name:"CERN Open Hardware Licence Version 2 Weakly Reciprocal",id:"CERN-OHL-W-2.0"},{name:"Common Development and Distribution License 1.0",id:"CDDL-1.0"},{name:"Common Public Attribution License Version 1.0",id:"CPAL-1.0"},{name:"Common Public License Version 1.0",id:"CPL-1.0"},{name:"Computer Associates Trusted Open Source License 1.1",id:"CATOSL-1.1"},{name:"Cryptographic Autonomy License",id:"CAL-1.0"},{name:"CUA Office Public License",id:"CUA-OPL-1.0"},{name:"Eclipse Public License -v 1.0",id:"EPL-1.0"},{name:"Eclipse Public License version 2.0",id:"EPL-2.0"},{name:"eCos License version 2.0",id:"eCos-2.0"},{name:"Educational Community License, Version 1.0",id:"ECL-1.0"},{name:"Educational Community License, Version 2.0",id:"ECL-2.0"},{name:"Eiffel Forum License, version 1",id:"EFL-1.0"},{name:"Eiffel Forum License, Version 2",id:"EFL-2.0"},{name:"Entessa Public License Version. 1.0",id:"Entessa"},{name:"EU DataGrid Software License",id:"EUDatagrid"},{name:"European Union Public License, version 1.2",id:"EUPL-1.2"},{name:"Fair License",id:"Fair"},{name:"Frameworx License 1.0",id:"Frameworx-1.0"},{name:"GNU Affero General Public License version 3",id:"AGPL-3.0-only"},{name:"GNU General Public License version 2",id:"GPL-2.0"},{name:"GNU General Public License version 3",id:"GPL-3.0-only"},{name:"GNU Lesser General Public License version 2.1",id:"LGPL-2.1"},{name:"GNU Lesser General Public License version 3",id:"LGPL-3.0-only"},{name:"GNU Library General Public License version 2",id:"LGPL-2.0-only"},{name:"Historical Permission Notice and Disclaimer",id:"HPND"},{name:"IBM Public License Version 1.0",id:"IPL-1.0"},{name:"Intel Open Source License",id:"Intel"},{name:"IPA Font License",id:"IPA"},{name:"ISC License",id:"ISC"},{name:"JAM License",id:"Jam"},{name:"LaTeX Project Public License, Version 1.3c",id:"LPPL-1.3c"},{name:"Lawrence Berkeley National Labs BSD Variant License",id:"BSD-3-Clause-LBNL"},{name:"Licence Libre du Qubec  Permissive version 1.1",id:"LiLiQ-P-1.1"},{name:"Licence Libre du Qubec  Rciprocit forte version 1.1",id:"LiLiQ-Rplus-1.1"},{name:"Licence Libre du Qubec  Rciprocit version 1.1",id:"LiLiQ-R-1.1"},{name:"Lucent Public License Version 1.02",id:"LPL-1.02"},{name:"Lucent Public License, Plan 9, version 1.0",id:"LPL-1.0"},{name:"Microsoft Public License",id:"MS-PL"},{name:"Microsoft Reciprocal License",id:"MS-RL"},{name:"MirOS License",id:"MirOS"},{name:"MIT No Attribution License",id:"MIT-0"},{name:"Motosoto Open Source License",id:"Motosoto"},{name:"Mozilla Public License 1.1",id:"MPL-1.1"},{name:"Mozilla Public License 2.0",id:"MPL-2.0"},{name:"Mozilla Public License, version 1.0",id:"MPL-1.0"},{name:"Mulan Permissive Software License v2",id:"MulanPSL-2.0"},{name:"Multics License",id:"Multics"},{name:"NASA Open Source Agreement v1.3",id:"NASA-1.3"},{name:"NAUMEN Public License",id:"Naumen"},{name:"Nokia Open Source License Version 1.0a",id:"NOKIA"},{name:"Non-Profit Open Software License version 3.0",id:"NPOSL-3.0"},{name:"NTP License",id:"NTP"},{name:"Open Group Test Suite License",id:"OGTSL"},{name:"Open Logistics Foundation License v1.3",id:"OLFL-1.3"},{name:"Open Software License 2.1",id:"OSL-2.1"},{name:"Open Software License, version 1.0",id:"OSL-1.0"},{name:"OpenLDAP Public License Version 2.8",id:"OLDAP-2.8"},{name:"OSET Public License version 2.1",id:"OSET-PL-2.1"},{name:"PHP License 3.0",id:"PHP-3.0"},{name:"PHP License 3.01",id:"PHP-3.01"},{name:"Python License, Version 2",id:"PSF-2.0"},{name:"RealNetworks Public Source License Version 1.0",id:"RPSL-1.0"},{name:"Reciprocal Public License 1.5",id:"RPL-1.5"},{name:"Reciprocal Public License, version 1.1",id:"RPL-1.1"},{name:"SIL OPEN FONT LICENSE",id:"OFL-1.1"},{name:"Simple Public License",id:"SimPL-2.0"},{name:"Sun Industry Standards Source License",id:"SISSL"},{name:"Sun Public License, Version 1.0",id:"SPL-1.0"},{name:"The 2-Clause BSD License",id:"BSD-2-Clause"},{name:"The 3-Clause BSD License",id:"BSD-3-Clause"},{name:"The CNRI portion of the multi-part Python License",id:"CNRI-Python"},{name:"The European Union Public License, version 1.1",id:"EUPL-1.1"},{name:"The MIT License",id:"MIT"},{name:"The Nethack General Public License",id:"NGPL"},{name:"The Open Software License 3.0",id:"OSL-3.0"},{name:"The PostgreSQL Licence",id:"PostgreSQL"},{name:"The Q Public License Version",id:"QPL-1.0"},{name:"The Ricoh Source Code Public License",id:"RSCPL"},{name:"The Sleepycat License",id:"Sleepycat"},{name:"The Sybase Open Source Licence",id:"Watcom-1.0"},{name:"The Universal Permissive License Version 1.0",id:"UPL-1.0"},{name:"The University of Illinois/NCSA Open Source License",id:"NCSA"},{name:"The Unlicense",id:"Unlicense"},{name:"The Vovida Software License v. 1.0",id:"VSL-0.1"},{name:"The W3C SOFTWARE NOTICE AND LICENSE",id:"W3C-20150513"},{name:"The wxWindows Library Licence",id:"wxWindows"},{name:"The X.Net, Inc. License",id:"Xnet"},{name:"The zlib/libpng License",id:"Zlib"},{name:"Unicode, Inc. License Agreement  Data Files and Software",id:"Unicode-DFS-2015"},{name:"Upstream Compatibility License v1.0",id:"UCL-1.0"},{name:"Zero-Clause BSD",id:"0BSD"},{name:"Zope Public License 2.0",id:"ZPL - 2.0"},{name:"Zope Public License 2.1",id:"ZPL - 2.1"}],m=[{name:"Python"},{name:"C"},{name:"C++"},{name:"Java"},{name:"C#"},{name:"JavaScript"},{name:"Visual Basic"},{name:"SQL"},{name:"Assembly language"},{name:"PHP"},{name:"Scratch"},{name:"Go"},{name:"MATLAB"},{name:"Fortran"},{name:"COBOL"},{name:"R"},{name:"Ruby"},{name:"Swift"},{name:"Rust"},{name:"Julia"},{name:"SAS"},{name:"Classic Visual Basic"},{name:"Delphi/Object Pascal"},{name:"Ada"},{name:"Prolog"},{name:"(Visual) FoxPro"},{name:"Kotlin"},{name:"Perl"},{name:"Objective-C"},{name:"Lisp"},{name:"Scala"},{name:"Haskell"},{name:"D"},{name:"Lua"},{name:"Dart"},{name:"Logo"},{name:"GAMS"},{name:"VBScript"},{name:"Scheme"},{name:"Transact-SQL"},{name:"CFML"},{name:"PL/SQL"},{name:"ABAP"},{name:"Solidity"},{name:"TypeScript"},{name:"F#"},{name:"PowerShell"},{name:"Forth"},{name:"Bash"},{name:"X++"}],d=e=>{let{setFormData:n}=e,[i,r]=(0,s.useState)(""),c=(e,i)=>{if("Enter"===e.key){e.preventDefault();try{let e=i.split("/").slice(-2)[0],a=i.split("/").slice(-1)[0],s="https://api.github.com/repos/".concat(e,"/").concat(a);t.Z.get(s).then(e=>{var i;let a=e.data,s={name:a.name,url:a.html_url,description:a.description,created:a.created_at.split("T")[0],organization:a.organization.login,language:a.language,license:null===(i=l.find(e=>e.id==a.license.spdx_id))||void 0===i?void 0:i.name};n(s)}).catch(e=>{console.log(e)})}catch(e){console.log(e)}}};return(0,a.jsx)("input",{className:"border-b-2 font-light w-1/2 px-3    outline-none h-9 bg-transparent    text-orange-700",placeholder:"Enter GitHub URL to pull basic information",onChange:e=>r(e.target.value),onKeyDown:e=>c(e,i)})},u=e=>new Promise((n,i)=>{let a=new FileReader;a.onload=()=>{n(a.result)},a.onerror=()=>{i(a.error)},a.readAsText(e)}),L=e=>{let{setFormData:n}=e,i=(0,s.useRef)(null),r=async e=>{if(i.current&&e.target.files&&(i.current.textContent=e.target.files[0].name),e.target.files){let i=await u(e.target.files[0]);"string"==typeof i&&n(JSON.parse(i))}};return(0,a.jsxs)("label",{className:"custom-upload",children:[(0,a.jsx)("input",{type:"file",id:"fileInput",onChange:e=>r(e)}),(0,a.jsx)("div",{className:"custom-button",children:(0,a.jsx)("span",{ref:i,children:"Upload JSON"})})]})};var p=i(5691);let h=(e,n,i)=>{n.validate(e,{abortEarly:!1}).then(e=>{i({})}).catch(e=>{i(e.inner.reduce((e,n)=>(e[n.path]=n.message,e),{}))})},P=(e,n)=>{let i=JSON.stringify(e),a=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(a),r=document.createElement("a");r.href=s,r.download=n||"data.json",r.click(),URL.revokeObjectURL(s)},x=(e,n,i,s,r)=>{let c=e.find(e=>e.name===n);return void 0==c?(0,a.jsx)("div",{children:" "}):(0,a.jsx)(c.component,{formData:i,setFormData:s,errors:r})},S=e=>{console.log(e),P(e,"data.json")},g=()=>{let[e,n]=(0,s.useState)(o[0].name),[i,t]=(0,s.useState)({}),[l,m]=(0,s.useState)({}),u=p.Ry({name:p.Z_().required("Name is required."),url:p.Z_().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,"Incorrect URL").required("URL is required."),email:p.Z_().required("Email is required.").email("Not a valid email")});return(0,s.useEffect)(()=>{h(i,u,m)},[i]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r,{}),(0,a.jsxs)("div",{className:"my-10 flex justify-center gap-x-10",children:[(0,a.jsx)(d,{setFormData:t}),(0,a.jsx)(L,{setFormData:t})]}),(0,a.jsxs)("div",{className:"flex gap-x-10 h-2/3",children:[(0,a.jsxs)("div",{className:"w-1/4 bg-gray-100 p-6 flex flex-col justify-between",children:[(0,a.jsx)(c,{menu:o,activeMenu:e,setActiveMenu:n}),(0,a.jsx)("button",{className:"bg-indigo-500 w-full text-white rounded py-1",onClick:()=>{h(i,u,m),"{}"===JSON.stringify(l)&&S(i)},children:" Download JSON "})]}),e&&(0,a.jsxs)("div",{className:"w-3/4 bg-gray-100 p-6 overflow-y-auto",children:[x(o,e,i,t,l)," "]})]})]})};function N(){return(0,a.jsx)("main",{className:"px-20 py-10 h-screen",children:(0,a.jsx)(g,{})})}}},function(e){e.O(0,[639,971,596,744],function(){return e(e.s=7418)}),_N_E=e.O()}]);