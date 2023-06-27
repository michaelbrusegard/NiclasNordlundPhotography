require("dotenv").config();
const axios = require("axios");

async function handlePhotos(purchasedItems) {
    const archivePurchasedPhotosUrl =
        process.env.GCLOUD_ARCHIVE_PURCHASED_PHOTOS_FUNCTION_URL;

    try {
        const response = await axios.post(archivePurchasedPhotosUrl, {
            photos: purchasedItems,
        });

        console.log(`Zip file URL: ${response.data.url}`);
    } catch (error) {
        console.error(`Failed to zip photos: ${error}`);
    }
}

module.exports = { handlePhotos };
