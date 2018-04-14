// ==UserScript==
// @name         Honda script
// @version      0.1
// @author       Adrian Carriger
// @match        https://www.hondacertified.com/*
// @grant        none
// ==/UserScript==

(() => {
  document.addEventListener('click', (event) => {
    if (!event.target.dataset.url) { return; }
    event.stopPropagation();
    window.open(
      `https://www.hondacertified.com${event.target.dataset.url}`,
      '_blank'
    );
  }, true);
})();
