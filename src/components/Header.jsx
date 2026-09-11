import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Header({ isAudioActive, onToggleAudio, onOpenReservation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="header-container">
        <a href="#hero" className="brand-logo" aria-label="VALENCE MOTORS Home">
          <svg className="logo-symbol" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3L32 30H24L18 17L12 30H4L18 3Z" fill="url(#logo-gradient)" />
            <path d="M18 10L25 24H21L18 18L15 24H11L18 10Z" fill="#00F0FF" opacity="0.9" />
            <defs>
              <linearGradient id="logo-gradient" x1="4" y1="3" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F0FF" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#FF2A55" />
              </linearGradient>
            </defs>
          </svg>
          <span className="brand-name">
            VALENCE<span className="brand-sub">MOTORS</span>
          </span>
        </a>

        {/* Desktop / Mobile Nav */}
        <nav className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`} id="nav-menu" aria-label="Main Navigation">
          <a href="#overview" className="nav-link" onClick={handleNavClick}>Overview</a>
          <a href="#configurator" className="nav-link" onClick={handleNavClick}>Studio</a>
          <a href="#sound-lab" className="nav-link" onClick={handleNavClick}>Acoustics</a>
          <a href="#simulator" className="nav-link" onClick={handleNavClick}>Range &amp; Specs</a>
          <a href="#technology" className="nav-link" onClick={handleNavClick}>Engineering</a>
          <a href="#aero-film" className="nav-link" onClick={handleNavClick}>Aero Film</a>
          <a href="#comparison" className="nav-link" onClick={handleNavClick}>Benchmark</a>
          <a href="#testdrive" className="nav-link" onClick={handleNavClick}>Studios</a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="quick-audio-btn"
            className={`icon-pill-btn ${isAudioActive ? 'active' : ''}`}
            onClick={onToggleAudio}
            aria-label="Toggle Hypercar Audio Synthesizer"
            title="EV Acoustic Synthesizer"
          >
            <span className="sound-wave-icon" aria-hidden="true">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
            <span className="btn-text">Audio Synth</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            className="primary-btn"
            onClick={() => onOpenReservation('founders')}
          >
            <span>Reserve GT-ONE</span>
            <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-toggle"
            className="mobile-toggle"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
