const jwt = require("jsonwebtoken");
const readSecret = require("../utils/readSecrets")

module.exports = function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    const decoded = jwt.verify(token, readSecret("jwt_secret", process.env.JWT_DEV));
    
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token"});
  }
};