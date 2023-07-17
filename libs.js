/**
 * Checks the position of an element on the screen.
 * Returns a numerical value representing the percentage of the element that is visible on the screen.
 *
 * @param {string} querySelector - A CSS selector string to select the element to check.
 * @returns {number} A numerical value between 0 and 100 representing the percentage of the element that is visible on the screen.
 */
function checkItemOnScreenLocation(querySelector) {
  // Get the element to check using the provided CSS selector
  const element = document.querySelector(querySelector);

  if (!element) {
    return console.error(`No element found with selector: ${querySelector}`);
  }

  // Get the element's bounding rectangle and the viewport height
  const elementRect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Get the current scroll position
  const scrollY = window.scrollY || window.pageYOffset;

  // Calculate the top and bottom positions of the element taking into account the scroll position
  const elementTop = elementRect.top + scrollY;
  const elementBottom = elementRect.bottom + scrollY;

  if (elementTop >= scrollY + viewportHeight) {
    // Element is below the current view
    return 100;
  } else if (elementBottom <= scrollY) {
    // Element is above the current view
    return 0;
  } else {
    // Element is partially or fully visible in the current view
    const visibleHeight = Math.min(elementBottom, scrollY + viewportHeight) - Math.max(elementTop, scrollY);
    const visiblePercentage = (visibleHeight / elementRect.height) * 100;

    return visiblePercentage;
  }
}

function addPreRenderLink(selector) {
  // Find all elements that match the given selector and have an href attribute
  const elements = document.querySelectorAll(`${selector}[href]`);

  // Loop through each element and add the prerender link
  elements.forEach((element) => {
    const href = element.getAttribute("href");

    // Create a new link element with the prerender attribute and append it to the document head
    const link = document.createElement("link");
    link.setAttribute("rel", "prerender");
    link.setAttribute("href", href);
    document.head.appendChild(link);
  });
}
