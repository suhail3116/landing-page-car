import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ToastProvider } from './components/Toast.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Manifesto from './components/Manifesto.jsx';
import StudioConfigurator from './components/StudioConfigurator.jsx';
import AcousticSynth from './components/AcousticSynth.jsx';
import RangeSimulator from './components/RangeSimulator.jsx';
import TechnologyBento from './components/TechnologyBento.jsx';
import ComparisonMatrix from './components/ComparisonMatrix.jsx';
import InvestorsTimeline from './components/InvestorsTimeline.jsx';
import GlobalStudios from './components/GlobalStudios.jsx';
import ReservationModal from './components/ReservationModal.jsx';
import Footer from './components/Footer.jsx';
import IntroLoader from './components/IntroLoader.jsx';
import ParticleCanvas from './components/ParticleCanvas.jsx';

function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [modalTier, setModalTier] = useState('founders');

  const handleOpenReservation = useCallback((tier = 'founders') => {
    setModalTier(tier);
    setReservationModalOpen(true);
  }, []);

  const handleCloseReservation = useCallback(() => {
    setReservationModalOpen(false);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setIsAudioActive(prev => !prev);
  }, []);

  return (
    <>
      {/* High-Tech Hypercar Boot Sequence */}
      <AnimatePresence>
        {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Constellation Particle Canvas Background */}
      <ParticleCanvas />

      {/* Dynamic Ambient Background Glow */}
      <div id="ambient-glow-bg" className="ambient-glow" aria-hidden="true"></div>

      {/* Header & Nav */}
      <Header
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onOpenReservation={handleOpenReservation}
      />

      <main id="main-content">
        {/* 1. Hero Showcase */}
        <Hero
          onOpenReservation={handleOpenReservation}
          onTriggerSynthScroll={() => {
            const synthSection = document.getElementById('sound-lab');
            if (synthSection) {
              synthSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* 2. Startup Vision / Manifesto */}
        <Manifesto />

        {/* 3. Interactive 360 Studio Configurator */}
        <StudioConfigurator onOpenReservation={handleOpenReservation} />

        {/* 4. Acoustic Synthesizer (Web Audio API) */}
        <AcousticSynth
          isAudioActive={isAudioActive}
          setIsAudioActive={setIsAudioActive}
        />

        {/* 5. Range & Telemetry Physics Simulator */}
        <RangeSimulator />

        {/* 6. Bento Grid Technology Innovations */}
        <TechnologyBento />

        {/* 7. Head to Head Competitive Comparison */}
        <ComparisonMatrix />

        {/* 8. Startup Backing & Developmental Milestones */}
        <InvestorsTimeline />

        {/* 9. Global Showrooms & Private Consultation */}
        <GlobalStudios />

        {/* 10. Limited Allocation Banner CTA */}
        <section className="reservation-banner-section" aria-label="Reservation Call to Action">
          <div className="section-container">
            <div className="res-banner-card">
              <div className="banner-text">
                <span className="section-eyebrow">LIMITED ALLOCATION WINDOW</span>
                <h2>Secure Your Place in Automotive History.</h2>
                <p>
                  Founder's Edition chassis are strictly restricted to 500 numbered units worldwide. 
                  Enjoy priority delivery, bespoke chassis engraving, and complimentary lifetime high-power supercharging.
                </p>
              </div>
              <div className="banner-cta">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="primary-btn pulse-glow"
                  onClick={() => handleOpenReservation('founders')}
                >
                  <span>Secure Allocation ($1,000 Deposit)</span>
                </motion.button>
                <span className="escrow-text">100% Fully Refundable Escrow Account</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Reservation Multi-Step Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={handleCloseReservation}
        initialTier={modalTier}
      />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <LandingPage />
    </ToastProvider>
  );
}
