const config = require('../config.json');
const { Storage } = require('@google-cloud/storage');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const sharp = require('sharp');

// Replace these values with your own
const SOURCE_BUCKET_NAME = config.googleBackEndBucketName;
const DESTINATION_BUCKET_NAME = config.googleFrontEndBucketName;
const MAX_WIDTH = 1024; // The maximum width of the low-quality images
const MAX_HEIGHT = 1024; // The maximum height of the low-quality images
const QUALITY = 60; // The desired quality for the low-quality images

const storage = new Storage();

exports.processImage = async (event, context) => {
  const file = event;
  const sourceBucket = storage.bucket(file.bucket);
  const destinationBucket = storage.bucket(DESTINATION_BUCKET_NAME);

  const sourceFile = sourceBucket.file(file.name);
  const destinationFile = destinationBucket.file(file.name);

  const sourceStream = sourceFile.createReadStream();
  const destinationStream = destinationFile.createWriteStream();

  // Use Sharp to convert the image to low quality and resize it
  const transformStream = sharp()
    .jpeg({ quality: QUALITY })
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: 'inside', // Resize only if the image is larger than the maximum size
      withoutEnlargement: true // Do not enlarge the image if it is smaller than the maximum size
    });

  // Use pipeline to stream the image through Sharp and upload to destination bucket
  await promisify(pipeline)(
    sourceStream,
    transformStream,
    destinationStream
  );

  console.log(`File ${file.name} processed.`);

  return destinationFile;
};
