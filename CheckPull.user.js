// ==UserScript==
// @name          CheckPull
// @namespace     http://vitorgalvao.com/
// @version       0.1.2
// @description   Quickly merge pull requests on github.
// @match         https://*.github.com/*
// @run-at        document-end
// ==/UserScript==

// _licensed // Keypress version 2.1.4 (c) 2014 David Mauro; Licensed under the Apache License, Version 2.0; http://www.apache.org/licenses/LICENSE-2.0
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t={}.hasOwnProperty,u=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};f={is_unordered:!1,is_counting:!1,is_exclusive:!1,is_solitary:!1,prevent_default:!1,prevent_repeat:!1},r="meta alt option ctrl shift cmd".split(" "),p="ctrl",a={debug:!1};var v=function(a){var b,c;for(b in a)t.call(a,b)&&(c=a[b],!1!==c&&(this[b]=c));this.keys=this.keys||[],this.count=this.count||0};v.prototype.allows_key_repeat=function(){return!this.prevent_repeat&&"function"==typeof this.on_keydown},v.prototype.reset=function(){return this.count=0,this.keyup_fired=null};var w=function(a,b){var c,d;"undefined"!=typeof jQuery&&null!==jQuery&&a instanceof jQuery&&(1!==a.length&&o("Warning: your jQuery selector should have exactly one object."),a=a[0]),this.should_force_event_defaults=this.should_suppress_event_defaults=!1,this.sequence_delay=800,this._registered_combos=[],this._keys_down=[],this._active_combos=[],this._sequence=[],this._sequence_timer=null,this._prevent_capture=!1,this._defaults=b||{};for(c in f)t.call(f,c)&&(d=f[c],this._defaults[c]=this._defaults[c]||d);this.element=a||document.body,c=function(a,b,c){return a.addEventListener?a.addEventListener(b,c):a.attachEvent&&a.attachEvent("on"+b,c),c};var e=this;this.keydown_event=c(this.element,"keydown",function(a){return a=a||window.event,e._receive_input(a,!0),e._bug_catcher(a)});var g=this;this.keyup_event=c(this.element,"keyup",function(a){return a=a||window.event,g._receive_input(a,!1)});var h=this;this.blur_event=c(window,"blur",function(){var a,b,c,d;for(d=h._keys_down,b=0,c=d.length;c>b;b++)a=d[b],h._key_up(a,{});return h._keys_down=[]})};w.prototype.destroy=function(){var a;return a=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c):null!=a.removeEvent?a.removeEvent("on"+b,c):void 0},a(this.element,"keydown",this.keydown_event),a(this.element,"keyup",this.keyup_event),a(window,"blur",this.blur_event)},w.prototype._bug_catcher=function(a){var b,c;return"cmd"===p&&0<=u.call(this._keys_down,"cmd")&&"cmd"!==(b=d(null!=(c=a.keyCode)?c:a.key))&&"shift"!==b&&"alt"!==b&&"caps"!==b&&"tab"!==b?this._receive_input(a,!1):void 0},w.prototype._cmd_bug_check=function(a){return"cmd"===p&&0<=u.call(this._keys_down,"cmd")&&0>u.call(a,"cmd")?!1:!0},w.prototype._prevent_default=function(a,b){return(b||this.should_suppress_event_defaults)&&!this.should_force_event_defaults&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation)?a.stopPropagation():void 0},w.prototype._get_active_combos=function(a){var b,c;return b=[],c=g(this._keys_down,function(b){return b!==a}),c.push(a),this._match_combo_arrays(c,function(a){return function(c){return a._cmd_bug_check(c.keys)?b.push(c):void 0}}(this)),this._fuzzy_match_combo_arrays(c,function(a){return function(c){return 0<=u.call(b,c)||c.is_solitary||!a._cmd_bug_check(c.keys)?void 0:b.push(c)}}(this)),b},w.prototype._get_potential_combos=function(a){var b,c,d,e,f;for(c=[],f=this._registered_combos,d=0,e=f.length;e>d;d++)b=f[d],b.is_sequence||0<=u.call(b.keys,a)&&this._cmd_bug_check(b.keys)&&c.push(b);return c},w.prototype._add_to_active_combos=function(a){var b,c,d,e,f,g,h,i,j,k,l;if(g=!1,f=!0,d=!1,0<=u.call(this._active_combos,a))return!0;if(this._active_combos.length)for(e=h=0,k=this._active_combos.length;k>=0?k>h:h>k;e=k>=0?++h:--h)if((b=this._active_combos[e])&&b.is_exclusive&&a.is_exclusive){if(b=b.keys,!g)for(i=0,j=b.length;j>i;i++)if(c=b[i],g=!0,0>u.call(a.keys,c)){g=!1;break}if(f&&!g)for(l=a.keys,i=0,j=l.length;j>i;i++)if(c=l[i],f=!1,0>u.call(b,c)){f=!0;break}g&&(d?(b=this._active_combos.splice(e,1)[0],null!=b&&b.reset()):(b=this._active_combos.splice(e,1,a)[0],null!=b&&b.reset(),d=!0),f=!1)}return f&&this._active_combos.unshift(a),g||f},w.prototype._remove_from_active_combos=function(a){var b,c,d,e;for(c=d=0,e=this._active_combos.length;e>=0?e>d:d>e;c=e>=0?++d:--d)if(b=this._active_combos[c],b===a){a=this._active_combos.splice(c,1)[0],a.reset();break}},w.prototype._get_possible_sequences=function(){var a,b,c,d,e,f,h,i,j,k,l,m;for(d=[],k=this._registered_combos,f=0,j=k.length;j>f;f++)for(a=k[f],b=h=1,l=this._sequence.length;l>=1?l>=h:h>=l;b=l>=1?++h:--h)if(e=this._sequence.slice(-b),a.is_sequence){if(0>u.call(a.keys,"shift")&&(e=g(e,function(a){return"shift"!==a}),!e.length))continue;for(b=i=0,m=e.length;m>=0?m>i:i>m;b=m>=0?++i:--i){if(a.keys[b]!==e[b]){c=!1;break}c=!0}c&&d.push(a)}return d},w.prototype._add_key_to_sequence=function(a,b){var c,d,e,f;if(this._sequence.push(a),d=this._get_possible_sequences(),d.length){for(e=0,f=d.length;f>e;e++)c=d[e],this._prevent_default(b,c.prevent_default);this._sequence_timer&&clearTimeout(this._sequence_timer),-1<this.sequence_delay&&(this._sequence_timer=setTimeout(function(){return this._sequence=[]},this.sequence_delay))}else this._sequence=[]},w.prototype._get_sequence=function(a){var b,c,d,e,f,h,i,j,k,l,m,n;for(l=this._registered_combos,h=0,k=l.length;k>h;h++)if(b=l[h],b.is_sequence){for(c=i=1,m=this._sequence.length;m>=1?m>=i:i>=m;c=m>=1?++i:--i)if(f=g(this._sequence,function(a){return 0<=u.call(b.keys,"shift")?!0:"shift"!==a}).slice(-c),b.keys.length===f.length)for(c=j=0,n=f.length;n>=0?n>j:j>n;c=n>=0?++j:--j)if(e=f[c],!(0>u.call(b.keys,"shift")&&"shift"===e||"shift"===a&&0>u.call(b.keys,"shift"))){if(b.keys[c]!==e){d=!1;break}d=!0}if(d)return b.is_exclusive&&(this._sequence=[]),b}return!1},w.prototype._receive_input=function(a,b){var c,e;if(this._prevent_capture)this._keys_down.length&&(this._keys_down=[]);else if(c=d(null!=(e=a.keyCode)?e:a.key),(b||this._keys_down.length||!("alt"===c||c===p))&&c)return b?this._key_down(c,a):this._key_up(c,a)},w.prototype._fire=function(a,b,c,d){return"function"==typeof b["on_"+a]&&this._prevent_default(c,!0!==b["on_"+a].call(b["this"],c,b.count,d)),"release"===a&&(b.count=0),"keyup"===a?b.keyup_fired=!0:void 0},w.prototype._match_combo_arrays=function(a,d){var e,f,g,h;for(h=this._registered_combos,f=0,g=h.length;g>f;f++)e=h[f],(!e.is_unordered&&c(a,e.keys)||e.is_unordered&&b(a,e.keys))&&d(e)},w.prototype._fuzzy_match_combo_arrays=function(a,b){var c,d,e,f;for(f=this._registered_combos,d=0,e=f.length;e>d;d++)c=f[d],(!c.is_unordered&&j(c.keys,a)||c.is_unordered&&i(c.keys,a))&&b(c)},w.prototype._keys_remain=function(a){var b,c,d,e;for(e=a.keys,c=0,d=e.length;d>c;c++)if(a=e[c],0<=u.call(this._keys_down,a)){b=!0;break}return b},w.prototype._key_down=function(a,b){var c,d,f,g,h;(c=e(a,b))&&(a=c),this._add_key_to_sequence(a,b),(c=this._get_sequence(a))&&this._fire("keydown",c,b);for(f in q)c=q[f],b[c]&&(f===a||0<=u.call(this._keys_down,f)||this._keys_down.push(f));for(f in q)if(c=q[f],f!==a&&0<=u.call(this._keys_down,f)&&!b[c]&&!("cmd"===f&&"cmd"!==p))for(c=d=0,g=this._keys_down.length;g>=0?g>d:d>g;c=g>=0?++d:--d)this._keys_down[c]===f&&this._keys_down.splice(c,1);for(d=this._get_active_combos(a),f=this._get_potential_combos(a),g=0,h=d.length;h>g;g++)c=d[g],this._handle_combo_down(c,f,a,b);if(f.length)for(d=0,g=f.length;g>d;d++)c=f[d],this._prevent_default(b,c.prevent_default);0>u.call(this._keys_down,a)&&this._keys_down.push(a)},w.prototype._handle_combo_down=function(a,b,c,d){var e,f,g,h,i;if(0>u.call(a.keys,c))return!1;if(this._prevent_default(d,a&&a.prevent_default),e=!1,0<=u.call(this._keys_down,c)&&(e=!0,!a.allows_key_repeat()))return!1;if(g=this._add_to_active_combos(a,c),c=a.keyup_fired=!1,a.is_exclusive)for(h=0,i=b.length;i>h;h++)if(f=b[h],f.is_exclusive&&f.keys.length>a.keys.length){c=!0;break}return!c&&(a.is_counting&&"function"==typeof a.on_keydown&&(a.count+=1),g)?this._fire("keydown",a,d,e):void 0},w.prototype._key_up=function(a,b){var c,d,f,g,h,i;if(c=a,(f=e(a,b))&&(a=f),f=n[c],b.shiftKey?f&&0<=u.call(this._keys_down,f)||(a=c):c&&0<=u.call(this._keys_down,c)||(a=f),(g=this._get_sequence(a))&&this._fire("keyup",g,b),0>u.call(this._keys_down,a))return!1;for(g=h=0,i=this._keys_down.length;i>=0?i>h:h>i;g=i>=0?++h:--h)if((d=this._keys_down[g])===a||d===f||d===c){this._keys_down.splice(g,1);break}for(d=this._active_combos.length,f=[],i=this._active_combos,g=0,h=i.length;h>g;g++)c=i[g],0<=u.call(c.keys,a)&&f.push(c);for(g=0,h=f.length;h>g;g++)c=f[g],this._handle_combo_up(c,b,a);if(d>1)for(h=this._active_combos,d=0,g=h.length;g>d;d++)c=h[d],void 0===c||0<=u.call(f,c)||this._keys_remain(c)||this._remove_from_active_combos(c)},w.prototype._handle_combo_up=function(a,c,d){var e,f;this._prevent_default(c,a&&a.prevent_default),f=this._keys_remain(a),a.keyup_fired||(e=this._keys_down.slice(),e.push(d),a.is_solitary&&!b(e,a.keys))||(this._fire("keyup",a,c),a.is_counting&&"function"==typeof a.on_keyup&&"function"!=typeof a.on_keydown&&(a.count+=1)),f||(this._fire("release",a,c),this._remove_from_active_combos(a))},w.prototype.simple_combo=function(a,b){return this.register_combo({keys:a,on_keydown:b})},w.prototype.counting_combo=function(a,b){return this.register_combo({keys:a,is_counting:!0,is_unordered:!1,on_keydown:b})},w.prototype.sequence_combo=function(a,b){return this.register_combo({keys:a,on_keydown:b,is_sequence:!0,is_exclusive:!0})},w.prototype.register_combo=function(a){var b,c,d;"string"==typeof a.keys&&(a.keys=a.keys.split(" ")),d=this._defaults;for(b in d)t.call(d,b)&&(c=d[b],void 0===a[b]&&(a[b]=c));return a=new v(a),s(a)?(this._registered_combos.push(a),a):void 0},w.prototype.register_many=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.register_combo(b));return e},w.prototype.unregister_combo=function(a){var d,e,f,g,h,i;if(!a)return!1;var j=this;if(e=function(a){var b,c,d,e;for(e=[],b=c=0,d=j._registered_combos.length;d>=0?d>c:c>d;b=d>=0?++c:--c){if(a===j._registered_combos[b]){j._registered_combos.splice(b,1);break}e.push(void 0)}return e},a instanceof v)return e(a);for("string"==typeof a&&(a=a.split(" ")),h=this._registered_combos,i=[],f=0,g=h.length;g>f;f++)d=h[f],null!=d&&(d.is_unordered&&b(a,d.keys)||!d.is_unordered&&c(a,d.keys)?i.push(e(d)):i.push(void 0));return i},w.prototype.unregister_many=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.unregister_combo(b));return e},w.prototype.get_registered_combos=function(){return this._registered_combos},w.prototype.reset=function(){return this._registered_combos=[]},w.prototype.listen=function(){return this._prevent_capture=!1},w.prototype.stop_listening=function(){return this._prevent_capture=!0},w.prototype.get_meta_key=function(){return p},a.Listener=w,d=function(a){return m[a]},g=function(a,b){var c;if(a.filter)return a.filter(b);var d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],b(c)&&f.push(c);return f},b=function(a,b){var c,d,e;if(a.length!==b.length)return!1;for(d=0,e=a.length;e>d;d++)if(c=a[d],!(0<=u.call(b,c)))return!1;return!0},c=function(a,b){var c,d,e;if(a.length!==b.length)return!1;for(c=d=0,e=a.length;e>=0?e>d:d>e;c=e>=0?++d:--d)if(a[c]!==b[c])return!1;return!0},i=function(a,b){var c,d,e;for(d=0,e=a.length;e>d;d++)if(c=a[d],0>u.call(b,c))return!1;return!0},h=Array.prototype.indexOf||function(a,b){var c,d,e;for(c=d=0,e=a.length;e>=0?e>=d:d>=e;c=e>=0?++d:--d)if(a[c]===b)return c;return-1},j=function(a,b){var c,d,e,f;for(e=d=0,f=a.length;f>e;e++){if(c=a[e],c=h.call(b,c),!(c>=d))return!1;d=c}return!0},o=function(){return a.debug?console.log.apply(console,arguments):void 0},k=function(a){var b,c,d;b=!1;for(d in m)if(c=m[d],a===c){b=!0;break}if(!b)for(d in n)if(c=n[d],a===c){b=!0;break}return b},s=function(a){var b,c,d,e,g,i,j;for(g=!0,a.keys.length||o("You're trying to bind a combo with no keys:",a),c=i=0,j=a.keys.length;j>=0?j>i:i>j;c=j>=0?++i:--i)d=a.keys[c],(b=l[d])&&(d=a.keys[c]=b),"meta"===d&&a.keys.splice(c,1,p),"cmd"===d&&o('Warning: use the "meta" key rather than "cmd" for Windows compatibility');for(j=a.keys,b=0,i=j.length;i>b;b++)d=j[b],k(d)||(o('Do not recognize the key "'+d+'"'),g=!1);if(0<=u.call(a.keys,"meta")||0<=u.call(a.keys,"cmd")){for(b=a.keys.slice(),i=0,j=r.length;j>i;i++)d=r[i],-1<(c=h.call(b,d))&&b.splice(c,1);1<b.length&&(o("META and CMD key combos cannot have more than 1 non-modifier keys",a,b),g=!1)}for(e in a)"undefined"===f[e]&&o("The property "+e+" is not a valid combo property. Your combo has still been registered.");return g},e=function(a,b){var c;return b.shiftKey?(c=n[a],null!=c?c:!1):!1},q={cmd:"metaKey",ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey"},l={escape:"esc",control:"ctrl",command:"cmd","break":"pause",windows:"cmd",option:"alt",caps_lock:"caps",apostrophe:"'",semicolon:";",tilde:"~",accent:"`",scroll_lock:"scroll",num_lock:"num"},n={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")"},m={0:"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"cmd",92:"cmd",93:"cmd",96:"num_0",97:"num_1",98:"num_2",99:"num_3",100:"num_4",101:"num_5",102:"num_6",103:"num_7",104:"num_8",105:"num_9",106:"num_multiply",107:"num_add",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",124:"print",144:"num",145:"scroll",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",225:"alt",57392:"ctrl",63289:"num",59:";",61:"=",173:"-"},a._keycode_dictionary=m,a._is_array_in_array_sorted=j,-1!==navigator.userAgent.indexOf("Mac OS X")&&(p="cmd"),-1!==navigator.userAgent.indexOf("Opera")&&(m[17]="cmd"),"function"==typeof define&&define.amd?define([],function(){return a}):"undefined"!=typeof exports&&null!==exports?exports.keypress=a:window.keypress=a}).call(this);

// set function to click buttons
function clickButtonByContent(content) {
  const myRegex = new RegExp(`.*(<span class=.*octicon.*span>)?\\s*${content}\\s*$`, 'm');
  const matchingButtons = [];
  const allButtons = document.getElementsByTagName('button');
  for (let i = 0, n = allButtons.length; i < n; i++) {
    // add matching buttons to array
    if (allButtons[i].innerHTML.match(myRegex)) {
      matchingButtons.push(allButtons[i]);
    }
  }
  // abort if more than one element matches, else click it
  if (matchingButtons.length !== 1) {
    throw new Error('There should be exactly one element to click');
  } else {
    matchingButtons[0].click();
  }
}

// initialise listener
const listener = new window.keypress.Listener();

// ctrl+m repeatedly to go through steps
listener.counting_combo('ctrl m', (e, count) => {
  if (count === 1) {
    // check changed files tab
    document.getElementsByClassName('tabnav-tab')[2].click();
  } else if (count === 2) {
    // check commits tab
    document.getElementsByClassName('tabnav-tab')[1].click();
  } else if (count === 3) {
    // go to conversation tab
    document.getElementsByClassName('tabnav-tab')[0].click();
    // merge pull request
    clickButtonByContent('Confirm squash and merge');
  }
});

// esc to go to comments area
listener.simple_combo('esc', () => {
  // go to conversation tab
  document.getElementsByClassName('tabnav-tab')[0].click();
  // place focus on comment area
  document.getElementById('new_comment_field').focus();
});
