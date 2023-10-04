const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { Storage } = require("@google-cloud/storage");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 60 * 1000 * 15, // 15 minutes
    max: 5, // 5 failed attempts allowed in that window
    message: `
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
                  </style>
              </head>
              <body>
                <form method="POST">
                  <label for="password">Password:</label>
                  <input type="password" id="password" name="password">
                  <button type="submit">Submit</button>
                  <p>Too many login attempts, try again in 15 minutes.</p>
                </form>
              </body>
            </html>
        `,
});

function checkPassword(req, res, next) {
    const enteredPassword = req.body.password;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (enteredPassword === adminPassword) {
        app.use(express.static("public"));
        next();
    } else {
        const errorMessage = req.rateLimit
            ? req.rateLimit.message
            : "Incorrect password. Please try again.";
        res.send(`
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
                  </style>
              </head>
              <body>
                <form method="POST">
                  <label for="password">Password:</label>
                  <input type="password" id="password" name="password">
                  <button type="submit">Submit</button>
                  <p>Incorrect password. Please try again.</p>
                </form>
              </body>
            </html>
        `);
    }
}

app.get("/", (req, res) => {
    res.send(`
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
              </style>
          </head>
          <body>
            <form method="POST">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password">
              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
    `);
});

app.post("/", limiter, checkPassword, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
        res.status(500).json({ error: "Error loading items" });
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
        res.status(500).json({ error: "Error generating signed URL" });
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
        res.status(500).json({ error: "Error deleting item" });
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
        res.status(500).json({ error: "Error uploading photos" });
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
