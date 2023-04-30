require('dotenv').config();
const fileSharing = require('./fileSharing.js');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const path = require('path');
const frontendPath = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static(frontendPath, { index: 'home.html' }));

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = [];

app.post('/checkout-session', async (request, response) => {
    const itemsToPurchase = request.body;
    let validatedItemsToPurchase = [];
    let lineItems = [];
    for (i in itemsToPurchase) {
        for (j in storeItems) {
            if (
                JSON.stringify(itemsToPurchase[i]) ===
                JSON.stringify(storeItems[j])
            ) {
                validatedItemsToPurchase.push(storeItems[j][0]);
                lineItems.push({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItems[j][0],
                        },
                        unit_amount: storeItems[j][1] * 100,
                    },
                    quantity: 1,
                });
            }
        }
    }
    if (lineItems > 0) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: lineItems,
                success_url: `${process.env.SERVER_URL}/sucess.html`,
                cancel_url: `${process.env.SERVER_URL}/shop.html`,
                metadata: {
                    purchasedItems: JSON.stringify(validatedItemsToPurchase),
                },
            });
            response.json({ url: session.url });
        } catch (e) {
            response.status(500).json({ error: e.message });
        }
    }
});

// Define a function to verify the webhook signature
const webhookVerifyMiddleware = (request, response, next) => {
    const sigHeader = request.headers['stripe-signature'];
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
        response.status(400).send('Webhook Error:' + err.message);
    }
};

// Configure body-parser to parse the webhook payload as a Buffer
app.use(
    bodyParser.raw({
        type: 'application/json',
        verify: webhookVerifyMiddleware,
    })
);

// Define a route to handle the webhook events
app.post('/webhook', (request, response) => {
    let purchasedPhotos = [];
    // Handle the Stripe webhook event
    const event = request.body;

    // Check the type of the received event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            let purchasedItems = checkoutSession.metadata.purchasedItems;
            if (purchasedItems != undefined) {
                purchasedItems = JSON.parse(purchasedItems);
                fileSharing.handlePhotos(purchasedItems);
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Send a response to acknowledge receipt of the event
    response.json({ received: true });
});

app.get('/getGCloudPublicPhotosBucket', (req, res) => {
    res.json(process.env.GCLOUD_PUBLIC_PHOTOS_BUCKET);
});

app.listen(3000);
