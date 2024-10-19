const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");
const { zodsignup, zodlogin } = require("../middlewars/zod");
const Refresh = require("../controllers/Refresh")
const Access = require("../controllers/Access")
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser")
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors({ origin: 'https://advanceauthentication.pages.dev', credentials: true }));


app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: 'Too many login attempts, please try again later.',
});

router.post('/signup', zodsignup, SingUp);
router.post('/login', loginLimiter, zodlogin, Login);
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', { httpOnly: true, secure: true,path: '/'});
  res.clearCookie('refreshToken', { httpOnly: true, secure: true,path: '/' });
  res.status(200).send('Logged out successfully');
});

router.post('/refresh', Refresh);
router.post('/access', Access);

app.use(router);

module.exports = app;