const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  await Answer.deleteMany({ questionId: req.params.id });
  res.send("Question deleted");
};



exports.deleteAnswer = async (req, res) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete answer" });
  }
};



/// mai 


// const Question = require("../models/Question");
// const Answer = require("../models/Answer");

// exports.deleteQuestion = async (req, res) => {
//   await Question.findByIdAndDelete(req.params.id);
//   await Answer.deleteMany({ questionId: req.params.id });
//   res.send("Question deleted");
// };



// exports.deleteAnswer = async (req, res) => {
//   try {
//     await Answer.findByIdAndDelete(req.params.id);
//     res.json({ message: "Answer deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete answer" });
//   }
// };



// exports.verifyEmail = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       emailToken: req.params.token,
//       emailTokenExpiry: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired link" });
//     }

//     user.isVerified = true;
//     user.emailToken = undefined;
//     user.emailTokenExpiry = undefined;
//     await user.save();

//     res.json({ message: "Email verified successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Verification failed" });
//   }
// };

