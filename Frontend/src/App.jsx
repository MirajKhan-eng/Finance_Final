// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import the screens
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import MainApp from './MainApp'; // This is your Dashboard Code

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 1. Landing Page (The default home /) */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 3. The Main Application (Dashboard) 
            User goes here after logging in.
            The /* allows MainApp to handle its own sub-routes if needed.
        */}
        <Route path="/app/*" element={<MainApp />} />

        {/* Catch-all: Redirect random URLs back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;