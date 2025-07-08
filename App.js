import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
// App.js
import ScorePage from './components/ScorePage';

import Leaderboard from './components/Leaderboard';
import Home from './components/Home';

// Ensure QuizResult.js exists in components folder
//code - quizhd16t
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateQuiz />} />
                    <Route path="/take" element={<TakeQuiz />} />
                    <Route path="/score" element={<ScorePage />} />
                    <Route path="/leaderboard/:quizCode" element={<Leaderboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
