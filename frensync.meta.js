// ==UserScript==
// @name         frensync
// @version      0.0.2
// @minGMVer     1.14
// @minFFVer     26
// @namespace    frensync
// @description  The userscript to sync additional fields on 4chan and its archives like Namesync but multi server. 4chanX required.
// @license      CC BY-NC-SA 3.0; https://raw.githubusercontent.com/OPROSVOs/frensync/main/LICENSE
// @author       milkytiptoe
// @author       ihavenoface
// @author       nokosage
// @author       /OPROS/VOs
// @include      *://boards.4chan.org/b/*
// @include      *://boards.4chan.org/trash/*
// @include      *://archived.moe/b/thread/*
// @include      *://desuarchive.org/trash/thread/*
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/OPROSVOs/frensync/main/frensync.meta.js
// @downloadURL  https://raw.githubusercontent.com/OPROSVOs/frensync/main/frensync.user.js
// ==/UserScript==
// 
// GM_xmlhttpRequest is for fetching external data on the archive site. they have less permisive CORS.
// TODO:          no /soc/ for u?
// TODO:          no /s4s/ for u?
// TODO:          4channel or sfw boards support? 
// TODO:          Add @include: active imageboards for /b/ and /trash/
// TODO:          Icon
