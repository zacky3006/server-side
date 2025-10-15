const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detailController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/products/:id',authMiddleware, detailController.getDetail);

module.exports = router;