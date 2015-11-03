// ==UserScript==
// @name          YouTubeChanges
// @namespace     http://vitorgalvao.com/
// @version       0.1.2
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
  var all_labels = document.getElementsByClassName("ytp-menuitem-label");
  for (var i = 0; i < all_labels.length; i++) {
    if ((all_labels[i].innerHTML == "Annotations") && (all_labels[i].parentNode.getAttribute("aria-checked") == "true")) { // find the correct label and see if it is active
      all_labels[i].click(); // and in that case, click it
    }
  }
}

open_close_settings(); // needs to be done when first opening a youtube video, so the annotations label gets created
document.getElementById("player-api").addEventListener("focus", change_youtube); // fires when video changes
