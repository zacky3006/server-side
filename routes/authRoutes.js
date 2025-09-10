const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signin", authController.showSignIn);
router.post("/signin", authController.signIn);
router.get("/signup", authController.showSignUp);
router.post("/signup", authController.signUp);

module.exports = router;
