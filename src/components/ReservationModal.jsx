import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';
import { useToast } from './Toast.jsx';

const TIERS = [
  {
    key: 'founders',
    title: "Founder's Edition",
    msrp: '$245,000 MSRP',
    deposit: 5000,
    badge: 'LIMITED: 500 UNITS',
    desc: 'Chassis #1 to #500 with laser-engraved titanium sill plates, track day with CEO, and priority Q1 2027 delivery.',
    perks: [
      'Numbered 1-of-500 Collector Badge',
      'Carbon Aero Package & 22" Titanium Wheels included',
      'Lifetime Complimentary High-Power Fast Charging'
    ]
  },
  {
    key: 'track',
    title: 'Track Performance',
    msrp: '$210,000 MSRP',
    deposit: 2500,
    desc: 'Optimized for maximum circuit lap times with 1,450 HP torque vectoring and carbon-ceramic brakes.',
    perks: [
      'Apex Aero Wing & Diffuser',
      'Racing Yoke & Telemetry HUD',
      'Estimated Handover: Q2 2027'
    ]
  },
  {
    key: 'gt',
    title: 'Grand Tourer',
    msrp: '$188,000 MSRP',
    deposit: 1000,
    desc: 'The pure essence of long-range electric velocity. 620-mile range and whisper-quiet aero cruising comfort.',
    perks: [
      '150 kWh Solid-State Graphene Pack',
      '21" Carbon Aero Blade Wheels',
      'Estimated Handover: Q3 2027'
    ]
  }
];

