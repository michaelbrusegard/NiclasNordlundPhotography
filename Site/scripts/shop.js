// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById('checkoutMenu');
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');

// State of the checkout menu (true <=> open, false <=> closed)
let checkoutState = false;

// Checks when the document object model is done loading
document.addEventListener('DOMContentLoaded', windowLoad);

// Checks for changes to iniate loading of more photos
window.addEventListener("scroll", scrollLoad);
window.addEventListener("resize", windowLoad);
window.addEventListener("orientationChange", windowLoad);

// Checks for clicks on the shopping cart icon (both desktop and mobile) to toggle the checkout menu
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault(); 
    toggleCheckout();
}));

// Updates the positioning of the checkout menu based on where the cart button is
function alignCheckout() {
    return
}

// Toggles the visibility of the checkout menu
function toggleCheckout() {
    if (checkoutState) {
        // Closes the checkout menu
        checkoutMenu.style.visibility = 'hidden';
    } else {
        // Opens the checkout menu
        checkoutMenu.style.visibility = 'visible';
    }
    checkoutState = !checkoutState;
}
