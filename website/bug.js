require("dotenv").config();
const axios = require("axios");

async function createGithubIssue(req, res) {
    try {
        let { title, body } = req.body;

        // Create a new GitHub issue using the provided data
        const response = await axios.post(
            `https://api.github.com/repos/${process.env.OWNER}/${process.env.REPOSITORY}/issues`,
            {
                title,
                body,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`,
                    "User-Agent": `${process.env.USER_AGENT}`,
                },
            },
        );

        const newIssueUrl = response.data.html_url;

        // Redirect the browser to the newly created GitHub issue
        res.redirect(newIssueUrl);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create GitHub issue. Please try again later.",
        });
        console.error(error);
    }
}

module.exports = createGithubIssue;
