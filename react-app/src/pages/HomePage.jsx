// src/pages/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Swal from 'sweetalert2';

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get user from AuthContext

  // ✅ Custom click handler for all cards + button
  const handleFeatureClick = () => {
    if (user) {
      navigate('/chat'); // Logged in → go to chat
    } else {
      // Not logged in → show SweetAlert popup
      Swal.fire({
        title: 'Create an Account ✨',
        text: 'You need to sign up or log in to continue chatting.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Go to Signup',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#aaa',
        background: '#fff',
        color: '#333',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // or '/signup' if you prefer
        }
      });
    }
  };

  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline animated-text">
            Your Universal Study & Knowledge Partner.
          </h1>
          <p className="hero-subtext">
            Ask anything from homework questions and historical facts to creative writing and simple mental breaks.
            Powered by AI, built for everyone.
          </p>
          <button className="cta-button" onClick={handleFeatureClick}>
            Start Chatting Now
          </button>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="features-grid">
        {/* Feature 1 */}
        <div className="feature-card-link" onClick={handleFeatureClick}>
          <div className="feature-card">
            <i className="fas fa-book-reader"></i>
            <h3>Any Subject, Any Question</h3>
            <p>
              Get instant, reliable help with math, history, science, and literature homework concepts.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature-card-link" onClick={handleFeatureClick}>
          <div className="feature-card">
            <i className="fas fa-brain"></i>
            <h3>Relax, Recharge & Create</h3>
            <p>
              Need a mental break, an outline, or creative inspiration for any project or writing task.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="feature-card-link" onClick={handleFeatureClick}>
          <div className="feature-card">
            <i className="fas fa-globe-americas"></i>
            <h3>Universal Knowledge Base</h3>
            <p>
              Access facts and up-to-date information on any topic, instantly summarized and explained.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
