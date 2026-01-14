// const router = require("express").Router();
// const { register, login } = require("../controllers/authController");
// const {
//   registerValidator,
//   loginValidator
// } = require("../utils/validator");

// router.post("/register", registerValidator, register);
// router.post("/login", loginValidator, login);

// module.exports = router;


const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

