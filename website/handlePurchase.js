require("dotenv").config();
const fileSharing = require("./fileSharing");

const bodyParser = require("body-parser");

// Define a function to verify the webhook signature
const webhookVerifyMiddleware = (request, response, next) => {
    const sigHeader = request.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        request.rawBody = Buffer.from(JSON.stringify(request.body));
        stripe.webhooks.constructEvent(
            request.rawBody,
            sigHeader,
            webhookSecret
        );
        next();
    } catch (err) {
        console.error(err);
        response.status(400).send("Webhook Error:" + err.message);
    }
};

// Configure body-parser to parse the webhook payload as a Buffer
const webhookMiddleware = bodyParser.raw({
    type: "application/json",
    verify: webhookVerifyMiddleware,
});

// Define a function to handle the webhook events
const handleCheckoutSession = (req, res) => {
    let purchasedPhotos = [];
    // Handle the Stripe webhook event
    const event = req.body;

    // Check the type of the received event
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSession = event.data.object;
            let purchasedItems = checkoutSession.metadata.purchasedItems;
            if (purchasedItems != undefined) {
                purchasedItems = JSON.parse(purchasedItems);
                fileSharing.handlePhotos(purchasedItems);
            }
            break;
        default:
            break;
    }

    // Send a response to acknowledge receipt of the event
    res.json({ received: true });
};

// Export modules
module.exports = { webhookMiddleware, handleCheckoutSession };
