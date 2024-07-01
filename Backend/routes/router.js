const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");
const { zodsignup, zodlogin } = require("../middlewars/zod");
const Refresh = require("../controllers/Refresh");
const Access = require("../controllers/Access");
const axios = require('axios');

const router = express.Router()

router.post("/signup" , zodsignup , SingUp)
router.post("/login" , zodlogin ,Login)
router.post("/refresh", Refresh);
router.post("/access", Access);
router.get("/ip" , async function(req,res){
    await axios.get('https://api.ipify.org/?format=json')
    .then(function (response) {
        res.json(response.data);
        })
})


module.exports = router;
