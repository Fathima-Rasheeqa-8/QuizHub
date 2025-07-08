const express = require('express');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const router = express.Router();





// Generate a random quiz code
const generateQuizCode = async () => {
    let code;
    let isUnique = false;
    while (!isUnique) {
        code = 'quiz' + Math.random().toString(36).substr(2, 5);
        const existingQuiz = await Quiz.findOne({ quizCode: code });
        isUnique = !existingQuiz;
    }
    return code;
};

// Create a new quiz
router.post('/create', async (req, res) => {
    const { creatorName, creatorPassword, questions } = req.body;

    const quizCode = await generateQuizCode();

    const newQuiz = new Quiz({
        creatorName,
        creatorPassword,
        questions,
        quizCode,
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).json({ quizCode: savedQuiz.quizCode });
    } catch (error) {
        res.status(500).json({ error: 'Error creating quiz: ' + error.message });
    }
});

// This route fetches a quiz by its unique code.
router.get('/:code', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ quizCode: req.params.code });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching quiz: ' + error.message });
    }
});

// Submit answers for scoring and save user score
router.post('/:code/submit', async (req, res) => {
    const { answers, username } = req.body;

    try {
        // Find the quiz by code
        const quiz = await Quiz.findOne({ quizCode: req.params.code });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Calculate the score
        const total = quiz.questions.length;
        const score = answers.reduce((acc, answer, index) => {
            return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
        }, 0);

        // Check if the user already exists in the users collection
        let user = await User.findOne({ username });
        
        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({ 
                username, 
                quizzes: [{ quizCode: req.params.code, score }]
            });
        } else {
            // If user exists, update their quizzes array
            const existingQuizIndex = user.quizzes.findIndex(q => q.quizCode === req.params.code);
            
            if (existingQuizIndex > -1) {
                // If the quiz already exists in user's quizzes, update the score
                user.quizzes[existingQuizIndex].score = score;
            } else {
                // If not, push a new quiz attempt
                user.quizzes.push({ quizCode: req.params.code, score });
            }
        }

        // Save the user document
        await user.save();

        // Send back the score and total number of questions
        res.json({ score, total });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting answers: ' + error.message });
    }
});




// Get leaderboard for a specific quiz
router.get('/:code/leaderboard', async (req, res) => {
    console.log('Received request for leaderboard with quiz code:', req.params.code);
    try {
        const quizCode = req.params.code;
        const users = await User.find({ 'quizzes.quizCode': quizCode });
        console.log('Found users:', users);  // Log the fetched users
        const leaderboard = users
            .map(user => {
                const quizAttempt = user.quizzes.find(q => q.quizCode === quizCode);
                return { username: user.username, score: quizAttempt.score };
            })
            .sort((a, b) => b.score - a.score);
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Error fetching leaderboard: ' + error.message });
    }
});


module.exports = router;
