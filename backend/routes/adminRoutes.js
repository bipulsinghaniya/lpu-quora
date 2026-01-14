// const router = require("express").Router();
// const admin = require("../middleware/adminMiddleware");
// const { deleteQuestion, deleteAnswer } = require("../controllers/adminController");

// router.delete("/question/:id", admin, deleteQuestion);
// router.delete("/answer/:id", admin, deleteAnswer);

// module.exports = router;


const router = require("express").Router();
const user = require("../middleware/userMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  deleteQuestion,
  deleteAnswer
} = require("../controllers/adminController");

// 🔥 user MUST come before admin
router.delete("/question/:id", user, admin, deleteQuestion);
router.delete("/answer/:id", user, admin, deleteAnswer);

module.exports = router;
