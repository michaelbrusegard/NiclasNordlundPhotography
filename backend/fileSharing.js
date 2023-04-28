const { Storage } = require('@google-cloud/storage');
const config = require('../config.json');

const storage = new Storage({ projectId: config.googleProjectId, keyFilename: 'acoustic-scarab-382401-51a3eaca51bc.json' });

async function handlePhotos(purchasedItems) {
    try {
        const bucket = storage.bucket(config.googleBackEndBucketName);
        const promises = purchasedItems.map(async (item) => {
            const file = bucket.file(item);
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 24 * 60 * 60 * 1000, // Link expires in 24 hours
                responseContentDisposition: `attachment; filename="${item}"`, // Prompt user to download file
            });
            return { item, url };
        });
        const results = await Promise.all(promises);
        console.log('Links for purchased items:', results);
        // You can use the retrieved links in the results array to send them to the customer
    } catch (e) {
        console.error('Error retrieving links:', e);
    }
}

module.exports = { handlePhotos };