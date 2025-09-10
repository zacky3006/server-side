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

    // ดึงสินค้าสำหรับผู้หญิง (gender = 1)
    const sqlProducts = "SELECT * FROM Product WHERE gender = 1 LIMIT 4";

    // ดึงสินค้าสำหรับผู้ชาย (gender = 2) ที่เป็น Jeans
    const sqlStudioProducts = `
        SELECT * FROM Product 
        WHERE gender = 2 
        AND category_id = (SELECT category_id FROM Category WHERE name = 'Jeans') 
        LIMIT 4`;

    // ดึงสินค้าที่ผู้ใช้กด Favorite
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



// API สำหรับโหลดสินค้าเพิ่มเติม
app.get("/load-more-products", (req, res) => {
    db.all("SELECT * FROM Product", [], (err, products) => {
        if (err) {
            return res.send("Database error.");
        }
        res.json(products);
    });
});

// Route: Shopping Bag Page
app.get("/shopping-bag", (req, res) => {
    const customer_id = req.query.customer_id;

    if (!customer_id) {
        return res.status(401).send("Please sign in first.");
    }

    // ดึงสินค้าจากตะกร้า
    db.all("SELECT p.product_id, p.name, p.price, p.image_url, c.quantity FROM Cart c INNER JOIN Product p ON c.product_id = p.product_id WHERE c.customer_id = ?", [customer_id], (err, cartItems) => {
        if (err) {
            return res.status(500).send("Database error.");
        }
        res.render("shopping-bag", { customer_id, cartItems });
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

app.post("/add-to-cart", (req, res) => {
    const { customer_id, product_id, quantity } = req.body;

    if (!customer_id || !product_id || !quantity) {
        return res.status(400).send("Invalid request data.");
    }

    db.get("SELECT * FROM Cart WHERE customer_id = ? AND product_id = ?", 
        [customer_id, product_id], (err, row) => {
        if (err) {
            return res.status(500).send("Database error.");
        }

        if (row) {
            const newQuantity = row.quantity + quantity;
            db.run("UPDATE Cart SET quantity = ? WHERE customer_id = ? AND product_id = ?", 
                [newQuantity, customer_id, product_id], (err) => {
                if (err) {
                    return res.status(500).send("Database error.");
                }
                res.send("Product quantity updated in cart!");
            });
        } else {
            db.run("INSERT INTO Cart (customer_id, product_id, quantity) VALUES (?, ?, ?)", 
                [customer_id, product_id, quantity], (err) => {
                if (err) {
                    return res.status(500).send("Database error.");
                }
                res.send("Product added to cart!");
            });
        }
    });
});

app.get("/get-cart", (req, res) => {
    const { customer_id } = req.query;

    if (!customer_id) {
        return res.status(401).send("Please sign in first.");
    }

    db.all("SELECT * FROM Cart WHERE customer_id = ?", [customer_id], (err, rows) => {
        if (err) {
            return res.send("Database error.");
        }
        res.json(rows);
    });
});




app.post("/update-cart", (req, res) => {
    const { customer_id, product_id, quantity } = req.body;

    if (!customer_id) {
        return res.status(401).send("Please sign in first.");
    }

    db.run("UPDATE Cart SET quantity = ? WHERE customer_id = ? AND product_id = ?", 
        [quantity, customer_id, product_id], (err) => {
        
        if (err) {
            return res.send("Database error.");
        }
        res.send("Product quantity updated in cart!");
    });
});

app.delete("/remove-item", (req, res) => {
    const { customer_id, product_id } = req.query;

    if (!customer_id || !product_id) {
        return res.status(400).send("Missing parameters.");
    }

    // ลบสินค้าออกจากตะกร้าในฐานข้อมูล
    const query = "DELETE FROM Cart WHERE customer_id = ? AND product_id = ?";
    db.run(query, [customer_id, product_id], function(err) {
        if (err) {
            return res.status(500).send("Database error.");
        }
        res.json({ success: true });
    });
});

// Route: Clear Cart After Order
app.post("/clear-cart", (req, res) => {
    const { customer_id } = req.body;

    if (!customer_id) {
        return res.status(400).json({ error: "Missing customer_id." });
    }

    db.run("DELETE FROM Cart WHERE customer_id = ?", [customer_id], (err) => {
        if (err) {
            return res.status(500).json({ error: "Database error while clearing the cart." });
        }
        // ส่งข้อมูลตอบกลับในรูปแบบ JSON
        res.json({ success: true, message: "Cart cleared successfully." });
    });
});


app.get("/get-products", (req, res) => {
    const { gender } = req.query;
    let sql = "SELECT * FROM Product";

    if (gender) {
        sql += " WHERE gender = ?";
    }

    db.all(sql, gender ? [gender] : [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

app.get("/get-product", (req, res) => {
    const { product_id } = req.query;

    if (!product_id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    db.get("SELECT * FROM Product WHERE product_id = ?", [product_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.json(row);
    });
});

app.post("/update-product", (req, res) => {
    const { product_id, name, price, description, image_url } = req.body;

    if (!product_id || !name || !price) {
        return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    db.run(
        `UPDATE Product SET name = ?, price = ?, description = ?, image_url = ? WHERE product_id = ?`,
        [name, price, description, image_url, product_id],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database update error" });
            }

            if (this.changes > 0) {
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Product not found or not updated!" });
            }
        }
    );
});


app.post("/delete-product", (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    db.run("DELETE FROM Product WHERE product_id = ?", [product_id], function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (this.changes > 0) {
            res.json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Product not found" });
        }
    });
});




// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

