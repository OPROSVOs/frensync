// ==UserScript==
// @name         frensync
// @version      0.1.8
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
// @icon          data:image/png;base64,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
// ==/UserScript==
// 
// GM_xmlhttpRequest is for fetching external data on the archive site. they have less permisive CORS.
// TODO:          no /soc/ for u?
// TODO:          no /s4s/ for u?
// TODO:          4channel or sfw boards support? 
// TODO:          Add @include: active imageboards for /b/ and /trash/
// TODO:          Icon
