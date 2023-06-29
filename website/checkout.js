require("dotenv").config();

const stripe = require("stripe")(process.env.SECRET_KEY);
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

async function getStoreItems() {
    const photosBucket = process.env.PHOTOS_BUCKET;
    const storeItems = [];

    const [files] = await storage.bucket(photosBucket).getFiles();
    for (const file of files) {
        const name = file.name;
        const price = Number(name.match(/\d+(?=e\.jpg$)/i)[0]);
        storeItems.push([name, price]);
    }

    return storeItems;
}

module.exports = async (request, response) => {
    const storeItems = await getStoreItems();
    const itemsToPurchase = request.body.map((item) => [
        item[0],
        parseInt(item[1]),
    ]);
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
                        currency: "eur",
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
    if (lineItems.length > 0) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
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
};
