const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: Number,
});

const QuizSchema = new mongoose.Schema({
    quizCode: { type: String, unique: true, required: true },
    creatorName: String,
    creatorPassword: String,
    questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
