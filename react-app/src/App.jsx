// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- ADD THIS IMPORT
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from "./context/ThemeContext";  

// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

import Header from './components/Header';
import Footer from './components/Footer'; 

// 1. IMPORT ALL YOUR PAGE COMPONENTS (MUST BE CREATED IN src/pages)
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPAge';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FlashcardsPage from './pages/FlashcardsPage';


// 2. YOUR CUSTOM STYLES HERE
import './styles/navbar.css'; 
import './styles/login.css'; 
import './styles/chat.css'; 
import './styles/contact.css';
import './styles/about.css'; 
import './styles/home.css'; 


function App() {
  return (
    // 💥 NEW: Wrap your entire application in the AuthProvider
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
      <Footer />
    </AuthProvider>
    </ThemeProvider>
    // 💥 NOTE: If AuthProvider relies on useNavigate (which it does), 
    // it must be a child of BrowserRouter. Please ensure BrowserRouter is in main.jsx.
  );
}

export default App;