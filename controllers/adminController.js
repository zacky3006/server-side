const db = require("../database/db");

exports.showAdminPage = (req, res) => {
    res.render("admin", { user: req.user });
};

exports.getProducts = (req, res) => {
    const genderFilter = req.query.gender;
    let sql = "SELECT * FROM Product";
    const params = [];
    if (genderFilter) {
        sql += " WHERE gender = ?";
        params.push(genderFilter);
    }
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json(rows);
    });
};

exports.deleteProduct = (req, res) => {
    const { product_id } = req.body;
    db.run("DELETE FROM Product WHERE product_id = ?", [product_id], function (err) {
        if (err) return res.json({ success: false, message: err.message });
        res.json({ success: true });
    });
};
