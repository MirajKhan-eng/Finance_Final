import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would check credentials here.
    // For now, we simply navigate to the Dashboard.
    navigate('/app/dashboard');
  };

  return (
    <div className="auth-body">
      <div className="login-visual">
        <div className="visual-content">
          <h2>Financial clarity, finally.</h2>
          <p>Join thousands of professionals who trust Capital to secure and optimize their wealth.</p>
        </div>
      </div>

      <div className="login-form-container">
        <div className="login-card">
          <div className="logo">Capital<span> OS</span></div>
          <div className="header-text">
            <h1>Welcome back</h1>
            <p>Please enter your details to Login.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Password</label>
                <a href="#" style={{ fontSize: '0.85rem', color: '#2563EB', textDecoration: 'none' }}>Forgot?</a>
              </div>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">Login</button>
          </form>

          <div className="form-footer">
            Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}>Sign up</span>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .auth-body { font-family: 'Inter', sans-serif; height: 100vh; display: flex; background-color: #ffffff; }
        .login-visual { flex: 1; background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'); background-size: cover; background-position: center; position: relative; display: flex; align-items: flex-end; padding: 60px; }
        .login-visual::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(37, 99, 235, 0.2), rgba(30, 58, 138, 0.8)); }
        .visual-content { position: relative; z-index: 2; color: white; max-width: 400px; }
        .visual-content h2 { font-size: 2rem; font-weight: 700; margin-bottom: 10px; }
        .login-form-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .login-card { width: 100%; max-width: 400px; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 40px; }
        .logo span { color: #2563EB; }
        .header-text h1 { font-size: 1.8rem; font-weight: 700; color: #1E293B; margin-bottom: 8px; }
        .header-text p { color: #64748B; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 500; color: #334155; margin-bottom: 8px; }
        .input-field { width: 100%; padding: 12px 16px; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 1rem; outline: none; transition: 0.3s; }
        .input-field:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .btn-login { width: 100%; background-color: #2563EB; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .btn-login:hover { background-color: #1E40AF; }
        .form-footer { margin-top: 24px; text-align: center; font-size: 0.9rem; color: #64748B; }
        @media (max-width: 900px) { .login-visual { display: none; } }
      `}</style>
    </div>
  );
};

export default LoginPage;