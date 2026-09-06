import React, { useState } from 'react';
import { useToast } from './Toast.jsx';

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Subscribed to VALENCE Insider Updates');
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a href="#hero" className="brand-logo footer-logo">
              <svg className="logo-symbol" viewBox="0 0 36 36" fill="none">
                <path d="M18 3L32 30H24L18 17L12 30H4L18 3Z" fill="url(#footer-logo-grad)" />
                <defs>
                  <linearGradient id="footer-logo-grad" x1="4" y1="3" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F0FF" />
                    <stop offset="1" stopColor="#FF2A55" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="brand-name">
                VALENCE<span className="brand-sub">MOTORS</span>
              </span>
            </a>
            <p className="footer-tagline">
              Pioneering the electric velocity renaissance through quantum solid-state chemistry and aerospace engineering.
            </p>
            <div className="social-links">
              <a href="#" aria-label="VALENCE on X / Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" aria-label="VALENCE on YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="#" aria-label="VALENCE on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              </a>
              <a href="#" aria-label="VALENCE on Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h5>Vehicles</h5>
            <ul>
              <li><a href="#hero">VALENCE GT-ONE</a></li>
              <li><a href="#configurator">Studio Configurator</a></li>
              <li><a href="#sound-lab">Harmonic Acoustics</a></li>
              <li><a href="#">VALENCE X-Cross (Concept)</a></li>
              <li><a href="#">Pre-Owned Program</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Technology</h5>
            <ul>
              <li><a href="#technology">Solid-State Chemistry</a></li>
              <li><a href="#technology">Neural Pilot 4.0</a></li>
              <li><a href="#technology">SiC Tri-Motor Inverters</a></li>
              <li><a href="#simulator">Range Physics Simulator</a></li>
              <li><a href="#">Engineering Whitepaper</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#overview">About VALENCE</a></li>
              <li><a href="#investors">Investor Relations</a></li>
              <li><a href="#">Careers (We're Hiring)</a></li>
              <li><a href="#">Press Kit &amp; Assets</a></li>
              <li><a href="#testdrive">Global Studios</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-newsletter-col">
            <h5>Insider Updates</h5>
            <p>Receive confidential development updates, track trial telemetry, and private event invites.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-with-button">
                <input
                  type="email"
                  id="nl-email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <button type="submit" className="submit-arrow-btn" aria-label="Subscribe to newsletter">
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="form-feedback" aria-live="polite">
                ✓ Subscribed to confidential developer dispatches.
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>&copy; 2026 VALENCE MOTORS, INC. ALL RIGHTS RESERVED.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Allocation</a>
            <a href="#">Security Protocol</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
