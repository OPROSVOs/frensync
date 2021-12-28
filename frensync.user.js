// ==UserScript==
// @name         frensync
// @version      0.1.1
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
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSIVETuIdMhQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v+SQosYD4778e7e4+4dIDQqTDW7JgBVs4xUPCZmc6ti4BVBhCFgAGMSM/VEejEDz/F1Dx9f76I8y/vcn6NPyZsM8InEc0w3LOIN4plNS+e8TxxiJUkhPiceN+iCxI9cl11+41x0WOCZISOTmicOEYvFDpY7mJUMlXiaOKKoGuULWZcVzluc1UqNte7JXxjMaytprtMMI44lJJCECBk1lFGBhSitGikmUrQf8/APO/4kuWRylcHIsYAqVEiOH/wPfndrFqYm3aRgDOh+se2PESCwCzTrtv19bNvNE8D/DFxpbX+1Acx+kl5va5EjoH8buLhua/IecLkDDD3pkiE5kp+mUCgA72f0TTlg8BboXXN7a+3j9AHIUFfLN8DBITBapOx1j3f3dPb275lWfz+JOnKwS635CAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+UMHAIWLQ+hGHsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAGiUlEQVRYw8WXW2xU1xWGv33mzBx7PL6Mx2OPZ8aDBye+4GADjgnEJYQmKrmopKWo0DRIbdWHpoQoF8Wt2sJDWylJUZKWtkqaIKQqF6VRmwcemiiA2oaLbJIYzMVgEzu2MR7MgGdsj2c8t7P7YPtgbBPGEhJbOg9n77XX+vfaa/1rbbjNQ0gpMxI0m81qbW3tA+3t7U3AMsA3S6QLOFdfX3/kzJkzB5PJZOqWABBCOIHngJ8CRQBFDRacd+ZgLbIAEL2SIHh+nCtfJKa3XQH2AK9KKYPz6PwBsNHhcBy6IQBFUbKklDuApwFbzRY7i9c5KKywkp1vBjFrg4TYSJLh7ig9/7nK2fdDABHgJZPJ9HIqlUplZWUp8Xj8SWA3oNjt9uS8AIQQVcB7wIolP7RT9303ue4shMjsXqWEcH+MMx8G6Hg3BNACPA40Az+r3VqIlNDxznDrHABTxv9nqzCVrG3241mRP+e08dEU41cTML1VQI7DgpanzvFKf0uIw3/sI9KdTgCWlc+7qN/s5sifeul4d7hVnWW8GvivrcJU8vAfqrAvyjbWkrE0A5+PcHbfEBc/jSLTs7xmAs99Vmo2lOC9Ox9ztgkE+FbbedidxUfNnZZVT5bhv68QoQj6W0YAJgwPqKpqcbvdp4bNg5WP7qqiYIbxgc/CHP1zH+GOFMBJYF9lZWVnV1fXhSmRMqAK2ADUFSxRuXf7IryNBTe8pvc2nyDSnd5jABBCvAo8++29d1JalwdAOik59cFFjr02BPDZ8uXLf93W1rb/JlmzAfgN0Lj6F26WfMeFyXz9HaYTOu98r514QN+jTG3yAz9v2FaMa2meIdj29wvTxl8WQqy5mfHJAJT7gCcA/dhfA6QT+hyZZEwnHtABIgqA1+t9QdGEVvVIsRHpfUdDHH8jCLBLSvlLXdfjGRGLED7gY6tPUR57swpLjunrxHsUgIGBgY3Vm+zYSjQAJkZSHNz5FR6Pp1UIsSNjWhXiLqfT2ea82+L/7t9qKarMmVcuGbsWwaoQYi1Qsvj+QmNy8PgIqbDkYvjiM1LK+AKo/ZvBYNCRm2/i013dNxSKRwwAoyrQCFDguxb15w9cweVydQQCgZYFFRYh3pJSrhr7Mr1i7MvozKVSq1vJW/HjUqSAiXCSy8cuA+SoQJXmUtBsk5SQGE/Tvz+CTEcOLrSy6boem2K860ZZWdnbYUvgiapHizFZFBKRFMf3BvEVL6pXAcw5ApOmGOw1RTIXblXJHRgYODmZfhKTBSw2FWupQm93r6Lc7n5AAUiOS9Jx3eB1YTLY7ZYMn89Xb1tswmQRRpZFutOUl5frKtAZv6Rz6sPAJH8DWqlCXqJosxCidJau01ar9bfj4+NyIQCi0egqz7pcTJZJhycik71Kb29vuwoEAHoPhdBskwCclVlApLgM66ZpJUOnJ0hc1jdFo9Ee4O0FZMZDQMXK+yuMubGAkdmHVaAQYN2v7iDfmzWvkvFggn+/cI7EZT0y1Xpldr+KogG/L6hVKZmqL1LC+QNB/H7/UE9Pz0mjHGu56g2Nf7Kjk9DpZAR4SErZmikAKeUuoKHp6XLM2ZPuD/dG6frnCHl5cu90EJbeSEEqrvPJzi6Cnyck8JiU8kimJxdC7Aa23/O8C09DvnH6U/8KAIyOjY29Mg3AaXYIVMvcfstsUfDfWwAgsrOzX6qurv5GBne+wePxtAHbVzeXctcmt7F2oSXEuffDALt1Xb8KoAJoBQpq9tyqJQUs2+qlqMrG0b/0NXZ2dB5yuVwnh4aG5jQkPp+vvr+//1tAXSTvEo+8XnFdQxLui3HotT7sdvsX69ev/x3Xujk+tlWY1j/+j2VThWiU/tYQ9ZvdZNvN1wrIWIrBE6M3bcmWbnThWpZnpDRAqC/GR82dRLrTQ0CjlNJgWRUoKK3LQUroPTzM/me/AiBwfJSmZ8oprsk1gtS/phD/mkJioSSxUHKG9Yya0iFg7Uzj0x5oqd1aeE9OsYVjr1wCOADsBD4AvCufc3HHg0XYijUyj/552/ItUsq+OTEDhIH8qf83NE3bNjExoSuKYpdSvgj8SJjR6n/ipLzJTq47a96HiUxLJsZSX/swmRet3+9/HTgLbNM0TZFSMvMD/F6v9y0gOOlUZFGDRdZsscuGp0pkw1MlsmaLXdqXmuX0usPhCGqa9iLgnK1v9regx2kqlXoAaAKqgcqZ6263u39wcPAEcEBV1aOZPk5v+/g/npnGu/aQAngAAAAASUVORK5CYII=
// ==/UserScript==

