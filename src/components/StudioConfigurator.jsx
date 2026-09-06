import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useToast } from './Toast.jsx';

const COLOR_OPTIONS = [
  {
    key: 'mercury',
    name: 'Liquid Mercury',
    hex: '#D4D8E0',
    price: 0,
    image: '/assets/images/valence_mercury.jpg',
    rearImage: '/assets/images/valence_rear_mercury.jpg',
    gradient: 'linear-gradient(135deg, #f1f5f9, #94a3b8, #cbd5e1)'
  },
  {
    key: 'obsidian',
    name: 'Cosmic Obsidian',
    hex: '#111827',
    price: 2500,
    image: '/assets/images/valence_obsidian.jpg',
    rearImage: '/assets/images/valence_rear_obsidian.jpg',
    gradient: 'linear-gradient(135deg, #1f2937, #030712, #111827)'
  },
  {
    key: 'crimson',
    name: 'Apex Crimson',
    hex: '#EF4444',
    price: 3500,
    image: '/assets/images/valence_crimson.jpg',
    rearImage: '/assets/images/valence_rear_crimson.jpg',
    gradient: 'linear-gradient(135deg, #f87171, #dc2626, #7f1d1d)'
  },
  {
    key: 'azure',
    name: 'Cyber Azure',
    hex: '#06B6D4',
    price: 3000,
    image: '/assets/images/valence_azure.jpg',
    rearImage: '/assets/images/valence_rear_azure.jpg',
    gradient: 'linear-gradient(135deg, #38bdf8, #0284c7, #0c4a6e)'
  },
  {
    key: 'emerald',
    name: 'Emerald Nebula',
    hex: '#10B981',
    price: 3500,
    image: '/assets/images/valence_emerald.jpg',
    rearImage: '/assets/images/valence_rear_emerald.jpg',
    gradient: 'linear-gradient(135deg, #34d399, #059669, #064e3b)'
  },
  {
    key: 'amber',
    name: 'Solar Amber',
    hex: '#D97706',
    price: 4000,
    image: '/assets/images/valence_amber.jpg',
    rearImage: '/assets/images/valence_rear_amber.jpg',
    gradient: 'linear-gradient(135deg, #fbbf24, #d97706, #78350f)'
  }
];

const WHEEL_OPTIONS = [
  {
    key: '21-blade',
    name: '21" Carbon Aero Blade',
    desc: 'Forged carbon fiber aerodynamic covers (0.198 Cd)',
    price: 0,
    badge: 'Included'
  },
  {
    key: '22-cyclone',
    name: '22" Forged Cyclone',
    desc: 'Ultra-lightweight titanium track spec, Cup 2R tires',
    price: 4500,
    badge: '+$4,500'
  },
  {
    key: '20-turbine',
    name: '20" Stealth Turbine',
    desc: 'Acoustic vibration dampening, touring comfort',
    price: 2000,
    badge: '+$2,000'
  }
];

const INTERIOR_OPTIONS = [
  {
    key: 'alcantara',
    name: 'Obsidian Alcantara',
    price: 0,
    label: 'Obsidian Alcantara (Included)',
    image: '/assets/images/valence_cockpit_alcantara.jpg',
    badge: 'Electric Cyan HUD'
  },
  {
    key: 'leather',
    name: 'Arctic Nappa Leather',
    price: 3500,
    label: 'Arctic Nappa Leather (+$3,500)',
    image: '/assets/images/valence_cockpit_leather.jpg',
    badge: 'Champagne Gold HUD'
  },
  {
    key: 'carbon',
    name: 'Exposed Matte Carbon Race Spec',
    price: 6000,
    label: 'Exposed Matte Carbon Race Spec (+$6,000)',
    image: '/assets/images/valence_cockpit_carbon.jpg',
    badge: 'Apex Racing Red HUD'
  }
];

const UNDERGLOW_OPTIONS = [
  { color: '#00f0ff', title: 'Cyan Pulse' },
  { color: '#ff2a55', title: 'Crimson Track' },
  { color: '#a855f7', title: 'Ultraviolet' },
  { color: '#ffffff', title: 'Pure White' },
  { color: 'transparent', title: 'Stealth Off' }
];

const VIEW_MAP = {
  front: '/assets/images/valence_mercury.jpg',
  rear: '/assets/images/valence_rear_mercury.jpg',
  cockpit: '/assets/images/valence_cockpit_alcantara.jpg',
  chassis: '/assets/images/valence_chassis.jpg'
};

