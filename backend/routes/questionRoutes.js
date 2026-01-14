// const router = require("express").Router();
// const user = require("../middleware/userMiddleware");
// const {
//   questionValidator,
//   answerValidator
// } = require("../utils/validator");
// const {
//   getQuestions,
//   askQuestion,
//   addAnswer
// } = require("../controllers/questionController");

// router.get("/", getQuestions);
// router.post("/", user, questionValidator, askQuestion);
// router.post("/:id/answer", user, answerValidator, addAnswer);

// module.exports = router;




const router = require("express").Router();
const user = require("../middleware/userMiddleware");
const {
  getQuestions,
  askQuestion,
  addAnswer,
} = require("../controllers/questionController");

router.get("/", getQuestions);
router.post("/", user, askQuestion);        // 🔒 protected
router.post("/:id/answer", user, addAnswer); // 🔒 protected

module.exports = router;
