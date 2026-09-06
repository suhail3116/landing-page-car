import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'INITIALIZING SILICON CARBIDE (SiC) INVERTERS...',
    'CALIBRATING 150 kWh SOLID-STATE GRAPHENE MATRIX...',
    'SYNCHRONIZING DUAL 3,200 TOPS NEURAL TELEMETRY...',
    'ALIGNING ACTIVE MORPHING CARBON AERO STRAKES...',
    '1,450 HP TRI-MOTOR TORQUE VECTORING ONLINE.',
    'VALENCE GT-ONE TELEMETRY READY.'
  ];

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2800; // 2.8s fast cinematic boot

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const calc = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calc);

      const sIndex = Math.min(steps.length - 1, Math.floor((elapsed / duration) * steps.length));
      setStepIndex(sIndex);

      if (calc >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#05070B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#fff',
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Center Hologram Logo Ring */}
      <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px dashed rgba(0, 240, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 42, 85, 0.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
            <path d="M18 3L32 30H24L18 17L12 30H4L18 3Z" fill="url(#intro-logo-g)" />
            <path d="M18 10L25 24H21L18 18L15 24H11L18 10Z" fill="#00F0FF" opacity="0.9" />
            <defs>
              <linearGradient id="intro-logo-g" x1="4" y1="3" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F0FF" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#FF2A55" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Startup Brand Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ textAlign: 'center', marginBottom: '1.5rem' }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            marginBottom: '0.25rem',
          }}
        >
          VALENCE <span style={{ color: '#00F0FF' }}>MOTORS</span>
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            color: '#64748B',
            textTransform: 'uppercase',
          }}
        >
          THE ELECTRIC VELOCITY RENAISSANCE
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00F0FF, #3B82F6, #FF2A55)',
            boxShadow: '0 0 15px #00F0FF',
            borderRadius: '9999px',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {/* Percentage Counter & Status Readout */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '380px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem',
          color: '#94A3B8',
          marginBottom: '1.75rem',
        }}
      >
        <span style={{ color: '#00F0FF', fontWeight: 700 }}>
          {steps[stepIndex]}
        </span>
        <span style={{ fontWeight: 800, color: '#fff' }}>{progress}%</span>
      </div>

      {/* Quick Skip Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        style={{
          fontSize: '0.75rem',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#64748B',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          cursor: 'pointer',
        }}
      >
        ENTER SHOWROOM &rarr;
      </motion.button>
    </motion.div>
  );
}

export default IntroLoader;
