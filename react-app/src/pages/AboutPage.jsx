// src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function AboutPage() {
    // Get login status to customize the final CTA
    const { isLoggedIn } = useAuth();

    return (
        <section id="about" className="about-page-container">
            
            <header className="about-hero">
                <h1>Our Mission: Turbocharge Your Learning</h1>
                <p className="subtitle">SparkQ is the AI-powered companion built by developers, for developers. We turn complexity into clarity.</p>
            </header>

            {/* Section 1: Core Value Proposition */}
            <div className="value-section">
                <h2>The Gap We Bridge</h2>
                <div className="value-cards">
                    <div className="value-card">
                        <i className="fas fa-search-dollar"></i>
                        <h3>Stop Searching. Start Solving.</h3>
                        <p>Ditch endless documentation dives. Get concise, expert answers to your complex React, JavaScript, and web dev queries in seconds.</p>
                    </div>
                    <div className="value-card">
                        <i className="fas fa-brain"></i>
                        <h3>Learning That Sticks.</h3>
                        <p>We transform your chat history into reviewable flashcards. Instantly solidify the concepts you discuss, making knowledge stick long-term.</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Technology Focus */}
            <div className="tech-section">
                <h2>Behind the Intelligence</h2>
                <p>SparkQ leverages the cutting-edge capabilities of **OpenAI's GPT model** to provide accurate, context-aware responses. Our proprietary system then structures that knowledge, allowing you to seamlessly convert conversation into actionable study materials.</p>
                <div className="tech-icons">
                    <i className="fab fa-react"></i>
                    <i className="fab fa-js-square"></i>
                    <i className="fas fa-terminal"></i>
                </div>
            </div>

            {/* Section 3: Call to Action */}
            <div className="cta-section">
                <h2>Ready to Learn Smarter?</h2>
                {isLoggedIn ? (
                    <Link to="/chat" className="cta-button secondary-cta">
                        Continue Chatting
                    </Link>
                ) : (
                    <Link to="/login" className="cta-button secondary-cta">
                        Try SparkQ Today
                    </Link>
                )}
            </div>

        </section>
    );
}

export default AboutPage;