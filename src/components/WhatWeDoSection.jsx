import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TbCamera, TbMap, TbRobot, TbFlame, TbChartBar, TbFish } from 'react-icons/tb';
import './WhatWeDoSection.css';

const SERVICES = [
  {
    icon: <TbCamera size={28} />,
    title: 'AI Marine Debris Scanner',
    desc: 'Point your camera at ocean debris or coastal waste and get instant AI-powered identification, pollution severity rating, and remediation guidance.',
    color: '#53AEA5',
    tag: 'Computer Vision'
  },
  {
    icon: <TbMap size={28} />,
    title: 'Biodiversity Heatmap',
    desc: 'Visualise global marine species populations on interactive maps. Track extinction risk zones and healthy reef corridors in real time.',
    color: '#7ECAC0',
    tag: 'Geo Intelligence'
  },
  {
    icon: <TbRobot size={28} />,
    title: 'Marine AI Assistant',
    desc: 'Get expert guidance on ocean conservation, species identification, cleanup logistics, and sustainable fishing practices powered by advanced AI.',
    color: '#AEE1D8',
    tag: 'NLP · LLM'
  },
  {
    icon: <TbFlame size={28} />,
    title: 'Pollution Hotspot Alerts',
    desc: 'Receive real-time alerts on pollution plumes, oil spills, and chemical runoff events near your registered coastal area or dive site.',
    color: '#39938B',
    tag: 'Real-time Monitoring'
  },
  {
    icon: <TbChartBar size={28} />,
    title: 'Resource Overuse Dashboard',
    desc: 'Monitor fishing intensity, seabed mining footprints, and freshwater extraction rates against sustainable limits through rich live analytics.',
    color: '#2F7E79',
    tag: 'Analytics'
  },
  {
    icon: <TbFish size={28} />,
    title: 'Species & Habitat Matching',
    desc: 'Match threatened marine habitats with restoration volunteers, NGOs, and funding bodies using smart biodiversity-profile filtering.',
    color: '#7ECAC0',
    tag: 'Smart Matching'
  },
];

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [paused, setPaused] = useState(false);

  // Duplicate for seamless infinite loop
  const TICKER_SERVICES = [...SERVICES, ...SERVICES];

  return (
    <section id="what-we-do" className="wwd" ref={sectionRef}>
      <div className="wwd__grid-bg" />

      <div className="container">
        <motion.div
          className="wwd__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="wwd__tag">What We Do</span>
          <h2 className="wwd__title">
            A Complete Platform for
            <span className="gradient-text"> Ocean Protection</span>
          </h2>
          <p className="wwd__desc">
            From AI-powered debris detection to real-time species collapse alerts —
            Cyclos gives every ocean steward the tools to measure, act, and restore.
          </p>
        </motion.div>
      </div>

      {/* Ticker — hover freezes, mouse-out resumes */}
      <div
        className="wwd__ticker-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="wwd__ticker-track"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {TICKER_SERVICES.map((s, i) => (
            <motion.div
              key={i}
              className="wwd__card"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="wwd__card-icon" style={{ color: s.color, background: `${s.color}15` }}>
                {s.icon}
              </div>
              <div className="wwd__card-tag">{s.tag}</div>
              <h3 className="wwd__card-title">{s.title}</h3>
              <p className="wwd__card-desc">{s.desc}</p>
              <div className="wwd__card-hover-line" style={{ background: s.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
