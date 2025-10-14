const paymentModel = require("../models/paymentModel");

exports.showPaymentPage = (req, res) => {
    // Try to get customer_id from req.user, fallback to req.query
    const customer_id = req.user?.customer_id || req.query.customer_id;
    if (!customer_id) return res.status(400).send("Missing customer_id");

    // ...your logic to get cart/payment info...
    res.render("payment", { customer_id });
};

exports.clearCart = (req, res) => {
    const { customer_id } = req.body;

    paymentModel.clearCart(customer_id, (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: "Database error" });
        }

        res.json({ success: true });
    });
};