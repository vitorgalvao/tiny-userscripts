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
  // hide comments
  document.querySelector("#watch-discussion").style.display = "none";
  // show full video description
  document.querySelector("#action-panel-details").className="action-panel-content yt-card yt-card-has-padding yt-uix-expander";

  // show share panel and hide annotations
  function share_annotations() {
    // open share panel
    document.querySelectorAll(".action-panel-trigger")[1].click();
    // hide annotations
    if (document.querySelector(".ytp-segmented-control-other")) { // this will only be true if the video has annotations
      document.querySelector("#settings_button").click();
      document.querySelector(".ytp-segmented-control-other").click();
      document.querySelector("#settings_button").click();
    }
  }

  // try to run share_annotations() until share panel is visible
  share_annotations_loop = window.setInterval(function() {
    if (document.querySelector("#watch-action-panels").offsetWidth == 0) { // if share panel is not visible on page
      share_annotations();
    } else {
      clearInterval(share_annotations_loop);
    }
  }, 500);
}
