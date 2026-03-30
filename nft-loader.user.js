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

(function () {
  "use strict";

  const ADDON_URL = "https://nicole-bc.github.io/Nest-of-Fluffy-Treasures/ntf.js";

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
