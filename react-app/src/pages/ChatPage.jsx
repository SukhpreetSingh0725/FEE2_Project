// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const MAX_GUEST_MESSAGES = 5; // limit for unregistered users

const getInitialFlashcards = (userId) => {
  // Use 'guest' key if userId is null/undefined
  const savedData = localStorage.getItem(`sparkq_flashcards_${userId || 'guest'}`);
  return savedData ? JSON.parse(savedData) : [];
};

function ChatPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am SparkQ, your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  // 1. Initialize flashcards using the current user (or 'guest')
  const [flashcards, setFlashcards] = useState(() => getInitialFlashcards(user?.id));
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState({});
  
  // 2. Initialize guest message count from localStorage
  const [guestMessageCount, setGuestMessageCount] = useState(
    Number(localStorage.getItem('sparkq_guest_message_count') || 0)
  );
  
  // 🔑 KEY FIX: Reset local counter state when user logs in (isLoggedIn changes from false to true)
  useEffect(() => {
    if (isLoggedIn) {
      // The actual localStorage item is cleared in AuthContext.login, 
      // we only need to update the local state here.
      setGuestMessageCount(0); 
    }
  }, [isLoggedIn]);


  // 🔑 KEY FIX: Load the correct flashcards when the user object changes (login/logout)
  useEffect(() => {
    setFlashcards(getInitialFlashcards(user?.id));
  }, [user]);

  
  // Save flashcards to localStorage
  useEffect(() => {
    // Use the appropriate key (user ID or 'guest')
    const storageKey = `sparkq_flashcards_${user?.id || 'guest'}`; 
    localStorage.setItem(storageKey, JSON.stringify(flashcards));
  }, [flashcards, user]);

  // Add new flashcard
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '' || newAnswer.trim() === '') return;

    // Guest users check
    if (!isLoggedIn) {
      const result = await Swal.fire({
        title: "Create an account to save flashcards!",
        text: "You can still chat, but saving requires login.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Create Account",
        cancelButtonText: "Maybe Later",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#aaa",
      });
      if (result.isConfirmed) navigate('/login');
      return;
    }

    const newCard = {
      id: Date.now(),
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    setFlashcards(prevCards => [...prevCards, newCard]);
    setNewQuestion('');
    setNewAnswer('');
    setShowAnswer({}); // Reset answers display

    Swal.fire({
      title: "Flashcard Saved!",
      text: "You can view it later on your profile.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Handle chat message with guest limit
  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (!isLoggedIn) {
      // Always read the current count from localStorage for reliability
      const currentGuestCount = Number(localStorage.getItem('sparkq_guest_message_count') || 0);

      if (currentGuestCount >= MAX_GUEST_MESSAGES) {
        const result = await Swal.fire({
          title: "Limit Reached 🚫",
          text: `You’ve used your ${MAX_GUEST_MESSAGES} free messages. Create an account to continue chatting!`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Sign Up Now",
          cancelButtonText: "Later",
          confirmButtonColor: "#00aaff",
          cancelButtonColor: "#aaa"
        });

        if (result.isConfirmed) navigate('/login');
        return;
      } else {
        // Increment and update both localStorage and the local state
        const newCount = currentGuestCount + 1;
        localStorage.setItem('sparkq_guest_message_count', newCount);
        setGuestMessageCount(newCount); 
      }
    }

    // Normal send message logic
    const newUserMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    setTimeout(() => simulateAiResponse(input), 500);
  };

  const simulateAiResponse = (text) => {
    let response = "That's an interesting question!";
    if (text.toLowerCase().includes('react')) response = "React is great for building UI!";
    else if (text.toLowerCase().includes('hello')) response = "Hi there! How’s your learning going?";
    setMessages(prev => [...prev, { id: prev.length + 1, text: response, sender: 'ai' }]);
  };

  // Clear all flashcards
  const handleClearAll = () => {
    Swal.fire({
      title: 'Clear All Flashcards?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        setFlashcards([]);
        localStorage.removeItem(`sparkq_flashcards_${user?.id || 'guest'}`);
        Swal.fire('All flashcards cleared!', '', 'success');
      }
    });
  };

  return (
    <section id="chat-interface">
      <div className="chat-container-wrapper">

        {/* --- MAIN CHAT WINDOW --- */}
        <div className="chat-window-main">
          <h1>SparkQ Chat</h1>
          <div className="chat-window">
            <div className="message-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))}
            </div>

            <form className="chat-input-form" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
              />
              <button type="submit">Send</button>
            </form>

            {/* --- Guest message counter --- */}
            {!isLoggedIn && (
              <p style={{
                marginTop: '8px',
                textAlign: 'center',
                color: guestMessageCount >= MAX_GUEST_MESSAGES ? '#ff4d4f' : '#888',
                fontSize: '0.9rem'
              }}>
                {guestMessageCount < MAX_GUEST_MESSAGES
                  ? `💬 ${MAX_GUEST_MESSAGES - guestMessageCount} free messages left`
                  : `⚠️ Free limit reached — sign up to continue`}
              </p>
            )}
          </div>
        </div>

        {/* --- FLASHCARDS SIDEBAR --- */}
        <div className="flashcards-sidebar">
          <h2>My Flashcards</h2>

          <form className="flashcard-input-form" onSubmit={handleAddFlashcard}>
            <input
              type="text"
              placeholder="Question (e.g., What is JSX?)"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
            <textarea
              placeholder="Answer (e.g., JavaScript XML)"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows="2"
              required
            ></textarea>
            <button type="submit">Save Flashcard</button>
          </form>

          <div className="flashcard-list">
            {flashcards.slice(-2).map((card) => (
              <div key={card.id} className="flashcard-card">
                <p className="flashcard-question">Q: {card.question}</p>
                <button
                  className="toggle-answer-btn"
                  onClick={() => setShowAnswer(prev => ({ ...prev, [card.id]: !prev[card.id] }))}
                >
                  {showAnswer[card.id] ? 'Hide Answer' : 'Show Answer'}
                </button>
                {showAnswer[card.id] && (
                  <p className="flashcard-answer">A: {card.answer}</p>
                )}
              </div>
            ))}

            {flashcards.length > 2 && (
              <button
                onClick={() => navigate('/flashcards')}
                className="view-all-btn"
              >
                View All Flashcards →
              </button>
            )}

            {flashcards.length > 0 && (
              <button
                onClick={handleClearAll}
                className="clear-all-btn"
              >
                Clear All
              </button>
            )}

            {flashcards.length === 0 && (
              <p className="no-cards-msg">No flashcards saved yet.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ChatPage;