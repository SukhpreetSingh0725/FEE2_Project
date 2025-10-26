// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">SparkQ</div>
        <p>Empowering users to chat with AI in real-time and improve productivity.</p>
        
        <div className="social-icons">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
          </div>
        
        {/* Changed class to className */}
        <a href="#top" className="back-to-top">Back to Top</a> 
      </div>

      <div className="footer-columns">
        <div className="footer-column">
          <h4>Site Map</h4>
          {/* Changed <a> to <Link> and href to to */}
          <Link to="/">Homepage</Link> 
          <Link to="/chat">Chat</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Sign Up</Link>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          {/* These can remain as <a> since they don't navigate within the app */}
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Lawyer’s Corners</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 SparkQ. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;