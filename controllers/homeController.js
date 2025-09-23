const db = require("../database/db");

// หน้า Home (default)
exports.showHome = (req, res) => {
    const customer_id = req.user.customer_id;

    // ดึงสินค้าผู้หญิง (4 ชิ้นแรก)
    const sqlWomen = "SELECT * FROM Product WHERE gender = 1 LIMIT 4";

    // ดึงสินค้าผู้ชาย (Jeans 4 ชิ้นแรก)
    const sqlMen = `
        SELECT * FROM Product 
        WHERE gender = 2 AND category_id = (SELECT category_id FROM Category WHERE name = 'Jeans')
        LIMIT 4`;

    db.all(sqlWomen, [], (err, products) => {
        if (err) return res.send("Database error.");
        db.all(sqlMen, [], (err, menProducts) => {
            if (err) return res.send("Database error.");
            
            res.render("home", { products, studioProducts: menProducts, customer_id });
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

