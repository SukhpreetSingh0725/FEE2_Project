// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function ProfilePage() {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [userFlashcards, setUserFlashcards] = useState([]);

  // Load the logged-in user's flashcards from localStorage
  useEffect(() => {
    if (user && user.id) {
      const savedCards = localStorage.getItem(`sparkq_flashcards_${user.id}`);
      if (savedCards) {
        setUserFlashcards(JSON.parse(savedCards));
      } else {
        setUserFlashcards([]);
      }
    }
  }, [user]);

  // Loading state
  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Fallback (should not normally happen)
  if (!user) {
    return <div className="profile-container">User data not found. Please log in again.</div>;
  }

  // Sort flashcards (most recent first)
  const recentFlashcards = [...userFlashcards].reverse().slice(0, 2);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {user.name || 'User'} 👋</h1>

      {/* --- USER DETAILS --- */}
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name || 'Not Provided'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      {/* --- RECENT FLASHCARDS --- */}
      <div className="profile-flashcards">
        <h2>📚 Recent Flashcards</h2>

        {recentFlashcards.length > 0 ? (
          <div className="flashcard-preview-list">
            {recentFlashcards.map((card) => (
              <div key={card.id} className="flashcard-preview-card">
                <p className="flashcard-question"><strong>Q:</strong> {card.question}</p>
                <p className="flashcard-answer"><strong>A:</strong> {card.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-cards-msg">You haven’t saved any flashcards yet.</p>
        )}

        {userFlashcards.length > 2 && (
          <button
            className="view-all-flashcards-btn"
            onClick={() => navigate('/flashcards')}
          >
            View All Flashcards →
          </button>
        )}
      </div>

      {/* --- NAVIGATE TO CHAT --- */}
      <button
        onClick={() => navigate('/chat')}
        className="start-chat-btn"
        style={{
          padding: '11px 30px',
          marginTop: '30px',
          marginLeft: '80px',
          backgroundColor: '#00aaff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Go to SparkQ Chat
      </button>
    </div>
  );
}

export default ProfilePage;
