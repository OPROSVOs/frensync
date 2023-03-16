// ==UserScript==
// @name         frensync
// @version      0.2.14
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

(function() {
  var $, $$, CSS, Config, Filter, NameFetch, Main, Post, Posts, Fstr, Set, API, MasterServer, Settings, Sync, d, g, GM_xhr_proxy,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Set = {};

  d = document;

  g = {
    NAMESPACE: 'frensync',
    VERSION: '0.2.14',
    MsApi: '1',
    posts: {},
    threads: [],
    boards: ['b', 'trash'] // ['b', 'soc', 's4s', 'trash']
  };

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

  $.el = function(tag, properties) {
    var el;
    el = d.createElement(tag);
    if (properties) {
      $.extend(el, properties);
    }
    return el;
  };

  $.tn = function(text) {
    return d.createTextNode(text);
  };

  $.id = function(id) {
    return d.getElementById(id);
  };

  $.event = function(type, detail) {
    if (detail == null) {
      detail = {};
    }
    return d.dispatchEvent(new CustomEvent(type, detail));
  };

  $.on = function(el, type, handler) {
    return el.addEventListener(type, handler, false);
  };

  $.off = function(el, type, handler) {
    return el.removeEventListener(type, handler, false);
  };

  $.addClass = function(el, className) {
    return el.classList.add(className);
  };

  $.hasClass = function(el, className) {
    return el.classList.contains(className);
  };

  $.add = function(parent, children) {
    return parent.appendChild($.nodes(children));
  };

  $.rm = function(el) {
    return el.parentNode.removeChild(el);
  };

  $.prepend = function(parent, children) {
    return parent.insertBefore($.nodes(children), parent.firstChild);
  };

  $.after = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root.nextSibling);
  };

  $.before = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root);
  };

  $.nodes = function(nodes) {
    var frag, i, len, node;
    if (!(nodes instanceof Array)) {
      return nodes;
    }
    frag = d.createDocumentFragment();
    for (i = 0, len = nodes.length; i < len; i++) {
      node = nodes[i];
      frag.appendChild(node);
    }
    return frag;
  };

  GM_xhr_proxy=function(p){
    if("function"==typeof GM_xmlhttpRequest)return GM_xmlhttpRequest(p); //ViolentMonkey, TamperMonkey
    if(GM&&"function"==typeof GM.xmlHttpRequest)return GM.xmlHttpRequest(p); //GreaseMonkeys new API
    return false;
  };

  $.ajax = function(srv, file, type, data, onload, onerror) {
    //one way gives the xhr as "param", the other as "this" and the other as "param.target"; this one unifies it to param
    var onload_proxy =function(t){return this.status&&(t=this),t.target?onload(t.target):((null!=onload)?onload(t):false);};
    var onerror_proxy=function(r){console.log(r);return this.status&&(r=this),null!=onerror?onerror(r):false;}; //same as above
    var client = ((srv == 'namesync.net')?'NameSync4.9.3':'NameSync4.9.3-Frensync'+g.VERSION);
	  if(Set['GM_API XHR']){
      // extension XHR:
      return GM_xhr_proxy({
        url:("https://" + srv + "/namesync/" + file + ".php" + ((type==='GET')?('?'+data):'')),
        data:data,
        method:((type === 'GET')?'GET':'POST'),
        overrideMimeType:'application/json',
        headers: {
          "X-Requested-With": client,
          "If-Modified-Since": Sync.lastModified,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": location.protocol + '//' + location.hostname
        },
        onload:onload_proxy,
        onerror:onerror_proxy
      });
    }else{
      // regular XHR:
      var r = new XMLHttpRequest();
      if (file === 'qp') r.overrideMimeType('application/json');
      var url = "https://" + srv + "/namesync/" + file + ".php";
      if (type === 'GET') url += "?" + data;
      r.open(type, url, true);
      r.setRequestHeader('X-Requested-With', client);
      if (file === 'qp') r.setRequestHeader('If-Modified-Since', Sync.lastModified);
      if (type === 'POST') r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      r.onloadend=onload_proxy;
      r.onerror=onerror_proxy;
      r.withCredentials = true;
      r.send(data);
      return r;
    }
  };

  $.extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
  };

  $.asap = function(test, cb) {
    if (test()) {
      return cb();
    } else {
      return setTimeout($.asap, 25, test, cb);
    }
  };

  $.get = function(name) {
    return localStorage.getItem("" + g.NAMESPACE + name);
  };

  $.set = function(name, value) {
    Set[name] = value;
    return localStorage.setItem("" + g.NAMESPACE + name, value);
  };

  $.calcColor = function(ch, ca){
    if(Main.brightness == null){return "";}
    if(ch == null || ch < 0 || ch > 360){ch=0;}
    if(ch == null || ca < 0 || ca > 50 ){ca=0;}
    return "hsl("+ch+", "+((Main.brightness>128)?(50+ parseInt(ca)):(50+ parseInt(ca)))+"%, "+((Main.brightness>128)?(parseInt(ca/2)):(100- parseInt(ca/1.5)))+"%)";
  };

  Config = {
    main: {
      'Sync on /b/': [true, 'Enable sync on /b/.'],
      'Sync on /soc/': [true, 'Enable sync on /soc/. (Disabled)'],
      'Sync on /s4s/': [true, 'Enable sync on /s4s/. (Disabled)'],
      'Sync on /trash/': [true, 'Enable sync on /trash/.'],
     // 'Custom Names': [false, 'Posters can be given custom names.'], // Broken because no uID for you
      'Read-only Mode': [false, 'Share none of your sync fields (reload after change).'],
      'Hide Sage': [false, 'Share none of your sync fields when sage is in the email field.'],
      'Mark Sync Posts': [false, 'Mark posts made by sync users.'],
      'Do Not Track': [false, 'Request no sync field tracking by third party archives.'],
     // 'Do Not Track TFF': [false, 'Request to not show fields in a manner that shows what thread is active.'], // Not implemented

      'Colors': [true, 'Show name colors when available.'],
      'MoreColors': [true, 'Show custom css name colors when available. (reload after change)'],

      // unchecked: just show a regular mailto: link while
      // checked: try to guess a if its a link or text and do the best.
      'Smart email': [true, 'Try to find out what content in in there if its not an email (discord, links).'],

      //This shows a green circle next to the thread icons on the catalog if theres some synced post inside or if OP is using NS
      //4chan in addition to cutting the fields also hides the subject in the default style so this is a way to see that there is something missing
      'Mark OP': [true, 'Mark the OP in catalog if OP is a namefag or theres a namefag inside '],

      //Regular XHRs run with the site traffic and any CORS problem or scriptblocker problem or Adblock problem will cause issues
      //Having them routed over the extension goes around all this but each extension has a different version of the GM_API.
      //The newer ones use a different naming and this might cause problems.
      'GM_API XHR': [false, 'DEBUG: Route data over a side channel to prevent CORS, Adblock & Scriptblock issues'],

      //Shows markers from which server a post got sync data
      //To avoid more clutter this is just in fixed order and just a check or cross.
      //A cross means that the server has no data either because the user didn't sync to there or the server has an fault or this client fails to get the server data
      'Show origin': [false, 'DEBUG: Show the sync source. Order: Frensync, NamesyncRedux, Namesync original'],

      'LOG': [false, 'DEBUG: Fill the console with lots of stuff for debugging (slow); leave it off'],

      //'CustomScript': [false, 'Enables extra features: Execute a scriptlet before posting to customize fields, uses eval (reload after change)'],

    },
    other: {
      'Persona Fields': [false],
      'Filter': [false]
    }
  };

  CSS = {
    init: function() {
      var css;
      css = ".dialog, #menu {\n  -webkit-text-fill-color:initial}\n.section-name-sync input[type='text'] {\n  border: 1px solid #CCC;\n  width: 148px;\n  padding: 2px;\n}\n.section-name-sync input[type='button'] {\n  padding: 3px;\n  margin-bottom: 6px;\n}\n.section-name-sync p {\n  margin: 0 0 8px 0;\n}\n.section-name-sync ul {\n  list-style: none;\n  margin: 0;\n  padding: 8px;\n}\n.section-name-sync div label {\n  text-decoration: underline;\n}\n/* Appchan X description fix */\n.section-name-sync .description {\n  display: inline;\n}\n/* ccd0 4chan X clear fix */\n.section-name-sync {\n  clear: both;\n}\n/* Show sync fields in ccd0 4chan X */\n#qr.sync-enabled .persona input {\n  display: inline-block !important;\n}\n.section-name-sync {\n  overflow-y:scroll;\n}\n .nameBlock {\n  white-space: nowrap;}\n";
      if (Set['Filter']) {
        css += ".sync-filtered {\n  display: none !important;\n}";
      }
      if (Set['Mark Sync Posts']) {
        css += ".sync-post-marker {\n  position: relative;\n}\n.sync-post {\n  position: relative;\n}\n.sync-post:after {\n  content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAqFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAWFhYAAAAWFhYWFhYAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAWFhYWFhYAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAPAnI3AAAAOHRSTlMzADU0NiwGJjIvDi03AAEEFyUnHzAkCQUCIQUSKy0xHSgIKS4aESoKGCYDDCIvKBYpHg4jEBMHFH8kut4AAACvSURBVHheHY7FlsNADAQFw7ZjjO0wMy3v//9ZNO6DXpd0KAFK8sImiS1yxC7yISFiJtLhtBYuFMEQcssHYCCWqpRMpgX0H3JV+rOegywW8MOCkx4xMDPtoCYgPUJs5433zRZMu2mnIrlOc2NMB3tbluXxVzZnr5ML2JQonQjeHHF6h7HI+fmarVwUfkWO+sGffmcwVixtiNImg6qe+XgDospgBmGEfyu9dE31L19kb12bCeREPHJzAAAAAElFTkSuQmCC');\n  position: absolute;\n  bottom: 2px;\n  right: 5px;\n}";
      }
      if (Set['Custom Names']) {
        css += "div#qp .sync-custom, div.inline .sync-custom {\n  display: none;\n}";
      }
      return $.add(d.body, $.el('style', {
        textContent: css
      }));
    }
  };

  Filter = {
    init: function() {
      this.names = $.get('FilterNames');
      this.tripcodes = $.get('FilterTripcodes');
      this.emails = $.get('FilterEmails');
      return this.subjects = $.get('FilterSubjects');
    }
  };
  NameFetch = { // Doesn't require 4chanX
    init: function() {
      var threadNodes = $$('article.thread');
      this.thread = threadNodes[0].getAttribute('data-thread-num');
      this.board = threadNodes[0].getAttribute('data-board');
      if(!this.thread || !this.board ){
        console.log(threadNodes);
        throw "FS: Could not find thread / board";
      }

      NameFetch.query(MasterServer.getServer(0), function(){
        console.log('FS: Retrying');
        NameFetch.query(MasterServer.getServer(1), function(){console.log('FS: giving up');});
      });
    },
    query: function(server, errCall) {
      return GM_xhr_proxy({
        url:"https://"+server+"/namesync/qp.php?t=" + this.thread + "&b=" + this.board,
        method:'GET',
        headers:{'X-Requested-With':'NameSync4.9.3-frensync'+g.VERSION+'-archive'},
        overrideMimeType:'application/json',
        responseType: 'json',
        timeout: 15000,
        anonymous: true,
        onload: function(msg){
             var ref;
             if(msg.status == 200 && msg.responseText && msg.responseText.length){
                try{ref = JSON.parse(msg.responseText);}catch(e){console.log("FS: invalid json", e);errCall()}
                if(ref){NameFetch.contentHandle(ref);console.log('FS: Success');}
             }
          },
          onerror: function(msg){console.log('FS: Got an error', msg);errCall()}
      })
    },
    contentHandle: function(ref){
      for (var i = 0, len = ref.length; i < len; i++) {
        var post = d.getElementById(ref[i].p);
        if (post) {
          if (typeof ref[i].n != null || typeof ref[i].t != null || typeof ref[i].e != null) {
            $('.post_author', post).style.color = '#ee5f5b';
          }
          if (typeof ref[i].s != null) {
            $('.post_title', post).textContent = ref[i].s;
          }
          if (typeof ref[i].n != null) {
            $('.post_author', post).textContent = ref[i].n;
          }
          if (typeof ref[i].e != null) {
            $('.post_author', post).title = ref[i].e;
          }
          if (typeof ref[i].t != null) {
            $('.post_tripcode', post).textContent = ref[i].t;
          }
          if (typeof ref[i].ca != null && typeof ref[i].ch != null && ref[i].ca !== "" && ref[i].ch !== "" && ref[i].ca > 0 && Set['Colors']) {
            var str = $.calcColor(ref[i].ch, ref[i].ca);
            $('.post_tripcode', post).style.color=str;
            $('.post_author', post).style.color=str;
          }
        }
      }
    }
  };

  //A small interface for helper scripts
  API = {
    API_VERSION: 1,
    init: function(){d.frensync = this},

    //=== Helper ===
    detectBgColor: function(){return Main.detectBgColor},
    calcColor: function(ca, ch){return $.calcColor(ca, ch)},

    //=== Getter ===
    getPosts: function(){return Posts},
    getInfo: function(){return Object.assign({},g)},
    getMasterServer: function(){return MasterServer},
    getOptions: function(){return Set},

    //=== Setter ===
    //SetMasterServer: function(data){return MasterServer.data = data},
    setPostsNameByPost: function(nameByPost){return Posts.nameByPost = nameByPost}, //For adding things to the dataset
    setOptions: function(set){return Set = set}, //Maybe an easy&fancy button that toggles the ReadOnly

    //=== Events ==
    // FSInitFinished  triggers when the init is done
    // NamesSynced  triggers when Posts.NameByPost has been updated but before the DOM change happens. Hint: this triggers three times short after
    // FSPostUpdated triggers after the DOM change. Hint: this triggers three times short after
  };


  Main = {
    DOMinit: function() {
      if(window.location.href.indexOf("archived.moe") !== -1 || window.location.href.indexOf("desuarchive.org") !== -1){
        try{
          MasterServer.init();
        }catch(e){console.log("Failed updating the server list", e);}
        NameFetch.init();
      }
      Main.detectBgColor();
    },
    init: function() {
      var lastView, path, ref;
      lastView = g.view;
      path = location.pathname.split('/');
      g.board = path[1];
      g.view = (ref = path[2]) === 'thread' || ref === 'catalog' ? path[2] : 'index';
      if (g.view === 'catalog') {
        return;
      }
      if (!lastView) {
        Settings.init();
        CSS.init();
        if (Set['Filter']) {
          Filter.init();
        }
      }
      if (Set["Sync on /" + g.board + "/"] || lastView) {
        try{
          MasterServer.init();
        }catch(e){console.log("Failed updating the server list", e);}
        Posts.init();
        Sync.init();
        API.init();

        return $.event('FSInitFinished');
      }
    },
    boardLegit: function() {
      var ref;
      return ref = g.board, indexOf.call(g.boards, ref) >= 0;
    },
    detectBgColor: function() {
      var yiq = 225; //assume bright
      try{
        var root = $('.reply');
        if(root == null){root = d.body} //no reply or catalog
        var rgb = window.getComputedStyle(root).getPropertyValue( "background-color" ) || "rgb(224,224,224)";
            rgb = rgb.replace(/[^.\d\,]/g, '').split(',') //"rgb(214, 218, 240)" => 214, 218, 240
            yiq = ((parseInt(rgb[0])*299)+(parseInt(rgb[1])*587)+(parseInt(rgb[2])*114))/1000;
      }catch(e){console.log(e);}
      Main.brightness = yiq;
      return yiq;
    },
    handleEmailLink: function(str) {
      if(Set['Smart email']){
        if(str.match(/^(javascript|chrome-extension):/i) !== null){ //block the low effort trolls
            return 'unsafe:' + str;
        }
        if(str.match(/^(https?|ftp):[\\\/]{2,4}[^\s\/\\$.?#].[^\s]*$/i) === null){//assume not a link
          if(str.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null){ //assume email
            if(str.match(/^(attachment|sender|cc:|bcc:|replay-to:)/i) !== null){return 'unsafe:mailto:' + str;} //Sending potentional dangerous files as email attachment links
            return 'mailto:' + str;
          }else{// its not a link and not an email
            if(str.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i) !== null){//phone number...
              return 'tel:' + str;
            }//do nothing. cant differentiate between telegram and twitter and discord only supports invites
            return str;
          }
        }else{
          return str; //do nothing if its already a link
        }
      }else{
        return 'mailto:' + str; //The not so smart default
      }
    }
  };

    MasterServer = {
      data:{},
      init: function(){
        //load from storage or fetch a fresh one, check updates
        MasterServer.parse();
        MasterServer.check();
        //debugger;
      },
      parse: function(){
        //load data to glob
        /*
         * MasterServer.data.done = false;
        var sl = $.get("Serverlist");
        var o;
        if(typeof sl == undefined || sl == null || sl.length < 1){console.log("FS: Serverlist is empty!"); sl = MasterServer.saneDefaults(1);}
        try{o = JSON.parse(sl)}catch(e){console.log("FS: crtitcal error: could not read the serverlist"); o = JSON.parse(MasterServer.saneDefaults(1)); }
        MasterServer.data = o;
        */
        MasterServer.data = JSON.parse('{"server":[{"namesync.net":{"name":"namesync original","sp":true,"qp":true,"prio":["t"]}},{"m8q16hakamiuv8ch.myfritz.net":{"name":"frensync backup","sp":true,"qp":true}},{"nsredux.com":{"name":"Namesync Redux","sp":true,"qp":true}}],"revisit":86400,"api":1}');
        MasterServer.data.done = true;
      },
      saneDefaults: function(override){
        /*var srv = $.get("Serverlist");
        if(typeof srv == undefined || srv == null || srv.length < 1 || override == 1 ){
          console.log("FS: Fallback to defaults");
          var defaults = '{"server":[{"namesync.net":{"sp":true,"qp":true}},{"nsredux.net":{"sp":true,"qp":true}},{"m8q16hakamiuv8ch.myfritz.net":{"sp":true,"qp":true}}],"revisit":43200}';
          $.set("Serverlist", defaults);
          $.set("Serverlist-last-check", "2");
          return defaults;
        }
        */
      },
      check: function(){
        //date compare, integry
        /*
        var then = $.get("Serverlist-last-check");
        var set = function(){$.set("Serverlist-last-check", (new Date().getTime())); then= new Date().getTime()}
        var srv = $.get("Serverlist");
        if(typeof srv == undefined || srv == null || srv.length < 1){MasterServer.saneDefaults(); MasterServer.query(); return;}
        if(typeof then == undefined || then == null || then < 1){set(); return;}
        var now = new Date().getTime();
        var diff = (now - then) / 1000;
        var recheck = MasterServer.data.revisit || '250000';
        console.log("FS: recheck: ", recheck, (recheck-diff));
        if(diff < 0){set(); return;}
        if(diff > recheck){
          console.log("FS: updating serverlist");
          set();
          MasterServer.query();
        }else{
          console.log("FS: serverlist probably up to date");
        }*/
      },
      query: function(){
        //get the data from github
        /*console.log("FS: started the update");
        return GM_xhr_proxy({
          url:"https://raw.githubusercontent.com/OPROSVOs/frensync/main/server/list.json",
          method:'GET',
          overrideMimeType:'application/json',
          responseType: 'json',
          timeout: 30000,
          anonymous: true,
          onload: function(msg){
               var ref;
               if(msg.status == 200 && msg.responseText && msg.responseText.length){
                  try{
                    ref = JSON.parse(msg.responseText);
                    if(ref && ref.api){ //verify that it is really valid json
                      $.asap(function(){return (MasterServer.data.done != false)}, function(){$.set("Serverlist", JSON.stringify(ref));MasterServer.parse()});
                      console.log('FS: update success');
                    }
                  }catch(e){console.log("FS: masterserver invalid json", e)}
               }else{console.log('FS: Error fetching the masterserver', msg)}
            },
            onerror: function(msg){console.log('FS: Error fetching the masterserver: XHR error', msg)}
          });*/
      },
      getServer: function(i){
        return Object.keys(MasterServer.data.server[i])[0];
      },
      getServerInfo: function(i){
        return MasterServer.data.server[i][MasterServer.getServer(i)];
      },
      checkAvail: function(root){
        var s = function(txt, val, srv, i){
            var p = $.el('p' , {id: 'availRoot'+i});
            p.textContent = (val.name || srv) + ': ' + txt;
            $.add(root, p);
          };
        var q = function(val, srv, i){
           return GM_xhr_proxy({
            url:"https://"+srv+"/namesync/qp.php?b="+g.board+"&t=" + g.threads,
            method:'GET',
            headers:{
                'X-Requested-With':'NameSync4.9.3',
                'Origin': location.protocol + '//' + location.hostname
            },
            overrideMimeType:'application/json',
            timeout: 8000,
            onload: function(msg){
               var ref;
               console.log(msg.finalUrl, msg.status, msg.responseText.substring(0, 80));
               if(msg.status == 200 && msg.responseText){
                 if(msg.responseText.match(/^\[/) === null || msg.responseText.length < 2){
                   s(" ❌ online, server returns no valid data", val, srv, i);
                 }else{
                   var cnt = (msg.responseText.match(/{"/g) || []).length
                   s(" ✅ online, posts: "+cnt+"", val, srv, i);
                 }
               }else{s(" ❌ online, server returns an error ("+msg.status+")", val, srv, i);}
            },
            onerror: function(msg){s(" ❌ offline", val, srv, i);}
          });
        };
        if(typeof MasterServer.data.server == undefined || MasterServer.data.server == null){console.log("loading not done");return;}
        var len, i;
        for (i = 0, len = MasterServer.data.server.length; i < len; i++) {
          var srv = MasterServer.getServer(i);
          var val = MasterServer.getServerInfo(i);
          try{
            q(val, srv, i);
          }catch(e){
            console.log(e);
            s(" ❌ unknown error, check logs", val, srv, i);
          }
        }
      }
    };




    Posts = {
    nameByPost: {},
    nameByID: {},
    init: function() {
      var i, len, post, ref, target;
      g.posts = {};
      g.threads = [];
      if (this.observer) {
        this.observer.disconnect();
        delete this.observer;
      }
      if (g.view !== 'thread' || !Main.boardLegit()) {
        return;
      }
      ref = $$('.thread > .postContainer');
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        g.posts[post.id.slice(2)] = new Post(post);
      }
      target = $('.thread');
      g.threads.push(target.id.slice(1));
      this.observer = new MutationObserver(function(mutations) {
        var foundNode, j, k, len1, len2, mutation, node, ref1;
        foundNode = false;
        for (j = 0, len1 = mutations.length; j < len1; j++) {
          mutation = mutations[j];
          ref1 = mutation.addedNodes;
          for (k = 0, len2 = ref1.length; k < len2; k++) {
            node = ref1[k];
            if (!$.hasClass(node, 'postContainer')) {
              if (!(node = $('.postContainer', node))) {
                continue;
              }
            }
            g.posts[node.id.slice(2)] = new Post(node);
            foundNode = true;
          }
        }
        if (foundNode) {
          return Posts.updateAllPosts();
        }
      });
      this.observer.observe(target, {
        childList: true
      });
      if (Set['Custom Names']) {
        return Posts.updateAllPosts();
      }
    },
    updateAllPosts: function() {
      var key;
      for (key in (Set['Custom Names'] ? g.posts : Posts.nameByPost)) {
        Posts.updatePost.call(g.posts[key]);
      }
    },
    updatePost: function() {
      var el, email, emailspan, info, linfo, name, namespan, obj, oinfo, regex, subject, ca, ch, subjectspan, tripcode, tripspan, type, uID;
      if (!this.info || this.info.capcode) {
        return;
      }
      if (linfo = Posts.nameByID[uID = this.info.uID]) {
        name = linfo.n;
      } else if (oinfo = Posts.nameByPost[this.ID]) {
        if (parseInt(oinfo.time) > parseInt(this.info.date) + 60) {
          return;
        }
        name = oinfo.n;
        tripcode = oinfo.t;
        email = oinfo.e;
        subject = oinfo.s;
        ca = parseInt(oinfo.ca) || 0;
        ch = parseInt(oinfo.ch) || 0;


      if(Set['LOG']){console.log("updatePost", oinfo);}

      }
      if (Set['Custom Names'] && uID !== 'Heaven' && $('.sync-custom', this.nodes.info) === null) {
        el = $.el('a', {
          className: 'sync-custom',
          textContent: '+',
          href: 'javascript:;',
          title: 'Custom Name'
        });
        $.after($('[type="checkbox"]', this.nodes.info), [el, $.tn(' ')]);
        $.on(el, 'click', function() {
          return Posts.customName(uID);
        });
      }


      if (!linfo && !oinfo) {
        return;
      }

      namespan = this.nodes.name;
      subjectspan = this.nodes.subject;
      tripspan = $('.postertrip', this.nodes.info);
      emailspan = $('.useremail', this.nodes.info);

      if(Set['Show origin'] && oinfo != null) {
          subject ="[" + ((oinfo.m8q)?"✔️":"❌")+((oinfo.nsr)?"✔️":"❌")+((oinfo.nam)?"✔️":"❌") + "]"+ (subject||"") ;
      }
      //mark thread
      if(Set['Mark OP'] && oinfo != null && oinfo.m === true) {
        if($('.sync-marker-icon', this.nodes.root) == null){
          var markerspan = $.el('img', {
              className: 'sync-marker-icon',
              alt: 'Synced Post',
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABeUlEQVQY01WQSS8DYQCG3+/r6Ey1zOgUtUaIpYi0XCSERLhxEbEeJE4SPwCROEq4SpxcJJZGnDiQiAt6tDSkEluk0kNVR6fVZWr0cyF47u/zJg/BL5LsMI/J9ZwLAAv79MvwTXwdgGqkvIsAgEEi3Z0z5e6SFlH+M0TgTA3dHoT2bTXmfmIghtqe5YoLsVQQrraDW75NxQ1kUDcsjTlHS4ayrUY8eRQ/Vz0gzhY4LKaj+ceFgCc29y0jb3fpfi2qg3IU8VA6QouaLW0Rf1KLeOjKn1f24k2u7o0/TASvomlKqYlLqToI0ZDOSrTyHH+vJTUvADCdeURY/Ra7gM+PFKOZDxa3N+XwfWtVO+aazDQA8qPlO2JTYplgDF4mTjhzvlEySVlgn4DdIVHFq/QCIA2jeSONg4VDwetY/Hk3tUhck/lRNaAdVnZau4qduRJj//McL/lHdIUdkRxTbnssGT2VIMu0/n3Y5hCcBAby6kudh28SGwBUAPgCOfGTVEPk+YIAAAAASUVORK5CYII'
          });
          var icons = $('.catalog-icons', this.nodes.root);
          if(icons){$.add(icons, markerspan)}
        }
      }
      if (namespan.textContent !== name) {
        namespan.textContent = name;
      }
      if (subject) {
        if (subjectspan.textContent !== subject) {
          subjectspan.textContent = subject;
        }
      } else {
        if (subjectspan.textContent !== '' && subject !== false) {
          subjectspan.textContent = '';
        }
      }
      if (email) {
        if (emailspan === null) {
          emailspan = $.el('a', {
            className: 'useremail',
            target: '_new'
          });
          $.before(namespan, emailspan);
        }
        $.add(emailspan, namespan);
        if (tripspan != null) {
          $.after(namespan, $.tn(' '));
          $.add(emailspan, tripspan);
        }
        emailspan.href = Main.handleEmailLink(email);
      } else if (emailspan) {
        $.before(emailspan, namespan);
        $.rm(emailspan);
      }
      if (tripcode) {
        if (tripspan === null) {
          tripspan = $.el('span', {
            className: 'postertrip'
          });
          $.after(namespan, [$.tn(' '), tripspan]);
        }
        if (tripspan.textContent !== tripcode) {
          tripspan.textContent = tripcode;
        }
      } else if (tripspan) {
        $.rm(tripspan.previousSibling);
        $.rm(tripspan);
      }
      if(ca && ch && Set['Colors']){
          var str = $.calcColor(ch, ca);
          if (tripspan){tripspan.style.color=str;}
          if (namespan){namespan.style.color=str;}
      }
      if(oinfo.f && Set['MoreColors'] != false){
          try{
            var nameRoot, infoRoot, fstr, str, cmd, index, light, dark;
            light = Main.brightness > 128;
            dark = !light;
            nameRoot = $('.nameBlock', this.nodes.info);
            infoRoot = this.nodes.info;
            var checkgradient = function(cmd, type, where){
              // "A90,#f00,#0f0 40%,#00f 20px" => "linear-gradient(90deg, #ff0000, #00ff00 40%, #0000ff 20px)"
              //Sanitize again, url() is forbidden so rgb() and hsla() is also to make filtering simple, #RRGGBBAA works
              var strarr = cmd.substring(1).replace(/([^a-f0-9pxm\%\,\ \#]+)/gi, '').split(",");
                where.style.background=type+'('+strarr.shift()+'deg, '+ strarr.join()+')';
                where.style['-webkit-background-clip'] = 'text';
                where.style['-webkit-text-fill-color'] = 'transparent'; //Stops 4chanx menu from displaying the text properly, fixed in css for .dialog #menu
            }
            var checkshadow = function(cmd){
                var strarr = cmd.substring(1).replace(/([^a-f0-9\,\ \#]+)/gi, '').split(",");
                if(!strarr[0] || strarr[0] < 0 || strarr[0] > 15){strarr[0]=0;} // X
                if(!strarr[1] || strarr[1] < 0 || strarr[1] > 15){strarr[1]=0;} // Y
                if(!strarr[2] || strarr[2] < 1 || strarr[2] > 25){strarr[2]=5;} // Blur
                if(!/^\#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(strarr[3])){strarr[3]='#000';} // Color
                return strarr[0]+'px '+strarr[1]+'px '+strarr[2]+'px '+strarr[3];
            }
            var checkcolor = function(cmd){
                return cmd.substring(1).replace(/([^a-f0-9\#]+)/gi, '');
            }
            fstr = oinfo.f.split('|');//Format strings are chained with |
            fstr.forEach (function (str, index) {
              //Each cmd has to start with a type and has its own sanitize

              //UpperCase => Executed in light theme, LowerCase => Executed in dark theme
              cmd = str.charAt(0);
              if((Main.brightness > 128 && cmd == cmd.toLowerCase()) || (Main.brightness <= 128 && cmd == cmd.toUpperCase())){ return }
              cmd = cmd.toUpperCase();
              // Color gradients: Not visually compatible with strong text shadow, avoid black, white, grays
              if(cmd === "A"){checkgradient(str, 'linear-gradient', namespan);}
              if(cmd === "B"){checkgradient(str, 'repeating-linear-gradient', namespan);}
              if(cmd === "C" && tripspan){checkgradient(str, 'linear-gradient', tripspan);}
              if(cmd === "D" && tripspan){checkgradient(str, 'repeating-linear-gradient', tripspan);}
              if(cmd === "E" && nameRoot){checkgradient(str, 'linear-gradient', nameRoot);}
              if(cmd === "F" && nameRoot){checkgradient(str, 'repeating-linear-gradient', nameRoot);}
              if(cmd === "G" && subjectspan){checkgradient(str, 'linear-gradient', subjectspan);}
              if(cmd === "H" && subjectspan){checkgradient(str, 'repeating-linear-gradient', subjectspan);}
              if(cmd === "I" && infoRoot){checkgradient(str, 'linear-gradient', infoRoot);}
              if(cmd === "J" && infoRoot){checkgradient(str, 'repeating-linear-gradient', infoRoot);}

              if(cmd === "K" && namespan){namespan.style['text-shadow'] = checkshadow(str);}
              if(cmd === "L" && tripspan){tripspan.style['text-shadow'] = checkshadow(str);}
              if(cmd === "M" && subjectspan){subjectspan.style['text-shadow'] = checkshadow(str);}
              if(cmd === "N" && infoRoot){infoRoot.style['text-shadow'] = checkshadow(str);}

              if(cmd === "O" && namespan   ){namespan.style['color'] = checkcolor(str);}
              if(cmd === "P" && tripspan   ){tripspan.style['color'] = checkcolor(str);}
              if(cmd === "Q" && nameRoot   ){nameRoot.style['color'] = checkcolor(str);}
              if(cmd === "R" && subjectspan){subjectspan.style['color'] = checkcolor(str);}
              if(cmd === "S" && infoRoot   ){infoRoot.style['color'] = checkcolor(str);}

              /*if(cmd === "U"){forbidden} */

            });
          }catch(e){console.log('FS: Extra colors failed for ', oinfo.p, e);}
      }
      if(oinfo.sus){
        var suspan = $.el('img', {
              alt:  'Sus',
              style:'margin-bottom:-3px',
              src:  ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAPCAMAAACGJ/w5AAAANlBMVEUAAAB0AAAAAQAzAQBoAAJmAjKbADCYBQHNAAAuNDH+AAD/MjJOZ2T/ZWSFtrT/mJn/zMv9//yGfUq+AAAAAXRSTlMAQObYZgAAALVJREFUKM+dklkOgzAMRC1vsaUoEve/bLNQGgeoSucjGIsnD+MAVCERIjwXJjNLf5BiiZnpQ2rXu4qP0R9io1K2rWDg+icBnPrdKKp5afIJhBsQDhATq1HOJed5Yj+vQDhAJbVE7k6rVbixujsVkhZqMl7COU2MJFWwrcOMp4VcgyHXBmrjkuD8iyGKU71blfYiMk9bN6CxP66bDBGc93hbj5kiWI/15ujX+hL8UV7zcUf0R9QLCHwJf/52egwAAAAASUVORK5CYII='
        });
        subjectspan.textContent = '';
        $.add(subjectspan, suspan);
        subjectspan&&(subjectspan.style.opacity='0.75');
        namespan&&(namespan.style.opacity='0.05');
        tripspan&&(tripspan.style.opacity='0.05');
      }
      if (Set['Mark Sync Posts'] && this.isReply && Posts.nameByPost[this.ID]) {
        $.addClass(this.nodes.post, 'sync-post');
      }
      if (Set['Filter']) {
        for (type in obj = {
          name: name,
          tripcode: tripcode,
          subject: subject,
          email: email
        }) {
          if (!(info = obj[type]) || !(regex = Filter[type + "s"])) {
            continue;
          }
          if (RegExp("" + regex).test(info)) {
            $.addClass(this.nodes.root, 'sync-filtered');
            return;
          }
        }
      }

      return $.event('FSPostUpdated');

    }
 /*
  * BROKEN: because there is no uID
  * Todo: add uid to JSON?
  *
      ,
    customName: function(uID) {
      var n;
      console.log(uID, Posts.nameByID[uID]);
      if (!(n = prompt('Custom Name', 'Anonymous'))) {
        return;
      }
      Posts.nameByID[uID] = {
        n: n
      };
      return Posts.updateAllPosts();
    }
 */
  };

  Settings = {
    init: function() {
      var el, i, len, ref, ref1, section, setting, stored, val;
      ref = Object.keys(Config);
      for (i = 0, len = ref.length; i < len; i++) {
        section = ref[i];
        ref1 = Config[section];
        for (setting in ref1) {
          val = ref1[setting];
          stored = $.get(setting);
          Set[setting] = stored === null ? val[0] : stored === 'true';
        }
      }
      el = $.el('a', {
        href: 'javascript:;',
        className: 'shortcut',
        textContent: 'FS', //Have it a different button so it is distinguishable if there are multi instances
        title: '4chanX NameSync/FrenSync'+g.VERSION+' Settings'
      });
      return $.asap((function() {
        return $.id('shortcuts');
      }), function() {
        $.add($.id('shortcuts'), el);
        return $.on(el, 'click', function() {
          $.event('OpenSettings', {
            detail: 'none'
          });
          section = $('[class^="section-"]');
          section.className = 'section-name-sync';
          return Settings.open(section);
        });
      });
    },
    open: function(section) {
      var check, checked, field, i, istrue, j, len, len1, ref, ref1, ref2, setting, stored, text, val;
      //section.innerHTML = "<fieldset>\n  	<legend>\n    		<label><input type=checkbox name='Persona Fields' " + ($.get('Persona Fields') === 'true' ? 'checked' : '') + ">Persona</label>\n  	</legend>\n  <p>Share these fields instead of the 4chan X quick reply fields.</p>\n  <div>\n    	<input type=text name=Name placeholder=Name>\n    	<input type=text name=Email placeholder=Email>\n    	<input type=text name=Subject placeholder=Subject>\n  </div>\n</fieldset>\n<fieldset>\n  	<legend>\n    <label><input type=checkbox name=Filter " + ($.get('Filter') === 'true' ? 'checked' : '') + ">Filter</label>\n  	</legend>\n  <p><code>^(?!Anonymous$)</code> to filter all names <code>!tripcode|!tripcode</code> to filter multiple tripcodes. Only applies to sync posts.</p>\n  <div>\n    	<input type=text name=FilterNames placeholder=Names>\n    	<input type=text name=FilterTripcodes placeholder=Tripcodes>\n    	<input type=text name=FilterEmails placeholder=Email>\n    	<input type=text name=FilterSubjects placeholder=Subjects>\n  </div>\n</fieldset>\n<fieldset>\n  <legend>Advanced</legend>\n  <div>\n    	<input id=syncClear type=button value='Clear my sync history' title='Clear your sync history from the server'>\n    	Sync Delay: <input type=number name=Delay min=0 step=100 placeholder=300 title='Delay before synchronising after a thread or index update'> ms\n   	</div>\n</fieldset>\n<fieldset>\n  	<legend>About</legend>\n  	<div>4chanX FrenSync v" + g.VERSION + "</div>\n  	<div>\n    		<a href='https://m8q16hakamiuv8ch.myfritz.net' target=_blank>Website</a> |\n    		<a href='https://github.com/OPROSVOs/frensync/wiki/Support' target=_blank>Support</a> |\n    		<a href='https://github.com/OPROSVOs/frensync/license' target=_blank>License</a> |\n      		<a href='https://github.com/OPROSVOs/frensync/issues/new' target=_blank>Issues</a>\n  	</div>\n<p></p>	<div>Based on 4chan X Name Sync v4.9.3</div>\n  	<div>\n    <a href='http://milkytiptoe.github.io/Name-Sync/' target=_blank>Website</a> |\n    		<a href='https://github.com/milkytiptoe/Name-Sync/wiki/Support' target=_blank>Support</a> |\n    		<a href='https://raw.githubusercontent.com/milkytiptoe/Name-Sync/master/license' target=_blank>License</a> |\n    		<a href='https://raw.githubusercontent.com/milkytiptoe/Name-Sync/master/changelog' target=_blank>Changelog</a> |\n    		<a href='https://github.com/milkytiptoe/Name-Sync/issues/new' target=_blank>Issues</a>\n  	</div>\n</fieldset>";
      section.innerHTML = `<fieldset>
  	<legend>
    		<label><input type=checkbox name='Persona Fields' ` + ($.get('Persona Fields') === 'true' ? 'checked' : '') + `>Persona</label>
  	</legend>
  <p>Share these fields instead of the 4chan X quick reply fields.</p>
  <div>
    	<p style="margin:0.1em 0px">
        <span style=display:inline-block>Name:</span>
        <input type=text name=Name placeholder=Name>
      </p>
      <p style="margin:0.1em 0px">
        <span style=display:inline-block>Email:</span>
        <input type=text name=Email placeholder=Email>
      </p>
      <p style="margin:0.1em 0px">
        <span style=display:inline-block>Subject:</span>
        <input type=text name=Subject placeholder=Subject>
      </p>
    	<p style="margin:0.1em 0px">
        <span style=display:inline-block>'Simple Color':</span>
        <span style=display:inline-block>Color lightness:</span>
		    <input type=number name=ColorAmount placeholder=0 value=0 min=0 max=50 step=1 style='width:50px'  title='How much color shall it be (0-50)? Depends on dark/bright theme'>
		    <span style=display:inline-block>Color hue:</span>
        <input type=number name=ColorHue placeholder=0 value=0 min=0 max=359 step=5 style='width:50px' title='Hue (0-359)'>
      </p>
      <p style="margin:0.1em 0px" id="FSmorecolorsnode">
        <span style=display:inline-block name=FStringTest>'More colors' string:</span>
        <input type=text name=FString placeholder='See documentation, leave empty when unused' maxlength=256 style='width:400px'>
        <span style=display:inline-block><a href='https://github.com/OPROSVOs/frensync/blob/main/README_colors.md' target=_new>[HELP]</a></span>
        <br><br>
        <span style='margin:9px;padding:9px;border:1px solid gray;background-color: #282a2e;color:#c5c8c6'>
          <span id=fsdmi style=font-size:10pt>
            <span id=fsdms style=color:#b294bb;font-weight:700>Preview Darkmodesubject</span>
            <span id=fsdmm style=font-size:10pt>
              <span id=fsdmn style=color:#c5c8c6;font-weight:700>Darkmodename</span>
              <span id=fsdmt style=color:#c5c8c6;font-weight:400>!tripcode12</span>
            </span>
             01/01/22(Sa)12:34:56 No.000000001</span>
          </span>
        <br><br>
        <span style='margin:9px;padding:9px;border:1px solid gray;background-color: #f0e0d6;color:maroon'>
          <span id=fslmi style=font-size:10pt>
          <span id=fslms style=color:#cc1105;font-weight:700>Preview Lightmodesubject</span>
            <span id=fslmm style=font-size:10pt>
              <span id=fslmn style=color:#117743;font-weight:700>Lightmodename</span>
              <span id=fslmt style=color:#117743;font-weight:400>!tripcode12</span>
            </span>
             01/01/22(Sa)12:34:56 No.000000001</span>
          </span>

      </p>
      <br>


  </div>
</fieldset>
<fieldset>
  	<legend>
    <label><input type=checkbox name=Filter ` + ($.get('Filter') === 'true' ? 'checked' : '') + `>Filter</label>
  	</legend>
  <p><code>^(?!Anonymous$)</code> to filter all names <code>!tripcode|!tripcode</code> to filter multiple tripcodes. Only applies to sync posts.</p>
  <div>
    	<input type=text name=FilterNames placeholder=Names>
    	<input type=text name=FilterTripcodes placeholder=Tripcodes>
    	<input type=text name=FilterEmails placeholder=Email>
    	<input type=text name=FilterSubjects placeholder=Subjects>
  </div>
</fieldset>
<fieldset>
  <legend>Current Server Status</legend>
  <div id=availRoot>
   	</div>
</fieldset>
<fieldset>
  <legend>Advanced</legend>
  <div>
    	<input id=syncClear type=button value='Clear my sync history' title='Clear your sync history from the server'>
    	Sync Delay: <input type=number name=Delay min=0 step=100 placeholder=300 title='Delay before synchronising after a thread or index update'> ms
   	</div>
</fieldset>
<fieldset>
  	<legend>About</legend>
  	<div>4chanX FrenSync v `+ g.VERSION + `</div>
  	<div>
    		<a href='https://m8q16hakamiuv8ch.myfritz.net' target=_blank>Website</a> |
    		<a href='https://github.com/OPROSVOs/frensync/wiki/Support' target=_blank>Support</a> |
    		<a href='https://github.com/OPROSVOs/frensync/license' target=_blank>License</a> |
      		<a href='https://github.com/OPROSVOs/frensync/issues/new' target=_blank>Issues</a>
  	</div>
<p></p>	<div>Based on 4chan X Name Sync v4.9.3</div>
  	<div>
    <a href='http://milkytiptoe.github.io/Name-Sync/' target=_blank>Website</a> |
    		<a href='https://github.com/milkytiptoe/Name-Sync/wiki/Support' target=_blank>Support</a> |
    		<a href='https://raw.githubusercontent.com/milkytiptoe/Name-Sync/master/license' target=_blank>License</a> |
    		<a href='https://raw.githubusercontent.com/milkytiptoe/Name-Sync/master/changelog' target=_blank>Changelog</a> |
    		<a href='https://github.com/milkytiptoe/Name-Sync/issues/new' target=_blank>Issues</a>
  	</div>
</fieldset>
      `;
      field = $.el('fieldset');
      $.add(field, $.el('legend', {
        textContent: 'Main (settings require reload to apply)'
      }));
      ref = Config.main;
      for (setting in ref) {
        val = ref[setting];
        stored = $.get(setting);
        istrue = stored === null ? val[0] : stored === 'true';
        checked = istrue ? 'checked' : '';
        $.add(field, $.el('div', {
          innerHTML: "<label><input type=checkbox name='" + setting + "' " + checked + ">" + setting + "</label><span class=description>: " + val[1] + "</span>"
        }));
      }
      $.prepend(section, field);
      ref1 = $$('input[type=checkbox]', section);
      for (i = 0, len = ref1.length; i < len; i++) {
        check = ref1[i];
        $.on(check, 'click', function() {
          return $.set(this.name, this.checked);
        });
      }
      ref2 = $$('input[type=text], input[type=number]', section);
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        text = ref2[j];
        text.value = $.get(text.name) || '';
        $.on(text, 'input', function() {
          var err, error, regexp;
          if (/^Filter/.test(this.name)) {
            try {
              regexp = RegExp(this.value);
            } catch (error) {
              err = error;
              alert(err.message);
              return this.value = $.get(this.name);
            }
          }
          return $.set(this.name, this.value);
        });
      }
      MasterServer.checkAvail($('#availRoot', section));
      $.on($('#syncClear', section), 'click', Sync.clear);//TODO
      var pr=$('[Name=ColorPreview]', section);
      var ca=$('input[Name=ColorAmount]', section);
      var fs=$('input[Name=FString]', section);
      var fst=$('[Name=FStringTest]', section);
      var ch=$('input[Name=ColorHue]', section);
      var na=$('input[Name=Name]', section);

      var c= function(e) {
        na.style.color=((1<=ca.value)?($.calcColor(ch.value,ca.value)):"");
        if(e=='change'){$.set('ca', ca.value);$.set('ch', ch.value);}
      }
      $.on(ca, 'change', c);
      $.on(ch, 'change', c);
      c('');

      var d = function(e) {
        try{
          var elements = [$('#fsdmn', section), $('#fslmn', section), $('#fsdmt', section), $('#fslmt', section), $('#fsdms', section), $('#fslms', section), $('#fsdmi', section), $('#fslmi', section), $('#fsdmm', section), $('#fslmm', section)];
          elements.forEach((e,i)=>{e.style['text-shadow']="";e.style.background="";e.style['-webkit-text-fill-color'] ="";});
          $('#fsdms', section).style['color'] ="#b294bb";
          $('#fsdmn', section).style['color'] ="#c5c8c6";
          $('#fsdmt', section).style['color'] ="#c5c8c6";
          $('#fslms', section).style['color'] ="#b294bb";
          $('#fslmn', section).style['color'] ="#117743";
          $('#fslmt', section).style['color'] ="#117743";
          /*TODO: Regenerate/Reset the colors in the thread on style change and trigger a redraw*/

          fs.value.split('|').forEach((e,i) => {
            var cmd = e.charAt(0);
            var cg = function(cmd, type, where){
                if(!where){return}
                var strarr = cmd.substring(1).replace(/([^a-f0-9pxm\%\,\ \#]+)/gi, '').split(",");
                where.style.background=type+'('+strarr.shift()+'deg, '+ strarr.join()+')';
                where.style['-webkit-background-clip'] = 'text';
                where.style['-webkit-text-fill-color'] = 'transparent';
            }
            var cs = function(cmd, where){
                if(!where){return}
                var strarr = cmd.substring(1).replace(/([^a-f0-9\,\ \#]+)/gi, '').split(",");
                if(!strarr[0] || strarr[0] < 0 || strarr[0] > 15){strarr[0]=0;} // X
                if(!strarr[1] || strarr[1] < 0 || strarr[1] > 15){strarr[1]=0;} // Y
                if(!strarr[2] || strarr[2] < 1 || strarr[2] > 25){strarr[2]=5;} // Blur
                if(!/^\#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(strarr[3])){strarr[3]='#000';} // Color
                where.style['text-shadow'] = strarr[0]+'px '+strarr[1]+'px '+strarr[2]+'px '+strarr[3];
            }
            var cc = function(cmd, where){
                where.style['color'] = cmd.substring(1).replace(/([^a-f0-9\#]+)/gi, '');
            }
            if(cmd=='a'){cg(e, 'linear-gradient', $('#fsdmn', section))}
            if(cmd=='A'){cg(e, 'linear-gradient', $('#fslmn', section))}
            if(cmd=='b'){cg(e, 'linear-gradient-repeat', $('#fsdmn', section))}
            if(cmd=='B'){cg(e, 'linear-gradient-repeat', $('#fslmn', section))}
            if(cmd=='c'){cg(e, 'linear-gradient', $('#fsdmt', section))}
            if(cmd=='C'){cg(e, 'linear-gradient', $('#fslmt', section))}
            if(cmd=='d'){cg(e, 'linear-gradient-repeat', $('#fsdmt', section))}
            if(cmd=='D'){cg(e, 'linear-gradient-repeat', $('#fslmt', section))}
            if(cmd=='e'){cg(e, 'linear-gradient', $('#fsdmm', section))}
            if(cmd=='E'){cg(e, 'linear-gradient', $('#fslmm', section))}
            if(cmd=='f'){cg(e, 'linear-gradient-repeat', $('#fsdmm', section))}
            if(cmd=='F'){cg(e, 'linear-gradient-repeat', $('#fslmm', section))}
            if(cmd=='g'){cg(e, 'linear-gradient', $('#fsdms', section))}
            if(cmd=='G'){cg(e, 'linear-gradient', $('#fslms', section))}
            if(cmd=='h'){cg(e, 'linear-gradient-repeat', $('#fsdms', section))}
            if(cmd=='H'){cg(e, 'linear-gradient-repeat', $('#fslms', section))}
            if(cmd=='i'){cg(e, 'linear-gradient', $('#fsdmi', section))}
            if(cmd=='I'){cg(e, 'linear-gradient', $('#fslmi', section))}
            if(cmd=='j'){cg(e, 'linear-gradient-repeat', $('#fsdmi', section))}
            if(cmd=='J'){cg(e, 'linear-gradient-repeat', $('#fslmi', section))}
            if(cmd=='k'){cs(e, $('#fsdmn', section))}
            if(cmd=='K'){cs(e, $('#fslmn', section))}
            if(cmd=='l'){cs(e, $('#fsdmt', section))}
            if(cmd=='L'){cs(e, $('#fslmt', section))}
            if(cmd=='m'){cs(e, $('#fsdms', section))}
            if(cmd=='M'){cs(e, $('#fslms', section))}
            if(cmd=='n'){cs(e, $('#fsdmi', section))}
            if(cmd=='N'){cs(e, $('#fslmi', section))}



            if(cmd=='o'){cc(e, $('#fsdmn', section))}
            if(cmd=='O'){cc(e, $('#fslmn', section))}
            if(cmd=='p'){cc(e, $('#fsdmt', section))}
            if(cmd=='P'){cc(e, $('#fslmt', section))}
            if(cmd=='q'){cc(e, $('#fsdmm', section))}
            if(cmd=='Q'){cc(e, $('#fslmm', section))}
            if(cmd=='r'){cc(e, $('#fsdms', section))}
            if(cmd=='R'){cc(e, $('#fslms', section))}
            if(cmd=='s'){cc(e, $('#fsdmi', section))}
            if(cmd=='S'){cc(e, $('#fslmi', section))}
          });

        }catch(e){console.log("FS: Settings",e)}

      }
      $.on(fs, 'change', d);
      d('');


      if($.get('MoreColors') == 'false'){$('#FSmorecolorsnode', section).style.visibility = 'hidden'}
      /*
       * watchSettings = function(e) {
        if ((input = $.getOwn(inputs, e.target.name))) {
          input.checked = e.target.checked;
          return $.event('change', null, input);
        }
      };
      $.on(d, 'OpenSettings', function() {
        return $.on($.id('fourchanx-settings'), 'change', watchSettings);
      });
      */
      return $('div[id$="x-settings"] nav').style.visibility = 'hidden';
    }
  };

  Sync = {
    init: function() {
      this.disabled = false;
      this.lastModified = '0';
      this.delay = (parseInt($.get('Delay'))) || 300;
      this.failedSends = 0;
      this.canRetry = true;
      if (!Main.boardLegit()) {
        $.off(d, 'QRPostSuccessful', this.requestSend);
        $.off(d, 'ThreadUpdate', this.threadUpdate);
        $.off(d, 'IndexRefresh', this.indexRefresh);
        return;
      }
      if (!Set['Read-only Mode']) {
        this.setupQR();
        $.on(d, 'QRPostSuccessful', this.requestSend);
      }
      $.on(d, 'ThreadUpdate', this.threadUpdate);
      $.on(d, 'IndexRefresh', this.indexRefresh);
      return this.sync(true);
    },
    indexRefresh: function() {
      return setTimeout(function() {
        var i, j, len, len1, post, ref, ref1, thread;
        g.posts = {};
        g.threads = [];
        ref = $$('.thread');
        for (i = 0, len = ref.length; i < len; i++) {
          thread = ref[i];
          g.threads.push(thread.id.slice(1));
        }
        ref1 = $$('.thread > .postContainer');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          post = ref1[j];
          g.posts[post.id.slice(2)] = new Post(post);
        }
        clearTimeout(Sync.handle);
        return Sync.handle = setTimeout(Sync.sync, Sync.delay);
      }, Sync.delay);
    },
    threadUpdate: function(e) {
      var l;
      if (e.detail[404]) {
        return Sync.disabled = true;
      }
      if (!(l = e.detail.newPosts.length > 0)) {
        return;
      }
      clearTimeout(Sync.handle);
      return Sync.handle = setTimeout(Sync.sync, Sync.delay);
    },
    sync: function(repeat) {
      if (g.threads.length === 0) {
        return;
      }
      if(Set['LOG']){console.log("SYNC", repeat);}
      var len, i;
      for (i = 0, len = MasterServer.data.server.length; i < len; i++) {
        var srv = MasterServer.getServer(i);
        var val = MasterServer.getServerInfo(i);
        var index = i;
        if (val.qp === false) { continue; }
        try{
          $.ajax(srv, 'qp', 'GET', "t=" + g.threads + "&b=" + g.board, function(that) {
            var i, len, poster, ref;
            if (!(that.status === 200 && that.response)) return;
            if (g.view === 'thread') {
              if(null!=that.responseHeaders){ //if we have headers, save the last modified
                try{
                  var headers=that.responseHeaders.split("\r\n");
                  for(var a in headers){
                    if(0===headers[a].indexOf("Last-Modified: ")) Sync.lastModified=headers[a].split(": ")[1]||Sync.lastModified
                  }
                  //Sync.lastModified = that.getResponseHeaders('Last-Modified') || Sync.lastModified; //not working
                }catch(e){}
              }
            }
            try {
              ref = JSON.parse(that.response);
            }catch(e){console.log("error parsing json", that);return;}
            var trace = Set['Show origin'];
            var origin = (((that.responseURL)?that.responseURL:'')+((that.finalUrl)?that.finalUrl:'')).substr(8,3); // finalUrl or responseURL whatever
            Main.detectBgColor();
            for (var j = 0, l = ref.length; j < l; j++) {
              var fresh = ref[j];
              var stale = Posts.nameByPost[ref[j].p];
              /*if(stale['p'] != null && fresh['p'] != null && stale['p'] == fresh['p']){
                console.log("skipped");
                continue;
              } // Doesnt work for deletes */
              if(stale === undefined){stale = {}}
              for (var b in fresh) {
                if(stale[b] != null && fresh[b] != null){
                  if(stale[b].length != fresh[b].length){
                    if(fresh[b].length < stale[b].length && fresh[b].length > 0){
                      stale[b] = fresh[b]; //update if shorter
                    }
                  }
                }
                //not for trips that are set or empty variables
                if((b != 't' && stale[b] == null) || stale[b] == null){stale[b] = fresh[b]}
              }
              if(trace){
                stale[origin] = 1;
              }
              Posts.nameByPost[ref[j].p] = stale;
            }
            Posts.updateAllPosts();
            return $.event('NamesSynced'); //Will trigger all event listeners on NamesSynced
          }
          );

        }catch(e){
            console.log("FS: qp error", val, srv, e);
        }
      }

      if (repeat && g.view === 'thread' && !Sync.disabled) {
        return setTimeout(Sync.sync, 30000, true);
      }
    },
    setupQR: function() {
      var qr;
      if (!(qr = $.id('qr'))) {
        $.on(d, 'QRDialogCreation', Sync.setupQR);
        return;
      }
      $.addClass(qr, 'sync-enabled');
      return $('input[data-name=email]', qr).placeholder = 'E-mail';
    },
    requestSend: function(e) {
      var currentEmail, currentName, currentSubject, postID, qr, threadID, ca, ch, func, fstring;
      postID = e.detail.postID;
      threadID = e.detail.threadID;
      if (Set['Persona Fields']) {
        currentName = $.get('Name') || '';
        currentEmail = $.get('Email') || '';
        currentSubject = $.get('Subject') || '';
      } else {
        qr = $.id('qr');
        currentName = $('input[data-name=name]', qr).value;
        currentEmail = $('input[data-name=email]', qr).value;
        currentSubject = $('input[data-name=sub]', qr).value;
      }
      currentName = currentName.trim();
      currentEmail = currentEmail.trim();
      currentSubject = currentSubject.trim();
      if (Set['Hide Sage'] && /sage/i.test(currentEmail)) {
        return;
      }
      if (/since4pass/i.test(currentEmail)) {
        currentEmail = '';
      }
      if (currentName + currentEmail + currentSubject === '') {
        return;
      }

      ca = $.get("ColorAmount");
      ch = $.get("ColorHue");
      fstring = $.get("FString");

      //Custom script part if checked
      /*
      if($.get('CustomScript') === "true"){
        var func = $.get("FsScript");
        try{
          if(func != null && func.length > 0){
            var params = [ca, ch, currentName, currentEmail, currentSubject, fstring];
            console.log("FS: Custom script parameters:", params);

            //eval under the hood in global scope("how you call it in the string", executable string)(data passed)
            var ret = new Function("params", func)(params);
            //Example for func: Change ca to 42 and count ch up 0, 5, 10, 15
            //params[0]=42;params[1]=(document.i=5+document.i||0);return params;

            console.log("FS: Custom script returns:", ret);
            if(Array.isArray(ret)){ //double check before applying changes
              if(ret[0]!=null){ca=ret[0]}
              if(ret[1]!=null){ch=ret[1]}
              if(ret[2]!=null){currentName=ret[2]}
              if(ret[3]!=null){currentEmail=ret[3]}
              if(ret[4]!=null){currentSubject=ret[4]}
              if(ret[5]!=null){fstring=ret[5]}
            }else{console.log("FS:Expected an Array as return");}
          }else{
            console.log("FS:No valid scriptlet in config");
          }
        }catch(e){
          console.log("FS custom script error:", e);
          $.event('CreateNotification', {
                detail: {
                  type: 'warning',
                  content: 'FS: There was an error executing the custom script in the settings. Check logs.',
                  lifetime: 8
           }
          });
        }
      }*/

      return Sync.send(currentName, currentEmail, currentSubject, postID, threadID, null, ca, ch, fstring);
    },
    send: function    (name,email,subject,postID, threadID, retryTimer, ca, ch, fstring) {
    if(Set['LOG']){try{console.log("SEND POST", name.slice(0,name.indexOf("#")).padEnd(16,"*"), email, subject, postID, threadID, retryTimer, ca, ch, fstring);}catch(e){}}
    var len, i;
    for (i = 0, len = MasterServer.data.server.length; i < len; i++) {
      var srv = MasterServer.getServer(i);
      var val = MasterServer.getServerInfo(i);
      if (val.sp === false) { continue; }
      try{
          var col = "&ca=" + parseInt(ca)+ "&ch=" + parseInt(ch) + "&fstr=" + (encodeURIComponent(fstring));
          var ident = "&n=" + (encodeURIComponent(name)) + "&s=" + (encodeURIComponent(subject)) + "&e=" + (encodeURIComponent(email));
          if(srv == "namesync.net"){col = "";} //the server returns still an error 500... maybe the requested_with
          var params = "p=" + postID + "&t=" + threadID + "&b=" + g.board + ident + "&dnt=" + (Set['Do Not Track'] ? '1' : '0') + col;
          var r = $.ajax(srv, 'sp', 'POST', params , function(that){// no onload callback
          }, function(that) {//onerror callback
          if (!Sync.canRetry) {
            return;
          }
          retryTimer = retryTimer || 0;
          if (retryTimer > 10000) {
            ++Sync.failedSends;
            if (Sync.failedSends === 2) {
              $.event('CreateNotification', {
              detail: {
                type: 'warning',
                content: 'Connection errors with sync server. Fields may not appear.',
                lifetime: 8
              }
              });
            }
            if (Sync.failedSends >= val.retry) {
              Sync.canRetry = false;
              setTimeout(function() {
              return Sync.canRetry = true;
              }, 60000);
            }
            return;
          }
          retryTimer += retryTimer < 5000 ? 2000 : 5000;
          return setTimeout(Sync.send, retryTimer, name, email, subject, postID, threadID, retryTimer);
        });
      }catch(e){
            console.log("FS: sp error", val, srv, e);
        }
      }

	  return r; /*return any; its async anyway*/
    },
    clear: function() {
      if (confirm("This nukes all site data (incl. tripcode fields) and your posts, ARE YOU SURE??\n Server side not fully implemented") == true) {
        localStorage.clear();
        $('#syncClear').disabled = true;
      } else {
        return;
      }
	  this.NSserver = (parseInt($.get('NSserver'))) || 'namesync.net,nsredux.com,m8q16hakamiuv8ch.myfritz.net';
	  this.NSserver.split(',').forEach(function(server){
		  return $.ajax(server, 'rm', 'POST', '',
      function() { //onload
			  if (this.status !== 200) {
				return;
			  }
			  return $('#syncClear').value = 'Cleared';
			}, function() { //onerror
			  return $('#syncClear').value = 'Error';
			});
	  });
    }
  };

  $.on(d, '4chanXInitFinished', Main.init);
  $.on(window, 'DOMContentLoaded', Main.DOMinit);

  Post = (function() {
    Post.prototype.toString = function() {
      return this.ID;
    };

    function Post(root) {
      var capcode, date, info, name, post, subject, uID;
      this.ID = root.id.slice(2);
      post = $('.post', root);
      info = $('.postInfo', post);
      this.nodes = {
        root: root,
        post: post,
        info: info
      };
      this.isReply = $.hasClass(post, 'reply');
      this.info = {};
      if (!(subject = $('.subject', info))) {
        subject = $.el('span', {
          className: 'subject'
        });
        $.after($('[type="checkbox"]', info), [$.tn(' '), subject]);
      }
      this.nodes.subject = subject;
      if (name = $('.name', info)) {
        this.nodes.name = name;
      }
      if (capcode = $('.capcode.hand', info)) {
        this.info.capcode = capcode.textContent.replace('## ', '');
      }
      if (date = $('.dateTime', info)) {
        this.info.date = date.dataset.utc;
      }
      if (uID = $('.posteruid .hand', info)) {
        this.info.uID = uID.textContent;
      }
    }

    return Post;

  })();

}).call(this);
