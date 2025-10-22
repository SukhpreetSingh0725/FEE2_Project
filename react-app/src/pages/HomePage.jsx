// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HomePage() {
  return (
    // Main Page: Hero Section. Converted 
    // class="hero-section" to className="hero-section"
    <main className="hero-section"> 
      <div className="hero-content">
        <h1>Welcome to the OpenAI Chat App</h1>
        <p>Talk to AI in real-time using the power of GPT!</p>
        
        {/* Converted a href="Login.html" to Link to="/login" */}
        <Link to="/login" className="start-button">
          Start Chatting
        </Link>
        
      </div>
    </main>
  );
}

export default HomePage;