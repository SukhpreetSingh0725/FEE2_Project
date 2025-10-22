// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // <-- ADD THIS IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* WRAP THE APP IN BROWSERROUTER */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);