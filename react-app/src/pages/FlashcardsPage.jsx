// src/pages/FlashcardsPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

function FlashcardsPage() {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load user's flashcards from localStorage
  useEffect(() => {
    if (user && user.id) {
      const savedCards = localStorage.getItem(`sparkq_flashcards_${user.id}`);
      if (savedCards) setFlashcards(JSON.parse(savedCards));
    }
  }, [user]);

  // Handle deleting a flashcard
  const handleDelete = (id) => {
    const updatedCards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedCards);
    localStorage.setItem(`sparkq_flashcards_${user.id}`, JSON.stringify(updatedCards));
  };

  // Filter flashcards based on search term
  const filteredFlashcards = flashcards.filter(
    card =>
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) return <div className="flashcards-page-container">Loading...</div>;

  // Redirect if not logged in
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flashcards-page-container">
      <h1 className="flashcards-page-title">All Saved Flashcards</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search flashcards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flashcards-search-input"
      />

      {/* Flashcards List */}
      {filteredFlashcards.length > 0 ? (
        <div className="flashcards-grid">
          {filteredFlashcards.map(card => (
            <div key={card.id} className="flashcard-card">
              <p className="flashcard-question"><strong>Q:</strong> {card.question}</p>
              <p className="flashcard-answer"><strong>A:</strong> {card.answer}</p>
              <button
                className="delete-flashcard-btn"
                onClick={() => handleDelete(card.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cards-msg">No flashcards saved yet.</p>
      )}

      <button
        className="back-to-profile-btn"
        onClick={() => navigate('/profile')}
      >
        Back to Profile
      </button>
    </div>
  );
}

export default FlashcardsPage;