export default function ReservationModal({ isOpen, onClose, initialTier = 'founders' }) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const [profile, setProfile] = useState({
    fname: 'Alex',
    lname: 'Vance',
    email: 'alex@vanceholdings.com',
    phone: '+1 (415) 880-9922',
    country: 'US',
    city: 'San Francisco, CA'
  });

  const [sequenceNo] = useState(413);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedTier(initialTier || 'founders');
      setIsAuthorizing(false);
    }
  }, [isOpen, initialTier]);

  const currentTierObj = TIERS.find(t => t.key === selectedTier) || TIERS[0];

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!profile.fname.trim() || !profile.email.trim()) {
      showToast('Please fill in required fields', '!');
      return;
    }
    setStep(3);
  };

  const handleAuthorizeEscrow = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setStep(4);
      showToast(`Chassis #${sequenceNo} successfully reserved!`, '★');
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="modal-dialog"
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            <div className="modal-body">
              {/* Step Indicator */}
              <div className="modal-stepper">
                <div className={`step-dot ${step === 1 ? 'active' : ''}`}>
                  <span>1</span> Allocation Tier
                </div>
                <div className="step-connector"></div>
                <div className={`step-dot ${step === 2 ? 'active' : ''}`}>
                  <span>2</span> VIP Details
                </div>
                <div className="step-connector"></div>
                <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
                  <span>3</span> Escrow Deposit
                </div>
              </div>

              {/* STEP 1: CHOOSE TIER */}
              {step === 1 && (
                <div className="step-panel active">
                  <h3 id="modal-title" className="modal-heading">Select Your Allocation Tier</h3>
                  <p className="modal-sub">
                    All deposits are held in a segregated third-party escrow account and are 100% refundable at any moment prior to chassis build lock.
                  </p>

                  <div className="tiers-selection-grid">
                    {TIERS.map(t => (
                      <TiltCard key={t.key} maxTilt={8} glareColor="rgba(0, 240, 255, 0.2)">
                        <div
                          className={`tier-card ${selectedTier === t.key ? 'active' : ''}`}
                          onClick={() => setSelectedTier(t.key)}
                        >
                          {t.badge && <div className="tier-ribbon">{t.badge}</div>}
                          <div className="tier-header">
                            <h4>{t.title}</h4>
                            <div className="tier-price">{t.msrp}</div>
                          </div>
                          <p className="tier-desc">{t.desc}</p>
                          <ul className="tier-perks">
                            {t.perks.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                          <div className="tier-deposit">
                            Refundable Escrow Deposit: <strong>${t.deposit.toLocaleString()}</strong>
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>

                  <div className="modal-action-row">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="primary-btn"
                      onClick={() => setStep(2)}
                    >
                      <span>Continue to VIP Contact Details</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP 2: VIP PROFILE */}
              {step === 2 && (
                <div className="step-panel active">
                  <h3 className="modal-heading">Chassis Holder Profile</h3>
                  <p className="modal-sub">
                    Your reservation certificate and production sequence priority will be issued to this legal identity.
                  </p>

                  <form className="clean-form" onSubmit={handleStep2Submit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="res-fname">First Name</label>
                        <input
                          type="text"
                          id="res-fname"
                          required
                          value={profile.fname}
                          onChange={(e) => setProfile({ ...profile, fname: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="res-lname">Last Name</label>
                        <input
                          type="text"
                          id="res-lname"
                          required
                          value={profile.lname}
                          onChange={(e) => setProfile({ ...profile, lname: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="res-email">Primary Email</label>
                        <input
                          type="email"
                          id="res-email"
                          required
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="res-phone">Phone Number</label>
                        <input
                          type="tel"
                          id="res-phone"
                          required
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="res-country">Country / Region</label>
                        <select
                          id="res-country"
                          value={profile.country}
                          onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                          className="form-select"
                        >
                          <option value="US">United States</option>
                          <option value="CH">Switzerland</option>
                          <option value="UK">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="JP">Japan</option>
                          <option value="CA">Canada</option>
                          <option value="OTHER">Other International</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="res-city">Delivery City</label>
                        <input
                          type="text"
                          id="res-city"
                          required
                          value={profile.city}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="modal-action-row split">
                      <button type="button" className="secondary-btn" onClick={() => setStep(1)}>
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="primary-btn"
                      >
                        Proceed to Escrow Deposit
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: ESCROW AUTHORIZATION */}
              {step === 3 && (
                <div className="step-panel active">
                  <h3 className="modal-heading">Authorize Refundable Escrow</h3>
                  <p className="modal-sub">
                    Secure your production position. Funds are held in escrow under FDIC insured trust.
                  </p>

                  <div className="escrow-order-summary">
                    <div className="eos-row">
                      <span className="label">Allocated Model:</span>
                      <span className="val">{currentTierObj.title}</span>
                    </div>
                    <div className="eos-row">
                      <span className="label">Priority Sequence Number:</span>
                      <span className="val cyan-text">CHASSIS #{sequenceNo} / 500</span>
                    </div>
                    <div className="eos-row total-deposit-row">
                      <span className="label">Due Now (Fully Refundable):</span>
                      <span className="val">${currentTierObj.deposit.toLocaleString()} USD</span>
                    </div>
                  </div>

                  <div className="payment-methods-selector">
                    <label className={`pm-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="pay-method"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <span>Instant Card Authorization</span>
                    </label>
                    <label className={`pm-option ${paymentMethod === 'wire' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="pay-method"
                        value="wire"
                        checked={paymentMethod === 'wire'}
                        onChange={() => setPaymentMethod('wire')}
                      />
                      <span>Direct Bank Wire Escrow</span>
                    </label>
                    <label className={`pm-option ${paymentMethod === 'crypto' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="pay-method"
                        value="crypto"
                        checked={paymentMethod === 'crypto'}
                        onChange={() => setPaymentMethod('crypto')}
                      />
                      <span>USDC / BTC Institutional Transfer</span>
                    </label>
                  </div>

                  <div className="card-demo-inputs">
                    <div className="form-group">
                      <label>Simulated Card Number</label>
                      <input type="text" className="form-input" value="•••• •••• •••• 8842" readOnly />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Exp Date</label>
                        <input type="text" className="form-input" value="08/29" readOnly />
                      </div>
                      <div className="form-group">
                        <label>CVC</label>
                        <input type="text" className="form-input" value="•••" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="modal-action-row split">
                    <button type="button" className="secondary-btn" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="primary-btn pulse-glow"
                      onClick={handleAuthorizeEscrow}
                      disabled={isAuthorizing}
                    >
                      <span>
                        {isAuthorizing ? 'Verifying Escrow Allocation...' : 'Lock Allocation & Generate Certificate'}
                      </span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP 4: OFFICIAL CERTIFICATE */}
              {step === 4 && (
                <div className="step-panel active">
                  <div className="certificate-container" id="certificate-card">
                    <div className="cert-header">
                      <div className="cert-logo">VALENCE MOTORS</div>
                      <div className="cert-badge">OFFICIAL ALLOCATION CERTIFICATE</div>
                    </div>

                    <div className="cert-body">
                      <p className="cert-proclamation">
                        This document formally confirms the guaranteed production allocation of:
                      </p>
                      <h2 className="cert-car-title">{currentTierObj.title.toUpperCase()}</h2>

                      <div className="cert-meta-grid">
                        <div className="cm-cell">
                          <span className="cm-label">CHASSIS NUMBER</span>
                          <span className="cm-val cyan-text">VAL-GT1-0{sequenceNo}</span>
                        </div>
                        <div className="cm-cell">
                          <span className="cm-label">ALLOCATED TO</span>
                          <span className="cm-val">{profile.fname} {profile.lname}</span>
                        </div>
                        <div className="cm-cell">
                          <span className="cm-label">PRODUCTION SEQUENCE</span>
                          <span className="cm-val">Batch 1 (Q1 2027)</span>
                        </div>
                        <div className="cm-cell">
                          <span className="cm-label">ESCROW DEPOSIT</span>
                          <span className="cm-val">${currentTierObj.deposit.toLocaleString()} USD (Secured)</span>
                        </div>
                      </div>

                      <div className="cert-signature-row">
                        <div className="sig-block">
                          <span className="sig-line">Dr. Henrik Vane</span>
                          <span className="sig-role">Chief Executive Officer</span>
                        </div>
                        <div className="sig-seal">
                          <div className="seal-inner">
                            VALENCE<br />SEAL<br />2026
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cert-actions">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="primary-btn"
                      onClick={handlePrint}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                      </svg>
                      <span>Print / Download Certificate</span>
                    </motion.button>
                    <button className="secondary-btn" onClick={onClose}>
                      Close Studio
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
