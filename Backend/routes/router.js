const express = require("express");
const SingUp = require("../controllers/Signup");
const Login = require("../controllers/Login");
const { zodsignup, zodlogin } = require("../middlewars/zod");
const Refresh = require("../controllers/Refresh");
const Access = require("../controllers/Access");

const router = express.Router()

router.post("/signup" , zodsignup , SingUp)
router.post("/login" , zodlogin ,Login)
router.post("/refresh", Refresh);
router.post("/access", Access);


module.exports = router;
