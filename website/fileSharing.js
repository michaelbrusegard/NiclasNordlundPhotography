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
        console.log(`Zip file name: ${response.data.name}`);
    } catch (error) {
        console.error(`Failed to zip: ${error}`);
        console.error(error.response.data);
    }
}

module.exports = { handlePhotos };
