import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScorePage.css';  // Import the CSS file
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';
import image4 from '../images/image4.png';
import image5 from '../images/image5.png';

function ScorePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username,score, quizCode } = location.state || { score: 0, quizCode: '' };

    // State to store the selected random image
    const [randomImage, setRandomImage] = useState('');

    useEffect(() => {
        // Define the images array inside the useEffect to avoid it being a dependency
        const images = [image1, image2, image3, image4, image5];

        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleViewLeaderboard = () => {
        navigate(`/leaderboard/${quizCode}`);
    };

    return (
        <div className="score-page">
           <h1 style={{ color: 'white' }}>Hello {username}!</h1>

            <p>Your score is: {score}</p>
            {randomImage && <img src={randomImage} alt="Random" className="random-image" />} {/* Display the random image */}
            <button onClick={handleViewLeaderboard} className="view-leaderboard-btn">
                View Leaderboard
            </button>
        </div>
    );
}

export default ScorePage;
