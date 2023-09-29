require("dotenv").config();
const path = require("path");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { GoogleAuth } = require("google-auth-library");

async function handlePhotos(purchasedItems, customerEmail, customerName) {
    const photosUrl = await getArchivedPhotosUrl(purchasedItems);
    await sendEmail(photosUrl, customerEmail, customerName, purchasedItems);
}

async function getArchivedPhotosUrl(purchasedItems) {
    const archivePurchasedPhotosUrl =
        process.env.ARCHIVE_PURCHASED_PHOTOS_FUNCTION_URL;
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
        },
    );
    return response.data.url;
}

async function sendEmail(
    photosUrl,
    customerEmail,
    customerName,
    purchasedItems,
) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const itemHTMLList = purchasedItems
        .map((item) => `<li>${item}</li>`)
        .join("");

    const mailOptions = {
        from: process.env.SUPPORT_EMAIL_ADDRESS,
        to: customerEmail,
        subject: customerName + ", here are your photos!",
        html: `
            <style>
                .signature {
                    width: 200px;
                    height: 60px;
                    margin-left: 20px;
                }
            </style>
            <p>Dear ${customerName},</p>
            <p>Thank you for your purchase. You can download your photos by clicking the link below:</p>
            <a href="${photosUrl}">Download Your Photos</a>
            <br />
            <p>The link will expire in 24 hours.</p> 
            <br />
            <p>For verification, here is a list over the photos you have purchased:</p>
            <ul>
                ${itemHTMLList}
            </ul>
            <br />
            <p>If you have any questions, please reply to this email.</p>
            <br />
            <p>Best regards,</p>
            <p>Niclas Nordlund</p>
            <img class="signature" src="cid:signature" alt="Niclas Nordlund's Signature" />
        `,
        replyTo: process.env.SUPPORT_EMAIL_ADDRESS,
        attachments: [
            {
                filename: "signature.png",
                path: path.join(__dirname, "./public/img/icons/signature.png"),
                cid: "signature",
            },
        ],
    };

    transporter.sendMail(mailOptions);
}

module.exports = { handlePhotos };
