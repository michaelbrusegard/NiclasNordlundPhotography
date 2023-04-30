const { Storage } = require('@google-cloud/storage');

const DESTINATION_BUCKET_NAME = process.env.GCLOUD_PUBLIC_PHOTOS_BUCKET;

const storage = new Storage();

exports.deletePhoto = async (event) => {
    const file = event;
    const destinationBucket = storage.bucket(DESTINATION_BUCKET_NAME);

    // Delete the photo from the destination bucket
    const [destinationFile] = await destinationBucket.file(file.name).get();
    if (destinationFile) {
        await destinationFile.delete();
    }
};
