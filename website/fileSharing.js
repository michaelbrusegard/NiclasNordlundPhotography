require("dotenv").config();
const axios = require("axios");
const nodemailer = require("nodemailer");
const { GoogleAuth } = require("google-auth-library");

async function handlePhotos(purchasedItems, customerEmail, customerName) {
    try {
        const photosUrl = await getArchivedPhotosUrl(purchasedItems);

        // Send an email with the photos URL
        await sendEmail(photosUrl, customerEmail, customerName);
    } catch (error) {
        console.error(`Failed to handle photos: ${error}`);
    }
}

async function getArchivedPhotosUrl(purchasedItems) {
    const archivePurchasedPhotosUrl =
        process.env.ARCHIVE_PURCHASED_PHOTOS_FUNCTION_URL;

    try {
        const auth = new GoogleAuth();
        const client = await auth.getIdTokenClient(archivePurchasedPhotosUrl);

        const tokenResponse = await client.getRequestHeaders();
        const idToken = tokenResponse.Authorization.split("Bearer ")[1];

        const response = await axios.post(
            archivePurchasedPhotosUrl,
            {
                photos: purchasedItems,
            },
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );

        console.log(`Zip file URL: ${response.data.url}`);

        return response.data.url;
    } catch (error) {
        console.error(`Failed to zip: ${error}`);
    }
}

async function sendEmail(photosUrl, customerEmail, customerName) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SUPPORT_EMAIL_ADDRESS,
        to: customerEmail,
        subject: customerName + ", here are your photos",
        text: `Here is the URL to download the photos: ${photosUrl}`,
        replyTo: process.env.SUPPORT_EMAIL_ADDRESS,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Failed to send email: ${error}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

module.exports = { handlePhotos };
