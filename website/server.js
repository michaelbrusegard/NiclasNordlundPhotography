const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const rateLimit = require('express-rate-limit');

const checkout = require('./checkout.js');
const bug = require('./bug');
const { webhookMiddleware, handleCheckoutSession } = require('./handlePurchase.js');

const express = require('express');

const app = express();
const frontendPath = path.join(__dirname, 'public');

app.use((req, res, next) => {
    if (req.hostname === process.env.SERVER_URL.replace(/^https:\/\/www\./, '')) {
        return res.redirect(301, process.env.SERVER_URL);
    }
    next();
});

app.use(express.json());

app.use(
    express.static(frontendPath, {
        index: 'home.html',
        extensions: ['html'],
    }),
);

app.use(express.urlencoded({ extended: true }));

app.post('/checkout-session', checkout);

const limitBug = rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 3,
    message: (req, res) => {
        res.redirect('/');
    },
});

app.post('/found-a-bug', limitBug, bug);

app.get('/get-server-url', (req, res) => {
    res.json(process.env.SERVER_URL);
});

app.get('/get-public-photos-bucket', (req, res) => {
    res.json(process.env.PUBLIC_PHOTOS_BUCKET);
});

app.get('/get-photo-carousel-bucket', (req, res) => {
    res.json(process.env.PHOTO_CAROUSEL_BUCKET);
});

app.get('/get-nature-showcase-bucket', (req, res) => {
    res.json(process.env.NATURE_SHOWCASE_BUCKET);
});

app.get('/get-animals-showcase-bucket', (req, res) => {
    res.json(process.env.ANIMALS_SHOWCASE_BUCKET);
});

app.get('/get-architectural-showcase-bucket', (req, res) => {
    res.json(process.env.ARCHITECTURAL_SHOWCASE_BUCKET);
});

app.get('/get-portrait-showcase-bucket', (req, res) => {
    res.json(process.env.PORTRAIT_SHOWCASE_BUCKET);
});

app.get('/get-wedding-showcase-bucket', (req, res) => {
    res.json(process.env.WEDDING_SHOWCASE_BUCKET);
});

app.get('/get-sport-showcase-bucket', (req, res) => {
    res.json(process.env.SPORT_SHOWCASE_BUCKET);
});

// Use the webhook middleware
app.use('/webhook', webhookMiddleware);

// Define a route to handle the webhook events
app.post('/webhook', handleCheckoutSession);

app.listen(8080);
