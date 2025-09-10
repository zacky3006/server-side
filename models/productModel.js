const db = require("../database/db");

exports.getMaleProducts = (callback) => {
    db.all("SELECT * FROM Product WHERE gender = 1 LIMIT 4", [], callback);
};

exports.getStudioProducts = (callback) => {
    const sql = `
        SELECT * FROM Product 
        WHERE gender = 2 
        AND category_id = (SELECT category_id FROM Category WHERE name = 'Jeans') 
        LIMIT 4`;
    db.all(sql, [], callback);
};
