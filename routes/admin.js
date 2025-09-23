const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, requireAdmin } = require("../middleware/authMiddleware");

// ทุก route ของ admin ต้อง authenticate ก่อน แล้วตรวจ role admin
router.get("/admin", authenticate, requireAdmin, adminController.showAdminPage);
router.get("/get-products", authenticate, requireAdmin, adminController.getProducts);
router.post("/delete-product", authenticate, requireAdmin, adminController.deleteProduct);

module.exports = router;
