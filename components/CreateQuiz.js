import React, { useState } from 'react';
import axios from 'axios';
import './CreateQuiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShareAlt, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';

function CreateQuiz() {
    const [quizCode, setQuizCode] = useState(null);
    const [creatorName, setCreatorName] = useState('');
    const [creatorPassword, setCreatorPassword] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', ''], correctAnswer: 0 }]);
    const [copySuccess, setCopySuccess] = useState('');
    const [showSharePopup, setShowSharePopup] = useState(false); // State for share popup visibility

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'questionText') {
            newQuestions[index].questionText = value;
        } else if (field === 'option') {
            newQuestions[index].options[value.index] = value.text;
        } else if (field === 'correctAnswer') {
            newQuestions[index].correctAnswer = value;
        }
        setQuestions(newQuestions);
    };

    const validateQuestions = () => {
        return questions.every(q => 
            q.questionText && 
            q.options.length >= 2 && 
            typeof q.correctAnswer === 'number'
        );
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', ''], correctAnswer: 0 }]);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };

    const deleteQuestion = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions.splice(questionIndex, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        if (!validateQuestions()) {
            alert('Each question must have text, at least two options, and a correct answer index.');
            return;
        }
        try {
            const response = await axios.post('/api/quizzes/create', {
                creatorName,
                creatorPassword,
                questions
            });
            setQuizCode(response.data.quizCode);
        } catch (error) {
            console.error('Error creating quiz:', error.response ? error.response.data : error.message);
            alert('Error creating quiz. Please check the console for more details.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(quizCode)
            .then(() => setCopySuccess('Copied!'))
            .catch(err => console.error('Failed to copy!', err));
    };

    const handleShareClick = () => {
        setShowSharePopup(!showSharePopup);
    };

    const closeSharePopup = () => {
        setShowSharePopup(false);
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=Your%20quiz%20code%20is:%20${quizCode}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareOnEmail = () => {
        const emailSubject = "Your Quiz Code";
        const emailBody = `Here is your quiz code: ${quizCode}`;
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoUrl, '_blank');
    };

    const shareOnInstagram = () => {
        const instagramUrl = `https://www.instagram.com/?text=Your%20quiz%20code%20is:%20${quizCode}`;
        window.open(instagramUrl, '_blank');
    };

    return (
        <div className="container">
            <h1 className="title">Create a New Quiz</h1>
            <input 
                className="input" 
                placeholder="Name" 
                value={creatorName} 
                onChange={e => setCreatorName(e.target.value)} 
            />
            <input 
                className="input" 
                type="password" 
                placeholder="Password" 
                value={creatorPassword} 
                onChange={e => setCreatorPassword(e.target.value)} 
            />
            {questions.map((q, index) => (
                <div key={index} className="question-container">
                    <input 
                        className="input" 
                        placeholder="Question" 
                        value={q.questionText} 
                        onChange={e => handleQuestionChange(index, 'questionText', e.target.value)} 
                    />
                    {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="option-container">
                            <input 
                                className="input" 
                                placeholder={`Option ${optIndex + 1}`} 
                                value={option} 
                                onChange={e => handleQuestionChange(index, 'option', { index: optIndex, text: e.target.value })} 
                            />
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                className="delete-icon" 
                                onClick={() => deleteOption(index, optIndex)} 
                            />
                        </div>
                    ))}
                    <button className="add-option-button" onClick={() => addOption(index)}>Add Option</button>
                    <input 
                        className="input" 
                        type="number" 
                        placeholder="Correct Answer Index" 
                        min="0" 
                        max={q.options.length - 1}
                        value={q.correctAnswer}
                        onChange={e => handleQuestionChange(index, 'correctAnswer', parseInt(e.target.value))} 
                    />
                    <button className="delete-question-button" onClick={() => deleteQuestion(index)}>Delete Question</button>
                </div>
            ))}
            <button className="button" onClick={addQuestion}>Add Question</button>
            <button className="button" onClick={handleSubmit}>Create Quiz</button>
            {quizCode && (
                <div className="quiz-code-container">
                    <p >Your quiz code is: <strong className="quiz-code">{quizCode}</strong></p>
                    <button className="copy-button" onClick={copyToClipboard}>
                        <FontAwesomeIcon icon={faCopy} className="copy-icon" />
                    </button>
                    <FontAwesomeIcon 
                        icon={faShareAlt} 
                        className="share-icon" 
                        onClick={handleShareClick} 
                    />
                    {copySuccess && <span className="copy-success">{copySuccess}</span>}
                    {showSharePopup && (
                        <div className="share-popup">
                            <button className="close-popup" onClick={closeSharePopup}>
                                <FontAwesomeIcon icon={faTimes} className="close-icon" />
                            </button>
                            <button className="share-button" onClick={shareOnWhatsApp}>Share on WhatsApp</button>
                            <button className="share-button" onClick={shareOnEmail}>Share via Email</button>
                            <button className="share-button" onClick={shareOnInstagram}>Share on Instagram</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateQuiz;
