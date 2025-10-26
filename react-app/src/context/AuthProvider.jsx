import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 💡 Import the context object from the new file
import { AuthContext } from './AuthContext'; 

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
                const userData = JSON.parse(storedUser);
                setIsLoggedIn(true);
                setUser(userData);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
            }
        }
        setLoading(false);
    }, []);

    // Function called upon successful login/signup
    const login = (userData, token) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(userData)); 
        setIsLoggedIn(true);
        setUser(userData);
        
        // Reset the guest message count upon successful login
        localStorage.removeItem('sparkq_guest_message_count'); 
    };

    // Function called for logout
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
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