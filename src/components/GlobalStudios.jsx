import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';
import { useToast } from './Toast.jsx';

const STUDIOS = [
  { id: 'sf', name: 'San Francisco', desc: 'Presidio Design Center • Private Coastal Circuit Access', locationVal: 'San Francisco' },
  { id: 'zurich', name: 'Zürich', desc: 'Bahnhofstrasse Atelier • Alpine Pass Test Program', locationVal: 'Zurich' },
  { id: 'tokyo', name: 'Tokyo', desc: 'Ginza 6 Curation Lounge • Fuji Speedway Dynamic Day', locationVal: 'Tokyo' },
  { id: 'london', name: 'London', desc: 'Mayfair Berkeley Square • Silverstone Circuit VIP Experience', locationVal: 'London' }
];

export default function GlobalStudios() {
  const { showToast } = useToast();
  const [selectedStudio, setSelectedStudio] = useState(STUDIOS[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'San Francisco',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  });

  const handleStudioClick = (studio) => {
    setSelectedStudio(studio);
    setFormData(prev => ({ ...prev, location: studio.locationVal }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`VIP Consultation requested for ${formData.name} at ${formData.location} Studio`, '✓');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: selectedStudio.locationVal,
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
    });
  };

  return (
    <section id="testdrive" className="studios-section" aria-label="Book a Test Drive">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="studios-grid"
        >
          {/* Studios Info */}
          <div className="studios-info-card">
            <span className="section-eyebrow">GLOBAL SHOWROOMS</span>
            <h2 className="section-title">Experience the Prototype in Person</h2>
            <p>
              VALENCE Studios are modern architectural hubs designed for private vehicle curation, 
              engineering consultations, and closed-circuit test track sessions.
            </p>

            <div className="studio-cities-list">
              {STUDIOS.map(s => (
                <TiltCard key={s.id} maxTilt={8} glareColor="rgba(0, 240, 255, 0.2)">
                  <div
                    className={`city-card ${selectedStudio.id === s.id ? 'active' : ''}`}
                    onClick={() => handleStudioClick(s)}
                  >
                    <h4>{s.name}</h4>
                    <p>{s.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Booking Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="booking-form-card"
          >
            <h3>Schedule a Private Consultation</h3>
            <p className="form-desc">
              Reserve a 45-minute technical briefing and closed-circuit prototype passenger experience with our chief development drivers.
            </p>

            <form className="clean-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="td-name">Full Legal Name</label>
                <input
                  type="text"
                  id="td-name"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="td-email">Corporate or Personal Email</label>
                  <input
                    type="email"
                    id="td-email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="td-phone">Mobile Phone</label>
                  <input
                    type="tel"
                    id="td-phone"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="td-location">Preferred Studio</label>
                  <select
                    id="td-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-select"
                  >
                    <option value="San Francisco">San Francisco Studio (Presidio)</option>
                    <option value="Zurich">Zürich Atelier (Switzerland)</option>
                    <option value="Tokyo">Tokyo Lounge (Ginza)</option>
                    <option value="London">London Studio (Mayfair)</option>
                    <option value="Dubai">Dubai Studio (DIFC)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="td-date">Requested Date</label>
                  <input
                    type="date"
                    id="td-date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="primary-btn full-width"
              >
                <span>Confirm VIP Consultation Request</span>
              </motion.button>

              <p className="security-note">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Strict confidentiality guaranteed. Concierge responds within 2 business hours.</span>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
