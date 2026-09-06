# ⚡ VALENCE MOTORS | The Electric Velocity Renaissance

> Next-generation hypercar startup landing page and interactive 3D studio configurator built with **React 18**, **Vite**, **Framer Motion**, and the **Web Audio API**.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.2.0-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-00F0FF?style=for-the-badge&logo=google-chrome&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Overview

**VALENCE MOTORS** is an ultra-luxury electric hypercar startup pioneering solid-state battery chemistry, generative aerodynamic surfaces, and biometric cockpit telemetry. 

This repository houses the flagship web experience for the **VALENCE GT-ONE** (1,450 HP, 620-mile range, 0-60 mph in 1.84s). Designed with a **Cyberpunk / Luxury EV Dark Aesthetic**, the landing page delivers a zero-compromise, sensory-driven user journey with custom audio synthesis, real-time physics simulators, and an interactive studio configurator.

---

## ✨ Key Features

### 1. 🏎️ Interactive 360° Studio Configurator (StudioConfigurator.jsx)
- **Multi-Angle Camera Perspectives**: Seamless switching between **Front 3/4 Angle**, **Rear Active Aero Angle**, and **Cockpit HUD View**.
- **6 Aerospace Paint Finishes**: Real-time cross-fade transitions across bespoke paint finishes (*Liquid Mercury*, *Cosmic Obsidian*, *Apex Crimson*, *Cyber Azure*, *Emerald Nebula*, *Solar Amber*) backed by dedicated photorealistic studio renders for both Front and Rear perspectives.
- **Dynamic Cockpit HUD Themes**: Selecting interior themes (*Obsidian Alcantara*, *Arctic Nappa Leather*, *Exposed Matte Carbon Race Spec*) automatically transitions the camera perspective to the Cockpit and updates the holographic AR HUD instrument cluster (Electric Cyan, Champagne Gold, Apex Track Crimson).
- **Aero Wheel Architectures**: Live selection between *V-Forged Magnesium Carbon Aero-Discs*, *Aero-Blade Carbon Monoblock*, and *Center-Lock Track Lightweights*.
- **Live MSRP & Spec Tally**: Dynamic options pricing engine calculating total vehicle configuration with real-time deposit estimation.

### 2. 🔊 1,450 HP Acoustic Sound Synthesizer (AcousticSynth.jsx)
- Built purely on the **Web Audio API** (zero external audio files).
- Tri-oscillator synthesis engine generating sub-bass motor hum, planetary gearbox whine, and aerodynamic inverter frequencies.
- Interactive accelerator pedal button with authentic throttle response curves and inertia decay.
- High-frame-rate <canvas> oscilloscope rendering real-time sound frequencies.

### 3. 🔋 Real-World Physics Range Simulator (RangeSimulator.jsx)
- Calculates driving range based on real-world engineering inputs:
  - **Cruising Velocity** (45 mph to 120 mph)
  - **Ambient Temperature** (-10°C to +45°C) with cold-weather lithium degradation curves
  - **HVAC Mode** (Off, Eco, Active Thermal Comfort)
  - **Aerodynamics Setting** (High Downforce vs. Low Drag Eco-Streamline)
- Displays dynamic efficiency metrics (Wh/mi) and charging stop projections.

### 4. 📐 Engineering Bento Grid (TechnologyBento.jsx)
- Interactive 3D tilt cards showcasing:
  - 150 kWh Solid-State Graphene skateboard battery platform
  - Biometric Augmented Reality full-windshield HUD
  - Active morphing rear aerodynamic diffuser and strakes
  - Megawatt Silicon-Carbide ultra-fast charging (10% to 80% in 11 minutes)

### 5. 📊 Head-to-Head Benchmark Matrix (ComparisonMatrix.jsx)
- Direct side-by-side engineering comparison between **VALENCE GT-ONE**, **Lucid Air Sapphire**, **Rimac Nevera**, and **Tesla Roadster**.
- Interactive category tabs: *Powertrain & Speed*, *Battery & Charging*, *Chassis & Aero*.

### 6. 🌍 Global Experience Studios (GlobalStudios.jsx)
- Showroom showcase spanning Zurich, Silicon Valley, Tokyo, and London Mayfair.
- VIP private test drive reservation scheduling with instant date and venue selection.

### 7. 📜 VIP Allocation & Reservation Modal (ReservationModal.jsx)
- 4-step allocation flow for the Founder's Edition (limited to 500 numbered chassis):
  1. Allocation Tier Selection (*Founder’s Edition*, *Signature GT*, *Apex Track Pack*)
  2. Owner Profile & Telemetry Delivery Address
  3. Escrow Deposit Payment Terms
  4. **Live Printable Allocation Certificate** with custom reservation hash and vehicle specification digest.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage |
|:---|:---|:---|
| **Framework** | **React 18** | Modular component architecture, hooks (useState, useCallback, useRef, useEffect) |
| **Bundler / Build** | **Vite 5** | Instant HMR, lightning-fast rollup bundling (1.2s builds) |
| **Animations** | **Framer Motion (motion/react)** | Scroll-driven reveals, layout transitions, spring physics, modal presence |
| **Audio Engine** | **Web Audio API** | GainNodes, BiquadFilterNodes, OscillatorNodes for dynamic motor sound synthesis |
| **Graphics & FX** | **HTML5 Canvas** | High-performance particle starfield and live audio oscilloscope |
| **Styling** | **Custom CSS3 Variables** | High-contrast luxury dark theme, backdrop blurs, glassmorphism, responsive CSS Grid |
| **Typography** | **Google Fonts** | Space Grotesk (technological display headers) & Inter (precision telemetry data) |

