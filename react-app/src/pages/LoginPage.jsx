// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    auth,
    googleProvider,
    facebookProvider,
    githubProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from '../firebaseConfig';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isFlipped, setIsFlipped] = useState(false);

    const [loginData, setLoginData] = useState({ loginEmail: '', loginPassword: '' });
    const [signupData, setSignupData] = useState({ signupName: '', signupEmail: '', signupPassword: '' });

    // Input handlers
    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prev => ({ ...prev, [id]: value }));
    };
    const handleSignupChange = (e) => {
        const { id, value } = e.target;
        setSignupData(prev => ({ ...prev, [id]: value }));
    };

    // Validation
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
        return true;
    };

    // Email/Password Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
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
            setLoginData({ loginEmail: '', loginPassword: '' });
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
            login({
                id: user.uid,
                name: signupData.signupName,
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);
            setSignupData({ signupName: '', signupEmail: '', signupPassword: '' });
            navigate('/profile');
        } catch (error) {
            alert("Signup Failed: " + error.message);
        }
    };

    // Social Logins
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            login({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);
            navigate('/profile');
        } catch (error) {
            alert("Google Login Failed: " + error.message);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            login({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);
            navigate('/profile');
        } catch (error) {
            alert("Facebook Login Failed: " + error.message);
        }
    };

    const handleGithubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            login({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }, user.accessToken);
            navigate('/profile');
        } catch (error) {
            alert("GitHub Login Failed: " + error.message);
        }
    };

    return (
        <div className="container">
            <div className={`card ${isFlipped ? 'flip' : ''}`} id="card">

                {/* LOGIN FORM */}
                <form className="form-container login-container" onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <div className="social-icons">
                        <a onClick={handleGoogleLogin}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a onClick={handleFacebookLogin}><i className="fa-brands fa-facebook-f"></i></a>
                        <a onClick={handleGithubLogin}><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>

                    <input type="email" placeholder="Email" id="loginEmail" required
                        value={loginData.loginEmail} onChange={handleLoginChange} />
                    <input type="password" placeholder="Password" id="loginPassword" required
                        value={loginData.loginPassword} onChange={handleLoginChange} />

                    <button type="submit" id="loginBtn">Login</button>
                    <a onClick={() => setIsFlipped(true)} id="toSignup">Don't have an account? Sign Up</a>
                </form>

                {/* SIGNUP FORM */}
                <form className="form-container signup-container" onSubmit={handleSignupSubmit}>
                    <h1>Sign Up</h1>
                    <div className="social-icons">
                        <a onClick={handleGoogleLogin}><i className="fa-brands fa-google-plus-g"></i></a>
                        <a onClick={handleFacebookLogin}><i className="fa-brands fa-facebook-f"></i></a>
                        <a onClick={handleGithubLogin}><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>

                    <input type="text" placeholder="Full Name" id="signupName" required
                        value={signupData.signupName} onChange={handleSignupChange} />
                    <input type="email" placeholder="Email" id="signupEmail" required
                        value={signupData.signupEmail} onChange={handleSignupChange} />
                    <input type="password" placeholder="Password" id="signupPassword" required
                        value={signupData.signupPassword} onChange={handleSignupChange} />

                    <button type="submit" id="signupBtn">Sign Up</button>
                    <a onClick={() => setIsFlipped(false)} id="toLogin">Already have an account? Login</a>
                </form>

            </div>
        </div>
    );
}

export default LoginPage;
