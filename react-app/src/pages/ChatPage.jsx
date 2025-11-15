// Full ChatPage.jsx with Dark/Light mode support
// (Code will be long—replace your existing ChatPage.jsx fully)

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import { marked } from "marked";
import { useTheme } from "../context/ThemeContext";

marked.setOptions({ breaks: true });

const MAX_GUEST_MESSAGES = 5;

const getInitialFlashcards = (userId) => {
  const saved = localStorage.getItem(`sparkq_flashcards_${userId || "guest"}`);
  return saved ? JSON.parse(saved) : [];
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am SparkQ, your AI assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [flashcards, setFlashcards] = useState(() =>
    getInitialFlashcards(user?.id)
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState({});

  const [guestMessageCount, setGuestMessageCount] = useState(
    Number(localStorage.getItem("sparkq_guest_message_count") || 0)
  );

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoggedIn) setGuestMessageCount(0);
  }, [isLoggedIn]);

  useEffect(() => {
    setFlashcards(getInitialFlashcards(user?.id));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      `sparkq_flashcards_${user?.id || "guest"}`,
      JSON.stringify(flashcards)
    );
  }, [flashcards, user]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();

    if (!newQuestion.trim() || !newAnswer.trim()) return;

    if (!isLoggedIn) {
      const result = await Swal.fire({
        title: "Create an account to save flashcards!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Later",
      });

      if (result.isConfirmed) navigate("/login");
      return;
    }

    const newCard = {
      id: Date.now(),
      question: newQuestion,
      answer: newAnswer,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    setFlashcards((prev) => [...prev, newCard]);
    setNewQuestion("");
    setNewAnswer("");
    setShowAnswer({});

    Swal.fire({
      icon: "success",
      title: "Flashcard Saved!",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleClearFlashcards = async () => {
    const result = await Swal.fire({
      title: "Clear all flashcards?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Clear",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      setFlashcards([]);
      localStorage.removeItem(`sparkq_flashcards_${user?.id || "guest"}`);
      Swal.fire({
        icon: "success",
        title: "All Flashcards Deleted",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!isLoggedIn) {
      const count = Number(localStorage.getItem("sparkq_guest_message_count"));

      if (count >= MAX_GUEST_MESSAGES) {
        const result = await Swal.fire({
          title: "Limit Reached",
          text: `You used all ${MAX_GUEST_MESSAGES} free messages.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Login",
        });

        if (result.isConfirmed) navigate("/login");
        return;
      }

      const newCount = count + 1;
      setGuestMessageCount(newCount);
      localStorage.setItem("sparkq_guest_message_count", newCount);
    }

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const prompt = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ask", { prompt });
      const reply = res.data.reply || "I didn’t understand that.";

      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "ai", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          text: "⚠️ Error connecting to SparkQ server.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black text-black dark:text-white pt-20">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-80 sm:w-96 bg-gray-200 dark:bg-gray-900 border-r border-gray-400 dark:border-gray-700 h-[calc(100vh-80px)] sticky left-0 top-20 p-5 overflow-y-auto rounded-lg ml-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Flashcards</h2>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-white">✕</button>
          </div>

          {/* Add Flashcard */}
          <form onSubmit={handleAddFlashcard} className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700"
            />

            <textarea
              rows="2"
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700"
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold text-white">
              Save Flashcard
            </button>
          </form>

          {/* Flashcard List */}
          <div className="space-y-3">
            {flashcards.slice(-3).map((card) => (
              <div
                key={card.id}
                className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-700"
              >
                <p className="font-semibold">Q: {card.question}</p>

                <button
                  className="text-blue-500 text-sm mt-1"
                  onClick={() =>
                    setShowAnswer((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                  }
                >
                  {showAnswer[card.id] ? "Hide Answer" : "Show Answer"}
                </button>

                {showAnswer[card.id] && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">A: {card.answer}</p>
                )}
              </div>
            ))}

            {flashcards.length > 3 && (
              <button
                className="w-full text-center block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded font-semibold mt-2"
                onClick={() => navigate("/flashcards")}
              >
                View All →
              </button>
            )}

            {flashcards.length > 0 && (
              <button
                onClick={handleClearFlashcards}
                className="text-red-500 font-semibold text-sm mt-2"
              >
                Clear All
              </button>
            )}

            {flashcards.length === 0 && (
              <p className="text-gray-500 text-center">No flashcards saved.</p>
            )}
          </div>
        </aside>
      )}

      {/* Chat Area */}
      <main className="flex-1 flex flex-col px-3">
        {/* Top Row: Sidebar toggle + Theme Toggle */}
        <div className="flex justify-between items-center mb-3">
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded"
            >
              Open Flashcards
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="px-3 py-2 bg-gray-300 dark:bg-gray-800 rounded border border-gray-500"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Chat Header */}
        <header className="p-4 bg-gray-300 dark:bg-gray-800 rounded-md mb-3">
          <h1 className="text-2xl font-bold">SparkQ Chat</h1>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-lg shadow">
                  {msg.text}
                </div>
              ) : (
                <div
                  className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-xl max-w-lg shadow"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(msg.text, {
                      mangle: false,
                      headerIds: false,
                    }),
                  }}
                />
              )}
            </div>
          ))}

          {loading && <p className="text-gray-500 dark:text-gray-400">Thinking...</p>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="mt-3 p-3 bg-gray-300 dark:bg-gray-800 rounded-md flex gap-3"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-700 text-black dark:text-white"
          />

          <button
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white"
          >
            Send
          </button>
        </form>

        {/* Guest Counter */}
        {!isLoggedIn && (
          <p className="text-center text-sm py-2 text-gray-500 dark:text-gray-400">
            {guestMessageCount < MAX_GUEST_MESSAGES
              ? `${MAX_GUEST_MESSAGES - guestMessageCount} free messages left`
              : "Limit reached — please login"}
          </p>
        )}
      </main>
    </div>
  );
}