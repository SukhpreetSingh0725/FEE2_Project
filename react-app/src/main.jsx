// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom'; 
import { ThemeProvider } from "./context/ThemeContext.jsx";// <-- ADD THIS IMPORT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>

  </React.StrictMode>
);