const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const cartController = require("../controllers/cartController"); // เพิ่ม
const { authenticate } = require("../middleware/authMiddleware");

// หน้า Home / Filter
router.get("/home", authenticate, homeController.showHome);
router.get("/filter-woman", authenticate, homeController.filterWoman);
router.get("/filter-man", authenticate, homeController.filterMan);

// หน้า Shopping Bag
router.get('/shopping-bag', authenticate, cartController.showCartPage); // เปลี่ยนจาก showCart เป็น showCartPage


module.exports = router;