---

## 📁 Repository Structure

```
03 car landing page/
├── index.html                   # HTML5 entrypoint with OpenGraph metadata & Google Fonts
├── package.json                 # Project dependencies and script declarations
├── vite.config.js               # Vite build and plugin configurations
├── .gitignore                   # Ignored artifacts (node_modules, dist, logs)
├── README.md                    # Project documentation
├── public/
│   └── assets/
│       └── images/              # 16 High-resolution production hypercar renders
│           ├── valence_mercury.jpg            # Front 3/4 - Liquid Mercury
│           ├── valence_obsidian.jpg           # Front 3/4 - Cosmic Obsidian
│           ├── valence_crimson.jpg            # Front 3/4 - Apex Crimson
│           ├── valence_azure.jpg              # Front 3/4 - Cyber Azure
│           ├── valence_emerald.jpg            # Front 3/4 - Emerald Nebula
│           ├── valence_amber.jpg              # Front 3/4 - Solar Amber
│           ├── valence_rear_mercury.jpg       # Rear Aero - Liquid Mercury
│           ├── valence_rear_obsidian.jpg      # Rear Aero - Cosmic Obsidian
│           ├── valence_rear_crimson.jpg       # Rear Aero - Apex Crimson
│           ├── valence_rear_azure.jpg         # Rear Aero - Cyber Azure
│           ├── valence_rear_emerald.jpg       # Rear Aero - Emerald Nebula
│           ├── valence_rear_amber.jpg         # Rear Aero - Solar Amber
│           ├── valence_cockpit_alcantara.jpg  # Cockpit HUD - Obsidian Alcantara (Cyan)
│           ├── valence_cockpit_leather.jpg    # Cockpit HUD - Arctic Nappa (Gold)
│           ├── valence_cockpit_carbon.jpg     # Cockpit HUD - Matte Carbon (Crimson)
│           └── valence_chassis.jpg            # Solid-State Skateboard Platform
└── src/
    ├── main.jsx                 # React DOM root mounting
    ├── App.jsx                  # Main application orchestrator & section layout
    ├── index.css                # Master luxury dark theme design tokens & component styles
    ├── components/
    │   ├── Header.jsx           # Glassmorphic header with audio toggle & mobile navigation
    │   ├── Hero.jsx             # Hero viewport with interactive 3D telemetry chips
    │   ├── Manifesto.jsx        # Company vision and 3 engineering pillars
    │   ├── StudioConfigurator.jsx# 360° visual configurator with live theme switching
    │   ├── AcousticSynth.jsx    # Web Audio API motor sound synthesizer & oscilloscope
    │   ├── RangeSimulator.jsx   # Real-time physics range & efficiency calculator
    │   ├── TechnologyBento.jsx  # Interactive 3D bento grid of vehicle innovations
    │   ├── ComparisonMatrix.jsx # Competitive benchmark comparison table
    │   ├── InvestorsTimeline.jsx# Series A/B funding roadmap & investor partners
    │   ├── GlobalStudios.jsx    # Showroom locator & VIP private test drive booking
    │   ├── ReservationModal.jsx # 4-stage allocation modal & printable certificate
    │   ├── IntroLoader.jsx      # High-tech boot sequence animation
    │   ├── ParticleCanvas.jsx   # Particle constellation background canvas
    │   ├── Footer.jsx           # Footer with newsletter capture & legal disclaimers
    │   ├── Toast.jsx            # Dynamic toast notification provider & animations
    │   └── ui/
    │       └── TiltCard.jsx     # Mouse-tracking 3D perspective card with dynamic glare
    └── lib/
        └── utils.js             # Classname utility helpers
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd "03 car landing page"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   # or standard React command
   npm start
   ```
   The browser will automatically open to `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Production-optimized bundles will be compiled to the `/dist` directory in ~1.2s.

5. **Preview the production build locally**:
   ```bash
   npm run preview -- --port 3000 --host
   ```
   Access the preview at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

---

## 🎨 Design System Specifications

- **Color Palette**:
  - `Background Dark`: `#030712` (Void Black)
  - `Card / Surface`: `rgba(15, 23, 42, 0.65)` (Translucent Obsidian)
  - `Primary Accent`: `#00f0ff` (Hyper Electric Cyan)
  - `Secondary Accent`: `#ff2a55` (Apex Crimson Red)
  - `Tertiary Accent`: `#d97706` (Solar Amber)
  - `Borders`: `rgba(255, 255, 255, 0.08)` to `rgba(0, 240, 255, 0.25)`
- **Motion Principles**:
  - Spring-damped transitions (`type: 'spring'`, `stiffness: 300`, `damping: 24`)
  - Continuous 3D perspective tilting with radial cursor glare
  - Smooth cross-fade render swapping for all exterior and interior camera angles

---

## 📄 License

This project is created for demonstration and startup portfolio purposes under the **MIT License**.
