// src/pages/LoginPage.jsx

import React, { useState } from 'react';

function LoginPage() {
  // 1. State for the "Flip Card" Animation/Display
  // 'isFlipped' controls which form (Login or Signup) is visible.
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

  // 4. Input Change Handlers
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData(prevData => ({ ...prevData, [id]: value }));
  };

  // 5. Validation Logic (Condensed from your old JavaScript)
  const validateForm = (data, isLogin) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check mandatory fields
    const fields = Object.values(data);
    if (fields.some(field => field.trim() === '')) {
      alert('All fields are mandatory!');
      return false;
    }
    
    // Check Email
    if (!emailRegex.test(isLogin ? data.loginEmail : data.signupEmail)) {
      alert('Enter valid email!');
      return false;
    }
    
    // Check Passwords Match
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
      console.log('Login Data:', loginData);
      alert('Login Successful! Data logged to console.');
      // Add API call or further logic here
      setLoginData({ loginEmail: '', loginPassword: '', loginConfirmPassword: '' }); // Clear form
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateForm(signupData, false)) {
      console.log('Signup Data:', signupData);
      alert('Signup Successful! Data logged to console.');
      // Add API call or further logic here
      setSignupData({ signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '' }); // Clear form
    }
  };


  return (
    <div className="container">
      {/* Dynamic className based on state */}
      <div className={`card ${isFlipped ? 'flip' : ''}`} id="card"> 
        
        {/* LOGIN FORM */}
        {/* Converted to a form element with onSubmit handler */}
        <form className="form-container login-container" onSubmit={handleLoginSubmit}> 
          <h1>Login</h1>
          <div className="social-icons">
              <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-github"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          
          {/* Controlled Inputs: value={state} onChange={handler} */}
          <input type="email" placeholder="Email" id="loginEmail" required 
            value={loginData.loginEmail} onChange={handleLoginChange} />
          <input type="password" placeholder="Password" id="loginPassword" required 
            value={loginData.loginPassword} onChange={handleLoginChange} />
          <input type="password" placeholder="Confirm Password" id="loginConfirmPassword" required 
            value={loginData.loginConfirmPassword} onChange={handleLoginChange} />
            
          <button type="submit" id="loginBtn">Login</button>
          
          {/* Replaced old JavaScript listener with a React event handler */}
          <a onClick={() => setIsFlipped(true)} id="toSignup">Don't have an account? Sign Up</a> 
        </form>

        {/* SIGNUP FORM */}
        {/* Converted to a form element with onSubmit handler */}
        <form className="form-container signup-container" onSubmit={handleSignupSubmit}> 
          <h1>Sign Up</h1>
          <div className="social-icons">
              <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-github"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          
          {/* Controlled Inputs: value={state} onChange={handler} */}
          <input type="text" placeholder="Full Name" id="signupName" required
            value={signupData.signupName} onChange={handleSignupChange} />
          <input type="email" placeholder="Email" id="signupEmail" required
            value={signupData.signupEmail} onChange={handleSignupChange} />
          <input type="password" placeholder="Password" id="signupPassword" required
            value={signupData.signupPassword} onChange={handleSignupChange} />
          <input type="password" placeholder="Confirm Password" id="signupConfirmPassword" required
            value={signupData.signupConfirmPassword} onChange={handleSignupChange} />
            
          <button type="submit" id="signupBtn">Sign Up</button>
          
          {/* Replaced old JavaScript listener with a React event handler */}
          <a onClick={() => setIsFlipped(false)} id="toLogin">Already have an account? Login</a> 
        </form>
      </div>
    </div>
  );
}

export default LoginPage;