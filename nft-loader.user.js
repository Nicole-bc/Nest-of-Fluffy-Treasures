// ==UserScript==
// @name         NFT - Nest of Fluffy Treasures (Loader)
// @namespace    https://github.com/YOUR_USERNAME/nft-bc-addon
// @version      1.3.0
// @description  Loader for NFT - Nest of Fluffy Treasures. Fetches the latest addon from GitHub Pages.
// @author       You
// @match        https://bondageprojects.elementfx.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @match        https://bondage-europe.com/*
// @match        https://www.bondage-europe.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE THIS LOADER
// ─────────────────────────────────────────────────────────────────────────────
// 1. Upload nft.js to a public URL (e.g. GitHub Pages at
//    https://YOUR_USERNAME.github.io/nft-bc-addon/nft.js)
// 2. Replace ADDON_URL below with that URL.
// 3. Install this loader in Tampermonkey / Violentmonkey.
//
// HOW TO GET LISTED IN FUSAM
// ─────────────────────────────────────────────────────────────────────────────
// Once your nft.js is publicly hosted:
// • Join the BC Scripting Community Discord and ask to be added, OR
// • Submit a merge request to https://gitlab.com/Sidiousious/bc-addon-loader
//   adding an entry to manifest.json (see format below).
//
// manifest.json entry template:
// {
//   "id": "NFT",
//   "name": "NFT - Nest of Fluffy Treasures",
//   "description": "Save and restore ItemHandheld / ItemMisc items with full appearance, crafter info and properties.",
//   "url": "https://YOUR_USERNAME.github.io/nft-bc-addon/nft.js",
//   "type": "eval",
//   "version": "1.3.0",
//   "author": "Your Name"
// }
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  "use strict";

  const ADDON_URL = "https://nicole-bc.github.io/Nest-of-Fluffy-Treasures/";

  // Cache-bust on every load so players always get the latest version
  const url = ADDON_URL + "?_=" + Date.now();

  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error("NFT loader: HTTP " + r.status);
      return r.text();
    })
    .then(code => {
      // eval in window scope so BC globals (Player, InventoryGet, etc.) are accessible
      // eslint-disable-next-line no-eval
      (0, eval)(code);
      console.log("[NFT] Nest of Fluffy Treasures loaded ✓");
    })
    .catch(err => {
      console.error("[NFT] Failed to load addon:", err);
    });
})();
