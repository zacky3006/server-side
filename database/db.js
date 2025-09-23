const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "..", "Data.db");

// connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error opening database:", err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
    }
});

module.exports = db;
