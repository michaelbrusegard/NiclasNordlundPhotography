// State of the checkout menu ('false' means 'closed', 'true' means 'open')
let checkoutState = false

// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById('checkoutMenu');
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');

// Style variables for the shopping cart button and checkout menu
const style = getComputedStyle(document.body);
const cartButtonWidth = parseInt(style.getPropertyValue('--menuIconSize').slice(0, -2));
const checkoutWidth = parseInt(style.getPropertyValue('--checkoutWidth').slice(0, -2));
const checkoutMargin = parseInt(style.getPropertyValue('--shopDisplayMargin').slice(0, -2));

// Loads page content correctly when the DOM is done loading
document.addEventListener('DOMContentLoaded', () => {
    windowLoad();
    alignCheckout();
});

// Loads page content correctly based on changes to the window
window.addEventListener("scroll", scrollLoad());
window.addEventListener("resize", () => {
    windowLoad();
    alignCheckout();
});
window.addEventListener("orientationChange", () => {
    windowLoad();
    alignCheckout();
});

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault(); 
    toggleCheckout();
}));

// Aligns the positioning of the checkout menu with the positioning of the cart button
function alignCheckout() {
    // New and current 'left' value of the checkout menu
    let newCheckoutLeft = 0;
    const currentCheckoutLeft = parseFloat(checkoutMenu.style.left.slice(0, -2));
    console.log(`Current left: ${currentCheckoutLeft}px`);
    const currentCheckoutRight = currentCheckoutLeft + 2 * checkoutWidth + checkoutMargin;
    if (currentCheckoutRight > window.innerWidth) {
        // The checkout menu is placed to the right
        checkoutMenu.style.right = '0px';
        checkoutMenu.style.left = 'auto';
        console.log(`Top corner`);
        //newCheckoutLeft = window.innerWidth - checkoutWidth;
    } else {
        checkoutMenu.style.right = 'auto';
        // Places the checkout menu according to the 'left' value of the shopping cart button
        cartButtons.forEach(el => {
            const cartButtonLeft = el.getBoundingClientRect().x;
            if (cartButtonLeft > 100) {
                newCheckoutLeft = cartButtonLeft + (cartButtonWidth - checkoutWidth) / 2;
                console.log(`New left: ${newCheckoutLeft}px`);
            }
        });
        checkoutMenu.style.left = `${newCheckoutLeft}px`;
    }
    // console.log(`width1: ${currentCheckoutLeft + checkoutWidth}`);
    // console.log(`width2: ${window.innerWidth}`);
    
    //console.log();
    //const rightPosition = cartButtons;
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
