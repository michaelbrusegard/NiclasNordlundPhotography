const fs = require('fs');
const sizeOf = require('image-size');
const files = fs.readdirSync('../img/showcase');

// Creates arrays
const animals = [];
const architectural = [];
const nature = [];
const portrait = [];
const sport = [];
const wedding = [];

// Goes through all files in showcase
files.forEach(i => {
    // Checks if it is .jpg photos
    if (i.endsWith('.jpg')) {
        // Checks which category of photo it is and adds the path aswell as dimensions to the correct array
        if (i.startsWith('animals')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            animals.push([i, dimensions.width, dimensions.height]);
        } else if (i.startsWith('architectural')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            architectural.push([i, dimensions.width, dimensions.height]);
        } else if (i.startsWith('nature')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            nature.push([i, dimensions.width, dimensions.height]);
        } else if (i.startsWith('portrait')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            portrait.push([i, dimensions.width, dimensions.height]);
        } else if (i.startsWith('sport')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            sport.push([i, dimensions.width, dimensions.height]);
        } else if (i.startsWith('wedding')) {
            let dimensions = sizeOf('../img/showcase/' + i);
            wedding.push([i, dimensions.width, dimensions.height]);
        }
    }
});

// Creates .json files for every array
fs.writeFileSync('./animals.json', JSON.stringify(animals));
fs.writeFileSync('./architectural.json', JSON.stringify(architectural));
fs.writeFileSync('./nature.json', JSON.stringify(nature));
fs.writeFileSync('./portrait.json', JSON.stringify(portrait));
fs.writeFileSync('./sport.json', JSON.stringify(sport));
fs.writeFileSync('./wedding.json', JSON.stringify(wedding));