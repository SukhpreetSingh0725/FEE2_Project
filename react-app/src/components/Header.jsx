import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { User, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { isLoggedIn, user, loading, logout } = useAuth();
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="logo">SparkQ</div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

        {/* MAIN LINKS */}
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/chat" onClick={closeMenu}>Chat</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>

        {/* AUTH LINKS */}
        {isLoggedIn ? (
          <>
            {/* PROFILE ONLY — NO LOGOUT HERE */}
            <Link 
              to="/profile" 
              onClick={closeMenu}
              className="flex items-center gap-2"
              title={user?.name || 'Profile'}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-700" />
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu}>Sign Up / Login</Link>
        )}

        {/* DARK/LIGHT TOGGLE */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 mt-2 px-3 py-1 rounded-md 
                     bg-gray-800 text-white hover:bg-gray-700
                     dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 
                     transition"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark" : "Light"}
        </button>

      </nav>
    </header>
  );
}

export default Header;
