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

// Checkout system: add and remove items from the shop to the checkout menu
function checkoutSystem(shopItem, itemPrice) {
    // Clone the shop item to a checkout item
    const checkoutItem = shopItem.cloneNode(true);
    // Calculate animation variables
    const addScroll = window.scrollY
    rectItem = shopItem.getBoundingClientRect();
    const itemX = (rectItem.left + rectItem.right) / 2;
    const itemY = (rectItem.bottom + rectItem.top) / 2;
    let cartX = 0;
    let cartY = 0;
    cartButtons.forEach(el => {
        rectButton = el.getBoundingClientRect();
        if (rectButton.left > 100) {
            cartX += (rectButton.left + rectButton.right) / 2;
            cartY += (rectButton.bottom + rectButton.top) / 2;
        }
    });
    const x = cartX - itemX;
    const y = cartY - itemY;
    shopItem.style.setProperty('--addToCartX', `${x}px`);
    shopItem.style.setProperty('--addToCartY', `${y}px`);
    // Move shop item into cart
    addedItems.push(shopItem);
    shopItem.classList.toggle('inCart')
    shopItem.addEventListener('animationend', () => {
        shopItem.style.display = 'none';
        // Update the red dot element
        itemNumber += 1;
        redDots.forEach(el => {
            el.innerHTML = itemNumber;
            if (itemNumber == 1) {
                el.style.display = 'block';
            }
        });
        checkoutLoad();
    }, {once: true})
    // Place the checkout item in the checkout menu
    checkoutItem.classList.add('checkout');
    checkoutMenu.prepend(checkoutItem);
    // Update checkout price
    checkoutTotal += itemPrice;
    checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;
    // When a checkout item is clicked:
    checkoutItem.addEventListener('click', () => {
        // Move shop item back into to the shop
        newy = y + (window.scrollY - addScroll)
        shopItem.style.setProperty('--addToCartY', `${newy}px`);
        shopItem.style.display = 'block';
        shopItem.style.animationDirection = 'reverse';
        shopItem.addEventListener('animationend', () => {
            shopItem.classList.toggle('inCart');
            //shopItem.style.zIndex = '0';
            shopItem.style.animationDirection = 'none';
            shopItem.style.animationDirection = 'normal';
        }, {once: true});
        // Remove the checkout item
        checkoutItem.classList.toggle('deleted');
        checkoutItem.addEventListener('transitionend', () => {
            checkoutItem.remove(); 
        }, {once: true});
        addedItems.pop();
        // Update the red dot value
        itemNumber -= 1;
        redDots.forEach(el => {
            el.innerHTML = itemNumber;
            if (itemNumber == 0) {
                el.style.display = 'none';
            }
        });
        // Update checkout price
        checkoutTotal -= itemPrice;
        checkoutTotalDisplay.innerHTML = `Total: ${checkoutTotal}€`;
    }, {once: true});
}