// ==UserScript==
// @match http://*.theverge.com/*
// @match https://*.youtube.com/*
// ==/UserScript==

// The Verge
if (location.hostname == "www.theverge.com") {
  // hide comments
  document.getElementById("comments").style.visibility="hidden";
}

// Youtube
if (location.hostname == "www.youtube.com") {
  // add css to hide comments, some borders, and other small elements
  var pageStyle = document.createElement('style');
  pageStyle.type = 'text/css';
  pageStyle.innerHTML = '#watch-description-collapse,#watch-description-extras,#watch-discussion{display:none}#watch-discussion,#watch7-action-buttons,#watch7-action-panels,#watch7-headline,#watch7-user-header,.yt-horizontal-rule{border:none}';
  document.getElementsByTagName('head')[0].appendChild(pageStyle);

  // show full video description
  document.querySelector("#watch-description.yt-uix-expander-collapsed").className="";
}
