// Gets the photo and price information
const files = [["Alfågel Ålands hav 300 euro.jpg","300"],
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

// Checks when the document object model is done loading
document.addEventListener('DOMContentLoaded', windowLoad);

// Checks for changes to iniate loading more
window.addEventListener("scroll", scrollLoad);
window.addEventListener("resize", windowLoad);
window.addEventListener("orientationChange", windowLoad);

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

function windowLoad() {
    let [colums, rows] = calculateColumsRows()
    const viewport = colums * rows
    if (viewport > itemsToLoad) {
        itemsToLoad = viewport
        loadItems()
    }
}

function loadItems() {
    // Avoids trying to load if enough photos are loaded already
    if (itemsToLoad <= itemsLoaded) {
        return
    }

    // Makes sure that it doesnt try to load photos that does not exist
    if (itemsToLoad > files.length) {
        itemsToLoad = files.length
    }

    // Checks if there is more to load
    if (itemsToLoad != itemsLoaded) {
        // Loads the display photos and the corresponding name and price and adds them to the correct elements
        for (let i = itemsLoaded; i < itemsToLoad; i++) {
            createContainer(files[i])
        }
        itemsLoaded = itemsToLoad
    }
}

function createContainer(i) {
    // Images
    let img = document.createElement('img');
    img.src = 'img/shopDisplayImages/' + i[0]
    img.classList.add('images')

    // Price
    let h2 = document.createElement('h2');
    h2.textContent = i[1] + '€';
    h2.classList.add('price')

    // Name
    let p = document.createElement('p');
    p.textContent = i[0];
    p.classList.add('name')

    // Container
    let div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.classList.add('container')
    gridWrapper.appendChild(div);
}