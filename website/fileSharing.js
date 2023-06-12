require("dotenv").config();
const request = require("request");

async function handlePhotos(purchasedItems) {
    const archivePurchasedPhotosUrl =
        process.env.GCLOUD_ARCHIVE_PURCHASED_PHOTOS_FUNCTION_URL;

    request.post(
        {
            url: archivePurchasedPhotosUrl,
            json: { photos: purchasedItems },
        },
        (error, response, body) => {
            if (error) {
                console.error(`Failed to zip photos: ${error}`);
            } else {
                console.log(`Zip file URL: ${body.url}`);
            }
        }
    );
}

module.exports = { handlePhotos };
