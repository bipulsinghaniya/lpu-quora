

const router = require("express").Router();
const { register, login,  verifyOtp, googleAuth } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp); 
router.post("/google", googleAuth);


module.exports = router;
