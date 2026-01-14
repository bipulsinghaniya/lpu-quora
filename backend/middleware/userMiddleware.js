// const jwt = require("jsonwebtoken");
// const redisClient = require("../config/redis");
// const User = require("../models/User");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) throw new Error("No token");

//     const blocked = await redisClient.exists(`token:${token}`);
//     if (blocked) throw new Error("Token blocked");

//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(payload._id);

//     next();
//   } catch {
//     res.status(401).send("Unauthorized");
//   }
// };




const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔒 Check Redis blacklist
    const blocked = await redisClient.exists(`token:${token}`);
    if (blocked) {
      return res.status(401).json({ message: "Token expired" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ GUARANTEED NOT NULL
    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};




