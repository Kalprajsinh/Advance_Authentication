const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");
const { zodsignup, zodlogin } = require("../middlewars/zod");
const axios = require('axios');
const cookieParser = require("cookie-parser")

const router = express.Router()
router.use(cookieParser())

router.post("/signup" , zodsignup , SingUp)
router.post("/login" , zodlogin ,Login)
router.post('/logout', (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).send("Logged out successfully");
});

router.post("/refresh", Refresh);
router.post("/access", Access);
router.get("/ip" , async function(req,res){
    await axios.get('https://api.ipify.org/?format=json')
    .then(function (response) {
        res.json(response.data);
        })
})


module.exports = router;
