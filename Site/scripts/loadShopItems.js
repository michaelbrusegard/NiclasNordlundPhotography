// Array from prices.json
const pricesArray = [["Alfågel Ålands hav 300 euro.jpg","300"],
               ["Ejder 150 euro.jpg","150"],
               ["Ejder 2 150 euro.jpg","150"],
               ["Fiske 1 150e.jpg","150"],
               ["Fiske 2 50e.jpg","50"],
               ["Fiske 3 150 e.jpg","150"],
               ["Hav i solnedgång 2 200e_.jpg","200"],
               ["Hav i solnedgång 200e_.jpg","200"],
               ["Hot dogs 1  150e.jpg","150"],
               ["Hot dogs 2  150e.jpg","150"],
               ["Höst Åland 80euro.jpg","80"],
               ["Kajak Åland  2 180e.jpg","180"],
               ["Kajak Åland 180e.jpg","180"],
               ["Kajaking Åland 2  200 euro.jpg","200"],
               ["Kastelholms Slott Åland 250euro.jpg","250"],
               ["Kastellholms slott 130 euro.jpg","130"],
               ["Kastellholms slott 180 euro.jpg","180"],
               ["Kattunge 1 180e.jpg","180"],
               ["Kattunge 145.jpg","145"],
               ["Kattunge 150.jpg","150"],
               ["Kattunge 2 180e.jpg","180"],
               ["Kobba Klintar Åland 350 euro_.jpg","350"],
               ["Kobba Klintar hamn 150 euro_.jpg","150"],
               ["Lugn & Ro Åland 500 euro.jpg","500"],
               ["Marhällan 150 euro_.jpg","150"],
               ["Marhällan 300 euro.jpg","300"],
               ["Marhällan Åland 150 euro.jpg","150"],
               ["Marhällan-Kobba Klintar 250euro_.jpg","250"],
               ["Märkets fyr 150 euro_.jpg","150"],
               ["Märkets fyr 155 euro_.jpg","155"],
               ["Märkets fyr 180 euro_.jpg","180"],
               ["Sjökvarteret 150e.jpg","150"],
               ["Sjökvarteret 200.jpg","200"],
               ["Sjökvarteret Åland 200e_.jpg","200"],
               ["Sjökvarteret Åland 80 euro.jpg","80"],
               ["Sunnan II Sjökvarteret 180e.jpg","180"],
               ["Vinter Åland 150e.jpg","150"],
               ["Vinter ålands hav 150e.jpg","150"],
               ["Vinter hare 150e.jpg","150"],
               ["Åland Västra hamnen vinter 180.jpg","180"],
               ["Ålands hav 1 180e_.jpg","180"],
               ["Ålands hav 150e.jpg","150"],
               ["Ålands hav 2 180e_.jpg","180"],
               ["Ålands skärgård 80 euro.jpg","80"]]

// Wrapper div
const gridWrapper = document.getElementById('gridWrapper');

// Variables
let itemsToLoad = 0
let itemsLoaded = 0

// Function that initiates loading
function loadItems() {

    // Avoids trying to load more photos than exists
    if (itemsToLoad > pricesArray.length) {
        itemsToLoad = pricesArray.length
    }

    // Avoids trying to load more photos if enough photos are loaded already
    if (itemsToLoad <= itemsLoaded) { return }

    // Loads the display photos and the corresponding name and price and adds them to the correct elements
    for (let i = itemsLoaded; i < itemsToLoad; i++) {
        createContainer(pricesArray[i])
    }
    itemsLoaded = itemsToLoad
}

// Functions that calculates how many colums there are
function calculateColums() {
    return getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
}

// Function that calculates how many rows there is space for given the innerHeight
function calculateRows() {
    const style = getComputedStyle(document.body)

    // Container size
    const imageContainerSize = parseInt(style.getPropertyValue('--imageContainerSize').slice(0, -2));
    const shopDisplayMargin = parseInt(style.getPropertyValue('--shopDisplayMargin').slice(0, -2));

    // Nav height
    const navContainerHeight = parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2));

    return Math.floor((window.innerHeight - navContainerHeight - shopDisplayMargin) / (imageContainerSize + shopDisplayMargin))
}

// Calculates how many items to load on window size change
function windowLoad() {
    colums = calculateColums()
    rows = calculateRows()
    itemsToLoad = rows * colums + colums
    loadItems()
}

// Calculates how many items to load on scroll
function scrollLoad() {

    // Checks when the window height plus the crolled distance is bigger than the body
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        itemsToLoad += calculateColums()
        loadItems()
    }
}