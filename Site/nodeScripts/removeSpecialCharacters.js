// Script to replace swedish characters

const fs = require('fs');

// Folder path
const path = '../img/shopQuality/'

const files = fs.readdirSync(path);
const paths = []

// Only add images and not other files in the folder
files.forEach(i => {
    if (i.endsWith('.jpg')) {
        paths.push(i);
    }
});

const imgLen = paths.length

// Replace swedish characters on all files in folder
paths.forEach((i, s) => {
    let name = i.toLowerCase();
    name = name.replace('ä', 'ae')
    name = name.replace('å', 'aa')
    name = name.replace('ö', 'oe')

    // Log what is happening
    console.log('Replaced', i, 'with', name, s + '/' + imgLen)

    // Rename the file
    fs.rename(path + i, path + name);
})