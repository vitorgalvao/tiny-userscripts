// ==UserScript==
// @match https://*.youtube.com/*
// ==/UserScript==

// Youtube
if (location.hostname == "www.youtube.com") {
  // hide comments
  document.querySelector("#watch-discussion").style.display = "none";
  // show full video description
  document.querySelector("#action-panel-details").className="action-panel-content yt-card yt-card-has-padding yt-uix-expander";

  // hide annotations
  if (document.querySelector(".ytp-segmented-control-other")) { // this will only be true if the video has annotations
    document.querySelector("#settings_button").click();
    document.querySelector(".ytp-segmented-control-other").click();
    document.querySelector("#settings_button").click();
  }
}