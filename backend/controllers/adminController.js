const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  await Answer.deleteMany({ questionId: req.params.id });
  res.send("Question deleted");
};

exports.deleteAnswer = async (req, res) => {
  await Answer.findByIdAndDelete(req.params.id);
  res.send("Answer deleted");
};
