import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from './Toast.jsx';

export default function AcousticSynth({ isAudioActive, setIsAudioActive }) {
  const { showToast } = useToast();
  const [soundMode, setSoundMode] = useState('apex'); // apex, warp, stealth
  const [throttle, setThrottle] = useState(0); // 0 to 100
  const [rpm, setRpm] = useState(800);
  const [isPedalDown, setIsPedalDown] = useState(false);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const filterRef = useRef(null);
  const oscMainRef = useRef(null);
  const oscSubRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  const targetThrottleRef = useRef(0);
  const currentThrottleRef = useRef(0);
  const soundModeRef = useRef(soundMode);

  useEffect(() => {
    soundModeRef.current = soundMode;
  }, [soundMode]);

  const initAudioEngine = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(4.5, ctx.currentTime);
      filterRef.current = filter;

      const oscMain = ctx.createOscillator();
      oscMain.type = 'sawtooth';
      oscMain.frequency.setValueAtTime(80, ctx.currentTime);
      oscMainRef.current = oscMain;

      const oscSub = ctx.createOscillator();
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(40, ctx.currentTime);
      oscSubRef.current = oscSub;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      oscMain.connect(filter);
      oscSub.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      oscMain.start();
      oscSub.start();

      setIsAudioActive(true);
    } catch (e) {
      console.warn('Web Audio API not allowed or not supported:', e);
    }
  }, [setIsAudioActive]);

  // Sync with global isAudioActive toggle from Header
  useEffect(() => {
    if (isAudioActive) {
      if (!audioCtxRef.current) {
        initAudioEngine();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }
  }, [isAudioActive, initAudioEngine]);

  // Real-time loop for smooth physics interpolation
  useEffect(() => {
    const loop = () => {
      if (isPedalDown) {
        targetThrottleRef.current = 1.0;
      }

      // Smooth lerp
      currentThrottleRef.current += (targetThrottleRef.current - currentThrottleRef.current) * 0.12;
      const curr = currentThrottleRef.current;
      const roundedPercent = Math.round(curr * 100);
      setThrottle(roundedPercent);

      const calculatedRpm = Math.round(800 + curr * 20700);
      setRpm(calculatedRpm);

      // Modulate Web Audio nodes
      if (audioCtxRef.current && filterRef.current && oscMainRef.current && masterGainRef.current) {
        const now = audioCtxRef.current.currentTime;
        let baseFreq = 80;
        let maxFreq = 950;
        let filterBase = 350;
        let filterMax = 4200;

        if (soundModeRef.current === 'warp') {
          baseFreq = 120;
          maxFreq = 1400;
          filterMax = 5500;
        } else if (soundModeRef.current === 'stealth') {
          baseFreq = 50;
          maxFreq = 350;
          filterMax = 800;
        }

        const targetFreq = baseFreq + Math.pow(curr, 1.2) * (maxFreq - baseFreq);
        const targetFilter = filterBase + Math.pow(curr, 1.4) * (filterMax - filterBase);
        const targetVol = isAudioActive ? 0.05 + curr * 0.25 : 0.001;

        oscMainRef.current.frequency.setTargetAtTime(targetFreq, now, 0.08);
        if (oscSubRef.current) {
          oscSubRef.current.frequency.setTargetAtTime(targetFreq * 0.5, now, 0.08);
        }
        filterRef.current.frequency.setTargetAtTime(targetFilter, now, 0.08);
        masterGainRef.current.gain.setTargetAtTime(targetVol, now, 0.06);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPedalDown, isAudioActive]);

  // Oscilloscope canvas visualizer
  useEffect(() => {
    let drawFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext('2d');

    const draw = () => {
      drawFrameId = requestAnimationFrame(draw);

      if (analyserRef.current && isAudioActive && audioCtxRef.current?.state === 'running') {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2.5;
        canvasCtx.strokeStyle = '#00f0ff';
        canvasCtx.shadowBlur = 10;
        canvasCtx.shadowColor = '#00f0ff';

        canvasCtx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;
          if (i === 0) canvasCtx.moveTo(x, y);
          else canvasCtx.lineTo(x, y);
          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      } else {
        // Idle gentle waveform
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 1.5;
        canvasCtx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        canvasCtx.shadowBlur = 4;
        canvasCtx.shadowColor = '#00f0ff';

        canvasCtx.beginPath();
        const t = Date.now() * 0.003;
        for (let x = 0; x < canvas.width; x += 4) {
          const y = canvas.height / 2 + Math.sin(x * 0.02 + t) * 6;
          if (x === 0) canvasCtx.moveTo(x, y);
          else canvasCtx.lineTo(x, y);
        }
        canvasCtx.stroke();
      }
    };

    draw();
    return () => cancelAnimationFrame(drawFrameId);
  }, [isAudioActive]);

  const handlePedalDown = (e) => {
    e.preventDefault();
    initAudioEngine();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsAudioActive(true);
    setIsPedalDown(true);
  };

  const handlePedalUp = () => {
    setIsPedalDown(false);
    targetThrottleRef.current = 0;
  };

  const handleSliderChange = (e) => {
    initAudioEngine();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsAudioActive(true);
    targetThrottleRef.current = parseInt(e.target.value, 10) / 100;
  };

  const handleModeChange = (mode, label) => {
    setSoundMode(mode);
    showToast(`Acoustic Profile: ${label}`);
  };

  return (
    <section id="sound-lab" className="sound-section" aria-label="Audio Acoustic Experience">
      <div className="section-container">
        <div className="sound-grid">
          <div className="sound-info-col">
            <span className="section-eyebrow">ACOUSTIC FREQUENCY LAB</span>
            <h2 className="section-title">The Sound of 1,450 Electric Horsepower.</h2>
            <p>
              Traditional EVs are muted appliances. The VALENCE GT-ONE features our proprietary{' '}
              <strong>Harmonic Velocity Acoustic Signature</strong>. Synthesized in real time from inverter voltage, 
              rotor RPM, and g-force telemetry, channeled through 12 exterior resonant transducers.
            </p>

            <div className="sound-modes-selector">
              <span className="modes-label">Acoustic Signature:</span>
              <div className="mode-buttons">
                <button
                  className={`mode-btn ${soundMode === 'apex' ? 'active' : ''}`}
                  onClick={() => handleModeChange('apex', 'Track Apex (120dB)')}
                >
                  Track Apex (120dB)
                </button>
                <button
                  className={`mode-btn ${soundMode === 'warp' ? 'active' : ''}`}
                  onClick={() => handleModeChange('warp', 'Quantum Warp (Harmonic)')}
                >
                  Quantum Warp (Harmonic)
                </button>
                <button
                  className={`mode-btn ${soundMode === 'stealth' ? 'active' : ''}`}
                  onClick={() => handleModeChange('stealth', 'Stealth Sub-Bass')}
                >
                  Stealth Sub-Bass
                </button>
              </div>
            </div>

            <div className="audio-instruction-callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                Click and hold the <strong>ACCELERATOR</strong> pedal or move the slider to synthesize the acoustic turbine pitch using Web Audio API!
              </span>
            </div>
          </div>

          {/* Synth Module Card */}
          <div className="sound-synth-card">
            <div className="synth-header">
              <div className="synth-status">
                <span className={`status-indicator ${isAudioActive ? 'active' : ''}`}></span>
                <span>{isAudioActive ? 'SYNTH ENGINE: ACTIVE' : 'SYNTH ENGINE: READY'}</span>
              </div>
              <div className="synth-telemetry-rpm">
                <span className="rpm-label">MOTOR SPEED:</span>
                <span className="rpm-value">{rpm.toLocaleString()} RPM</span>
              </div>
            </div>

            {/* Oscilloscope Canvas */}
            <div className="visualizer-wrapper">
              <canvas
                ref={canvasRef}
                id="audio-visualizer-canvas"
                width="600"
                height="180"
                aria-label="Audio Frequency Oscilloscope"
              ></canvas>
              <div className="visualizer-grid-overlay" aria-hidden="true"></div>
            </div>

            {/* Throttle Controls */}
            <div className="pedal-control-area">
              <div className="throttle-slider-box">
                <label htmlFor="throttle-slider" className="throttle-label">
                  <span>THROTTLE INPUT</span>
                  <span>{throttle}%</span>
                </label>
                <input
                  type="range"
                  id="throttle-slider"
                  min="0"
                  max="100"
                  value={throttle}
                  onChange={handleSliderChange}
                  className="custom-range"
                  aria-label="Throttle percentage"
                />
              </div>

              {/* Hold-to-Accelerate Pedal Button */}
              <button
                id="pedal-btn"
                className={`pedal-btn ${isPedalDown ? 'pressed' : ''}`}
                onMouseDown={handlePedalDown}
                onTouchStart={handlePedalDown}
                onMouseUp={handlePedalUp}
                onTouchEnd={handlePedalUp}
                onMouseLeave={handlePedalUp}
                aria-label="Hold to accelerate hypercar"
              >
                <div className="pedal-ridges">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="pedal-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span className="pedal-text">
                    {isPedalDown ? 'ACCELERATING (1,450 HP)' : 'PRESS & HOLD ACCELERATOR'}
                  </span>
                </div>
              </button>
            </div>

            <div className="synth-footer-meta">
              <span>Dual 48kHz Oscillator Architecture</span>
              <span>Sub-harmonic 40Hz Resonator</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
