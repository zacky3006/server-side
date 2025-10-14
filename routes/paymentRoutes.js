const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// แสดงหน้า payment
router.get("/", paymentController.showPaymentPage);

// ลบตะกร้าเมื่อกด ORDER
router.post("/clear-cart", paymentController.clearCart);

module.exports = router;