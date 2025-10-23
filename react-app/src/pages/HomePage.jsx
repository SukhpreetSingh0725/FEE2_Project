// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HomePage() {
  return (
    <div className="home-container">
      
      {/* 1. MODERN HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">Master React & JS with SparkQ.</h1>
          <p className="hero-subtext">Your AI-powered study companion for front-end development.</p>
          
          {/* Prominent Primary CTA Button */}
          <Link to="/chat" className="cta-button primary">
            Start Chatting Now
          </Link>
        </div>
      </section>
{/* 2. FEATURES GRID SECTION */}
<section className="features-grid">
        
        {/* Feature 1: Instant AI Help */}
        <Link to="/chat" className="feature-card-link">
            <div className="feature-card">
              <i className="fas fa-robot"></i> 
              <h3>Instant AI Help</h3>
              <p>Get concise, on-demand answers to complex React and JavaScript questions.</p>
            </div>
        </Link>
        
        {/* Feature 2: Save Flashcards -> ADDED ICON HERE */}
        <Link to="/profile" className="feature-card-link">
            <div className="feature-card">
              {/* 💥 NEW ICON ADDED: Use fa-clone for flashcards */}
              <i className="fas fa-clone"></i> 
              <h3>Save Flashcards</h3>
              <p>Instantly convert complex chat concepts into personalized, reviewable study cards.</p>
            </div>
        </Link>
        
        {/* Feature 3: Concept Deep Dive */}
        <Link to="/chat" className="feature-card-link">
            <div className="feature-card">
              <i className="fas fa-code"></i> 
              <h3>Concept Deep Dive</h3>
              <p>Explore fundamental web development topics with tailored, in-depth explanations.</p>
            </div>
        </Link>
      </section>
      
    </div>
  );
}

export default HomePage;