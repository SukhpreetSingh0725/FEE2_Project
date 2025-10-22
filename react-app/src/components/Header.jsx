// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- CRITICAL: Import the custom hook

function Header() {
    // 1. Access global authentication state and functions
    const { isLoggedIn, user, logout } = useAuth(); 
    const navigate = useNavigate();
    
    // Local state for the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    // Function to toggle the menu state
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Function to close the menu, called when a link is clicked
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // 2. Simplified Logout Handler using the global context function
    const handleLogout = () => {
        logout(); // Calls the central logout function (clears storage & state)
        closeMenu();
        navigate('/login'); // Redirect to login page after logout
    };
    
    return (
        <header className="navbar">
            <div className="logo">SparkQ</div>

            {/* Hamburger Icon/Button - Controlled by React State */}
            <div className="hamburger" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i> 
            </div>
        
            {/* Navigation Links - Conditional Rendering and State-based Visibility */}
            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/chat" onClick={closeMenu}>Chat</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
                
                {/* 3. CONDITIONAL RENDERING LOGIC using global state */}
                {isLoggedIn ? (
                    // SHOW Profile and Logout if logged in
                    <>
                        <Link to="/profile" onClick={closeMenu}>
                            {/* Display user name from global state, or default to 'Profile' */}
                            {user?.name || 'Profile'}
                        </Link>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </>
                ) : (
                    // SHOW Sign Up / Login if logged out
                    <Link to="/login" onClick={closeMenu}>Sign Up / Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;