// Function that initiates loading
function loadItems(itemsToLoad, itemsLoaded, wrapper, pricesArray) {

    // Avoids trying to load more photos than exists
    if (itemsToLoad > pricesArray.length) {
        itemsToLoad = pricesArray.length
    }

    // Avoids trying to load more photos if enough photos are loaded already
    if (itemsToLoad <= itemsLoaded) { return }

    // Loads the display photos and the corresponding name and price and adds them to the correct elements
    for (let i = itemsLoaded; i <= itemsToLoad; i++) {
        createContainer(wrapper, pricesArray[i])
    }
    itemsLoaded = itemsToLoad
}

function windowLoad() {
    let [colums, rows] = calculateColumsRows()
    const viewport = colums * rows
    if (viewport > itemsToLoad) {
        itemsToLoad = viewport
        loadItems()
    }
}






const gridWrapper = document.getElementById('gridWrapper');

let itemsLoaded = 0
let itemsToLoad = 0

function calculateColumsRows() {
    // Gets amount of colums and rows that are visible in the viewport
    const colums = getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
    const rows = Math.floor(window.innerHeight / 150)
    return [colums, rows]
}

let scrolling = true;

function scrollLoad() {
    if (scrolling === true) {
        let [colums] = calculateColumsRows()
        itemsToLoad += colums
        loadItems()
        scrolling = false
    }
    console.log("scrolling")
}