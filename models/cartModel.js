const db = require('../database/db');

// ดึงสินค้าทั้งหมด
exports.getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products ORDER BY product_id');
    return result.rows;
};

// ดึงสินค้าตามหมวดหมู่
exports.getProductsByCategory = async (category) => {
    const result = await db.query('SELECT * FROM products WHERE category = $1', [category]);
    return result.rows;
};

// ดึงสินค้าโดย ID
exports.getProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
};
