const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/data");
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateAccessToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

function generateRefreshToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: '10d' });
}

app.use(cookieParser());
app.use(express.json());

async function Login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store the refresh token (e.g., in the database)
        if (user) {
            user.refreshToken = refreshToken;
        } else {
            user = new User({ email, refreshToken });
        }
        await user.save();

        // Set cookies
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.status(200).send("Login successful");
    } catch (err) {
        console.error("Error signing in:", err);
        res.status(500).send("Error signing in");
    }
}

module.exports = Login;
