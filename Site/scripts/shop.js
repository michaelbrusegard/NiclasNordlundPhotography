// Checks when the document object model is done loading
document.addEventListener('DOMContentLoaded', windowLoad);

// Checks for changes to iniate loading of more photos
window.addEventListener("scroll", scrollLoad);
window.addEventListener("resize", windowLoad);
window.addEventListener("orientationChange", windowLoad);

// Checks for clicks on the shopping cart icon (both desktop and mobile) to toggle the checkout menu
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault(); 
    toggleCheckout();
}));

// State of the checkout menu (true <=> open, false <=> closed)
let checkoutState = false;

// Work in progress function!
function toggleCheckout() {
    if (checkoutState) {
        // remove stuff
        console.log('checkout closed');
    } else {
        // add stuff
        console.log('checkout opened');
    }
    checkoutState = !checkoutState;
}