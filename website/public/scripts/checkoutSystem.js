// Aligns the positioning of the checkout menu with the positioning of the cart button
function alignCheckout() {
    let newCheckoutRight = 0;
    // Calculates the positioning of the checkout menu when aligned with the shopping cart button
    cartButtons.forEach((element) => {
        const cartButtonLeft = element.getBoundingClientRect().x;
        if (cartButtonLeft > 100) {
            newCheckoutRight =
                window.innerWidth -
                (cartButtonLeft + cartButtonWidth + checkoutWidth / 2);
        }
    });
    // If the positioning goes out of bounds, place it in the upper right corner
    if (newCheckoutRight <= 0) {
        checkoutMenu.style.right = "0px";
    }
    // Otherwise, continue to align the menu with the shopping cart icon
    else {
        checkoutMenu.style.right = `${newCheckoutRight}px`;
    }
}

function retrieveCart() {
    // Loads the cart from sessionStorage
    if (sessionStorage.getItem("cart")) {
        cartString = sessionStorage.getItem("cart");
        cart = JSON.parse(cartString);
    }
}

function getCartStorageIndex(pricesArray) {
    let largestIndex = -1;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const index = pricesArray.indexOf(item);

        if (index > largestIndex) {
            largestIndex = index;
        }
    }

    return largestIndex;
}

// Checkout system: add and remove items from the shop to the checkout menu

// Function to clone the shop item to a checkout item
function cloneShopItemToCheckout(shopItem) {
    const checkoutItem = shopItem.cloneNode(true);
    const button = checkoutItem.querySelector(".addButton");
    button.style.backgroundImage = "url('../img/icons/remove.svg')";

    const img = checkoutItem.querySelector(":first-child");

    // Attach event listeners to the img element
    img.addEventListener("click", (event) =>
        handlePhotoClickAndEnter(event, img)
    );
    img.addEventListener("keydown", (event) =>
        handlePhotoClickAndEnter(event, img)
    );

    return checkoutItem;
}

// Function to calculate animation variables
function calculateAnimationVariables(shopItem, itemX, itemY) {
    const addScroll = window.scrollY;
    let cartX = 0;
    let cartY = 0;

    cartButtons.forEach((element) => {
        const rectButton = element.getBoundingClientRect();
        if (rectButton.left > 100) {
            cartX += (rectButton.left + rectButton.right) / 2;
            cartY += (rectButton.bottom + rectButton.top) / 2;
        }
    });

    const x = cartX - itemX;
    const y = cartY - itemY;

    shopItem.style.setProperty("--addToCartX", `${x}px`);
    shopItem.style.setProperty("--addToCartY", `${y}px`);

    return { addScroll, x, y };
}

// Function to move shop item into cart
function moveItemToCart(shopItem, itemPrice, removeAnimation) {
    addedItems.push(shopItem);

    if (!isCartItemInCart(shopItem, itemPrice)) {
        cart.push([shopItem.lastChild.textContent, itemPrice]);
        updateSessionStorage();
    }

    if (removeAnimation) {
        shopItem.classList.toggle("inCart");
        shopItem.style.display = "none";
        checkoutLoad();
        removeAnimation = false;
    } else {
        shopItem.classList.toggle("inCart");
        shopItem.classList.add("inCartAnimation");
        shopItem.addEventListener(
            "animationend",
            () => {
                shopItem.classList.remove("inCartAnimation");
                shopItem.style.display = "none";
                checkoutLoad();
            },
            { once: true }
        );
    }
}

// Function to check if a cart item is already in the cart
function isCartItemInCart(shopItem, itemPrice) {
    return cart.some(
        (item) =>
            item[0] === shopItem.lastChild.textContent && item[1] === itemPrice
    );
}

// Function to update session storage with cart items
function updateSessionStorage() {
    const cartString = JSON.stringify(cart);
    sessionStorage.setItem("cart", cartString);
}

// Function to move shop item back to the shop
function moveItemToShop(shopItem, y, addScroll) {
    const newy = y + (window.scrollY - addScroll);
    shopItem.style.setProperty("--addToCartY", `${newy}px`);
    shopItem.style.display = "block";
    shopItem.style.animationDirection = "reverse";
    shopItem.classList.add("inCartAnimation");
    shopItem.addEventListener(
        "animationend",
        () => {
            shopItem.classList.toggle("inCart");
            shopItem.classList.remove("inCartAnimation");
            shopItem.style.animationDirection = "normal";
        },
        { once: true }
    );
}

// Function to remove the checkout item
function removeCheckoutItem(checkoutItem, shopItem, itemPrice) {
    checkoutItem.classList.toggle("deleted");
    checkoutItem.addEventListener(
        "transitionend",
        () => {
            checkoutItem.remove();
        },
        { once: true }
    );
    addedItems.pop();

    removeCartItem(shopItem, itemPrice);
}

// Function to remove a cart item
function removeCartItem(shopItem, itemPrice) {
    const itemIndex = cart.findIndex(
        (item) =>
            item[0] === shopItem.lastChild.textContent && item[1] === itemPrice
    );

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateSessionStorage();
    }

    itemNumber -= 1;
    redDots.forEach((element) => {
        element.textContent = itemNumber;
        if (itemNumber === 0) {
            element.style.opacity = 0;
        }
    });

    checkoutTotal -= itemPrice;
    checkoutTotalDisplay.textContent = `Total: ${checkoutTotal}€`;
}

// Function to handle the checkout process
function checkoutSystem(shopItem, itemPrice, removeAnimation) {
    const checkoutItem = cloneShopItemToCheckout(shopItem);
    const rectItem = shopItem.getBoundingClientRect();
    const itemX = (rectItem.left + rectItem.right) / 2;
    const itemY = (rectItem.bottom + rectItem.top) / 2;

    calculateAnimationVariables(shopItem, itemX, itemY);
    moveItemToCart(shopItem, itemPrice, removeAnimation);

    checkoutItem.classList.add("checkout");
    checkoutMenu.prepend(checkoutItem);

    itemNumber += 1;
    redDots.forEach((element) => {
        element.textContent = itemNumber;
        element.style.opacity = 1;
    });

    checkoutTotal += itemPrice;
    checkoutTotalDisplay.textContent = `Total: ${checkoutTotal}€`;

    const button = checkoutItem.querySelector(".addButton");
    button.addEventListener(
        "click",
        () => {
            const { addScroll, y } = calculateAnimationVariables(
                shopItem,
                itemX,
                itemY
            );
            moveItemToShop(shopItem, y, addScroll);
            removeCheckoutItem(checkoutItem, shopItem, itemPrice);
        },
        { once: true }
    );

    button.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Enter") {
                const { addScroll, y } = calculateAnimationVariables(
                    shopItem,
                    itemX,
                    itemY
                );
                moveItemToShop(shopItem, y, addScroll);
                removeCheckoutItem(checkoutItem, shopItem, itemPrice);
            }
        },
        { once: true }
    );
}
