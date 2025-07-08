const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    quizzes: [{ quizCode: String, score: Number }] // Track quizzes and scores
});

module.exports= mongoose.model('User', userSchema);

 
