
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

// Added variables to modify amount of pictures to run through to avoid memory error
const imgLen = paths.length;
const ignorePaths = ['strand 100e_.jpg', 'Våg 165.jpg', 'Sunshower 150e.jpg', 'Trygghet 2 125_.jpg']
const startIndex = 235;
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