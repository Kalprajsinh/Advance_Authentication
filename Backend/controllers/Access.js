const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../database/data");
const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'https://advanceauthentication.pages.dev', 
    credentials: true
}));

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function Access(req, res) {
    const token = req.cookies.accessToken;
    const rtoken = req.cookies.refreshToken;

    const userInfo = await User.findOne({ refreshToken:rtoken });
    
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        res.status(200).json({
            name: userInfo.name,
            email: userInfo.email
        });
    });
}


module.exports = Access
