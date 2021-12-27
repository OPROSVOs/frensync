// ==UserScript==
// @name         frensync
// @version      0.0.1
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

(function() {
  var d, $, $$, Main;
  
  d = document;
  $$ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return root.querySelectorAll(selector);
  };
  $ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return root.querySelector(selector);
  };
  $.on = function(el, type, handler) {
    return el.addEventListener(type, handler, false);
  };
  
  Main = {
    Xinit: function() {
      console.log("Xinit fired",  Date.now() );
    },
    DOMinit: function() {
      console.log("DOMinit fired",  Date.now() );
    }
  };
  
  $.on(d, '4chanXInitFinished', Main.Xinit);
  $.on(window, 'DOMContentLoaded', Main.DOMinit);
  
  
  
}).call(this);
