// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- NEW: Import the Link component

function Header() {
  return (
    // Conversion: class="navbar" -> className="navbar"
    <header className="navbar">
      
      <div className="logo">SparkQ</div>
  
      {/* Hamburger Checkbox */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>
  
      {/* Navigation Links */}
      <nav className="nav-links">
        {/* CONVERSION: a href="page.html" -> Link to="/page-path" */}
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Sign Up</Link>
      </nav>
      
    </header>
  );
}

export default Header;