const fs = require('fs');
const shopQualityOld = fs.readdirSync('../img/shopQuality');
const shopDisplayOld = fs.readdirSync('../img/shopDisplay');
const shopQuality = []
const shopDisplay = []

// Makes sure its only .jpg files
shopQualityOld.forEach(i => {
    if (i.endsWith('.jpg')) {
        shopQuality.push(i);
    }
});

shopDisplayOld.forEach(i => {
    if (i.endsWith('.jpg')) {
        shopDisplay.push(i);
    }
});

const shopDisplayLength = shopDisplay.length
const shopQualityLength = shopQuality.length

// Compares the array lengths and console logs
if (shopDisplayLength === shopQualityLength) {
    console.log('There are the same amount of images in each folder');
}   else if (shopDisplayLength > shopQualityLength) {
    console.log('shopDisplay is longer by', shopDisplayLength - shopQualityLength);
    console.log('Add this to shopQuality:')
    compareArrays(shopDisplay, shopQuality)
} else if (shopDisplayLength < shopQualityLength) {
    console.log('shopQuality is longer by', shopQualityLength - shopDisplayLength);
    console.log('Add this to shopDisplay:')
    compareArrays(shopQuality, shopDisplay)
}

// Returns when it finds a missing image in the largest array
function compareArrays(longarr, arr) {
    for (let i = 0; i < longarr.length; i++) {
        if (!arr.includes(longarr[i])) {
            console.log(longarr[i]);
          }
    }
}