const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController");

// แสดงหน้า payment
router.get("/", authenticate, paymentController.showPaymentPage);

// ลบตะกร้าเมื่อกด ORDER
router.post("/clear-cart",authenticate,  paymentController.clearCart);

module.exports = router;