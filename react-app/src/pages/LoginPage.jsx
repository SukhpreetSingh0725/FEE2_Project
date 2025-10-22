// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function LoginPage() {
    const navigate = useNavigate(); 
    const { login } = useAuth(); 
    
    // 1. State for the "Flip Card" Animation/Display
    const [isFlipped, setIsFlipped] = useState(false);

    // 2. State for Login Form Data
    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPassword: '',
        loginConfirmPassword: '',
    });

    // 3. State for Signup Form Data
    const [signupData, setSignupData] = useState({
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
    });

    // 4. Input Change Handlers (Unchanged)
    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSignupChange = (e) => {
        const { id, value } = e.target;
        setSignupData(prevData => ({ ...prevData, [id]: value }));
    };

    // 5. Validation Logic (Unchanged)
    const validateForm = (data, isLogin) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        const fields = Object.values(data);
        if (fields.some(field => field.trim() === '')) {
            alert('All fields are mandatory!');
            return false;
        }
        
        if (!emailRegex.test(isLogin ? data.loginEmail : data.signupEmail)) {
            alert('Enter valid email!');
            return false;
        }
        
        if (isLogin && data.loginPassword !== data.loginConfirmPassword) {
            alert('Login Passwords do not match!');
            return false;
        }
        if (!isLogin && data.signupPassword !== data.signupConfirmPassword) {
            alert('Signup Passwords do not match!');
            return false;
        }
        
        return true;
    };

    // 6. Form Submission Handlers
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validateForm(loginData, true)) {
            
            // 1. Retrieve the saved user data
            const storedDataJSON = localStorage.getItem('storedCredentials');
            if (!storedDataJSON) {
                alert('No user found. Please Sign Up first!');
                return;
            }
            
            const storedUser = JSON.parse(storedDataJSON);
            
            // 2. Verify the email and password match the stored data
            if (storedUser.email !== loginData.loginEmail || storedUser.password !== loginData.loginPassword) {
                alert('Login failed: Invalid email or password!');
                return;
            }
            
            alert('Login Successful! Redirecting to Profile...');
            
            // 3. Use the stored user's unique ID, NAME, and EMAIL
            const retrievedUser = {
                id: storedUser.id,        // <-- FIX: Retrieve the unique ID
                name: storedUser.name,     // <-- FIX: Retrieve the user's name
                email: storedUser.email,
            };
            const simulatedToken = 'fake-jwt-token-for-login-' + Date.now();
            
            // 4. Update the global state
            login(retrievedUser, simulatedToken); 
            
            setLoginData({ loginEmail: '', loginPassword: '', loginConfirmPassword: '' });
            navigate('/profile'); 
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (validateForm(signupData, false)) {
            console.log('Signup Data:', signupData);
            alert('Signup Successful! Redirecting to Profile...');
            
            // 1. Generate a unique ID (simulating a database ID)
            const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

            // 2. Create the credentials object (including the unique ID)
            const userCredentials = {
                id: uniqueId,             // <-- FIX: Store the generated ID
                name: signupData.signupName,
                email: signupData.signupEmail,
                password: signupData.signupPassword, // Note: For simulation only!
            };
            
            // 3. Save ALL data locally for later login retrieval
            localStorage.setItem('storedCredentials', JSON.stringify(userCredentials));
            
            // 4. Use the same saved data to update the global state immediately after signup
            const simulatedToken = 'fake-jwt-token-for-signup-' + Date.now();
            login(userCredentials, simulatedToken); 
            
            setSignupData({ signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '' });
            navigate('/profile');
        }
    };


    return (
        <div className="container">
            <div className={`card ${isFlipped ? 'flip' : ''}`} id="card"> 
                
                {/* LOGIN FORM */}
                <form className="form-container login-container" onSubmit={handleLoginSubmit}> 
                    <h1>Login</h1>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    
                    <input type="email" placeholder="Email" id="loginEmail" required 
                        value={loginData.loginEmail} onChange={handleLoginChange} />
                    <input type="password" placeholder="Password" id="loginPassword" required 
                        value={loginData.loginPassword} onChange={handleLoginChange} />
                    <input type="password" placeholder="Confirm Password" id="loginConfirmPassword" required 
                        value={loginData.loginConfirmPassword} onChange={handleLoginChange} />
                    
                    <button type="submit" id="loginBtn">Login</button>
                    
                    <a onClick={() => setIsFlipped(true)} id="toSignup">Don't have an account? Sign Up</a> 
                </form>

                {/* SIGNUP FORM */}
                <form className="form-container signup-container" onSubmit={handleSignupSubmit}> 
                    <h1>Sign Up</h1>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    
                    <input type="text" placeholder="Full Name" id="signupName" required
                        value={signupData.signupName} onChange={handleSignupChange} />
                    <input type="email" placeholder="Email" id="signupEmail" required
                        value={signupData.signupEmail} onChange={handleSignupChange} />
                    <input type="password" placeholder="Password" id="signupPassword" required
                        value={signupData.signupPassword} onChange={handleSignupChange} />
                    <input type="password" placeholder="Confirm Password" id="signupConfirmPassword" required
                        value={signupData.signupConfirmPassword} onChange={handleSignupChange} />
                    
                    <button type="submit" id="signupBtn">Sign Up</button>
                    
                    <a onClick={() => setIsFlipped(false)} id="toLogin">Already have an account? Login</a> 
                </form>
            </div>
        </div>
    );
}

export default LoginPage;