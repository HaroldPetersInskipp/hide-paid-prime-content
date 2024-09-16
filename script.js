// ==UserScript==
// @name         Hide Paid Options on Amazon Prime Video
// @namespace    https://github.com/HaroldPetersInskipp
// @version      1.1.0
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
        document.querySelectorAll('li').forEach(li => {
            const hasPaidIcon = li.querySelector('article > section > div > div > div > svg');
            if (hasPaidIcon) {
                li.style.display = 'none'; // Hide the list item
            }
        });
    }

    // Function to hide specific categories
    function hideSpecificCategories() {
        const categoryNames = [
            'Home Premiere movies',
            'New release movies – Sponsored',
            'Top 10 purchases in the US'
        ];

        document.querySelectorAll('section, div').forEach(el => {
            const titleElement = el.querySelector('h2, .category-title, .title');
            if (titleElement && categoryNames.includes(titleElement.innerText.trim())) {
                el.style.display = 'none'; // Hide the entire category section
            }
        });
    }

    // Function to remove empty categories
    function removeEmptyCategories() {
        document.querySelectorAll('section, div').forEach(el => {
            const listItems = el.querySelectorAll('li');
            if (listItems.length > 0) {
                const allHidden = Array.from(listItems).every(li => li.style.display === 'none');
                if (allHidden) {
                    el.style.display = 'none'; // Hide the entire section if all items are hidden
                }
            }
        });
    }

    // Function to perform all hiding operations
    function performHidingOperations() {
        hidePaidListItems();
        hideSpecificCategories();
        removeEmptyCategories();
    }

    // Run the hiding operations initially on page load
    performHidingOperations();

    // MutationObserver to track dynamic content loading on Prime Video
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Run hiding operations for newly added content
                performHidingOperations();
            }
        });
    });

    // Start observing changes in the body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
