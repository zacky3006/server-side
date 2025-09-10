const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// เชื่อมต่อ SQLite Database
let db = new sqlite3.Database('Data.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('✅ Connected to the SQLite database.');

    // สร้างตาราง Customer ถ้ายังไม่มี
    db.run(
        `CREATE TABLE IF NOT EXISTS Customer (
            customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`
    );
});

// ตั้งค่า static folder และ EJS template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // สำหรับอ่านค่าฟอร์ม
app.use(express.json()); // Parse JSON body ตัวการ

// หน้าแรก เปลี่ยนเป็น Sign In
app.get('/', (req, res) => {
    res.render('signin', { error: null });
});


// Route: Home Page
app.get("/home", (req, res) => {
    const customer_id = req.query.customer_id;
    
    if (!customer_id) {
        return res.send("Customer ID is required.");
    }

    const sqlProducts = "SELECT * FROM Product WHERE gender = 1 LIMIT 4";

    const sqlStudioProducts = `
        SELECT * FROM Product 
        WHERE gender = 2 
        AND category_id = (SELECT category_id FROM Category WHERE name = 'Jeans') 
        LIMIT 4`;

    const sqlFavorites = "SELECT product_id FROM Favorite WHERE customer_id = ?";

    db.all(sqlProducts, [], (err, products) => {
        if (err) {
            return res.send("Database error.");
        }

        db.all(sqlStudioProducts, [], (err, studioProducts) => {
            if (err) {
                return res.send("Database error.");
            }

            db.all(sqlFavorites, [customer_id], (err, favoriteRows) => {
                if (err) {
                    return res.send("Database error.");
                }

                const favoriteSet = new Set(favoriteRows.map(row => row.product_id));

                // ใส่ค่า is_favorite ในแต่ละสินค้า
                products.forEach(product => {
                    product.is_favorite = favoriteSet.has(product.product_id);
                });

                studioProducts.forEach(product => {
                    product.is_favorite = favoriteSet.has(product.product_id);
                });

                // ส่งข้อมูลไปที่ home.ejs
                res.render("home", { products, studioProducts, customer_id });
            });
        });
    });
});



// Route: Sign In Page
app.get("/signin", (req, res) => {
    res.render("signin", { error: null });
});

// Route: Sign In Logic
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบผู้ใช้ปกติ
    db.get("SELECT * FROM Customer WHERE email = ? AND password = ?", [email, password], (err, user) => {
        if (err) {
            return res.send("Database error.");
        }
        if (!user) {
            return res.render("signin", { error: "Invalid email or password." });
        }

        // ถ้า Sign In สำเร็จ ให้นำไปที่หน้า home
        res.redirect(`/home?customer_id=${user.customer_id}`);
    });
});



// Route: Sign Up Page
app.get("/signup", (req, res) => {
    res.render("signup", { error: null });
});

// Route: Sign Up Logic
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM Customer WHERE email = ?", [email], (err, user) => {
        if (err) {
            console.error(err);
        }

        if (user) {
            return res.render("signup", { error: "Email already exists." });
        }

        db.run("INSERT INTO Customer (email, password) VALUES (?, ?)", [email, password], function (err) {
            if (err) {
                console.error(err);
                return res.send("Error creating account.");
            }
            res.redirect("/signin");
        });
    });
});


app.use(express.json());




// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

