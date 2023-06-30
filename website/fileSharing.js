require("dotenv").config();
const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");

async function handlePhotos(purchasedItems) {
    const archivePurchasedPhotosUrl =
        process.env.ARCHIVE_PURCHASED_PHOTOS_FUNCTION_URL;

    try {
        const auth = new GoogleAuth();
        const client = await auth.getClient();
        const token = await client.getAccessToken();

        const response = await axios.post(
            archivePurchasedPhotosUrl,
            {
                photos: purchasedItems,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(`Zip file URL: ${response.data.url}`);
        console.log(response);
    } catch (error) {
        console.error(`Failed to zip photos: ${error}`);
    }
}

module.exports = { handlePhotos };
