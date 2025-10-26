import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { User } from "lucide-react"; // ✅ added icon import

function Header() {
  const { isLoggedIn, user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="logo">SparkQ</div>
      <div className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/chat" onClick={closeMenu}>Chat</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>

        {/* Conditional Rendering */}
        {isLoggedIn ? (
          <>
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

            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu}>Sign Up / Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
