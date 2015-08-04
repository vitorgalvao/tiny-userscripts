// ==UserScript==
// @name          YouTubeChanges
// @namespace     http://vitorgalvao.com/
// @version       0.1.1
// @description   On Youtube, turns off annotations and expands the description box.
// @match         https://*.youtube.com/watch*
// @run-at        document-end
// ==/UserScript==

function open_close_settings() {
  "use strict";

  var settings_button = document.querySelector(".ytp-settings-button");
  settings_button.click();
  settings_button.click();
}

function change_youtube() {
  "use strict";

  // show full video description
  document.getElementById("action-panel-details").className = document.getElementById("action-panel-details").className.replace(/(?:^|\s)yt-uix-expander-collapsed(?!\S)/g, "");

  // hide annotations
  var annotations_label = document.getElementsByClassName("ytp-menuitem-label")[1];
  if (annotations_label.innerHTML === "Annotations") {
    annotations_label.click();
  }
}

open_close_settings(); // needs to be done when first opening a youtube video, so the annotations label gets created
document.getElementById("player-api").addEventListener("focus", change_youtube); // fires when video changes
