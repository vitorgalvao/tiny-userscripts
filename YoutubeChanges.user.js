// ==UserScript==
// @match https://*.youtube.com/*
// ==/UserScript==

// hide comments
document.querySelector("#watch-discussion").style.display = "none";
// show full video description
document.querySelector("#action-panel-details").className="action-panel-content yt-card yt-card-has-padding yt-uix-expander";

// hide annotations
document.querySelector(".ytp-segmented-control-other").click();
