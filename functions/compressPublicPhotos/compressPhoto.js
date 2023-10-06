const { Storage } = require('@google-cloud/storage');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const sharp = require('sharp');

const DESTINATION_BUCKET_NAME = process.env.PUBLIC_PHOTOS_BUCKET;
const MAX_WIDTH = 1024; // The maximum width of the low-quality photos
const MAX_HEIGHT = 1024; // The maximum height of the low-quality photos
const QUALITY = 60; // The desired quality for the low-quality photos

const storage = new Storage();

exports.compressPhoto = async (event) => {
    const file = event;
    const sourceBucket = storage.bucket(file.bucket);
    const destinationBucket = storage.bucket(DESTINATION_BUCKET_NAME);

    const sourceFile = sourceBucket.file(file.name);
    const destinationFile = destinationBucket.file(file.name);

    const sourceStream = sourceFile.createReadStream();
    const destinationStream = destinationFile.createWriteStream();

    // Use Sharp to convert the photo to low quality and resize it
    const transformStream = sharp().jpeg({ quality: QUALITY }).resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside', // Resize only if the photo is larger than the maximum size
        withoutEnlargement: true, // Do not enlarge the photo if it is smaller than the maximum size
    });

    // Use pipeline to stream the photo through Sharp and upload to destination bucket
    await promisify(pipeline)(sourceStream, transformStream, destinationStream);

    return destinationFile;
};
