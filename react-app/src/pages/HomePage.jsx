// src/pages/HomePage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Swal from "sweetalert2";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeatureClick = () => {
    if (user) navigate("/chat");
    else {
      Swal.fire({
        title: "Create an Account ✨",
        text: "Login to continue chatting with SparkQ.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((res) => {
        if (res.isConfirmed) navigate("/login");
      });
    }
  };

  return (
    <div className="home-wrapper">

      {/* FLOATING BACKGROUND SHAPES */}
      <div className="floating-shape shape1"></div>
      <div className="floating-shape shape2"></div>
      <div className="floating-shape shape3"></div>
      <div className="floating-particles"></div>

      {/* HERO SECTION */}
      <section className="hero-container fade-up">
        <div className="hero-inner">
          <h1 className="hero-title">
            Your Universal Study & Knowledge Partner.
          </h1>
          <p className="hero-text">
            Ask questions, learn concepts, explore creativity — SparkQ helps
            students and learners of all levels.
          </p>

          <button onClick={handleFeatureClick} className="hero-cta">
            Start Chatting →
          </button>
        </div>
      </section>

      {/* WHY SPARKQ SECTION */}
      <section className="why-sparkq-section fade-up">
        <h2 className="why-title">Why SparkQ?</h2>

        <div className="why-grid">
          <div className="why-card">
            <i className="fas fa-graduation-cap"></i>
            <h3>Made for Students</h3>
            <p>Clear explanations, step-by-step solutions, and concept help.</p>
          </div>

          <div className="why-card">
            <i className="fas fa-comments"></i>
            <h3>Ask Anything</h3>
            <p>Homework, coding, writing, knowledge — all in one place.</p>
          </div>

          <div className="why-card">
            <i className="fas fa-bolt"></i>
            <h3>Instant Answers</h3>
            <p>Fast responses with easy-to-understand language.</p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="premium-grid fade-up">
        <div className="premium-card" onClick={handleFeatureClick}>
          <div className="premium-glow"></div>
          <i className="fas fa-book-reader premium-icon"></i>
          <h3>Any Subject Help</h3>
          <p>Math, science, history, code — SparkQ supports all learning.</p>
        </div>

        <div className="premium-card" onClick={handleFeatureClick}>
          <div className="premium-glow"></div>
          <i className="fas fa-brain premium-icon"></i>
          <h3>Boost Creativity</h3>
          <p>Write stories, essays, jokes, or get ideas.</p>
        </div>

        <div className="premium-card" onClick={handleFeatureClick}>
          <div className="premium-glow"></div>
          <i className="fas fa-globe-americas premium-icon"></i>
          <h3>Learn Anything</h3>
          <p>SparkQ explains everything in simple and clear words.</p>
        </div>
      </section>

    </div>
  );
}
