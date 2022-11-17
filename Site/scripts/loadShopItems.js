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
function loadItems() {

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
    const shopDisplayMargin = parseInt(style.getPropertyValue('--shopDisplayMargin').slice(0, -2));

    // Nav height
    const navContainerHeight = parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2));

    return Math.floor((window.innerHeight - navContainerHeight - shopDisplayMargin) / (imageContainerSize + shopDisplayMargin));
}

// Function that creates the div container for the shop
function createContainer(pricesArray) {

    // Images
    let img = document.createElement('img');
    img.src = 'img/shopDisplay/' + pricesArray[0];
    img.loading = 'lazy';
    img.alt = pricesArray[0];
    img.classList.add('images');

    // Price
    let h2 = document.createElement('h2');
    h2.textContent = pricesArray[1] + '€';
    h2.classList.add('price');

    // Name
    let p = document.createElement('p');
    p.textContent = pricesArray[0];
    p.classList.add('name');

    // Container
    let div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.classList.add('container');
    gridWrapper.appendChild(div);

    // Apply checkout system interaction to the div item
    div.addEventListener('click', () => { checkoutSystem(div, parseInt(pricesArray[1])); });
}