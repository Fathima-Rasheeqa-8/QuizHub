// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={styles.home}>
            <div style={styles.homeContainer}>
                <h1 style={styles.homeTitle}>Welcome to the Quiz Application</h1>
                <p style={styles.homeDescription}>Choose an option to get started!</p>
                <div style={styles.buttonContainer}>
                    <Link to="/create" style={styles.homeButtonLink}>
                        <button 
                            style={styles.homeButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#BA68C8'; // Light Purple on hover
                                e.target.style.color = 'white'; 
                                e.target.style.fontWeight = 'bold';
                                e.target.style.transform = 'scale(1)';// White text color on hover
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#ffffff'; // Reset to default light purple
                                e.target.style.color = 'black'; 
                                e.target.style.fontWeight = 'bold';
                                e.target.style.transform = 'scale(1.05)';// Reset to black text
                            }}
                        >
                            
                            Create a New Quiz
                        </button>
                    </Link>
                    <Link to="/take" style={styles.homeButtonLink}>
                        <button 
                            style={styles.homeButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#BA68C8'; // Light Purple on hover
                                e.target.style.color = 'white';
                                e.target.style.fontWeight = 'bold';
                                e.target.style.transform = 'scale(1)'; // White text color on hover
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#ffffff'; // Reset to default light purple
                                e.target.style.color = 'black';
                                e.target.style.fontWeight = 'bold'; 
                                e.target.style.transform = 'scale(1.05)';// Reset to black text
                            }}
                        >
        
                            Take a Quiz
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Define the styles as JavaScript objects
const styles = {
    home: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #9C27B0, #E91E63)', // Green to Blue Gradient
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '0 20px',
        flexDirection: 'column', // Ensures the content is vertically centered
    },
    homeContainer: {
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        padding: '40px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    },
    homeTitle: {
        color:'white',
        fontSize: '3rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    homeDescription: {
        fontSize: '1.15rem',
        marginBottom: '30px',
        lineHeight: '1.5',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    homeButtonLink: {
        textDecoration: 'none', 
    },
    homeButton: {
    
        padding: '12px 30px',
        fontSize: '1.2rem',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease,color 0.3s ease, transform 0.3s ease',
        minWidth: '200px', 
    },
};

export default Home;
