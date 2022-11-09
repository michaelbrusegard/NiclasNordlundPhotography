
// This is a simple "run once script" to compress the shop images for display on the webpage

const fs = require('fs');
const files = fs.readdirSync('../../Site/img/shopQualityImages');
const { Image } = require('image-js');
const paths = [];

// Only add images and not other files in the folder
files.forEach(i => {
    if (i.endsWith('.jpg')) {
        paths.push(i);
    }
});

// Some variables for context
const imgLen = paths.length;
let imgCur = 0;
const shopDisplayImagesWidth = 300;

// Resize function
async function resize(path) {
    let image = await Image.load('../../Site/img/shopQualityImages/' + path);
    let grey = image
        .resize({ width: shopDisplayImagesWidth });
    imgCur += 1;
    console.log('Resized image', path, imgCur + '/' + imgLen);
    return grey.save('../../Site/img/shopDisplayImages/' + path);
}

// Run function for each photo
paths.forEach(value => {
    resize(value);
});