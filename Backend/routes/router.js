const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");
const { zodsignup, zodlogin } = require("../middlewars/zod");

const router = express.Router()

router.post("/signup" , zodsignup , SingUp)
router.post("/login" , zodlogin ,Login)

module.exports = router;
