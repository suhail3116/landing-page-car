import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './ui/TiltCard.jsx';

export default function TechnicalFilm() {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10.01);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 10.01;
    setCurrentTime(current);
    setDuration(dur);
    setProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 10.01);
    }
  };

  const handleProgressBarClick = (e) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newProgress * duration;
    videoRef.current.currentTime = newTime;
    setProgress(newProgress * 100);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 100);
    return '00:' + String(s).padStart(2, '0') + '.' + String(ms).padStart(2, '0');
  };

  return (
    <section id="aero-film" className="technical-film-section" aria-label="Technical Aesthetic Parameters Film">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-header-centered"
        >
          <span className="section-eyebrow">AERODYNAMIC DYNAMICS IN MOTION</span>
          <h2 className="section-title">Technical Aesthetic Parameters</h2>
          <p className="section-subtitle">
            Witness the VALENCE GT-ONE undergo computational fluid dynamics wind tunnel validation and active surface morphing at 248 mph.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="cinema-stage-wrapper"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <div className="cinema-ambient-glow" aria-hidden="true" />

          <div className="cinema-video-box" onClick={togglePlay}>
            <video
              ref={videoRef}
              src="/assets/videos/Technical_Aesthetic_Paramete.mp4"
              className="cinema-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            <div className="hud-overlay-frame" aria-hidden="true">
              <div className="hud-corner top-left">
                <span className="hud-rec-dot" />
                <span className="hud-tag">CFD STREAM // 01 • 60 FPS</span>
              </div>
              <div className="hud-corner top-right">
                <span className="hud-badge">AERO Cd: 0.198</span>
                <span className="hud-tag">DOWNFORCE: 1,250 KG</span>
              </div>
              <div className="hud-corner bottom-left">
                <span className="hud-sub">WIND TUNNEL SIMULATION // 248 MPH</span>
              </div>
              <div className="hud-corner bottom-right">
                <span className="hud-sub">VALENCE KINETIC LABS</span>
              </div>

              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="cinema-play-overlay"
                  >
                    <div className="big-play-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className={'cinema-controls-bar ' + (showControls ? 'visible' : '')}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="cinema-progress-track"
                ref={progressRef}
                onClick={handleProgressBarClick}
              >
                <div
                  className="cinema-progress-fill"
                  style={{ width: progress + '%' }}
                >
                  <span className="progress-thumb" />
                </div>
              </div>

              <div className="cinema-controls-row">
                <div className="controls-left">
                  <button
                    type="button"
                    className="cinema-ctrl-btn"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    className={'cinema-ctrl-btn ' + (!isMuted ? 'active' : '')}
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                    title={isMuted ? 'Unmute Audio Track' : 'Mute Audio Track'}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>

                  <div className="cinema-timecode">
                    <span className="time-current">{formatTime(currentTime)}</span>
                    <span className="time-sep">/</span>
                    <span className="time-total">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="controls-right">
                  <span className="cinema-res-tag">1080P HD</span>
                  <button
                    type="button"
                    className="cinema-ctrl-btn"
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    title="Fullscreen"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="film-specs-grid">
          <TiltCard maxTilt={8} glareColor="rgba(0, 240, 255, 0.25)">
            <div className="film-spec-card">
              <div className="film-spec-header">
                <span className="spec-metric">0.198 Cd</span>
                <span className="spec-badge cyan">WIND TUNNEL VALIDATED</span>
              </div>
              <h4>Active Laminar Drag Reduction</h4>
              <p>
                Continuous surface fluid dynamics channel high-pressure air through underbody venturi tunnels, generating suction ground effects without the parasitic drag of standard wings.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} glareColor="rgba(255, 42, 85, 0.25)">
            <div className="film-spec-card">
              <div className="film-spec-header">
                <span className="spec-metric">80 ms</span>
                <span className="spec-badge crimson">ELECTRO-ACTUATED</span>
              </div>
              <h4>Morphing Surface Strakes</h4>
              <p>
                Carbon fiber aerodynamic blades shift angles dynamically in 80 milliseconds, generating up to 1,250 kg of downforce in high-speed bends and acting as a 45° airbrake under hard deceleration.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} glareColor="rgba(217, 119, 6, 0.25)">
            <div className="film-spec-card">
              <div className="film-spec-header">
                <span className="spec-metric">248 MPH</span>
                <span className="spec-badge amber">MAX VMAX STABILITY</span>
              </div>
              <h4>Thermal Air Curtain Flow</h4>
              <p>
                Wheel-arch vortex extractors evacuate turbulent tire air, drawing forced cooling currents directly across the 420mm front carbon-ceramic calipers and silicon-carbide inverters.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
