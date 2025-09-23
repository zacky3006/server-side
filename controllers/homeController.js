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

// สำหรับผู้หญิง
exports.filterWoman = (req, res) => {
    const customer_id = req.user.customer_id;
    const sql = "SELECT * FROM Product WHERE gender = 1";

    db.all(sql, [], (err, products) => {
        if (err) return res.send("Database error.");
        res.render("filter-woman", { products, customer_id });
    });
};

// สำหรับผู้ชาย
exports.filterMan = (req, res) => {
    const customer_id = req.user.customer_id;
    const sql = "SELECT * FROM Product WHERE gender = 2";

    db.all(sql, [], (err, products) => {
        if (err) return res.send("Database error.");
        res.render("filter-man", { products, customer_id });
    });
};

