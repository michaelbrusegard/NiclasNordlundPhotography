// Fetching the checkout menu and shopping cart button elements
const checkoutMenu = document.getElementById('checkoutMenu');
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');
const redDots = document.querySelectorAll('.redDot');

// Keeping track of the checkout price total
const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');
let checkoutTotal = 0;

// Number of items in the shopping cart
let itemNumber = 0;

// Widths of the shopping cart button and checkout menu
const style = getComputedStyle(document.body);
const cartButtonWidth = parseInt(style.getPropertyValue('--menuIconSize').slice(0, -2));
const checkoutWidth = parseInt(style.getPropertyValue('--checkoutWidth').slice(0, -2));

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
    // If the positioning goes out of bounds, place it in the upper right corner
    if (newCheckoutRight <= 0) {
        checkoutMenu.style.right = '0px';
    }
    // Otherwise, continue to align the menu with the shopping cart icon
    else {
        checkoutMenu.style.right = `${newCheckoutRight}px`;
    }
}

// WORKING CODE WITHOUT ANIMATION
// Checkout system: add and remove items from the shop to the checkout menu
function checkoutSystem(shopItem, itemPrice) {
    // Clone the shop item to a checkout item
    const checkoutItem = shopItem.cloneNode(true);
    // Hide the shop item
    shopItem.classList.toggle('hidden');
    checkoutLoad();
    // Place the checkout item in the checkout menu
    checkoutItem.classList.add('checkout');
    checkoutMenu.prepend(checkoutItem);
    // Update the red dot value
    itemNumber += 1;
    redDots.forEach(el => el.innerHTML = itemNumber);
    // Update checkout price
    checkoutTotal += itemPrice;
    checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;

    // When a checkout item is removed:
    checkoutItem.addEventListener('click', () => {
        // Remove the checkout item
        checkoutItem.remove();
        // Make the shop item visible
        shopItem.classList.toggle('hidden');
        // Update the red dot value
        itemNumber -= 1;
        redDots.forEach(el => el.innerHTML = itemNumber);
        // Update checkout price
        checkoutTotal -= itemPrice;
        checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;

    });
}

/*
// TESTING CODE WITH ANIMATION
// Checkout system: add and remove items from the shop to the checkout menu
function checkoutSystem(shopItem, itemPrice) {
    // Clone the shop item to a checkout item
    const checkoutItem = shopItem.cloneNode(true);
    // Place the checkout item in the checkout menu
    checkoutItem.classList.toggle('checkout');
    checkoutMenu.prepend(checkoutItem);
    // Update the red dot value
    itemNumber += 1;
    redDots.forEach(el => el.innerHTML = itemNumber);
    // Update checkout price
    checkoutTotal += itemPrice;
    checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;

    // Animation: calculate the transform parameters
    rectItem = shopItem.getBoundingClientRect();
    const itemX = (rectItem.left + rectItem.right) / 2;
    const itemY = (rectItem.bottom + rectItem.top) / 2;
    console.log(`x=${itemX}, y=${itemY}`);
    let buttonX = 0;
    let buttonY = 0;
    cartButtons.forEach(el => {
        rectButton = el.getBoundingClientRect();
        if (rectButton.left > 100) {
            buttonX += (rectButton.left + rectButton.right) / 2;
            buttonY += (rectButton.bottom + rectButton.top) / 2;
        }
    });
    const x = buttonX - itemX;
    const y = buttonY - itemY;
    
    shopItem.classList.toggle('animation');

    // Apply transform to shop item
    shopItem.addEventListener('transitionrun', runAnimationOne());
    shopItem.addEventListener('transitionend', endAnimationOne());
    shopItem.style.transform=`translateX(${x}px) translateY(${y}px)`;
    shopItem.removeEventListener('transitionrun', runAnimationOne);
    shopItem.removeEventListener('transitionend', endAnimationOne);
    
    function runAnimationOne() {
        shopItem.classList.toggle('animation');
        console.log('animstart1');
    }

    function endAnimationOne() {
        shopItem.classList.toggle('animation');
        shopItem.classList.toggle('hidden');
        checkoutLoad();
        console.log('animend1');
    }

    // When a checkout item is removed:
    checkoutItem.addEventListener('click', () => {
        // Remove the checkout item
        checkoutItem.remove();
        // Apply reverse transform to shop item
        shopItem.classList.toggle('animation');
        shopItem.addEventListener('transitionrun', runAnimationTwo());
        shopItem.addEventListener('transitionend', endAnimationTwo())
        shopItem.style.transform=`translateX(${0}px) translateY(${0}px)`;
        shopItem.removeEventListener('transitionrun', runAnimationTwo);
        shopItem.removeEventListener('transitionend', endAnimationTwo)
        
        function runAnimationTwo() {
            shopItem.classList.toggle('animation');
            shopItem.classList.toggle('hidden');
            console.log('animstart2');
        }
        
        function endAnimationTwo() {
            console.log('animend2');
        }

        // Update the red dot value
        itemNumber -= 1;
        redDots.forEach(el => el.innerHTML = itemNumber);
        // Update checkout price
        checkoutTotal -= itemPrice;
        checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;
    });
}
*/