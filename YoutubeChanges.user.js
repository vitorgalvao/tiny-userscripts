// ==UserScript==
// @name          YouTubeChanges
// @namespace     http://vitorgalvao.com/
// @version       0.1
// @description   On Youtube, turns off annotations and expands the description box.
// @match         https://*.youtube.com/*
// @run-at        document-end
// ==/UserScript==

function change_youtube() {
  // show full video description
  if (document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].children[0].innerHTML == "Show more") {
    document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].click();
  }

  // hide annotations
  if ((document.querySelectorAll(".ytp-segmented-control-other")[1].classList[2] == "ytp-segmented-control-selected")) {
    document.querySelectorAll(".ytp-segmented-control-deselected")[1].click();
  }
}

change_youtube();
document.getElementById("player-api").addEventListener("focus", change_youtube); // fires when video changes
