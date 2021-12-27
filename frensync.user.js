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

(function() {
  var d, g, $, $$, Main;
  g = {
    NAMESPACE: 'frensync',
    VERSION: '0.0.2',
    posts: {},
    threads: [],
    boards: ['b', 'soc', 's4s', 'trash']
  };
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
  
  
  NameFetch = {
    init: function() {
      var threadNodes = $$('article.thread');
      this.thread = threadNodes[0].getAttribute('data-thread-num');
      this.board = threadNodes[0].getAttribute('data-board');
      if(!this.thread || !this.board ){
        console.log(threadNodes);
        throw "FS: Could not find thread / board";
      }
      NameFetch.query("m8q16hakamiuv8ch.myfritz.net");
      
      
    },
    query: function(server) {
      return GM_xmlhttpRequest({
        url:"https://"+server+"/namesync/qp.php" + "?" + "t=" + this.thread + "&b=" + this.board, 
        method:'GET', 
        headers:{'X-Requested-With':'frensync'}, //won't work without the x-requested-with header
        overrideMimeType:'application/json',
        responseType: 'json',
        timeout: 15000,
        anonymous: true,
        onload: function(msg){
           var ref;
            if(msg.status == 200 && msg.responseText && msg.responseText.length){
              try{
                ref = JSON.parse(msg.responseText);
              }catch(e){
                console.log("FS: invalid json", e);
              }
              if(ref){
                console.log('FS: Got an answer', ref);
                NameFetch.contentHandle(ref);
              }          
           }else{
            console.log('FS: No content', msg);
           }  

          },
          onerror: function(msg){
            console.log('FS: Got an error', msg);
          }
      })
    },
    contentHandle: function(ref){ 
          for (i = 0, len = ref.length; i < len; i++) {
            var post = d.getElementById(ref[i].p);
            //var post = $('#'+ref[i].p).first();//convoluted but does the job
            if(post){
              //set color
              if(typeof ref[i].n != null || typeof ref[i].t != null || typeof ref[i].e != null){
                $('.post_author', post).style.color = '#ee5f5b';
              }
              //set subject
              if(typeof ref[i].s != null){
                //debugger;
                $('.post_title', post).textContent = ref[i].s;
              }
              //set name
              if(typeof ref[i].n != null){
                $('.post_author', post).textContent = ref[i].n;
              }
              //set email 
              if(typeof ref[i].e != null){
                $('.post_author', post).title = ref[i].e;
              }
              //set trip
              if(typeof ref[i].t != null){
                $('.post_tripcode', post).title = ref[i].t;
              }
            }else{
              console.log("post gone?", ref[i]);
            }
          }    
          console.log('FS: Loaded');
          this.done = true;
       
    }
      
    
  };
  
  Main = {
    Xinit: function() {
      console.log("Xinit fired",  Date.now() );
    },
    DOMinit: function() {
      console.log("DOMinit fired",  Date.now() );
      if(window.location.href.indexOf("archived.moe") || window.location.href.indexOf("desuarchive.org")){
        console.log("FS: We are running on an archive site - fetching names");
        NameFetch.init();
      }
    }
  };
  
  $.on(d, '4chanXInitFinished', Main.Xinit);
  $.on(window, 'DOMContentLoaded', Main.DOMinit);
  
  
  
}).call(this);
