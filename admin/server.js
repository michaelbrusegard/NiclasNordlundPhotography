const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 60 * 1000 * 15, // 15 minutes
    max: 5, // 5 failed attempts allowed in that window
    message: `
            <html>
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
        next();
    } else {
        const errorMessage = req.rateLimit
            ? req.rateLimit.message
            : "Incorrect password. Please try again.";
        res.send(`
            <html>
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
    fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading HTML file:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(data);
        }
    });
});

app.listen(8080);
