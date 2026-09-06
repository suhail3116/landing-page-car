import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';

export default function Manifesto() {
  return (
    <section id="overview" className="manifesto-section" aria-label="Startup Vision">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="manifesto-header"
        >
          <span className="section-eyebrow">THE VALENCE THESIS</span>
          <h2 className="section-title">Built for the Physics of Tomorrow.</h2>
          <p className="manifesto-lead">
            Legacy supercar manufacturers build internal combustion monuments. Conventional EV companies produce heavy commuter appliances.{' '}
            <strong>
              VALENCE was founded to fuse aerospace-grade carbon fiber monocoques, solid-state battery chemistry, and autonomous neural telemetry 
              into pure driving emotion.
            </strong>
          </p>
        </motion.div>

        {/* Key Pillars Grid with 3D Tilt Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pillars-grid"
        >
          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3>Solid-State Graphene</h3>
              <p>
                Eliminating liquid electrolytes removes fire risk, halves pack weight, and guarantees zero thermal throttling even through 10 consecutive Nürburgring hot laps.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3>Active Aerodynamic Telemetry</h3>
              <p>
                Active rear wing, carbon vortex generators, and floor-effect venturi channels morph real-time aerodynamic load to deliver up to 1,200 lbs of downforce.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Neural OS 4.0</h3>
              <p>
                Dual 3,200 TOPS inference engines read road micro-irregularities 1,000 times per second, pre-loading active magnetic dampers before your tires meet the apex.
              </p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
