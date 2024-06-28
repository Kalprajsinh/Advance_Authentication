const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");

const router = express.Router()

router.post("/signup" , SingUp)
router.post("/login" , Login)

module.exports = router;
