const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const rateLimit = require("express-rate-limit");
const sessions = require("express-session");
const bcrypt = require("bcrypt");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { Storage } = require("@google-cloud/storage");

bcrypt.hash(process.env.ADMIN_PASSWORD, 10, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        process.env.ADMIN_PASSWORD = hash;
    }
});

const app = express();

app.use(
    sessions({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 1000 * 15,
            secure: process.env.SERVE_ONLY_HTTPS === "true",
        },
        resave: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let session;
const loginHtml = `
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin | Niclas Nordlund Photography</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
            rel="stylesheet"
        />
        <style>
            * {
                font-family: "Poppins", sans-serif;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <form method="POST">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Submit</button>
            <p></p>
        </form>
    </body>
</html>
`;

const limiter = rateLimit({
    windowMs: 60 * 1000 * 15, // 15 minutes
    max: 5, // 5 failed attempts allowed in that window
    message: loginHtml.replace(
        "<p></p>",
        "<p>Too many login attempts, try again in 15 minutes.</p>"
    ),
});

app.get("/", (req, res) => {
    if (req.session && req.session.userid) {
        res.sendFile(path.join(__dirname, "index.html"));
    } else res.send(loginHtml);
});

app.post("/", limiter, (req, res) => {
    bcrypt.compare(
        req.body.password,
        process.env.ADMIN_PASSWORD,
        (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                res.status(500).send("Error in checking password");
            } else if (result) {
                req.session.userid = "admin";
                res.redirect("/");
            } else {
                res.send(
                    loginHtml.replace(
                        "<p></p>",
                        "<p>Incorrect password. Please try again.</p>"
                    )
                );
            }
        }
    );
});
app.post("/", limiter, (req, res) => {
    bcrypt.compare(
        req.body.password,
        process.env.ADMIN_PASSWORD,
        (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                res.status(500).send("Internal Server Error");
            } else if (result) {
                req.session.userid = "admin";
                res.redirect("/");
            } else {
                res.send(
                    loginHtml.replace(
                        "<p></p>",
                        "<p>Incorrect password. Please try again.</p>"
                    )
                );
            }
        }
    );
});

function authenticate(req, res, next) {
    if (req.session && req.session.userid) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

app.use(authenticate);

const storage = new Storage();

app.get("/get-photos", async (req, res) => {
    const { bucket: requestedBucket } = req.query;

    try {
        const bucketName = getBucketName(requestedBucket);
        const bucket = storage.bucket(bucketName);
        const [files] = await bucket.getFiles();

        // Extract the relevant information (e.g., name and URL) from the files
        const items = files.map((file) => ({
            name: file.name,
            url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
        }));

        // Send the items as JSON response
        res.setHeader("Content-Disposition", "attachment");
        res.json(items);
    } catch (error) {
        console.error("Error loading items:", error);
        res.status(500).send("Error loading photos");
    }
});

app.get("/download-photo", async (req, res) => {
    const { bucket: requestedBucket, name } = req.query;

    try {
        const bucketName = getBucketName(requestedBucket, true);

        const options = {
            version: "v4",
            action: "read",
            expires: Date.now() + 5 * 60 * 1000,
        };
        const [signedUrl] = await storage
            .bucket(bucketName)
            .file(name)
            .getSignedUrl(options);

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
        res.redirect(signedUrl);
    } catch (error) {
        console.error("Error generating signed URL:", error);
        res.status(500).send("Error generating URL for photo to download");
    }
});

app.delete("/delete-photo", async (req, res) => {
    const { bucket: requestedBucket, name } = req.query;

    try {
        const bucketName = getBucketName(requestedBucket, true);
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(name);

        const [exists] = await file.exists();
        if (exists) {
            await file.delete();

            res.status(200).send("OK");
        } else {
            res.status(404).send("Not Found");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Error deleting photo");
    }
});

app.post("/upload-photos", upload.array("files"), async (req, res) => {
    const { bucket: requestedBucket } = req.query;

    try {
        const bucketName = getBucketName(requestedBucket, true);
        const bucket = storage.bucket(bucketName);

        if (!req.files || req.files.length === 0) {
            res.status(400).send("No files were uploaded.");
            return;
        }

        const uploadPromises = req.files.map((file) => {
            if (!file.buffer) {
                console.error(
                    "File buffer is undefined for",
                    file.originalname
                );
                return Promise.resolve();
            }

            const blob = bucket.file(file.originalname);
            return new Promise((resolve, reject) => {
                const blobStream = blob.createWriteStream();
                blobStream
                    .on("error", (error) => {
                        console.error("Error writing to GCS:", error);
                        reject(error);
                    })
                    .on("finish", () => {
                        resolve();
                    });

                blobStream.end(file.buffer);
            });
        });

        await Promise.all(uploadPromises);

        res.status(200).send("OK");
    } catch (error) {
        console.error("Error uploading photos:", error);
        res.status(500).send("Error uploading photos");
    }
});

function getBucketName(requestedBucket, modify = false) {
    switch (requestedBucket) {
        case "carousel":
            return process.env.PHOTO_CAROUSEL_BUCKET;
        case "nature":
            return process.env.NATURE_SHOWCASE_BUCKET;
        case "animals":
            return process.env.ANIMALS_SHOWCASE_BUCKET;
        case "architectural":
            return process.env.ARCHITECTURAL_SHOWCASE_BUCKET;
        case "portrait":
            return process.env.PORTRAIT_SHOWCASE_BUCKET;
        case "wedding":
            return process.env.WEDDING_SHOWCASE_BUCKET;
        case "sport":
            return process.env.SPORT_SHOWCASE_BUCKET;
        case "shop":
            if (modify) {
                return process.env.PHOTOS_BUCKET;
            } else {
                return process.env.PUBLIC_PHOTOS_BUCKET;
            }
        default:
            return null;
    }
}

app.listen(8080);
