const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/remove/:id', cartController.removeFromCart);
router.post('/add-to-cart', cartController.addToCart);

module.exports = router;
