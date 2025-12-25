import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  const form = e.target;

  await fetch("http://localhost:8000/auth/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }),
  });

  navigate("/login");
};

  return (
    <div className="auth-body">
      <div className="signup-visual">
        <div className="visual-content">
          <h2>Start your financial evolution.</h2>
          <p>Create an account to access real-time analytics, fraud protection, and smart savings tools instantly.</p>
        </div>
      </div>

      <div className="signup-form-container">
        <div className="signup-card">
          <div className="logo">Flux<span>.AI</span></div>

          <div className="header-text">
            <h1>Create an account</h1>
            <p>Start your 30-day free trial. No credit card required.</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="full_name"
                type="text"
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                className="input-field"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="input-field"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <span style={{ color: '#2563EB' }}>Terms of Service</span>.
              </label>
            </div>

            <button type="submit" className="btn-signup">
              Create Account
            </button>
          </form>

          <div className="form-footer">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .auth-body { font-family: 'Inter', sans-serif; height: 100vh; display: flex; background-color: #ffffff; }
        .signup-visual { flex: 1; background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'); background-size: cover; background-position: center; position: relative; display: flex; align-items: flex-end; padding: 60px; }
        .signup-visual::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(37, 99, 235, 0.2), rgba(30, 58, 138, 0.85)); }
        .visual-content { position: relative; z-index: 2; color: white; max-width: 450px; }
        .signup-form-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .signup-card { width: 100%; max-width: 400px; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 30px; }
        .logo span { color: #2563EB; }
        .header-text h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }
        .header-text p { color: #64748B; margin-bottom: 25px; }
        .form-group { margin-bottom: 18px; }
        .input-field { width: 100%; padding: 12px 16px; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 1rem; }
        .btn-signup { width: 100%; background-color: #2563EB; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; }
        .btn-signup:hover { background-color: #1E40AF; }
        .form-footer { margin-top: 24px; text-align: center; font-size: 0.9rem; color: #64748B; }
        @media (max-width: 900px) { .signup-visual { display: none; } }
      `}</style>
    </div>
  );
};

export default SignupPage;
