const fs = require('node:fs');
const config = require('./config.json');

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static("frontend", {index: 'home.html'}))

const stripe = require('stripe')(config.stripeSecretKey)

const storeItems = require('./nodeScripts/prices.json')

app.post('/checkout-session', async (request, response) => {
    const itemsToPurchase = request.body
    let items = []
    for (i in itemsToPurchase) {
        const item = itemsToPurchase[i]
        for (j in storeItems) {
            if (JSON.stringify(item) === JSON.stringify(storeItems[j])) {
                items.push({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItems[j][0]
                        },
                        unit_amount: storeItems[j][1] * 100
                    },
                    quantity: 1
                })
            }
        }
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items,
            success_url: `${config.serverUrl}/sucess.html`,
            cancel_url: `${config.serverUrl}/shop.html`
        })
        response.json({ url: session.url })
    } catch (e) {
        response.status(500).json( { error: e.message } )
    }
})

app.listen(3000)