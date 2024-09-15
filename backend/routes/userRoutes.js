const express = require("express");
const router = express.Router();
const {userSignup, userLogin, googleAuth} = require("../controllers/userController");
const passport = require("passport");
const { validateSignup, validateLogin } = require("../utils/validator");

router.route("/signup").post(validateSignup,userSignup);
router.route("/login").post(validateLogin,userLogin);
router.route("/auth/google").get(googleAuth);

module.exports = router