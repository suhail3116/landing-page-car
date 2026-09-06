import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';

export default function TechnologyBento() {
  return (
    <section id="technology" className="tech-bento-section" aria-label="Technology and Engineering">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-header-centered"
        >
          <span className="section-eyebrow">PROPRIETARY INNOVATIONS</span>
          <h2 className="section-title">Engineered Without Compromise</h2>
          <p className="section-subtitle">
            Five fundamental breakthrough systems that redefine zero-emissions hypercar performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bento-grid"
        >
          {/* Bento Item 1: Solid-State Battery & Powertrain */}
          <div className="bento-wide">
            <TiltCard maxTilt={8} glareColor="rgba(0, 240, 255, 0.28)">
              <div className="bento-card" style={{ height: '100%' }}>
                <div className="bento-visual">
                  <img
                    src="/assets/images/valence_chassis.jpg"
                    alt="Solid-State Battery Skateboard and Tri-Motor Chassis"
                    loading="lazy"
                    className="bento-img"
                  />
                  <div className="bento-gradient-overlay"></div>
                </div>
                <div className="bento-content">
                  <div className="tag-row">
                    <span className="tech-tag">PATENT PENDING</span>
                    <span className="tech-tag cyan">850 Wh/L DENSITY</span>
                  </div>
                  <h3>Solid-State Graphene Battery Architecture</h3>
                  <p>
                    Our structural 150 kWh solid-state pack functions as an integral chassis stress-bearing member. 
                    With zero liquid flammable solvent, our cells operate reliably from -30°C to +65°C without dendrite formation, 
                    yielding over 3,000 charge cycles before 90% capacity degradation.
                  </p>
                  <div className="bento-stat-strip">
                    <div className="b-stat">
                      <strong>150 kWh</strong>
                      <span>Total Energy</span>
                    </div>
                    <div className="b-stat">
                      <strong>800V</strong>
                      <span>Architecture</span>
                    </div>
                    <div className="b-stat">
                      <strong>480 kW</strong>
                      <span>Peak Regen</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 2: Biometric Augmented Cockpit */}
          <div>
            <TiltCard maxTilt={10} glareColor="rgba(0, 240, 255, 0.25)">
              <div className="bento-card" style={{ height: '100%' }}>
                <div className="bento-visual">
                  <img
                    src="/assets/images/valence_cockpit_alcantara.jpg"
                    alt="VALENCE Augmented Cockpit with Holographic HUD"
                    loading="lazy"
                    className="bento-img"
                  />
                  <div className="bento-gradient-overlay"></div>
                </div>
                <div className="bento-content">
                  <div className="tag-row">
                    <span className="tech-tag">INTERACTION</span>
                  </div>
                  <h3>Biometric Augmented Cockpit</h3>
                  <p>
                    Zero latency full-windshield AR HUD projection displays real-time track telemetry, racing lines, 
                    and thermal tire status directly in the driver’s peripheral line of sight.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 3: Active Morphing Aerodynamics */}
          <div>
            <TiltCard maxTilt={10} glareColor="rgba(255, 42, 85, 0.25)">
              <div className="bento-card" style={{ height: '100%' }}>
                <div className="bento-visual">
                  <img
                    src="/assets/images/valence_rear_mercury.jpg"
                    alt="Rear Active Aerodynamics and Diffuser"
                    loading="lazy"
                    className="bento-img"
                  />
                  <div className="bento-gradient-overlay"></div>
                </div>
                <div className="bento-content">
                  <div className="tag-row">
                    <span className="tech-tag">CFD OPTIMIZED</span>
                  </div>
                  <h3>Active Morphing Aero Wing</h3>
                  <p>
                    Dual electro-actuated carbon fiber strakes adapt in 80 milliseconds. Under heavy deceleration, 
                    the wing tilts 45° to act as an airbrake, shedding 100–0 mph in just 92 feet.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 4: Tri-Motor Torque Vectoring */}
          <div className="bento-wide">
            <TiltCard maxTilt={8} glareColor="rgba(255, 42, 85, 0.25)">
              <div className="bento-card bento-text-card" style={{ height: '100%' }}>
                <div className="tag-row">
                  <span className="tech-tag crimson">1,450 HP TOTAL</span>
                  <span className="tech-tag">1,350 NM TORQUE</span>
                </div>
                <h3>Independent Millisecond Torque Vectoring</h3>
                <p>
                  Two permanent-magnet motors at the rear axle and one ultra-compact axial flux motor on the front axle 
                  enable individual wheel yaw control. The system rotates the car effortlessly into corners, virtually 
                  eliminating understeer under 1.6G lateral cornering loads.
                </p>
                <div className="feature-checklist">
                  <div className="check-item">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1,000Hz feedback loop per wheel</span>
                  </div>
                  <div className="check-item">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Silicon Carbide (SiC) inverters with 99.2% efficiency</span>
                  </div>
                  <div className="check-item">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Carbon-ceramic Brembo 420mm 10-piston calipers</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
