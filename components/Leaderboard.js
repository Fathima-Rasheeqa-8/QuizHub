import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Leaderboard.css';
import crownImage from '../images/crown.png';

function Leaderboard() {
    const { quizCode } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${quizCode}/leaderboard`);
                setLeaderboard(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [quizCode]);

    if (loading) return <div className="loading">Loading leaderboard...</div>;

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <div className="top-three">
                {leaderboard.slice(0, 3).map((user, index) => (
                    <div key={user.username} className={`top-user rank-${index + 1}`}>
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=white&size=128`} // Use UI Avatars API
                            alt="User Avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }} // Fallback to local image if UI Avatars fails
                        />
                        <span className="username">{user.username}</span>
                        <span className="score">{user.score} Points</span>
                        <img src={crownImage} alt="Crown" class="crown" />

                    </div>
                ))}
            </div>
            <ul className="other-users">
                {leaderboard.slice(3).map((user, index) => (
                    <li key={user.username} className="user-item">
                        <span className="rank">{index + 4}</span>
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=white&size=128`} // Use UI Avatars API
                            alt="User Avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }} // Fallback to local image if UI Avatars fails
                        />
                        <span className="username">{user.username}</span>
                        <span className="score">{user.score} Points</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;