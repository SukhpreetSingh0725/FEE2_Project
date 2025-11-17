// src/App.jsx

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from "./context/ThemeContext";

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPageFinal';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FlashcardsPage from './pages/FlashcardsPage';

import './styles/navbar.css';
import './styles/Login.css';
import './styles/chat.css';
import './styles/contact.css';
import './styles/about.css';
import './styles/home.css';

function App() {
  const location = useLocation();   // <── GET CURRENT ROUTE

  return (
    <ThemeProvider>
      <AuthProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
          </Routes>
        </main>

        {/* 🚫 Hide Footer on Chat Page */}
        {location.pathname !== "/chat" && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
