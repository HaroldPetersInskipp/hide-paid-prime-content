// ==UserScript==
// @name         Hide Paid Options on Amazon Prime Video
// @namespace    https://github.com/HaroldPetersInskipp
// @version      1.0.0
// @homepageURL  https://github.com/HaroldPetersInskipp/hide-paid-prime-content
// @supportURL   https://github.com/HaroldPetersInskipp/hide-paid-prime-content/issues
// @description  Hides list items on Amazon Prime Video that contain paid options (Buy, Rent, Trial).
// @author       Inskipp
// @copyright    2024+, HaroldPetersInskipp (https://github.com/HaroldPetersInskipp)
// @license      MIT; https://github.com/HaroldPetersInskipp/hide-paid-prime-content/blob/main/LICENSE
// @match        https://www.amazon.com/*
// @match        https://www.primevideo.com/*
// @grant        none
// @icon         https://raw.githubusercontent.com/HaroldPetersInskipp/hide-paid-prime-content/main/icon.png
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Function to hide list items with paid options
    function hidePaidListItems() {
        // Select all list items
        document.querySelectorAll('li').forEach(li => {
            // Check if the list item contains the specific SVG structure for paid options
            const hasPaidIcon = li.querySelector('article > section > div > div > div > svg');
            if (hasPaidIcon) {
                li.style.display = 'none'; // Hide the list item
            }
        });
    }

    // Run the function initially on page load
    hidePaidListItems();

    // MutationObserver to track dynamic content loading on Prime Video
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Check and hide new list items with paid options
                hidePaidListItems();
            }
        });
    });

    // Start observing changes in the body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
