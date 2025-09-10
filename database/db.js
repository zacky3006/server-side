const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("Data.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
    }
});

// สร้างตาราง Customer ถ้ายังไม่มี
db.run(
    `CREATE TABLE IF NOT EXISTS Customer (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`
);

module.exports = db;
