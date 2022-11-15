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
    // If the positioning goes out of bounds, place the checkout menu in the upper right corner
    if (newCheckoutRight <= 0) {
        checkoutMenu.style.right = '0px';
    }
    // Otherwise, continue to align the menu with the shopping cart icon
    else {
        checkoutMenu.style.right = `${newCheckoutRight}px`;
    }
}

// Checkout system: add and remove items from the shop to the checkout menu
function checkoutSystem(shopItem, itemPrice) {
    // Clone the shop item to a checkout item
    const checkoutItem = shopItem.cloneNode(true);
    // Hide the shop item
    shopItem.classList.toggle('hidden');
    checkoutLoad();
    // Play the add-item animation
    //itemAnimation(shopItem, add=true);
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
        // Play the remove-item animation
        //itemAnimation(animationItem, add=false);
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

function itemAnimation(item, add=true) {
    // Clone the shop item into an animation item
    const animationItem = item.cloneNode(true);
    rectItem = item.getBoundingClientRect();
    animationItem.style.left = rectItem.left;
    animationItem.style.top = rectItem.top;
    /*
    // Hide the shop item
    //item.classList.toggle('hidden');
    //checkoutLoad();
    //console.log('animation start');
    //console.log(item);
    */
    // Animation: calculate the transform parameters
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
    // Checking which way to run the animation
    let direction = -1;
    if (add) {direction = 1;}

    const x = direction * (buttonX - itemX);
    const y = direction * (buttonY - itemY);
    // Apply transform to animation item
    animationItem.style.transform=`translate(${x}px, ${y}px) scale(${(1 - direction) / 2}, ${(1 - direction) / 2})`;
    console.log(animationItem.style.transform)
    //item.style.transition='all var(--transitionLength)';
    animationItem.style.transition='all 1s';
    animationItem.style.zIndex='200';

    // Hide the item after the transition is finished
    /*
    item.addEventListener('transitionend', () => {
        console.log(item);
        item.style.transform='none';
        item.style.transition='background-color var(--transitionLength) ease-in';
        item.classList.toggle('clicked');
        console.log(item);
    })
    */
}