(function() {
  var $, $$, CSS, Config, Filter, Main, Post, Posts, Set, Settings, Sync, d, g,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Set = {};

  d = document;

  g = {
    NAMESPACE: 'frensync',
    VERSION: '0.1.0',
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

  $.ajax = function(server, file, type, data, callbacks) {
	var r, url;
	r = new XMLHttpRequest();
	if (file === 'qp') {
	  r.overrideMimeType('application/json');
	}
	url = "https://" + server + "/namesync/" + file + ".php";
	if (type === 'GET') {
	  url += "?" + data;
	}
	r.open(type, url, true);
	r.setRequestHeader('X-Requested-With', 'NameSync4.9.3-FrenSync'+g.VERSION);
	if (file === 'qp') {
	  r.setRequestHeader('If-Modified-Since', Sync.lastModified);
	}
	if (type === 'POST') {
	  r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	}
	$.extend(r, callbacks);
	r.withCredentials = true;
	r.send(data);
	return r;
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
    return localStorage.setItem("" + g.NAMESPACE + name, value);
  };

  Config = {
    main: {
      'Sync on /b/': [true, 'Enable sync on /b/.'],
      'Sync on /soc/': [true, 'Enable sync on /soc/.'],
      'Sync on /s4s/': [true, 'Enable sync on /s4s/.'],
      'Sync on /trash/': [true, 'Enable sync on /trash/.'],
      'Custom Names': [false, 'Posters can be given custom names.'],
      'Read-only Mode': [false, 'Share none of your sync fields.'],
      'Hide Sage': [false, 'Share none of your sync fields when sage is in the email field.'],
      'Mark Sync Posts': [false, 'Mark posts made by sync users.'],
      'Do Not Track': [false, 'Request no sync field tracking by third party archives.']
    },
    other: {
      'Persona Fields': [false],
      'Filter': [false]
    }
  };

  CSS = {
    init: function() {
      var css;
      css = ".section-name-sync input[type='text'] {\n  border: 1px solid #CCC;\n  width: 148px;\n  padding: 2px;\n}\n.section-name-sync input[type='button'] {\n  padding: 3px;\n  margin-bottom: 6px;\n}\n.section-name-sync p {\n  margin: 0 0 8px 0;\n}\n.section-name-sync ul {\n  list-style: none;\n  margin: 0;\n  padding: 8px;\n}\n.section-name-sync div label {\n  text-decoration: underline;\n}\n/* Appchan X description fix */\n.section-name-sync .description {\n  display: inline;\n}\n/* ccd0 4chan X clear fix */\n.section-name-sync {\n  clear: both;\n}\n/* Show sync fields in ccd0 4chan X */\n#qr.sync-enabled .persona input {\n  display: inline-block !important;\n}";
      if (Set['Filter']) {
        css += ".sync-filtered {\n  display: none !important;\n}";
      }
      if (Set['Mark Sync Posts']) {
        css += ".sync-post {\n  position: relative;\n}\n.sync-post:after {\n  content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAqFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAWFhYAAAAWFhYWFhYAAAAAAAAAAAAAAAAAAAAWFhYAAAAAAAAWFhYWFhYAAAAAAAAAAAAAAAAWFhYAAAAAAAAAAAAAAAAAAAAPAnI3AAAAOHRSTlMzADU0NiwGJjIvDi03AAEEFyUnHzAkCQUCIQUSKy0xHSgIKS4aESoKGCYDDCIvKBYpHg4jEBMHFH8kut4AAACvSURBVHheHY7FlsNADAQFw7ZjjO0wMy3v//9ZNO6DXpd0KAFK8sImiS1yxC7yISFiJtLhtBYuFMEQcssHYCCWqpRMpgX0H3JV+rOegywW8MOCkx4xMDPtoCYgPUJs5433zRZMu2mnIrlOc2NMB3tbluXxVzZnr5ML2JQonQjeHHF6h7HI+fmarVwUfkWO+sGffmcwVixtiNImg6qe+XgDospgBmGEfyu9dE31L19kb12bCeREPHJzAAAAAElFTkSuQmCC');\n  position: absolute;\n  bottom: 2px;\n  right: 5px;\n}";
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
            $('.post_tripcode', post).title = ref[i].t;
          }
          if (typeof ref[i].ca != null && typeof ref[i].ch != null && ref[i].ca !== "" && ref[i].ch !== "" && ref[i].ca > 0) {
            //debugger;
            $('.post_tripcode', post).style.color="hsl("+parseInt(ref[i].ch||30)+", 100%, 50%)";
            $('.post_author',   post).style.color="hsl("+parseInt(ref[i].ch||30)+", 100%, 50%)";
          }
        }
      }
      console.log('FS: Loaded');
      this.done = true;
    }
      
    
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  Main = {
    DOMinit: function() {
      //console.log("DOMinit fired",  Date.now() );
      if(window.location.href.indexOf("archived.moe") !== -1 || window.location.href.indexOf("desuarchive.org") !== -1){
        console.log("FS: We are running on an archive site - fetching names");
        NameFetch.init();
      }
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
        Posts.init();
        return Sync.init();
      }
    },
    boardLegit: function() {
      var ref;
      return ref = g.board, indexOf.call(g.boards, ref) >= 0;
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
        ca = parseInt(oinfo.ca) / 100 || 0;
        ch = parseInt(oinfo.ch) || 0;
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
      if (namespan.textContent !== name) {
        namespan.textContent = name;
      }
      if (subject) {
        if (subjectspan.textContent !== subject) {
          subjectspan.textContent = subject;
        }
      } else {
        if (subjectspan.textContent !== '') {
          subjectspan.textContent = '';
        }
      }
      if (email) {
        if (emailspan === null) {
          emailspan = $.el('a', {
            className: 'useremail'
          });
          $.before(namespan, emailspan);
        }
        $.add(emailspan, namespan);
        if (tripspan != null) {
          $.after(namespan, $.tn(' '));
          $.add(emailspan, tripspan);
        }
        emailspan.href = "mailto:" + email;
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
      if(ca && ch){
          if (tripspan){tripspan.style.color="hsl("+ch+", 100%, 50%)";}
          if (namespan){namespan.style.color="hsl("+ch+", 100%, 50%)";}
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
    },
    customName: function(uID) {
      var n;
      if (!(n = prompt('Custom Name', 'Anonymous'))) {
        return;
      }
      Posts.nameByID[uID] = {
        n: n
      };
      return Posts.updateAllPosts();
    }
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
    	<input type=text name=Name placeholder=Name>
    	<input type=text name=Email placeholder=Email>
    	<input type=text name=Subject placeholder=Subject>		
      <input type=text name=ColorPreview value='Color:' placeholder='color:' readonly=readonly style='width:35px;border:0'>
		  <input type=number name=ColorAmount placeholder=0 value=0 min=0 max=1 step=1 style='width:50px'  title='Enable or disable; TODO: use saturation'>
		  <input type=number name=ColorHue placeholder=0 value=0 min=0 max=360 step=10 style='width:50px' title='Hue'>
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
  <legend>Advanced</legend>
  <div>
    	<input id=syncImport type=button value='Import form Namesync' title='Import name and settings from NS'>
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
        textContent: 'Main'
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
      $.on($('#syncClear', section), 'click', Sync.clear);//TODO
      $.on($('#syncImport', section), 'click', Sync.import);
      
      var colorPreview=$('input[Name=ColorPreview]', section);
      var colorAmount= $('input[Name=ColorAmount]',  section);
      var colorHue=    $('input[Name=ColorHue]',     section);

      var changer= function(e) {
        if(colorAmount.value == 1){
          colorPreview.style.backgroundColor="hsl("+colorHue.value+", 100%, 50%)";
        }else{
          colorPreview.style.backgroundColor="";
        }
        if(e==='change'){$.set('ca', colorAmount.value);$.set('ch', colorHue.value);}
      }
      $.on(colorAmount, 'change', changer);
      $.on(colorHue, 'change', changer);
      changer('dryrun');
      
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
	  this.NSserver = (parseInt($.get('NSserver'))) || 'namesync.net,m8q16hakamiuv8ch.myfritz.net';
	  this.NSserver.split(',').forEach(function(server){
		  $.ajax(server, 'qp', 'GET', "t=" + g.threads + "&b=" + g.board, {
			onloadend: function() {
			  var i, len, poster, ref;
			  if (!(this.status === 200 && this.response)) {
				return;
			  }
			  if (g.view === 'thread') {
				Sync.lastModified = this.getResponseHeader('Last-Modified') || Sync.lastModified;
			  }
			  var ref;
			  try {
				ref = JSON.parse(this.response);
			  }catch(e){
				  // console.log(e); //error expected
				  return;
			  }
			  for (i = 0, len = ref.length; i < len; i++) {
          poster = ref[i];
          Posts.nameByPost[poster.p] = poster;
			  }
			  Posts.updateAllPosts();
			  return $.event('NamesSynced');
			}
		  });
	  });
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
      var currentEmail, currentName, currentSubject, postID, qr, threadID;
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
      return Sync.send(currentName, currentEmail, currentSubject, postID, threadID);
    },
    send: function(name, email, subject, postID, threadID, retryTimer) {
	  var r;
	  this.NSserver = (parseInt($.get('NSserver'))) || 'namesync.net,m8q16hakamiuv8ch.myfritz.net';
	  this.NSserver.split(',').forEach(function(server){
        var r = $.ajax(server, 'sp', 'POST', "p=" + postID + "&t=" + threadID + "&b=" + g.board + "&n=" + (encodeURIComponent(name)) + "&s=" + (encodeURIComponent(subject)) + "&e=" + (encodeURIComponent(email)) + "&dnt=" + (Set['Do Not Track'] ? '1' : '0') + "&ca=" + parseInt($.get("ColorAmount"))+ "&ch=" + parseInt($.get("ColorHue")), {
			onerror: function() {
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
				if (Sync.failedSends >= 3) {
				  Sync.canRetry = false;
				  setTimeout(function() {
					return Sync.canRetry = true;
				  }, 60000);
				}
				return;
			  }
			  retryTimer += retryTimer < 5000 ? 2000 : 5000;
			  return setTimeout(Sync.send, retryTimer, name, email, subject, postID, threadID, retryTimer);
			}
		  });
	  });
	  return r; /*return any; its async anyway*/
    },
    clear: function() {
      
      
      alert("To be implemented");//TODO
      
      
      $('#syncClear').disabled = true;
	  this.NSserver = (parseInt($.get('NSserver'))) || 'namesync.net,m8q16hakamiuv8ch.myfritz.net';
	  this.NSserver.split(',').forEach(function(server){
		  return $.ajax(server, 'rm', 'POST', '', {
			onerror: function() {
			  return $('#syncClear').value = 'Error';
			},
			onloadend: function() {
			  if (this.status !== 200) {
				return;
			  }
			  return $('#syncClear').value = 'Cleared';
			}
		  });
	  });
    },
    import: function() {
      
      
      alert("To be implemented");//TODO
      
      
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
