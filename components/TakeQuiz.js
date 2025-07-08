import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TakeQuiz.css';

function TakeQuiz() {
    const [quizCode, setQuizCode] = useState('');
    const [username, setUsername] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

    const handleQuizCodeSubmit = async () => {
        if (!quizCode || !username) {
            setError('Please enter both quiz code and username.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/quizzes/${quizCode}`);
            setQuizData(response.data);
            setAnswers(new Array(response.data.questions.length).fill(null));
            setLoading(false);
        } catch (err) {
            setError('Error fetching quiz data. Please check the quiz code.');
            setLoading(false);
        }
    };

    const handleAnswerChange = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = index;
        setAnswers(newAnswers);
    };

    const handleSubmitQuiz = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/quizzes/${quizCode}/submit`, {
                username,
                answers
            });
            const score = response.data.score;
            navigate(`/score`, { state: {username, score, quizCode } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (loading) return <div>Loading quiz...</div>;

    const currentQuestion = quizData?.questions[currentQuestionIndex];

    return (
        <div className="take-quiz">
            <h1 className='h1'>Take a Quiz</h1>
            {!quizData ? (
                <>
                    <input 
                        placeholder="Enter Quiz Code" 
                        value={quizCode} 
                        onChange={e => setQuizCode(e.target.value)} 
                    />
                    <input 
                        placeholder="Enter Username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    <button className='butt' onClick={handleQuizCodeSubmit}>Start Quiz</button>
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                <div className="quiz-question">
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <p>{currentQuestion.questionText}</p>
                    <div className="options-container">
                        {currentQuestion.options.map((option, index) => (
                            <div 
                                key={index} 
                                className={`option-box ${answers[currentQuestionIndex] === index ? 'selected' : ''}`}
                                onClick={() => handleAnswerChange(index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <div className="navigation-buttons">
                        <button 
                            className="prev-btn" 
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                            disabled={currentQuestionIndex === 0}
                        >
                            Prev
                        </button>
                        {currentQuestionIndex < quizData.questions.length - 1 ? (
                            <button 
                                className="next-btn" 
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, quizData.questions.length - 1))}
                            >
                                Next
                            </button>
                        ) : (
                            <button className="submit-btn" onClick={handleSubmitQuiz}>Submit</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TakeQuiz;
