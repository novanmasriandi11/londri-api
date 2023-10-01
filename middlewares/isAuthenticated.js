const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({detail: "Token dibutuhkan untuk autentikasi"})
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({detail:"Token tidak valid"})
    }
    return next();
}