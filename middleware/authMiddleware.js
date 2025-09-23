require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

exports.authenticate = (req, res, next) => {
    // อ่าน token จาก cookie หรือ Authorization header
    const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null);

    if (!token) {
        // ไม่มี token → redirect ไป signin
        return res.redirect("/signin");
    }

    try {
        // verify token และแนบ payload เข้า req.user
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        console.error("JWT verify error:", err.message);
        return res.redirect("/signin");
    }
};
