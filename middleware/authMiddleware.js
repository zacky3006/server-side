require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

exports.authenticate = (req, res, next) => {
    // พยายามอ่านจาก cookie ก่อน
    const token = req.cookies && req.cookies.token
        ? req.cookies.token
        : (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"
            ? req.headers.authorization.split(" ")[1]
            : null);

    if (!token) {
        // สำหรับหน้า SSR เราอาจ redirect ไป signin
        return res.redirect("/signin");
        // หรือถ้าเป็น API: return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // { customer_id, email }
        next();
    } catch (e) {
        console.error("JWT verify error:", e);
        return res.redirect("/signin");
    }
};
