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
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
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

    const pricesArray = await fetchPrices;

    // Avoids trying to load more photos than exists
    if (itemsToLoad > pricesArray.length) {
        itemsToLoad = pricesArray.length;
    }

    // Avoids trying to load more photos if enough photos are loaded already
    if (itemsToLoad <= itemsLoaded) { return; }

    // Loads the display photos and the corresponding name and price and adds them to the correct elements
    for (let i = itemsLoaded; i < itemsToLoad; i++) {
        createContainer(pricesArray[i]);
    }
    itemsLoaded = itemsToLoad;
}

// Functions that calculates how many colums there are
function calculateColums() {
    return getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
}

// Function that calculates how many rows there is space for given the innerHeight
function calculateRows() {
    const style = getComputedStyle(document.body);

    // Container size
    const imageContainerSize = parseInt(style.getPropertyValue('--imageContainerSize').slice(0, -2));
    const shopMargin = parseInt(style.getPropertyValue('--shopMargin').slice(0, -2));

    // Nav height
    const navContainerHeight = parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2));

    return Math.floor((window.innerHeight - navContainerHeight - shopMargin) / (imageContainerSize + shopMargin));
}

// Function that creates the div container for the shop
function createContainer(pricesArray) {

    // Images
    let img = document.createElement('img');
    img.src = `https://storage.googleapis.com/${googleFrontEndBucketName}/${pricesArray[0]}`;
    img.loading = 'lazy';
    img.alt = pricesArray[0];
    img.classList.add('images');

    // Price
    let h2 = document.createElement('h2');
    h2.textContent = pricesArray[1] + '€';
    h2.classList.add('price');
    // Add button
    let addButton = document.createElement('div');
    addButton.classList.add('addButton');
    h2.appendChild(addButton);

    // Name
    let p = document.createElement('p');
    p.textContent = pricesArray[0];
    p.classList.add('name');

    // Pinch Out button
    let pinchOutButton = document.createElement('div');
    pinchOutButton.classList.add('pinchOutButton');

    // Container
    let div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(pinchOutButton);
    div.classList.add('container');
    gridWrapper.appendChild(div);

    // Add observer for fade on scroll effect
    observeGridItems.observe(div);

    // Check for click on pinch out button
    pinchOutButton.addEventListener('click', () => { highlightImage(img); });

    // Apply checkout system interaction to the div item
    addButton.addEventListener('click', () => { checkoutSystem(div, parseInt(pricesArray[1])); });
}