const jwt = require("jsonwebtoken");
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function Access (req, res) {
    const token = req.cookie.accessToken;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        return res.sendStatus(200);
    });
}


module.exports = Access