

const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;



/// mai 

// const router = require("express").Router();
// const { register, login, verifyEmail } = require("../controllers/authController");
// router.get("/verify/:token", verifyEmail);
// router.post("/register", register);
// router.post("/login", login);
// module.exports = router;