require("dotenv").config();
const checkout = require("./checkout.js");
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

app.post("/checkout-session", checkout);

app.get("/getGCloudPublicPhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_PUBLIC_PHOTOS_BUCKET);
});

app.get("/getNatureShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_NATURE_SHOWCASE_BUCKET);
});

app.get("/getAnimalsShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_ANIMALS_SHOWCASE_BUCKET);
});

app.get("/getArchitecturalShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_ARCHITECTURAL_SHOWCASE_BUCKET);
});

app.get("/getPortraitShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_PORTRAIT_SHOWCASE_BUCKET);
});

app.get("/getWeddingShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_WEDDING_SHOWCASE_BUCKET);
});

app.get("/getSportShowcasePhotosBucket", (req, res) => {
    res.json(process.env.GCLOUD_SPORT_SHOWCASE_BUCKET);
});

// Use the webhook middleware
app.use("/webhook", webhookMiddleware);

// Define a route to handle the webhook events
app.post("/webhook", handleCheckoutSession);

app.listen(3000);
