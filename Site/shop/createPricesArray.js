
// This is a simple "run once script" to extract the price and filename from the way Niclas gives us his photos

const fs = require('fs');
const files = fs.readdirSync('../img/shopQuality');
const paths = [];
const prices = [];

// Only add images and not other files in the folder
files.forEach(i => {
    if (i.endsWith('.jpg')) {
        paths.push(i);
    }
});

// Extract prices from file
paths.forEach(i => {
    let numbers = i.match(/\d+/g);
    numbers.forEach((value, index) => {
        if (value.length < 2) {
            numbers.splice(index, 1);
        }
    });
    prices.push(numbers[0]);
});


// Random check
if (paths.length === prices.length) {
    console.log('Found price for every photo');
} else {
    let difference = paths.length - prices.length;
    if (difference > 0) {
        console.log('There are', difference, 'photos missing prices');
    } else if (difference < 0) {
        console.log('There are', -difference, 'prices missing photos');
    } else {
        console.log('This should not be possible');
    }
}

// Add everything to one array
const imgPrice = [];
for (let i = 0; i < paths.length; i++) {
    imgPrice.push([paths[i], prices[i]]);
}

console.log('Amount of prices', imgPrice.length);

// Add array to json
fs.writeFileSync('./prices.json', JSON.stringify(imgPrice));