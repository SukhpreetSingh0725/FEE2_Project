// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    // ALL Firebase Auth functions must be imported correctly from your config file.
    auth,
    googleProvider,
    facebookProvider,
    githubProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, // <--- **Crucial Addition**
    // If you are using an older version of Firebase or a different setup,
    // the name might be different, but this is standard for modular Firebase v9+.
    signInWithPopup
} from '../firebaseConfig'; 

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isFlipped, setIsFlipped] = useState(false);

    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPassword: '',
        loginConfirmPassword: ''
    });

    const [signupData, setSignupData] = useState({
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: ''
    });

    // Input handlers
    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prev => ({ ...prev, [id]: value }));
    };

    const handleSignupChange = (e) => {
        const { id, value } = e.target;
        setSignupData(prev => ({ ...prev, [id]: value }));
    };

    // Form validation (Simplified slightly for stability)
    const validateForm = (data, isLogin) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fields = Object.values(data);

        // Check if all fields (including the confirm password) are filled
        if (fields.some(field => field.trim() === '')) {
            alert('All fields are mandatory!');
            return false;
        }

        if (!emailRegex.test(isLogin ? data.loginEmail : data.signupEmail)) {
            alert('Enter a valid email!');
            return false;
        }

        // Password matching for both Login and Signup
        const password = isLogin ? data.loginPassword : data.signupPassword;
        const confirmPassword = isLogin ? data.loginConfirmPassword : data.signupConfirmPassword;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }

        return true;
    };

    // Email/Password Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Validate all three fields (email, password, confirm password)
        if (!validateForm(loginData, true)) return; 

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginData.loginEmail, loginData.loginPassword);
            const user = userCredential.user;
            login({
                id: user.uid,
                name: user.displayName || "User",
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);

            setLoginData({ loginEmail: '', loginPassword: '', loginConfirmPassword: '' });
            navigate('/profile');
        } catch (error) {
            alert("Login Failed: " + error.message);
        }
    };

    // Email/Password Signup
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(signupData, false)) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupData.signupEmail, signupData.signupPassword);
            const user = userCredential.user;

            // Optional: set display name (requires 'updateProfile' which is often imported from 'firebase/auth')
            // If updateProfile causes an error, remove the `if` block below.
            if (user.updateProfile) {
                await user.updateProfile({ displayName: signupData.signupName });
            }

            login({
                id: user.uid,
                name: signupData.signupName,
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);

            setSignupData({ signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '' });
            navigate('/profile');
        } catch (error) {
            alert("Signup Failed: " + error.message);
        }
    };

    // Social Logins
    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            login({
                id: user.uid,
                name: user.displayName || "User",
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);

            navigate('/profile');
        } catch (error) {
            alert("Social Login Failed: " + error.message);
        }
    };

    // Forgot Password handler <--- NEW FUNCTION
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const email = loginData.loginEmail;
        
        if (!email || email.trim() === '') {
            alert("Please enter your email in the 'Email' field above to receive the password reset link.");
            return;
        }

        try {
            // Check if the email is valid before sending the reset link
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Enter a valid email address to reset your password.');
                return;
            }

            await sendPasswordResetEmail(auth, email);
            alert(`Password reset link sent to ${email}. Check your inbox!`);
        } catch (error) {
            console.error("Password Reset Error:", error);
            alert("Failed to send password reset email. This may happen if the email is not registered or due to a network error. Error: " + error.message);
        }
    };


    return (
        <div className="container">
            <div className={`card ${isFlipped ? 'flip' : ''}`} id="card">

                {/* LOGIN FORM */}
                <form className="form-container login-container" onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <div className="social-icons">
                        <a onClick={() => handleSocialLogin(googleProvider)}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a onClick={() => handleSocialLogin(facebookProvider)}><i className="fa-brands fa-facebook-f"></i></a>
                        <a onClick={() => handleSocialLogin(githubProvider)}><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>

                    <input type="email" placeholder="Email" id="loginEmail" required
                        value={loginData.loginEmail} onChange={handleLoginChange} />
                    <input type="password" placeholder="Password" id="loginPassword" required
                        value={loginData.loginPassword} onChange={handleLoginChange} />
                    <input type="password" placeholder="Confirm Password" id="loginConfirmPassword" required
                        value={loginData.loginConfirmPassword} onChange={handleLoginChange} />

                    {/* FORGOT PASSWORD LINK HERE */}
                    <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
                        Forgot your password?
                    </a>

                    <button type="submit" id="loginBtn">Login</button>
                    <a onClick={() => setIsFlipped(true)} id="toSignup">Don't have an account? Sign Up</a>
                </form>

                {/* SIGNUP FORM */}
                <form className="form-container signup-container" onSubmit={handleSignupSubmit}>
                    <h1>Sign Up</h1>
                    <div className="social-icons">
                        <a onClick={() => handleSocialLogin(googleProvider)}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a onClick={() => handleSocialLogin(facebookProvider)}><i className="fa-brands fa-facebook-f"></i></a>
                        <a onClick={() => handleSocialLogin(githubProvider)}><i className="fa-brands fa-github"></i></a>
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