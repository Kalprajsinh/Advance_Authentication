require('dotenv').config();
const jwt  = require("jsonwebtoken")
const User = require("../database/data");

// Secret keys for JWT (store these securely, e.g., in environment variables)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function Refresh (req, res) {
    const rtoken = req.cookies.refreshToken;

    if (!rtoken) {
        return res.status(401).send("Refresh token required");
    }

    try {
        const user = await User.findOne({ refreshToken:rtoken });

        if (!user) {
            return res.status(403).send("Invalid refresh token");
        }

        jwt.verify(rtoken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).send("Invalid refresh token");

            const accessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: 'production', sameSite: 'None' });
            res.status(200).send({
                accessToken,
                user
            })
        });
    } catch (err) {
        console.error("Error processing token:", err);
        res.status(500).send("Error processing token");
    }
}


module.exports = Refresh