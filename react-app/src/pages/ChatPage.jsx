// src/pages/ChatPage.jsx

import React, { useState, useEffect } from 'react';

// --- Flashcard Logic & State Management ---
const getInitialFlashcards = () => {
  const savedFlashcards = localStorage.getItem('sparkq_flashcards');
  return savedFlashcards ? JSON.parse(savedFlashcards) : [];
};

function ChatPage() {
  // Chat State (Keep existing chat logic)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am SparkQ, your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  
  // NEW: Flashcard State
  const [flashcards, setFlashcards] = useState(getInitialFlashcards);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState({}); // State to control which answer is visible

  // Effect to save flashcards to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('sparkq_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  // Function to handle adding a new flashcard
  const handleAddFlashcard = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '' || newAnswer.trim() === '') return;

    const newCard = {
      id: Date.now(),
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    };

    setFlashcards(prevCards => [...prevCards, newCard]);
    setNewQuestion('');
    setNewAnswer('');
  };

  // Function to handle sending a chat message (Simulated)
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput('');
    
    setTimeout(() => {
        simulateAiResponse(newUserMessage.text);
    }, 500);
  };
  
  const simulateAiResponse = (userText) => {
      let responseText = "That's an interesting question!";
      if (userText.toLowerCase().includes('react')) {
          responseText = "React is a great library for building user interfaces!";
      } else if (userText.toLowerCase().includes('hello')) {
          responseText = "Hello there! How can I assist with your front-end project?";
      }

      const newAiMessage = {
          id: messages.length + 2,
          text: responseText,
          sender: 'ai'
      };
      
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
  };

  return (
    <section id="chat-interface">
      <div className="chat-container-wrapper">
      
        {/* --- 1. MAIN CHAT WINDOW --- */}
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
          </div>
        </div>
        
        {/* --- 2. FLASHCARDS SIDEBAR --- */}
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
            {flashcards.map((card) => (
              <div key={card.id} className="flashcard-card">
                <p className="flashcard-question">Q: {card.question}</p>
                <button 
                    className="toggle-answer-btn"
                    onClick={() => setShowAnswer(prev => ({...prev, [card.id]: !prev[card.id]}))}>
                  {showAnswer[card.id] ? 'Hide Answer' : 'Show Answer'}
                </button>
                {showAnswer[card.id] && (
                  <p className="flashcard-answer">A: {card.answer}</p>
                )}
              </div>
            ))}
            {flashcards.length === 0 && (
                <p className="no-cards-msg">No flashcards saved yet. Save a question/answer pair!</p>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default ChatPage;