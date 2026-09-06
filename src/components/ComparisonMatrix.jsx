import React from 'react';
import { motion } from 'motion/react';

export default function ComparisonMatrix() {
  return (
    <section id="comparison" className="comparison-section" aria-label="Competitive Comparison">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-eyebrow">HEAD TO HEAD</span>
          <h2 className="section-title">The New Benchmark of Electric Superiority</h2>
          <p className="section-subtitle">
            How VALENCE GT-ONE fundamentally shifts the performance paradigm against existing contenders.
          </p>
        </div>

        <motion.div
          className="comparison-table-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" className="param-col">Specification</th>
                <th scope="col" className="highlight-col">
                  <div className="table-brand-tag">VALENCE GT-ONE</div>
                  <span className="table-sub">Solid-State Hyper-GT</span>
                </th>
                <th scope="col">Tesla Roadster 2</th>
                <th scope="col">Porsche Taycan Turbo GT</th>
                <th scope="col">Lucid Air Sapphire</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="param-name">0–60 MPH Launch</td>
                <td className="highlight-val"><strong className="cyan-text">1.84 sec</strong></td>
                <td>1.90 sec (claimed)</td>
                <td>2.10 sec</td>
                <td>1.89 sec</td>
              </tr>
              <tr>
                <td className="param-name">Peak Horsepower</td>
                <td className="highlight-val"><strong className="cyan-text">1,450 HP</strong></td>
                <td>~1,000+ HP</td>
                <td>1,019 HP</td>
                <td>1,234 HP</td>
              </tr>
              <tr>
                <td className="param-name">Battery Chemistry</td>
                <td className="highlight-val"><strong className="cyan-text">Solid-State Graphene</strong></td>
                <td>Lithium-Ion (4680)</td>
                <td>Lithium-Ion (NMC)</td>
                <td>Lithium-Ion (2170)</td>
              </tr>
              <tr>
                <td className="param-name">WLTP Maximum Range</td>
                <td className="highlight-val"><strong className="cyan-text">620 Miles</strong></td>
                <td>620 Miles (claimed)</td>
                <td>344 Miles</td>
                <td>427 Miles</td>
              </tr>
              <tr>
                <td className="param-name">Fast Charging (10-80%)</td>
                <td className="highlight-val"><strong className="cyan-text">12 Minutes</strong></td>
                <td>~25-30 Minutes</td>
                <td>18 Minutes</td>
                <td>15 Minutes</td>
              </tr>
              <tr>
                <td className="param-name">Chassis Material</td>
                <td className="highlight-val"><strong className="cyan-text">Full Carbon Monocoque</strong></td>
                <td>Aluminum / Composite</td>
                <td>Steel / Aluminum Hybrid</td>
                <td>Aluminum Spaceframe</td>
              </tr>
              <tr>
                <td className="param-name">Track Overheating Risk</td>
                <td className="highlight-val"><span className="badge-pill pass">Zero Degradation</span></td>
                <td><span className="badge-pill warn">Thermal Limits</span></td>
                <td><span className="badge-pill pass">High Endurance</span></td>
                <td><span className="badge-pill warn">Medium Endurance</span></td>
              </tr>
              <tr>
                <td className="param-name">Base MSRP</td>
                <td className="highlight-val"><strong className="cyan-text">$188,000</strong></td>
                <td>$200,000+</td>
                <td>$230,000</td>
                <td>$249,000</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
