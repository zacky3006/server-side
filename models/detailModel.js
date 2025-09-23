// models/Product.js
const db = require("../config/db");

// ดึงรายละเอียดสินค้าตาม product_id
exports.getProductById = async (product_id) => {
    const [rows] = await db.query("SELECT * FROM products WHERE product_id = ?", [product_id]);
    return rows[0];
};

// ดึงสินค้าที่แนะนำ
exports.getRecommendedProducts = async () => {
    const [rows] = await db.query("SELECT * FROM products ORDER BY RAND() LIMIT 4");
    return rows;
};
