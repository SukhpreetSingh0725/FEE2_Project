// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- ADD THIS IMPORT

// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

import Header from './components/Header';
import Footer from './components/Footer'; 

// 1. IMPORT ALL YOUR PAGE COMPONENTS (MUST BE CREATED IN src/pages)
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPAge';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';


// 2. YOUR CUSTOM STYLES HERE
import './styles/navbar.css'; 
import './styles/login.css'; 
import './styles/chat.css'; 
import './styles/contact.css';
import './styles/about.css'; 
import './styles/home.css'; 


function App() {
  return (
    <>
      <Header /> {/* The Header stays visible on all pages */}
      
      <main>
        {/* 3. DEFINE THE ROUTING RULES USING <Routes> AND <Route> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
      
      {/* You can add a Footer component here later */}
    </>
  );
}

export default App;