// ==UserScript==
// @name         Github script
// @version      0.1
// @author       Adrian Carriger
// @match        https://github.com/**/pull/**/files
// @grant        none
// ==/UserScript==

(() => {
  window.addEventListener('load', () => setTimeout(improveGithubPerformance, 1000))

  function improveGithubPerformance() {
    const buttons = document.querySelectorAll('.commentable .js-details-container .js-details-target');

    if (!buttons) {
      return
    }

    buttons.forEach((element, index) => {
      if (index !== 0) {
        element.click()
      }
    })
  }
})();