export default function StudioConfigurator({ onOpenReservation }) {
  const { showToast } = useToast();
  const [view, setView] = useState('front');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_OPTIONS[0]);
  const [selectedInterior, setSelectedInterior] = useState(INTERIOR_OPTIONS[0]);
  const [selectedUnderglow, setSelectedUnderglow] = useState('#00f0ff');

  const baseMSRP = 188000;
  const optionsTotal = selectedColor.price + selectedWheel.price + selectedInterior.price;
  const grandTotal = baseMSRP + optionsTotal;

  const currentImageSrc = 
    view === 'front' ? selectedColor.image :
    view === 'rear' ? selectedColor.rearImage :
    view === 'cockpit' ? selectedInterior.image :
    VIEW_MAP[view];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (view === 'cockpit' || view === 'chassis') {
      setView('front');
    }
    showToast(`Selected Finish: ${color.name}`);
  };

  const handleInteriorSelect = (interior) => {
    setSelectedInterior(interior);
    setView('cockpit');
    showToast(`Cockpit Theme: ${interior.name} (${interior.badge})`);
  };

  const handleWheelSelect = (wheel) => {
    setSelectedWheel(wheel);
    showToast(`Selected Wheels: ${wheel.name}`);
  };

  return (
    <section id="configurator" className="configurator-section" aria-label="Interactive Studio Configurator">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-eyebrow">CUSTOMIZATION STUDIO</span>
          <h2 className="section-title">Configure Your Specification</h2>
          <p className="section-subtitle">
            Select camera perspective, aerospace paint finishes, wheel architectures, and aero packages in real time.
          </p>
        </div>

        <div className="configurator-workspace">
          {/* Visual Stage */}
          <div className="config-visual-col">
            <div className="view-selector-bar" role="tablist" aria-label="Car Angle View">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`view-tab ${view === 'front' ? 'active' : ''}`}
                onClick={() => setView('front')}
                role="tab"
                aria-selected={view === 'front'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
                <span>Front 3/4</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`view-tab ${view === 'rear' ? 'active' : ''}`}
                onClick={() => setView('rear')}
                role="tab"
                aria-selected={view === 'rear'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 13l-7 7-7-7M19 5l-7 7-7-7" /></svg>
                <span>Rear Aero</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`view-tab ${view === 'cockpit' ? 'active' : ''}`}
                onClick={() => setView('cockpit')}
                role="tab"
                aria-selected={view === 'cockpit'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
                <span>Cockpit HUD</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`view-tab ${view === 'chassis' ? 'active' : ''}`}
                onClick={() => setView('chassis')}
                role="tab"
                aria-selected={view === 'chassis'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>
                <span>Chassis Powertrain</span>
              </motion.button>
            </div>

            <div className="config-canvas-container" id="config-canvas-container">
              <motion.img
                key={`${view}-${view === 'cockpit' ? selectedInterior.key : selectedColor.key}`}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                id="config-car-img"
                src={currentImageSrc}
                alt={view === 'cockpit' ? `VALENCE GT-ONE Cockpit HUD - ${selectedInterior.name}` : `VALENCE GT-ONE ${selectedColor.name}`}
                className="config-stage-image"
              />
              <div className="config-lighting-effect" aria-hidden="true"></div>

              <div className="config-live-tag">
                <span className="live-dot"></span>
                <span>
                  {view === 'cockpit'
                    ? `${selectedInterior.name} • ${selectedInterior.badge}`
                    : `${selectedColor.name} • ${selectedWheel.name}`}
                </span>
              </div>
            </div>

            {/* Visual Variant Gallery Strip */}
            <div className="variant-preview-strip">
              <div className="variant-strip-header">
                <span className="strip-label">
                  {view === 'rear' ? 'REAR AERO SPECIFICATION PREVIEWS' : 
                   view === 'cockpit' ? 'COCKPIT HUD INTERIOR THEME PREVIEWS' :
                   'FRONT 3/4 SPECIFICATION PREVIEWS'}
                </span>
                <span className="strip-selected">
                  {view === 'cockpit'
                    ? `${selectedInterior.name} (${selectedInterior.badge})`
                    : `${selectedColor.name} (${selectedColor.price === 0 ? 'Included' : `+$${selectedColor.price.toLocaleString()}`})`}
                </span>
              </div>
              <div className={`variant-card-row ${view === 'cockpit' ? 'cockpit-theme-row' : ''}`}>
                {view === 'cockpit' ? (
                  INTERIOR_OPTIONS.map((i) => (
                    <motion.button
                      key={i.key}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`variant-card-btn ${selectedInterior.key === i.key ? 'active' : ''}`}
                      onClick={() => handleInteriorSelect(i)}
                      type="button"
                      title={i.name}
                    >
                      <div className="variant-card-img-wrap">
                        <img
                          src={i.image}
                          alt={i.name}
                          className="variant-card-thumb"
                        />
                        {selectedInterior.key === i.key && (
                          <span className="variant-active-indicator">ACTIVE</span>
                        )}
                      </div>
                      <div className="variant-card-info" style={{ flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <span className="variant-card-name">{i.name}</span>
                        <span style={{ fontSize: '0.625rem', color: '#00F0FF', fontWeight: 700 }}>
                          {i.badge}
                        </span>
                      </div>
                    </motion.button>
                  ))
                ) : (
                  COLOR_OPTIONS.map((c) => (
                    <motion.button
                      key={c.key}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`variant-card-btn ${selectedColor.key === c.key ? 'active' : ''}`}
                      onClick={() => handleColorSelect(c)}
                      type="button"
                      title={c.name}
                    >
                      <div className="variant-card-img-wrap">
                        <img
                          src={view === 'rear' ? c.rearImage : c.image}
                          alt={`${c.name} ${view === 'rear' ? 'Rear Aero' : 'Front'}`}
                          className="variant-card-thumb"
                        />
                        {selectedColor.key === c.key && (
                          <span className="variant-active-indicator">ACTIVE</span>
                        )}
                      </div>
                      <div className="variant-card-info">
                        <span className="variant-dot" style={{ background: c.gradient }}></span>
                        <span className="variant-card-name">{c.name.split(' ')[1] || c.name}</span>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Ambient Underglow Accent */}
            <div className="underglow-selector">
              <span className="underglow-label">Ambient Underglow:</span>
              {UNDERGLOW_OPTIONS.map((ug, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  className={`glow-btn ${selectedUnderglow === ug.color ? 'active' : ''}`}
                  style={{ '--c': ug.color === 'transparent' ? '#334155' : ug.color }}
                  title={ug.title}
                  onClick={() => setSelectedUnderglow(ug.color)}
                ></motion.button>
              ))}
            </div>
          </div>

          {/* Controls Drawer */}
          <div className="config-controls-col">
            {/* Exterior Finish */}
            <div className="control-group">
              <div className="control-header">
                <label className="control-title">Exterior Finish</label>
                <span className="control-selected-text">{selectedColor.name}</span>
              </div>
              <div className="color-palette-grid">
                {COLOR_OPTIONS.map(c => (
                  <motion.button
                    key={c.key}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className={`color-swatch ${selectedColor.key === c.key ? 'active' : ''}`}
                    onClick={() => handleColorSelect(c)}
                    title={`${c.name} (${c.price === 0 ? 'Included' : `+$${c.price.toLocaleString()}`})`}
                  >
                    <span className="swatch-bubble" style={{ background: c.gradient }}></span>
                    <span className="swatch-label">{c.name.split(' ')[1] || c.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Wheel Architecture */}
            <div className="control-group">
              <div className="control-header">
                <label className="control-title">Wheel Architecture</label>
                <span className="control-selected-text">{selectedWheel.name}</span>
              </div>
              <div className="options-selector">
                {WHEEL_OPTIONS.map(w => (
                  <motion.button
                    key={w.key}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`option-btn ${selectedWheel.key === w.key ? 'active' : ''}`}
                    onClick={() => handleWheelSelect(w)}
                  >
                    <div className="option-info">
                      <span className="opt-name">{w.name}</span>
                      <span className="opt-sub">{w.desc}</span>
                    </div>
                    <div className="opt-badge">{w.badge}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interior Trim */}
            <div className="control-group">
              <div className="control-header">
                <label className="control-title">Interior Cockpit Theme</label>
                <span className="control-selected-text">{selectedInterior.name}</span>
              </div>
              <div className="interior-pills">
                {INTERIOR_OPTIONS.map(i => (
                  <motion.button
                    key={i.key}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`pill-toggle ${selectedInterior.key === i.key ? 'active' : ''}`}
                    onClick={() => handleInteriorSelect(i)}
                  >
                    {i.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Configuration Summary & Checkout */}
            <div className="config-summary-box">
              <div className="summary-line">
                <span className="label">Base Vehicle MSRP:</span>
                <span className="value">${baseMSRP.toLocaleString()}</span>
              </div>
              <div className="summary-line">
                <span className="label">Configured Additions:</span>
                <span className="value">
                  {optionsTotal > 0 ? `+$${optionsTotal.toLocaleString()}` : '$0'}
                </span>
              </div>
              <div className="summary-line total-line">
                <span className="label">Total Specification:</span>
                <span className="value total-price">${grandTotal.toLocaleString()}</span>
              </div>
              <div className="summary-delivery">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Estimated Handover: Q1 2027 • Fully Refundable Deposit</span>
              </div>

              <div className="config-action-row">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="primary-btn full-width"
                  onClick={() => onOpenReservation('gt')}
                >
                  <span>Reserve This Specification</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
