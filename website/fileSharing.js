require("dotenv").config();
const path = require("path");
const xss = require("xss");
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
        }
    );
    return response.data.url;
}

async function sendEmail(
    photosUrl,
    customerEmail,
    customerName,
    purchasedItems
) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const itemHTMLList = purchasedItems
        .map((item) => `<li>${xss(item)}</li>`)
        .join("");

    const photoWord = purchasedItems.length === 1 ? "Photo" : "Photos";

    // Email message content
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: customerEmail,
        subject: customerName + ", here are your photos!",
        html: `
            <style>
                .signature {
                    width: 200px;
                    height: 60px;
                    margin-left: 10px;
                }
            </style>
            <p>Dear ${xss(customerName)},</p>
            <p>Thank you for your purchase. You can download your ${photoWord.toLowerCase()} by clicking the link below:</p>
            <a href="${photosUrl}">Download Your ${photoWord}</a>
            <br />
            <p>The link will expire in 24 hours.</p> 
            <br />
            <p>For verification, here is a list with the ${photoWord.toLowerCase()} you have purchased:</p>
            <ol>
                ${itemHTMLList}
            </ol>
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

function sendErrorEmails(
    purchasedItems,
    customerEmail,
    customerName,
    error,
    retries = 5
) {
    // Email configuration
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Email message content
    const itemHTMLList = purchasedItems
        .map((item) => `<li>${xss(item)}</li>`)
        .join("");

    const photoWord = purchasedItems.length === 1 ? "Photo" : "Photos";
    const errorMessage = error.message;
    const recipients = [
        customerEmail,
        process.env.SUPPORT_EMAIL_ADDRESS,
        process.env.DEV_EMAIL_ADDRESS,
    ].join(", "); // Send to multiple recipients

    // Define a function to send the email with retries
    function sendEmailWithRetry(attempts) {
        transporter.sendMail(
            {
                from: process.env.EMAIL_ADDRESS,
                to: recipients,
                subject: "Error in Purchase Processing",
                html: `
            <p>Dear ${xss(customerName)},</p>
            <p>I apologize for the inconvenience. An error occurred while processing your purchase. Our team has been notified, and I will manually retrieve your purchased ${photoWord.toLowerCase()}.</p>
            <br />
            <p>Error Message:</p> 
            <p>${xss(errorMessage)}</p> 
            <br />
            <p>Your purchased ${photoWord.toLowerCase()}:</p>
            <ol>
                ${itemHTMLList}
            </ol>
            <br />
            <p>Thank you for your understanding.</p>
            <br />
            <p>Best regards,</p>
            <p>Niclas Nordlund Photography</p>
        `,
                replyTo: process.env.SUPPORT_EMAIL_ADDRESS,
            },
            (err, info) => {
                if (err) {
                    console.error(
                        `Error sending error email (attempt ${attempts}):`,
                        err
                    );
                    if (attempts < retries) {
                        setTimeout(() => {
                            sendEmailWithRetry(attempts + 1);
                        }, 20000);
                    } else {
                        console.error(
                            "Max retry attempts reached. Email not sent."
                        );
                    }
                } else {
                    console.log("Error emails sent:", info.response);
                }
            }
        );
    }

    sendEmailWithRetry(5);
}

module.exports = { handlePhotos, sendErrorEmails };
