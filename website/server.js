require("dotenv").config();
const checkout = require("./checkout.js");
const bug = require("./bug");
const {
    webhookMiddleware,
    handleCheckoutSession,
} = require("./handlePurchase.js");

const path = require("path");
const express = require("express");

const app = express();
const frontendPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(frontendPath, { index: "home.html" }));
app.use(express.urlencoded({ extended: true }));

app.post("/checkout-session", checkout);

app.post("/found-a-bug", bug);

app.get("/get-public-photos-bucket", (req, res) => {
    res.json(process.env.PUBLIC_PHOTOS_BUCKET);
});

app.get("/get-photo-carousel-bucket", (req, res) => {
    res.json(process.env.PHOTO_CAROUSEL_BUCKET);
});

app.get("/get-nature-showcase-bucket", (req, res) => {
    res.json(process.env.NATURE_SHOWCASE_BUCKET);
});

app.get("/get-animals-showcase-bucket", (req, res) => {
    res.json(process.env.ANIMALS_SHOWCASE_BUCKET);
});

app.get("/get-architectural-showcase-bucket", (req, res) => {
    res.json(process.env.ARCHITECTURAL_SHOWCASE_BUCKET);
});

app.get("/get-portrait-showcase-bucket", (req, res) => {
    res.json(process.env.PORTRAIT_SHOWCASE_BUCKET);
});

app.get("/get-wedding-showcase-bucket", (req, res) => {
    res.json(process.env.WEDDING_SHOWCASE_BUCKET);
});

app.get("/get-sport-showcase-bucket", (req, res) => {
    res.json(process.env.SPORT_SHOWCASE_BUCKET);
});

// Use the webhook middleware
app.use("/webhook", webhookMiddleware);

// Define a route to handle the webhook events
app.post("/webhook", handleCheckoutSession);

app.listen(3000);
