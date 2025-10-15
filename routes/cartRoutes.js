const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require("../middleware/authMiddleware");

// Shopping Bag Routes
router.get('/shopping-bag',authenticate, cartController.showCartPage);
router.post('/add-to-cart',authenticate, cartController.addToCart);
router.get('/get-cart',authenticate, cartController.getCartItems);
router.post('/update-cart',authenticate, cartController.updateCart);
router.post('/remove-item',authenticate, cartController.removeCartItem);
router.post('/clear-cart',authenticate, cartController.clearCart);

module.exports = router;
