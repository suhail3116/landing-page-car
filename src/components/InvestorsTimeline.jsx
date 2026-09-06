import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';

export default function InvestorsTimeline() {
  return (
    <section className="investors-section" aria-label="Startup Backing and Validation">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="investors-header"
        >
          <span className="section-eyebrow">FUNDED &amp; VALIDATED</span>
          <h3>Backed by Visionary Automotive &amp; DeepTech Pioneers</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="investors-logos"
        >
          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="investor-item">
              <span className="inv-logo">HORIZON KINETIC VENTURES</span>
              <span className="inv-role">Lead Series A ($85M)</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="investor-item">
              <span className="inv-logo">AEROCARBON LABS</span>
              <span className="inv-role">Materials Partner</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="investor-item">
              <span className="inv-logo">QUANTUM ELECTROCHEM</span>
              <span className="inv-role">Solid-State Cell Foundry</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="investor-item">
              <span className="inv-logo">APEX MOTORSPORT GROUP</span>
              <span className="inv-role">Chassis Dynamics</span>
            </div>
          </TiltCard>
        </motion.div>

        {/* Milestones Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="timeline-wrapper"
        >
          <div className="timeline-track">
            <div className="timeline-node done">
              <div className="node-marker"></div>
              <div className="node-date">2024 Q3</div>
              <div className="node-title">Wind Tunnel &amp; Scale Mule</div>
              <div className="node-desc">Validated 0.198 Cd drag coefficient at Stuttgart Aerospace Tunnel.</div>
            </div>
            <div className="timeline-node done">
              <div className="node-marker"></div>
              <div className="node-date">2025 Q4</div>
              <div className="node-title">Nürburgring Nordschleife 6:42.8</div>
              <div className="node-desc">Pre-production GT-ONE shattered standard production EV lap records.</div>
            </div>
            <div className="timeline-node active">
              <div className="node-marker"></div>
              <div className="node-date">2026 NOW</div>
              <div className="node-title">Global Series A Unveiling</div>
              <div className="node-desc">Limited 500-unit Founder’s Edition allocations unlocked worldwide.</div>
            </div>
            <div className="timeline-node">
              <div className="node-marker"></div>
              <div className="node-date">2027 Q1</div>
              <div className="node-title">First Customer Deliveries</div>
              <div className="node-desc">Handover ceremonies at bespoke VALENCE Studios in Zurich and SF.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
