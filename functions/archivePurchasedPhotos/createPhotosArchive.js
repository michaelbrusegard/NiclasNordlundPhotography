const { Storage } = require("@google-cloud/storage");
const archiver = require("archiver");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const SOURCE_BUCKET_NAME = process.env.PHOTOS_BUCKET;
const DESTINATION_BUCKET_NAME = process.env.ARCHIVE_BUCKET;
const expirationDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const storage = new Storage();

exports.createPhotosArchive = async (req, res) => {
    const { photos } = req.body;
    if (!photos || !Array.isArray(photos)) {
        res.status(400).send("Invalid request");
        return;
    }

    try {
        const sourceBucket = storage.bucket(SOURCE_BUCKET_NAME);
        const destinationBucket = storage.bucket(DESTINATION_BUCKET_NAME);

        const zipFileName = `${Date.now()}-${uuidv4()}.zip`;
        const zipFile = destinationBucket.file(zipFileName);
        const zipStream = zipFile.createWriteStream();

        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(zipStream);

        for (const photo of photos) {
            const sourceFile = sourceBucket.file(photo);
            const sourceStream = sourceFile.createReadStream();
            archive.append(sourceStream, { name: photo });
        }

        archive.finalize();

        zipStream.on("finish", async () => {
            const [exists] = await zipFile.exists();
            if (!exists) {
                res.status(500).send("Failed to create zip file");
                return;
            }

            const options = {
                version: "v4",
                action: "read",
                expires: moment().add(1, "day").toDate(),
            };

            const [url] = await zipFile.getSignedUrl(options);

            res.send({ url });

            setTimeout(async () => {
                try {
                    await zipFile.delete();
                } catch (err) {
                    console.error(
                        `Failed to delete zip file: ${zipFileName}`,
                        err,
                    );
                }
            }, expirationDuration);
        });
    } catch (err) {
        console.error(`Failed to zip photos: ${err}`);
        res.status(500).send("Failed to zip photos");
    }
};
