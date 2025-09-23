const Cart = require("../models/cartModel");

// แสดงหน้าตะกร้า
exports.showCartPage = (req, res) => {
    const customer_id = req.user?.customer_id || req.query.customer_id;
    if (!customer_id) return res.status(401).send("Please sign in first.");

    Cart.getByCustomer(customer_id, (err, cartItems) => {
        if (err) return res.status(500).send("Database error.");
        res.render("shopping-bag", { customer_id, cartItems });
    });
};


// เพิ่มสินค้าในตะกร้า
exports.addToCart = (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.user?.customer_id || req.body.customer_id;
    if (!customer_id || !product_id || !quantity) return res.status(400).send("Invalid request data.");

    Cart.addOrUpdate(customer_id, product_id, quantity, (err) => {
        if (err) return res.status(500).send("Database error");
        res.send("Added to cart");
    });
};

// ดึงข้อมูลตะกร้า (JSON)
exports.getCartItems = (req, res) => {
    const customer_id = req.user?.customer_id || req.query.customer_id;
    if (!customer_id) return res.status(401).send("Please sign in first.");

    Cart.getByCustomer(customer_id, (err, rows) => {
        if (err) return res.status(500).send("Database error");
        res.json(rows);
    });
};

// อัพเดตจำนวนสินค้า
exports.updateCart = (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.user?.customer_id || req.body.customer_id;
    if (!customer_id || !product_id || !quantity) return res.status(400).send("Invalid request data.");

    Cart.updateQuantity(customer_id, product_id, quantity, (err) => {
        if (err) return res.status(500).send("Database error");
        res.send("Cart updated");
    });
};

// ลบสินค้าออกจากตะกร้า
exports.removeCartItem = (req, res) => {
    const { product_id } = req.body;
    const customer_id = req.user?.customer_id || req.body.customer_id;
    if (!customer_id || !product_id) return res.status(400).send("Missing parameters.");

    Cart.remove(customer_id, product_id, (err) => {
        if (err) return res.status(500).send("Database error");
        res.json({ success: true });
    });
};

// ล้างตะกร้าทั้งหมด
exports.clearCart = (req, res) => {
    const customer_id = req.user?.customer_id || req.body.customer_id;
    if (!customer_id) return res.status(400).json({ success: false, message: "Missing customer_id" });

    Cart.clear(customer_id, (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
};
