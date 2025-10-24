import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // The home-container is ready for the animation setup in CSS
    <div className="home-container">
      
      {/* 1. MODERN HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Updated Headline for Universal Scope with Animation Class */}
          <h1 className="hero-headline animated-text">Your Universal Study & Knowledge Partner.</h1>
          
          {/* Updated Subtext for Students/General Users */}
          <p className="hero-subtext">Ask anything from homework questions and historical facts to creative writing and simple mental breaks. Powered by AI, built for everyone.</p>
          
          {/* Prominent Primary CTA Button */}
          <Link to="/chat" className="cta-button">
            Start Chatting Now
          </Link>
        </div>
      </section>

      {/* 2. FEATURES GRID SECTION - Updated Content */}
      <section className="features-grid">
        
        {/* Feature 1: Subject Homework Help -> Links to the Chat Page */}
        <Link to="/chat" className="feature-card-link">
            <div className="feature-card">
              <i className="fas fa-book-reader"></i> {/* Icon for study/homework */}
              <h3>Any Subject, Any Question</h3>
              <p>Get instant, reliable help with math, history, science, and literature homework concepts.</p>
            </div>
        </Link>
        
        {/* 💥 Feature 2: RELAXATION & CREATIVITY (Updated based on your request) */}
        <Link to="/chat" className="feature-card-link">
            <div className="feature-card">
              <i className="fas fa-brain"></i> {/* Icon for creativity/fun */}
              <h3>Relax, Recharge & Create</h3>
              <p>Need a mental break, an outline, or creative inspiration for any project or writing task.</p>
            </div>
        </Link>
        
        {/* Feature 3: Universal Knowledge Base -> Links to the Chat Page */}
        <Link to="/chat" className="feature-card-link">
            <div className="feature-card">
              <i className="fas fa-globe-americas"></i> {/* Icon for universal knowledge */}
              <h3>Universal Knowledge Base</h3>
              <p>Access facts and up-to-date information on any topic, instantly summarized and explained.</p>
            </div>
        </Link>
      </section>
      
    </div>
  );
}

export default HomePage;