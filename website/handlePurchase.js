const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const fileSharing = require("./fileSharing");

const bodyParser = require("body-parser");

// Define a function to verify the webhook signature
const webhookVerifyMiddleware = (request, response, next) => {
    const sigHeader = request.headers["stripe-signature"];
    const webhookSecret = process.env.WEBHOOK_SECRET;

    try {
        request.rawBody = Buffer.from(JSON.stringify(request.body));
        stripe.webhooks.constructEvent(
            request.rawBody,
            sigHeader,
            webhookSecret
        );
        next();
    } catch (error) {
        console.error(error);
        response.status(400).send(error.message);
    }
};

// Configure body-parser to parse the webhook payload as a Buffer
const webhookMiddleware = bodyParser.raw({
    type: "application/json",
    verify: webhookVerifyMiddleware,
});

// Define a function to handle the webhook events
const handleCheckoutSession = (req, res) => {
    // Handle the Stripe webhook event
    const event = req.body;
    // Check the type of the received event
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSession = event.data.object;
            let purchasedItems = checkoutSession.metadata.purchasedItems;
            const customerEmail = checkoutSession.customer_details.email;
            const customerName = checkoutSession.customer_details.name;
            if (purchasedItems !== undefined) {
                purchasedItems = JSON.parse(purchasedItems);
            }
            try {
                fileSharing.handlePhotos(
                    purchasedItems,
                    customerEmail,
                    customerName
                );

                res.json({ received: true });
            } catch (error) {
                fileSharing.sendErrorEmails(
                    purchasedItems,
                    customerEmail,
                    customerName,
                    error
                );
                res.status(500).json({ error: e.message });
                console.error(error);
            }
            break;
        default:
            break;
    }
};

// Export modules
module.exports = { webhookMiddleware, handleCheckoutSession };
