
// This is a simple "run once script" to compress the shop images for display on the webpage

const fs = require('fs');
const files = fs.readdirSync('../img/shopQualityImages');
const { Image } = require('image-js');
const paths = [];

// Only add images and not other files in the folder
files.forEach(i => {
    if (i.endsWith('.jpg')) {
        paths.push(i);
    }
});

// Paths with issues
const ignorePaths = ['strand 100e_.jpg', 'Våg 165.jpg', 'Sunshower 150e.jpg', 'Trygghet 2 125_.jpg']
const extraPaths = ['  Kökar 100e_.jpg']

// Gets the paths length before and after adding extras
const oldImgLen = paths.length;
extraPaths.forEach(i => {paths.push(i)});
const imgLen = paths.length;

// Index
const startIndex = oldImgLen;
const endIndex = imgLen;

// Some variables for context
let imgCur = 0;
const shopDisplayImagesWidth = 300;

// Resize function
async function resize(path) {
    let image = await Image.load('../img/shopQualityImages/' + path);
    console.log('Current image', path);
    let grey = image
        .resize({ width: shopDisplayImagesWidth });
    imgCur += 1;
    console.log('Resized image', path, imgCur + '/' + (endIndex - startIndex));
    return grey.save('../img/shopDisplayImages/' + path);
}

// Run function for each photo
for (i = startIndex; i < endIndex; i++) {
    if (!ignorePaths.includes(paths[i])) {
        resize(paths[i]);
    } else {
        console.log('Skipped image', paths[i]);
    }
};