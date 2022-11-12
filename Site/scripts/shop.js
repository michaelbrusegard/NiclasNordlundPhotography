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

// Checks for clicks on the shopping cart icon (both desktop and mobile) to toggle the checkout menu
const cartButtons = document.querySelectorAll('.linkIcon.linkCart');
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault(); 
    toggleCheckout();
}));

// State of the checkout menu (true <=> open, false <=> closed)
let checkoutState = false;

// Work in progress function!
function toggleCheckout() {
    if (checkoutState) {
        // remove stuff
        console.log('checkout closed');
    } else {
        // add stuff
        console.log('checkout opened');
    }
    checkoutState = !checkoutState;
}