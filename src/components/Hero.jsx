import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';

const HERO_COLORS = [
  { key: 'mercury', name: 'Liquid Mercury', img: '/assets/images/valence_mercury.jpg', gradient: 'linear-gradient(135deg, #f1f5f9, #94a3b8, #cbd5e1)', glow: 'rgba(212, 216, 224, 0.4)' },
  { key: 'obsidian', name: 'Cosmic Obsidian', img: '/assets/images/valence_obsidian.jpg', gradient: 'linear-gradient(135deg, #1f2937, #030712, #111827)', glow: 'rgba(0, 240, 255, 0.3)' },
  { key: 'crimson', name: 'Apex Crimson', img: '/assets/images/valence_crimson.jpg', gradient: 'linear-gradient(135deg, #f87171, #dc2626, #7f1d1d)', glow: 'rgba(255, 42, 85, 0.4)' },
  { key: 'azure', name: 'Cyber Azure', img: '/assets/images/valence_azure.jpg', gradient: 'linear-gradient(135deg, #38bdf8, #0284c7, #0c4a6e)', glow: 'rgba(0, 240, 255, 0.4)' },
  { key: 'emerald', name: 'Emerald Nebula', img: '/assets/images/valence_emerald.jpg', gradient: 'linear-gradient(135deg, #34d399, #059669, #064e3b)', glow: 'rgba(16, 185, 129, 0.4)' },
  { key: 'amber', name: 'Solar Amber', img: '/assets/images/valence_amber.jpg', gradient: 'linear-gradient(135deg, #fbbf24, #d97706, #78350f)', glow: 'rgba(217, 119, 6, 0.4)' }
];

