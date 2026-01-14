const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: String,
  questionId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
