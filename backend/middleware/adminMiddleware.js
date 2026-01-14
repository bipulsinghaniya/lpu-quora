// const userMiddleware = require("./userMiddleware");

// module.exports = (req, res, next) => {
//   userMiddleware(req, res, () => {
//     if (req.user.role !== "admin") {
//       return res.status(403).send("Admin only");
//     }
//     next();
//   });
// };





const userMiddleware = require("./userMiddleware");

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
