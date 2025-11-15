// src/pages/AboutPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AboutPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="about-page-wrapper">
      
      {/* Floating Shapes */}
      <div className="about-bg-shape shape1"></div>
      <div className="about-bg-shape shape2"></div>

      <section className="about-content">

        {/* HERO */}
        <header className="about-hero">
          <h1 className="about-title">Our Mission: Turbocharge Your Learning</h1>
          <p className="about-subtitle">
            SparkQ is the AI-powered companion built by developers, for students  
            and learners who want clarity, speed, and powerful understanding.
          </p>
        </header>

        {/* VALUE SECTION */}
        <section className="about-section">
          <h2 className="section-title">The Gap We Bridge</h2>

          <div className="value-grid">
            <div className="value-card">
              <i className="fas fa-search-dollar"></i>
              <h3>Stop Searching. Start Solving.</h3>
              <p>Instant answers to coding, concepts, homework, and anything you ask.</p>
            </div>

            <div className="value-card">
              <i className="fas fa-brain"></i>
              <h3>Learning That Sticks.</h3>
              <p>Turn important chat explanations into flashcards automatically.</p>
            </div>
          </div>
        </section>

        {/* TECH SECTION */}
        <section className="about-section">
          <h2 className="section-title">Behind the Intelligence</h2>

          <p className="tech-text">
            SparkQ is powered by OpenAI technology and tailored by our system 
            to deliver structured, meaningful responses.
          </p>

          <div className="tech-icons">
            <i className="fab fa-react"></i>
            <i className="fab fa-js-square"></i>
            <i className="fas fa-terminal"></i>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          <h2 className="section-title">Ready to Learn Smarter?</h2>

          {isLoggedIn ? (
            <Link to="/chat" className="cta-btn">
              Continue Chatting
            </Link>
          ) : (
            <Link to="/login" className="cta-btn">
              Try SparkQ Today
            </Link>
          )}
        </section>

      </section>
    </div>
  );
}
