import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function RangeSimulator() {
  const [speed, setSpeed] = useState(70);
  const [temp, setTemp] = useState(72);
  const [climate, setClimate] = useState('eco');
  const [driveMode, setDriveMode] = useState('range');

  const telemetry = useMemo(() => {
    // Aerodynamic drag scaling with speed^1.75
    const speedPenalty = Math.pow(speed / 55, 1.75);

    // Temperature factor: optimal 68-75F
    let tempFactor = 1.0;
    if (temp < 68) {
      tempFactor += ((68 - temp) / 68) * 0.18; // up to 18% loss in extreme freezing
    } else if (temp > 80) {
      tempFactor += ((temp - 80) / 40) * 0.12;
    }

    // Climate HVAC
    let climatePenalty = 1.0;
    if (climate === 'max') climatePenalty = 1.14;
    if (climate === 'off') climatePenalty = 0.96;

    // Drive Mode power draw
    let modeMultiplier = 1.0;
    let zeroSixty = '1.84s';
    if (driveMode === 'sport') {
      modeMultiplier = 1.10;
      zeroSixty = '2.15s';
    } else if (driveMode === 'apex') {
      modeMultiplier = 1.25;
      zeroSixty = '1.84s';
    } else {
      zeroSixty = '2.80s';
    }

    const baseWhPerMile = 235;
    const finalWhPerMile = Math.round(baseWhPerMile * speedPenalty * tempFactor * climatePenalty * modeMultiplier);

    const totalBatteryKWh = 150;
    const estimatedMiles = Math.round((totalBatteryKWh * 1000) / finalWhPerMile);
    const estimatedKm = Math.round(estimatedMiles * 1.60934);

    let chargeMins = 12;
    if (temp < 32 || temp > 100) chargeMins = 15;

    const packTempC = Math.round(20 + (speed - 45) * 0.15 + (driveMode === 'apex' ? 8 : 0));

    return {
      miles: estimatedMiles,
      km: estimatedKm,
      efficiency: finalWhPerMile,
      zeroSixty,
      chargeTime: chargeMins,
      packTemp: packTempC
    };
  }, [speed, temp, climate, driveMode]);

  const tempCelsius = Math.round(((temp - 32) * 5) / 9);
  let tempDescription = 'Mild';
  if (temp <= 32) tempDescription = 'Freezing';
  else if (temp >= 90) tempDescription = 'Extreme Heat';
  else if (temp >= 70 && temp <= 78) tempDescription = 'Optimal';

  return (
    <section id="simulator" className="simulator-section" aria-label="Range and Performance Calculator">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-eyebrow">TELEMETRY SIMULATOR</span>
          <h2 className="section-title">Calculate Your Mission Envelope</h2>
          <p className="section-subtitle">
            Real-world physics simulation based on ambient climate, highway speed, wheel package, and powertrain state.
          </p>
        </div>

        <motion.div
          className="simulator-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sim-controls-col">
            {/* Speed Slider */}
            <div className="sim-input-group">
              <div className="sim-input-header">
                <label htmlFor="sim-speed-slider">Cruising Highway Speed</label>
                <span className="sim-val">{speed} MPH</span>
              </div>
              <input
                type="range"
                id="sim-speed-slider"
                min="45"
                max="100"
                value={speed}
                step="5"
                onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
                className="custom-range"
              />
              <div className="range-ticks">
                <span>45 mph</span>
                <span>70 mph</span>
                <span>100 mph</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="sim-input-group">
              <div className="sim-input-header">
                <label htmlFor="sim-temp-slider">Outside Ambient Climate</label>
                <span className="sim-val">{temp}°F ({tempCelsius}°C) {tempDescription}</span>
              </div>
              <input
                type="range"
                id="sim-temp-slider"
                min="0"
                max="110"
                value={temp}
                step="2"
                onChange={(e) => setTemp(parseInt(e.target.value, 10))}
                className="custom-range"
              />
              <div className="range-ticks">
                <span>0°F (Freezing)</span>
                <span>72°F (Optimal)</span>
                <span>110°F (Desert)</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="sim-toggles-row">
              <div className="toggle-widget">
                <span className="widget-label">Cabin Climate Control:</span>
                <div className="pill-group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${climate === 'eco' ? 'active' : ''}`}
                    onClick={() => setClimate('eco')}
                  >
                    Eco (22°C)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${climate === 'max' ? 'active' : ''}`}
                    onClick={() => setClimate('max')}
                  >
                    Max A/C
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${climate === 'off' ? 'active' : ''}`}
                    onClick={() => setClimate('off')}
                  >
                    Off
                  </motion.button>
                </div>
              </div>

              <div className="toggle-widget">
                <span className="widget-label">Powertrain Mode:</span>
                <div className="pill-group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${driveMode === 'range' ? 'active' : ''}`}
                    onClick={() => setDriveMode('range')}
                  >
                    Aero Cruise
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${driveMode === 'sport' ? 'active' : ''}`}
                    onClick={() => setDriveMode('sport')}
                  >
                    Sport Vectoring
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`sub-pill ${driveMode === 'apex' ? 'active' : ''}`}
                    onClick={() => setDriveMode('apex')}
                  >
                    Apex Track (1,450 HP)
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="sim-results-col">
            <div className="primary-range-display">
              <span className="range-badge">ESTIMATED RANGE</span>
              <div className="big-stat">
                <span className="number">{telemetry.miles}</span>
                <span className="unit">MILES</span>
              </div>
              <div className="km-equiv">{telemetry.km} Kilometers</div>
            </div>

            <div className="metrics-subgrid">
              <div className="metric-item">
                <span className="metric-label">Efficiency</span>
                <span className="metric-value">{telemetry.efficiency} Wh/mi</span>
                <span className="metric-desc">Industry-leading aero coefficient</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">0–60 Launch</span>
                <span className="metric-value">{telemetry.zeroSixty}</span>
                <span className="metric-desc">Instantaneous torque delivery</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">800V DC Supercharge</span>
                <span className="metric-value">{telemetry.chargeTime} min</span>
                <span className="metric-desc">10% to 80% (350kW compatible)</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">Pack Temperature</span>
                <span className="metric-value">{telemetry.packTemp}°C</span>
                <span className="metric-desc">Liquid cooling bypass active</span>
              </div>
            </div>

            <div className="sim-footer-note">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Calculated under WLTP cycle test parameters with solid-state cell architecture.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
