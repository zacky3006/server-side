const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// Detail Page
exports.detailPage = (req, res) => {
    const { product_id } = req.query;
    const customer_id = req.user.customer_id;

    Product.getById(product_id, (err, product) => {
        if (err || !product) return res.send("Product not found");

        Product.getAll((err, recommended) => {
            if (err) return res.send("Error fetching recommended");
            res.render("detail", { product, recommendedProducts: recommended.slice(0,4), customer_id });
        });
    });
};

// Cart
exports.addToCart = (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.user.customer_id;

    Cart.addOrUpdate(customer_id, product_id, quantity, (err) => {
        if (err) return res.status(500).send("Database error");
        res.send("Added to cart");
    });
};

exports.getCart = (req, res) => {
    const customer_id = req.user.customer_id;
    Cart.getByCustomer(customer_id, (err, rows) => {
        if (err) return res.status(500).send("Database error");
        res.json(rows);
    });
};

exports.updateCart = (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.user.customer_id;

    Cart.updateQuantity(customer_id, product_id, quantity, (err) => {
        if (err) return res.status(500).send("Database error");
        res.send("Cart updated");
    });
};

exports.removeCartItem = (req, res) => {
    const { product_id } = req.body;
    const customer_id = req.user.customer_id;

    Cart.remove(customer_id, product_id, (err) => {
        if (err) return res.status(500).send("Database error");
        res.json({ success: true });
    });
};

exports.clearCart = (req, res) => {
    const customer_id = req.user.customer_id;
    Cart.clear(customer_id, (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
};

exports.getDetail = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product-detail', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
