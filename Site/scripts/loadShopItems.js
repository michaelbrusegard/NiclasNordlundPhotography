// Function that initiates loading
function loadItems(itemsToLoad, itemsLoaded, pricesArray) {

    // Avoids trying to load more photos than exists
    if (itemsToLoad > pricesArray.length) {
        itemsToLoad = pricesArray.length
    }

    // Avoids trying to load more photos if enough photos are loaded already
    if (itemsToLoad <= itemsLoaded) { return }

    // Loads the display photos and the corresponding name and price and adds them to the correct elements
    for (let i = itemsLoaded; i <= itemsToLoad; i++) {
        createContainer(pricesArray[i])
    }
    itemsLoaded = itemsToLoad
}

function calculateColumsRows() {
    const style = getComputedStyle(document.body)

    // Container size
    const imageContainerSize = parseInt(style.getPropertyValue('--imageContainerSize').slice(0, -2));
    const shopDisplayMargin = parseInt(style.getPropertyValue('--shopDisplayMargin').slice(0, -2));
    const shopMargin = parseInt(style.getPropertyValue('--shopMargin').slice(0, -2));

    // Nav height
    const navContainerHeight = parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2));
    
    // Gets amount of colums and rows that are visible in the viewport
    const colums = getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
    const rows = Math.floor((window.innerHeight - navContainerHeight - 2 * shopMargin - shopDisplayMargin) / (imageContainerSize + shopDisplayMargin))

    return [colums, rows]
}

let itemsToLoad = 0
let itemsLoaded = 0

function windowLoad() {
    let [colums, rows] = calculateColumsRows()
    const itemsInViewport = colums * rows
    console.log(colums, rows, itemsInViewport)
    if (itemsInViewport > itemsToLoad) {
        itemsToLoad = itemsInViewport
        loadItems(itemsToLoad, itemsLoaded, files)
    }
}

function scrollLoad() {
}