export default function Hero({ onOpenReservation, onTriggerSynthScroll }) {
  const [heroColor, setHeroColor] = useState(HERO_COLORS[0]);
  const [typedTitle, setTypedTitle] = useState('');
  const [heroMode, setHeroMode] = useState('photo');
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);

  const titles = [
    '1,450 HP Tri-Motor Vectoring',
    '620-Mile Solid-State Graphene Pack',
    '0–60 in 1.84s Supersonic Launch',
    '0.198 Cd Morphing Aerodynamics'
  ];

  useEffect(() => {
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const current = titles[titleIdx];
      if (isDeleting) {
        setTypedTitle(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypedTitle(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 30 : 60;

      if (!isDeleting && charIdx === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        speed = 350;
      }

      timer = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="hero-section" aria-label="Hero Showcase">
      <div className="hero-backdrop" aria-hidden="true"></div>

      <div className="section-container hero-content">
        {/* Startup Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="status-badge-container"
        >
          <span className="pulse-dot"></span>
          <span className="status-badge-text">SERIES A UNVEILING • PRODUCTION VALIDATED FOR 2027</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title"
        >
          THE ELECTRIC VELOCITY<br />
          <span className="gradient-text">RENAISSANCE.</span>
        </motion.h1>

        {/* Dynamic Typing Sub-Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#00F0FF',
            fontWeight: 700,
            marginBottom: '1rem',
            minHeight: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.2rem',
          }}
        >
          <span>{typedTitle}</span>
          <span className="live-dot" style={{ width: '8px', height: '18px', borderRadius: '2px', animation: 'pulseDot 0.8s infinite' }}></span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hero-description"
        >
          Architected from the molecular level up. Featuring our proprietary 850 Wh/L solid-state graphene pack, 
          tri-motor vectoring delivering 1,450 horsepower, and a sub-2 second launch without thermal throttling.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hero-cta-group"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="primary-btn pulse-glow"
            onClick={() => onOpenReservation('founders')}
          >
            <span>Pre-Order Founder's Edition</span>
            <span className="badge-tag">Only 88 Left</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#configurator"
            className="secondary-btn"
          >
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Launch 360° Studio</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#sound-lab"
            className="ghost-btn"
            onClick={onTriggerSynthScroll}
          >
            <svg className="icon-svg pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span>Hear 1,450 HP Acoustic Synth</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="ghost-btn"
            onClick={() => {
              setHeroMode('video');
              const stage = document.querySelector('.car-stage');
              if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <span>Watch Kinetic Reel (10s)</span>
          </motion.button>
        </motion.div>

        {/* Hero Car Showcase with Floating 3D Tilt Telemetry Badges */}
        <div className="hero-visual-wrapper">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="car-stage"
          >
            {/* View Mode Toggle: Stills / Video */}
            <div className="hero-mode-toggle">
              <button
                type="button"
                className={`mode-btn ${heroMode === 'photo' ? 'active' : ''}`}
                onClick={() => setHeroMode('photo')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Studio Stills</span>
              </button>
              <button
                type="button"
                className={`mode-btn ${heroMode === 'video' ? 'active' : ''}`}
                onClick={() => setHeroMode('video')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
                <span>Kinetic Aero Reel</span>
                <span className="live-pill">HD</span>
              </button>
            </div>

            {heroMode === 'video' ? (
              <div className="hero-video-box">
                <video
                  src="/assets/videos/Technical_Aesthetic_Paramete.mp4"
                  autoPlay
                  loop
                  muted={heroVideoMuted}
                  playsInline
                  className="hero-car-video"
                />
                <div className="hero-video-hud">
                  <div className="hud-badge-sm">WIND TUNNEL SIMULATION // 0.198 Cd</div>
                  <button
                    type="button"
                    className="hero-video-mute-btn"
                    onClick={() => setHeroVideoMuted(prev => !prev)}
                    title={heroVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                    aria-label={heroVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {heroVideoMuted ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <motion.img
                  key={heroColor.key}
                  initial={{ opacity: 0.7, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  src={heroColor.img}
                  alt={`VALENCE GT-ONE ${heroColor.name}`}
                  className="hero-car-img"
                  loading="eager"
                />
                <div
                  className="ambient-underglow"
                  style={{ background: `radial-gradient(ellipse at center, ${heroColor.glow} 0%, transparent 75%)` }}
                  aria-hidden="true"
                />

                {/* Quick Hero Finish Swatches */}
                <div className="hero-color-bar">
                  <span className="hero-color-label">{heroColor.name}</span>
                  <div className="hero-color-pills">
                    {HERO_COLORS.map(c => (
                      <motion.button
                        key={c.key}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        className={`hero-color-pill ${heroColor.key === c.key ? 'active' : ''}`}
                        style={{ background: c.gradient }}
                        onClick={() => setHeroColor(c)}
                        title={c.name}
                        aria-label={`Switch finish to ${c.name}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Floating Telemetry Chips wrapped in 3D TiltCard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="telemetry-grid"
            aria-label="Key Performance Figures"
          >
            <TiltCard maxTilt={15} glareColor="rgba(0, 240, 255, 0.3)">
              <div className="telemetry-card">
                <div className="telemetry-val">
                  1.84<span className="unit">s</span>
                </div>
                <div className="telemetry-label">0–60 MPH</div>
                <div className="telemetry-sub">Sub-2s Launch Control</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={15} glareColor="rgba(0, 240, 255, 0.3)">
              <div className="telemetry-card">
                <div className="telemetry-val">
                  1,450<span className="unit">HP</span>
                </div>
                <div className="telemetry-label">TRI-MOTOR VECTORING</div>
                <div className="telemetry-sub">Permanent Magnet Dual-Core</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={15} glareColor="rgba(0, 240, 255, 0.3)">
              <div className="telemetry-card">
                <div className="telemetry-val">
                  620<span className="unit">MI</span>
                </div>
                <div className="telemetry-label">SOLID-STATE RANGE</div>
                <div className="telemetry-sub">150 kWh Graphene Matrix</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={15} glareColor="rgba(0, 240, 255, 0.3)">
              <div className="telemetry-card">
                <div className="telemetry-val">
                  255<span className="unit">MPH</span>
                </div>
                <div className="telemetry-label">TOP TRACK VELOCITY</div>
                <div className="telemetry-sub">Active Downforce Shift</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={15} glareColor="rgba(0, 240, 255, 0.3)">
              <div className="telemetry-card">
                <div className="telemetry-val">
                  12<span className="unit">MIN</span>
                </div>
                <div className="telemetry-label">10% TO 80% CHARGE</div>
                <div className="telemetry-sub">800V Hyper-Charge System</div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
