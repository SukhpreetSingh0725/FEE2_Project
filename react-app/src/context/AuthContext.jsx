// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check for a token and user data on app load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('currentUser');
        
        if (token && storedUser) {
            try {
                // Assuming currentUser is stored as a JSON string
                const userData = JSON.parse(storedUser);
                setIsLoggedIn(true);
                setUser(userData);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                // Clear invalid data
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
            }
        }
        setLoading(false);
    }, []);

    // Function called upon successful login/signup
    const login = (userData, token) => {
        localStorage.setItem('authToken', token);
        // Store user object as a string
        localStorage.setItem('currentUser', JSON.stringify(userData)); 
        setIsLoggedIn(true);
        setUser(userData);
    };

    // Function called for logout
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login'); // Redirect to login page
    };

    const value = {
        isLoggedIn,
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy access
export const useAuth = () => {
    return useContext(AuthContext);
};