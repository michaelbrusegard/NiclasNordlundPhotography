// Array from prices.json
const pricesArray = [
    [
        "  Kökar 100e_.jpg",
        "100"
    ],
    [
        "Alfågel Ålands hav 300 euro.jpg",
        "300"
    ],
    [
        "Alfågel 100e.jpg",
        "100"
    ],
    [
        "Alfågel 50e.jpg",
        "50"
    ],
    [
        "Åland Västra hamnen vinter 180.jpg",
        "180"
    ],
    [
        "Ålands hav 1 180e_.jpg",
        "180"
    ],
    [
        "Ålands hav 150e.jpg",
        "150"
    ],
    [
        "Ålands hav 2 180e_.jpg",
        "180"
    ],
    [
        "Ålands skärgård 80 euro.jpg",
        "80"
    ],
    [
        "Champagne vid havet 120e_.jpg",
        "120"
    ],
    [
        "Champagne vid havet 150e_.jpg",
        "150"
    ],
    [
        "Det mörka havet 125e_.jpg",
        "125"
    ],
    [
        "Dirigenten 2 80e.jpg",
        "80"
    ],
    [
        "Dirigenten 200e_.jpg",
        "200"
    ],
    [
        "Ejder 125.jpg",
        "125"
    ],
    [
        "Ejder 125e.jpg",
        "125"
    ],
    [
        "Ejder 150 euro.jpg",
        "150"
    ],
    [
        "Ejder 150e.jpg",
        "150"
    ],
    [
        "Ejder 2 150 euro.jpg",
        "150"
    ],
    [
        "Ejder 250e_.jpg",
        "250"
    ],
    [
        "Ejder 80e.jpg",
        "80"
    ],
    [
        "Ejder Kobba Klintar 250e_.jpg",
        "250"
    ],
    [
        "Fiske 1 150e.jpg",
        "150"
    ],
    [
        "Fiske 2 50e.jpg",
        "50"
    ],
    [
        "Fiske 3 150 e.jpg",
        "150"
    ],
    [
        "Fiske 40e.jpg",
        "40"
    ],
    [
        "Fiske 50e.jpg",
        "50"
    ],
    [
        "Fiske 55.jpg",
        "55"
    ],
    [
        "Fiskestugor Rannörarna  100e_.jpg",
        "100"
    ],
    [
        "Fisktärna 40e_.jpg",
        "40"
    ],
    [
        "Frukost vid havet 60e_.jpg",
        "60"
    ],
    [
        "Fötboll 50e_.jpg",
        "50"
    ],
    [
        "Gammelskog 150 e.jpg",
        "150"
    ],
    [
        "Grisslor 130e_.jpg",
        "130"
    ],
    [
        "Gräslök i solnedgång 240e_.jpg",
        "240"
    ],
    [
        "Gräslök i solnedgång 250e_.jpg",
        "250"
    ],
    [
        "Gräslök vid havet  125_.jpg",
        "125"
    ],
    [
        "Gräslök vid havet 2  125_.jpg",
        "125"
    ],
    [
        "Grågäss 100e_.jpg",
        "100"
    ],
    [
        "Grågäss 110e_.jpg",
        "110"
    ],
    [
        "Hammarudda 150e_.jpg",
        "150"
    ],
    [
        "Hammarudda 200e_.jpg",
        "200"
    ],
    [
        "Hammarudda 50e_.jpg",
        "50"
    ],
    [
        "Hammarudda 80e.jpg",
        "80"
    ],
    [
        "Hav 80e_.jpg",
        "80"
    ],
    [
        "Hav i solnedgång 2 200e_.jpg",
        "200"
    ],
    [
        "Hav i solnedgång 200e_.jpg",
        "200"
    ],
    [
        "Havet 150.jpg",
        "150"
    ],
    [
        "Havet 50e_.jpg",
        "50"
    ],
    [
        "Havs våg 1  80e_.jpg",
        "80"
    ],
    [
        "Havs våg 2   180e_.jpg",
        "180"
    ],
    [
        "Havsglöd 2  130e.jpg",
        "130"
    ],
    [
        "Havsglöd 3 130e.jpg",
        "130"
    ],
    [
        "Havsglöd 80e.jpg",
        "80"
    ],
    [
        "Havsörn 150e_.jpg",
        "150"
    ],
    [
        "Havsörnsbo Lågskär 100 euro_.jpg",
        "100"
    ],
    [
        "Heart 180e_.jpg",
        "180"
    ],
    [
        "Hot dogs 1  150e.jpg",
        "150"
    ],
    [
        "Hot dogs 2  150e.jpg",
        "150"
    ],
    [
        "Höst Åland 80euro.jpg",
        "80"
    ],
    [
        "Höstlöv 50e.jpg",
        "50"
    ],
    [
        "Isbelagd strand 40e_.jpg",
        "40"
    ],
    [
        "Kajak Åland  2 180e.jpg",
        "180"
    ],
    [
        "Kajak Åland 180e.jpg",
        "180"
    ],
    [
        "Kajaking Åland 2  200 euro.jpg",
        "200"
    ],
    [
        "Kastelholms Slott Åland 250euro.jpg",
        "250"
    ],
    [
        "Kastellholms slott 130 euro.jpg",
        "130"
    ],
    [
        "Kastellholms slott 180 euro.jpg",
        "180"
    ],
    [
        "Kattunge 1 180e.jpg",
        "180"
    ],
    [
        "Kattunge 145.jpg",
        "145"
    ],
    [
        "Kattunge 150.jpg",
        "150"
    ],
    [
        "Kattunge 2 180e.jpg",
        "180"
    ],
    [
        "Kobba Klintar 100e.jpg",
        "100"
    ],
    [
        "Kobba Klintar 40e_.jpg",
        "40"
    ],
    [
        "Kobba Klintar 50e_.jpg",
        "50"
    ],
    [
        "Kobba Klintar hamn 150 euro_.jpg",
        "150"
    ],
    [
        "Kobba Klintar Åland 350 euro_.jpg",
        "350"
    ],
    [
        "Kobba klintar 100e_.jpg",
        "100"
    ],
    [
        "Kväll vid havet 125 e.jpg",
        "125"
    ],
    [
        "Käringsund 125 e.jpg",
        "125"
    ],
    [
        "Kökar 100e_.jpg",
        "100"
    ],
    [
        "Kökar 150e_.jpg",
        "150"
    ],
    [
        "Kökar 180e.jpg",
        "180"
    ],
    [
        "Kökar 40e_.jpg",
        "40"
    ],
    [
        "Kökar 60e.jpg",
        "60"
    ],
    [
        "Kökar strandkål 140e.jpg",
        "140"
    ],
    [
        "Kökar svan 100e_.jpg",
        "100"
    ],
    [
        "Kökar älg  250e.jpg",
        "250"
    ],
    [
        "Lugn & Ro Åland 500 euro.jpg",
        "500"
    ],
    [
        "Lägereld 100e_.jpg",
        "100"
    ],
    [
        "Marhällan 150 euro_.jpg",
        "150"
    ],
    [
        "Marhällan 300 euro.jpg",
        "300"
    ],
    [
        "Marhällan fyr 100e.jpg",
        "100"
    ],
    [
        "Marhällan Åland 150 euro.jpg",
        "150"
    ],
    [
        "Marhällan-Kobba Klintar 250euro_.jpg",
        "250"
    ],
    [
        "Morgondis 40e.jpg",
        "40"
    ],
    [
        "Märkets fyr 150 euro_.jpg",
        "150"
    ],
    [
        "Märkets fyr 155 euro_.jpg",
        "155"
    ],
    [
        "Märkets fyr 180 euro_.jpg",
        "180"
    ],
    [
        "November vid havet 100e.jpg",
        "100"
    ],
    [
        "Novembermörker 120 e.jpg",
        "120"
    ],
    [
        "Pommern 150e.jpg",
        "150"
    ],
    [
        "Pommern 2   150e.jpg",
        "150"
    ],
    [
        "Pommern B&W 300e_.jpg",
        "300"
    ],
    [
        "Ramslök 140e_.jpg",
        "140"
    ],
    [
        "Roskarl 50e_.jpg",
        "50"
    ],
    [
        "Råbock 120e.jpg",
        "120"
    ],
    [
        "Råbock 125e.jpg",
        "125"
    ],
    [
        "Råbock 130.jpg",
        "130"
    ],
    [
        "Råbock 150e.jpg",
        "150"
    ],
    [
        "Råbock 170e.jpg",
        "170"
    ],
    [
        "Råbock 176e.jpg",
        "176"
    ],
    [
        "Råbock 40e.jpg",
        "40"
    ],
    [
        "Råbock 50e.jpg",
        "50"
    ],
    [
        "Råbock 60ee.jpg",
        "60"
    ],
    [
        "Rådjur 140e_.jpg",
        "140"
    ],
    [
        "Sandstrand  Kökar 100e_.jpg",
        "100"
    ],
    [
        "Sjökvarteret 150e.jpg",
        "150"
    ],
    [
        "Sjökvarteret 200.jpg",
        "200"
    ],
    [
        "Sjökvarteret 60e.jpg",
        "60"
    ],
    [
        "Sjökvarteret 80e.jpg",
        "80"
    ],
    [
        "Sjökvarteret albanus 140e.jpg",
        "140"
    ],
    [
        "Sjökvarteret Åland 200e_.jpg",
        "200"
    ],
    [
        "Sjökvarteret Åland 80 euro.jpg",
        "80"
    ],
    [
        "Småskrake 40e.jpg",
        "40"
    ],
    [
        "Sothönan 125 e.jpg",
        "125"
    ],
    [
        "Spindelnät 40e_.jpg",
        "40"
    ],
    [
        "Sunnan II Sjökvarteret 180e.jpg",
        "180"
    ],
    [
        "Sunset 125 e.jpg",
        "125"
    ],
    [
        "Säl kökar 100e.jpg",
        "100"
    ],
    [
        "Sätingskär 200e_.jpg",
        "200"
    ],
    [
        "Sätingskär 80e.jpg",
        "80"
    ],
    [
        "Travhästar 40e_.jpg",
        "40"
    ],
    [
        "Travhästar 41e_.jpg",
        "41"
    ],
    [
        "Tärna 200e_.jpg",
        "200"
    ],
    [
        "Tärna 230e.jpg",
        "230"
    ],
    [
        "Tärna 250e.jpg",
        "250"
    ],
    [
        "Vackert hav 180e_.jpg",
        "180"
    ],
    [
        "Vid havet 100e.jpg",
        "100"
    ],
    [
        "Vid havet 100e_.jpg",
        "100"
    ],
    [
        "Vinter hare 150e.jpg",
        "150"
    ],
    [
        "Vinter Åland 150e.jpg",
        "150"
    ],
    [
        "Vinter ålands hav 150e.jpg",
        "150"
    ],
    [
        "Vinternatt 150e.jpg",
        "150"
    ],
    [
        "Vinternatt 200e.jpg",
        "200"
    ],
    [
        "Vinternatt 300e.jpg",
        "300"
    ],
    [
        "Vinternatt 310e.jpg",
        "310"
    ],
    [
        "fjäder 100e.jpg",
        "100"
    ],
    [
        "fjäder 250e.jpg",
        "250"
    ],
    [
        "insjö Geta 150e.jpg",
        "150"
    ],
    [
        "svan 150 e.jpg",
        "150"
    ],
    [
        "svan familj 80e.jpg",
        "80"
    ],
    [
        "svärtor 1  100e_.jpg",
        "100"
    ],
    [
        "svärtor 1  200e_.jpg",
        "200"
    ],
    [
        "svärtor 1  60e_.jpg",
        "60"
    ],
    [
        "svärtor 1  80e_.jpg",
        "80"
    ],
    [
        "svärtor 1  90e_.jpg",
        "90"
    ],
    [
        "vid havet 80e.jpg",
        "80"
    ],
    [
        "Äggtjuven 200e_.jpg",
        "200"
    ],
    [
        "Ängsull 160e.jpg",
        "160"
    ],
    [
        "Ängsull 165e.jpg",
        "165"
    ],
    [
        "Ängsull 70e.jpg",
        "70"
    ],
    [
        "Ängsull 75.jpg",
        "75"
    ],
    [
        "Äppel 40e.jpg",
        "40"
    ],
    [
        "Ådor med ungar 100e_.jpg",
        "100"
    ],
    [
        "Örnen & Kråkan 300e_.jpg",
        "300"
    ]
]

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