// src/pages/ProfilePage.jsx

import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- CRITICAL: Import the custom hook

function ProfilePage() {
    // 1. Access the global state
    const { isLoggedIn, user, loading } = useAuth();
    const navigate = useNavigate();

    // Show a loading indicator while the auth check is running
    if (loading) {
        return <div className="profile-container">Loading profile...</div>;
    }
    
    // 2. Redirect non-logged-in users (Protected Route Logic)
    if (!isLoggedIn) {
        // Use the Navigate component for immediate, clean redirection
        return <Navigate to="/login" replace />; 
    }

    // This check should ideally not be needed if isLoggedIn is true,
    // but serves as a failsafe
    if (!user) {
         return <div className="profile-container">User data not found. Please log in again.</div>;
    }

    // 3. Render the Profile Content
    return (
        <div className="profile-container">
            <h1 className="profile-title">Welcome to Your Profile, {user.name}!</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.id}</p>
                {/* Add more user-specific data here */}
            </div>
            
            <button 
                onClick={() => navigate('/chat')}
                className="start-chat-btn"
                style={{
                    padding: '10px 20px',
                    marginTop: '30px',
                    backgroundColor: '#00aaff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Go to SparkQ Chat
            </button>
        </div>
    );
}

export default ProfilePage;