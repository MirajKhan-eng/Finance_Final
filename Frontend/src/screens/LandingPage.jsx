import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-body">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="container nav-content">
          <div className="logo">Flux<span>.AI</span></div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <button onClick={() => navigate('/login')} className="btn-nav">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>Financial Unity,<br /><span>Powered by AI.</span></h1>
            <p>Flux unifies your data, analyzes spending intelligently, and detects fraud in real-time. It's the only financial decision engine you'll ever need.</p>
            <button onClick={() => navigate('/signup')} className="btn-primary">View Live Demo</button>
          </div>
          <div className="hero-image-wrapper">
            <img src="https://img.freepik.com/premium-photo/big-data-technology-business-finance-concept_31965-4023.jpg?semt=ais_hybrid&w=740&q=80" alt="Dashboard" className="hero-img" />
          </div>
        </div>
      </header>

      {/* Process Section (How It Works) */}
      <section id="how-it-works" className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>From Chaos to Clarity</h2>
            <p>A simple 4-step engine to power your financial health.</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-icon">🔗</div>
              <h3>Connect</h3>
              <p>Securely link banks and cards via Plaid API.</p>
            </div>
            <div className="process-step">
              <div className="step-icon">📊</div>
              <h3>Analyze</h3>
              <p>AI categorizes every transaction instantly.</p>
            </div>
            <div className="process-step">
              <div className="step-icon" style={{ color: '#ef4444' }}>🛡️</div>
              <h3>Protect</h3>
              <p>Real-time anomaly detection flags fraud.</p>
            </div>
            <div className="process-step">
              <div className="step-icon" style={{ color: '#10b981' }}>🧭</div>
              <h3>Guide</h3>
              <p>Smart nudges to save and optimize spend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="feature-block">
        <div className="container" style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
            <div className="feature-visual">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                     alt="Financial Growth and Savings" 
                     className="feature-img" />
            </div>
            <div className="feature-text">
                <h3>Optimize Your Spend Efficiency</h3>
                <p>We don't just track your money; we refine it. Flux analyzes your outflow to identify "vampire costs"—like unused subscriptions and impulse spikes—turning waste into wealth.</p>
                <ul className="check-list">
                    <li><span className="check-icon">✓</span> Detect Recurring Waste Patterns</li>
                    <li><span className="check-icon">✓</span> Smart Subscription Audit</li>
                    <li><span className="check-icon">✓</span> Reallocate "Dead Money" to Savings</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="feature-block alt">
        <div className="container" style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
            <div className="feature-visual">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl4hU0JbLRc5AMmfmgodZCPLVEvydMFXitcw&s" 
                     alt="Cybersecurity Shield and Guardian AI" 
                     className="feature-img" />
            </div>
            <div className="feature-text">
                <h3>We Stand Guard, So You Don't Have To.</h3>
                <p>Financial anxiety stops here. Our always-on security engine monitors your accounts 24/7, detecting threats and freezing fraud instantly—giving you total peace of mind.</p>
                <ul className="check-list">
                    <li><span className="check-icon">✓</span> Instant Push Notifications</li>
                    <li><span className="check-icon">✓</span> Location Mismatch Detection</li>
                    <li><span className="check-icon">✓</span> One-Tap Card Freezing</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-logo">Flux<span>.AI</span></div>
          <p style={{ opacity: 0.7 }}>Empowering smarter financial decisions for everyone.</p>
          <div className="copyright">&copy; 2024 Flux Project. Designed for the Hackathon.</div>
        </div>
      </footer>

      {/* --- STYLES --- */}
      <style>{`
        /* --- GLOBAL SCROLL FIXES --- */
        /* This ensures the browser knows the page should scroll */
        html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden !important; /* Stop horizontal scroll */
            overflow-y: auto !important;   /* Force vertical scroll */
            scroll-behavior: smooth;
        }

        .landing-body { 
            font-family: 'Inter', sans-serif; 
            background-color: #ffffff; 
            color: #1e293b; 
            line-height: 1.6;
            min-height: 100vh; /* Ensure it takes full height */
            width: 100%;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .landing-nav { padding: 20px 0; border-bottom: 1px solid #e2e8f0; background: rgba(255,255,255,0.95); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #1e293b; }
        .logo span { color: #2563eb; }
        .nav-links a { color: #64748b; font-weight: 500; margin-left: 30px; text-decoration: none; font-size: 0.95rem; transition: color 0.2s; }
        .nav-links a:hover { color: #2563eb; } 
        
        .btn-nav { background-color: #1e293b; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; margin-left: 20px; }
        
        .hero { padding: 100px 0; background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%); }
        .hero-container { display: flex; align-items: center; gap: 60px; }
        .hero h1 { font-size: 3.75rem; line-height: 1.1; font-weight: 800; margin-bottom: 24px; letter-spacing: -1.5px; }
        .hero h1 span { color: #2563eb; }
        .btn-primary { background-color: #2563eb; color: white; padding: 16px 36px; border-radius: 50px; font-weight: 600; border: none; cursor: pointer; font-size: 1rem; transition: transform 0.2s; }
        .btn-primary:hover { transform: scale(1.05); } 

        .hero-img { width: 100%; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
        
        .process-section { padding: 100px 0; background: white; }
        .section-header { text-align: center; margin-bottom: 70px; }
        .section-header h2 { font-size: 2.5rem; font-weight: 700; }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; text-align: center; }
        .process-step { padding: 20px; background: white; border-radius: 12px; transition: 0.3s; }
        .process-step:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .step-icon { width: 70px; height: 70px; background: #eff6ff; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 20px auto; color: #2563eb; }
        
        .feature-block { padding: 100px 0; display: flex; align-items: center; gap: 80px; }
        .feature-block.alt { flex-direction: row-reverse; background-color: #f8fafc; }
        .feature-text { flex: 1; }
        .feature-text h3 { font-size: 2.25rem; margin-bottom: 20px; color: #1e293b; font-weight: 700; line-height: 1.2; }
        .feature-text p { color: #64748b; font-size: 1.1rem; margin-bottom: 30px; }
        .feature-visual { flex: 1; }
        .feature-img { width: 100%; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); object-fit: cover; height: 400px; transition: transform 0.3s ease; }
        .feature-img:hover { transform: scale(1.02); }
        
        .check-list li { list-style: none; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; color: #1e293b; font-weight: 500; font-size: 1.05rem; }
        .check-icon { color: white; background: #10b981; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }

        footer { background-color: #0f172a; color: white; padding: 80px 0 40px; text-align: center; }
        .footer-logo { font-size: 1.8rem; font-weight: 800; margin-bottom: 20px; }
        .footer-logo span { color: #2563eb; }
        .copyright { margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); font-size: 0.9rem; }
        
        @media (max-width: 900px) { 
            .hero-container { flex-direction: column; text-align: center; } 
            .process-grid { grid-template-columns: 1fr 1fr; } 
            .nav-links { display: none; } 
            .feature-block { flex-direction: column !important; text-align: center; padding: 60px 0; }
            .feature-text { order: 2; }
            .feature-visual { order: 1; width: 100%; }
            .check-list { display: inline-block; text-align: left; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;