const db = require("../database/db");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN
});

// Helper function to get S3 Key from URL
const getKeyFromUrl = (url) => {
    try {
        const urlObject = new URL(url);
        return urlObject.pathname.substring(1);
    } catch (e) {
        console.error("Invalid URL:", url);
        return null;
    }
}

exports.showAdminPage = (req, res) => {
    res.render("admin", { user: req.user });
};

exports.getProducts = (req, res) => {
    const genderFilter = req.query.gender;
    let sql = "SELECT * FROM Product";
    const params = [];
    if (genderFilter) {
        sql += " WHERE gender = ?";
        params.push(genderFilter);
    }
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json(rows);
    });
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category_id, color, gender } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // 1. Upload new image to S3
        const fileKey = `Picture/${uuidv4()}_${req.file.originalname}`;
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: req.file.buffer,
            ACL: "public-read",
            ContentType: req.file.mimetype
        };

        const uploadResult = await s3.upload(uploadParams).promise();
        const imageUrl = uploadResult.Location;

        // 2. Insert product data into database
        const sql = `INSERT INTO Product 
            (name, price, description, category_id, color, gender, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [name, price, description, category_id, color, gender, imageUrl], function(err) {
            if (err) {
                // If DB insert fails, we should ideally delete the uploaded image from S3 to prevent orphans.
                s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileKey }).promise();
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ success: true, message: "Product created successfully" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error during product creation" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id; // <-- รับ ID จาก URL
        const { name, price, description, category_id, color, gender } = req.body;
        let imageUrl;

        // Step 1: ค้นหาข้อมูลสินค้าเดิม (โดยเฉพาะ URL รูปเก่า)
        const product = await new Promise((resolve, reject) => {
            db.get("SELECT image_url FROM Product WHERE product_id = ?", [productId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        // Step 2: ตรวจสอบว่ามีการอัปโหลดไฟล์รูปใหม่หรือไม่
        if (req.file) {
            // 2a. อัปโหลดรูปใหม่ขึ้น S3
            const newFileKey = `Picture/${uuidv4()}_${req.file.originalname}`;
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: newFileKey,
                Body: req.file.buffer,
                ACL: "public-read",
                ContentType: req.file.mimetype
            };
            const uploadResult = await s3.upload(uploadParams).promise();
            imageUrl = uploadResult.Location;

            // 2b. [สำคัญ] ลบรูปเก่าออกจาก S3
            const oldFileKey = getKeyFromUrl(product.image_url);
            if (oldFileKey) {
                await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: oldFileKey }).promise();
            }
        } else {
            // ถ้าไม่มีการอัปโหลดไฟล์ใหม่ ให้ใช้ URL รูปเดิม
            imageUrl = product.image_url;
        }

        // Step 3: อัปเดตข้อมูลใน Database
        const sql = `UPDATE Product SET
            name = ?, price = ?, description = ?, category_id = ?, color = ?, gender = ?, image_url = ?
            WHERE product_id = ?`;

        db.run(sql, [name, price, description, category_id, color, gender, imageUrl, productId], function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: "Product updated successfully" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error during product update" });
    }
};

// --- [IMPROVED] --- Function to delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; // <-- รับ ID จาก URL

        // Step 1: ดึง URL รูปภาพจาก DB ก่อนที่จะลบข้อมูล
        db.get("SELECT image_url FROM Product WHERE product_id = ?", [productId], async (err, row) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            if (!row) return res.status(404).json({ success: false, message: "Product not found" });

            // Step 2: [สำคัญ] ลบรูปภาพออกจาก S3
            const fileKey = getKeyFromUrl(row.image_url);
            if (fileKey) {
                await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileKey }).promise();
            }

            // Step 3: ลบข้อมูลสินค้าออกจาก Database
            db.run("DELETE FROM Product WHERE product_id = ?", [productId], function (err) {
                if (err) return res.status(500).json({ success: false, message: err.message });
                res.json({ success: true, message: "Product deleted successfully" });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error during product deletion" });
    }
};
exports.showCreateProductPage = (req, res) => {
    // ทำหน้าที่ render ไฟล์ create-products.ejs ส่งกลับไปให้ผู้ใช้
    res.render("create-product"); 
};
exports.showEditProductPage = (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM Product WHERE product_id = ?";
    db.get(sql, [productId], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }
        if (!row) {
            return res.status(404).send("Product not found");
        }
        // Render หน้า edit-product และส่งข้อมูลสินค้า (row) ไปด้วย
        res.render("edit-product", { product: row });
    });
};