function contentLoad() {
    colums = calculateColums();
    rows = calculateRows();
    itemsToLoad = rows * colums + colums;
    loadItems().then(() => {
        prefetch();
    });
}

// Calculates how many items to load on window size change
function windowLoad() {
    colums = calculateColums();
    rows = calculateRows();
    itemsToLoad = rows * colums + colums;
    loadItems();
}

// Calculates how many items to load on scroll
function scrollLoad() {
    // Checks when the window height plus the crolled distance is bigger than the body
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        itemsToLoad += 2 * calculateColums();
        loadItems();
    }
}

// Loads one new item when an item is added to the cart
function checkoutLoad() {
    itemsToLoad += 1;
    loadItems();
}

// Function that initiates loading
async function loadItems() {
    try {
        const publicPhotosBucket = await getPublicPhotosBucket();
        const pricesArray = await getPricesArray(publicPhotosBucket);

        const cartItemIndex = getCartStorageIndex(pricesArray);
        if (itemsToLoad < cartItemIndex) {
            itemsToLoad = cartItemIndex;
        }

        // Avoids trying to load more photos than exists
        if (itemsToLoad > pricesArray.length) {
            itemsToLoad = pricesArray.length;
        }

        // Avoids trying to load more photos if enough photos are loaded already
        if (itemsToLoad <= itemsLoaded) {
            return;
        }

        // Loads the display photos and the corresponding name and price and adds them to the correct elements
        for (let i = itemsLoaded; i < itemsToLoad; i++) {
            createContainer(publicPhotosBucket, pricesArray[i]);
        }
        itemsLoaded = itemsToLoad;
    } catch (error) {
        gridWrapper.id = 'errorWrapper';
        gridWrapper.style.setProperty('--variedScaleFadeIn', 1);
        gridWrapper.classList.add('scaleFadeIn');
        gridWrapper.textContent = 'Error: Unable to load shop items, please try again later.';
        console.error(error);
    }
}

// Functions that calculates how many colums there are
function calculateColums() {
    return getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
}

// Function that calculates how many rows there is space for given the innerHeight
function calculateRows() {
    const style = getComputedStyle(document.body);

    // Container size
    const photoContainerSize = parseInt(style.getPropertyValue('--photoContainerSize').slice(0, -2));
    const shopMargin = parseInt(style.getPropertyValue('--shopMargin').slice(0, -2));

    // Nav height
    const navContainerHeight = parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2));

    return Math.floor((window.innerHeight - navContainerHeight - shopMargin) / (photoContainerSize + shopMargin));
}

// Function that creates the div container for the shop
async function createContainer(publicPhotosBucket, shopItemInfo) {
    // Photos
    let img = document.createElement('img');
    img.src = `https://storage.googleapis.com/${publicPhotosBucket}/${shopItemInfo[0]}`;
    img.loading = 'lazy';
    img.alt = shopItemInfo[0];
    img.classList.add('photos');
    img.tabIndex = 0;

    // Price
    let h2 = document.createElement('h2');
    h2.textContent = shopItemInfo[1] + '€';
    h2.classList.add('price');
    // Add button
    let addButton = document.createElement('div');
    addButton.classList.add('addButton');
    addButton.tabIndex = 0;
    h2.appendChild(addButton);

    // Name
    let p = document.createElement('p');
    p.textContent = shopItemInfo[0];
    p.classList.add('name');

    // Container
    let div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.classList.add('container');
    gridWrapper.appendChild(div);

    // Add observer for fade on scroll effect
    observeGridItems.observe(div);

    // Attach event listeners to the img element
    img.addEventListener('click', (event) => handlePhotoClickAndEnter(event, img));
    img.addEventListener('keydown', (event) => handlePhotoClickAndEnter(event, img));

    if (cart.some((item) => item[0] === shopItemInfo[0] && item[1] === shopItemInfo[1])) {
        checkoutSystem(div, shopItemInfo[1], true);
    }

    // Apply checkout system interaction to the div item
    addButton.addEventListener('click', () => {
        if (!addedItems.includes(div)) checkoutSystem(div, shopItemInfo[1], false);
    });
    addButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') if (!addedItems.includes(div)) checkoutSystem(div, shopItemInfo[1], false);
    });
}
