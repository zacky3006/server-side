const db = require("../database/db");

exports.showHome = (req, res) => {
    const customer_id = req.user.customer_id;

    const sqlWomen = "SELECT * FROM Product WHERE gender = 1 LIMIT 4";
    const sqlMen = `
        SELECT * FROM Product 
        WHERE gender = 2 AND category_id = (SELECT category_id FROM Category WHERE name = 'Jeans')
        LIMIT 4`;

    db.all(sqlWomen, [], (err, products) => {
        if (err) return res.send("Database error.");
        db.all(sqlMen, [], (err, studioProducts) => {
            if (err) return res.send("Database error.");
            res.render("home", { products, studioProducts, customer_id }); // ✅ customer_id จาก JWT
        });
    });
};


exports.filterProducts = (gender, req, res, view) => {
    const customer_id = req.user.customer_id;
    let { category, color, price } = req.query;

    let sql = "SELECT * FROM Product WHERE 1=1";
    let params = [];

    if (gender !== null) {
        sql += " AND gender = ?";
        params.push(gender);
    }
    if (category) {
        sql += " AND category_id = ?";
        params.push(category);
    }
    if (color) {
        sql += " AND color = ?";
        params.push(color);
    }
    if (price === "1") {
        sql += " AND price BETWEEN ? AND ?";
        params.push(0, 1000);
    }
    if (price === "2") {
        sql += " AND price BETWEEN ? AND ?";
        params.push(1000, 5000);
    }
    if (price === "3") {
        sql += " AND price BETWEEN ? AND ?";
        params.push(5000, 10000);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.send("Database error.");
        }
        res.render(view, { products: rows, customer_id });
    });
};

// ผู้หญิง
exports.filterWoman = (req, res) => {
    exports.filterProducts(1, req, res, "filter-woman");
};

// ผู้ชาย
exports.filterMan = (req, res) => {
    exports.filterProducts(2, req, res, "filter-man");
};