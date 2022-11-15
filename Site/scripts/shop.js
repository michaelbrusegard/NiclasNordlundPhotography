// When the DOM is done loading: loads new image containers and aligns checkout menu
document.addEventListener('DOMContentLoaded', () => {
    windowLoad();
    alignCheckout();
    //applyItemListener();
});

// Changes to the window: loads new image containers and aligns checkout menu
window.addEventListener("scroll", () => {
    scrollLoad();
    //applyItemListener();
});
window.addEventListener("resize", () => {
    windowLoad();
    alignCheckout();
});
window.addEventListener("orientationChange", () => {
    windowLoad();
    alignCheckout();
    //applyItemListener();
});

// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById('checkoutMenu');
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');

// Widths of the shopping cart button and checkout menu
const style = getComputedStyle(document.body);
const cartButtonWidth = parseInt(style.getPropertyValue('--menuIconSize').slice(0, -2));
const checkoutWidth = parseInt(style.getPropertyValue('--checkoutWidth').slice(0, -2));

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault();
    checkoutMenu.classList.toggle('active');
}));

// Aligns the positioning of the checkout menu with the positioning of the cart button
function alignCheckout() {
    let newCheckoutRight = 0;
    // Calculates the positioning of the checkout menu when aligned with the shopping cart button
    cartButtons.forEach(el => {
        const cartButtonLeft = el.getBoundingClientRect().x;
        if (cartButtonLeft > 100) {
            newCheckoutRight = window.innerWidth - (cartButtonLeft + cartButtonWidth + checkoutWidth / 2);
        }
    });
    // If the positioning goes out of bounds, place the checkout menu in the upper right corner
    if (newCheckoutRight <= 0) {
        checkoutMenu.style.right = '0px';
    }
    // Otherwise, continue to align the menu with the shopping cart icon
    else {
        checkoutMenu.style.right = `${newCheckoutRight}px`;
    }
}

function addItemToCheckout(item) {
    //const checkoutItem = item.cloneNode(true);
    console.log(item);
    //console.log(checkoutItem);
    //checkoutMenu.prepend(checkoutItem);
    //checkoutMenu.prepend(item);
}