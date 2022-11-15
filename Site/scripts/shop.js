// When the DOM is done loading: loads new image containers and aligns checkout menu
document.addEventListener('DOMContentLoaded', () => {
    windowLoad();
    alignCheckout();
});

// Changes to the window: loads new image containers and aligns checkout menu
window.addEventListener("scroll", () => {
    scrollLoad();
});
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
    checkoutMenu.classList.toggle('active');
<<<<<<< HEAD
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

// Checkout system: add or remove items from the shop
function checkoutSystem(shopItem, itemPrice) {
    // Clone the shop item to a checkout item
    const checkoutItem = shopItem.cloneNode(true);
    checkoutItem.classList.toggle('checkout');
    // When a checkout item is added: shop item disappears
    checkoutMenu.prepend(checkoutItem);
    shopItem.classList.toggle('clicked');
    // Checkout price updated
    checkoutTotal += itemPrice;
    checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal} €`;
    // Item number updated
    itemNumber += 1;
    console.log(`Item number: ${itemNumber}`);
    // Shopping cart red dot animation plays
    redDotUpdate()

    // When a checkout item is removed:
    checkoutItem.addEventListener('click', () => {
        // Shop item re-appears
        checkoutItem.remove();
        shopItem.classList.toggle('clicked');
        // Checkout price updated
        checkoutTotal -= itemPrice;
        checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal} €`;
        // Item number updated
        itemNumber -= 1;
        console.log(`Item number: ${itemNumber}`);
        // Shopping cart red dot animation plays
        redDotUpdate()
    });
}

function redDotUpdate() {
    // change inner html of a red dot element
    redDots.forEach(el => el.innerHTML = itemNumber);
}
=======
}));
>>>>>>> bde1696 (Added checkout stuff into checkoutSystem.js)