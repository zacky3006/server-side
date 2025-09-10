const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/home", authenticate, homeController.showHome);

module.exports = router;
