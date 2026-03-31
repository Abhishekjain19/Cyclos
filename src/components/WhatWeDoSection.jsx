import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TbCamera, TbShoppingCart, TbRobot, TbMapPin, TbChartBar, TbLeaf } from 'react-icons/tb';
import './WhatWeDoSection.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: <TbCamera size={28} />,
    title: 'AI Waste Scanner',
    desc: 'Point your camera at any waste item and get instant AI-powered classification, recycling instructions, and carbon footprint data.',
    color: '#53AEA5',
    tag: 'Computer Vision'
  },
  {
    icon: <TbShoppingCart size={28} />,
    title: 'Circular Marketplace',
    desc: 'Buy and sell recycled materials and products in a privacy-first marketplace with location-based fuzzy matching.',
    color: '#7ECAC0',
    tag: 'P2P Trading'
  },
  {
    icon: <TbRobot size={28} />,
    title: 'AI Chatbot Assistant',
    desc: 'Get personalized advice on waste reduction, recycling tips, and sustainable alternatives powered by advanced AI.',
    color: '#AEE1D8',
    tag: 'NLP · LLM'
  },
  {
    icon: <TbMapPin size={28} />,
    title: 'Location-Based Matching',
    desc: 'Discover nearby recycling opportunities and connect with local waste producers and consumers using spatial intelligence.',
    color: '#39938B',
    tag: 'Geo Intelligence'
  },
  {
    icon: <TbChartBar size={28} />,
    title: 'Impact Dashboard',
    desc: 'Track your carbon footprint reduction, points earned, and environmental impact through rich real-time analytics.',
    color: '#2F7E79',
    tag: 'Analytics'
  },
  {
    icon: <TbLeaf size={28} />,
    title: 'Domain-Based Matching',
    desc: 'Declare your industry domain to get hyper-relevant recycling opportunities and marketplace recommendations.',
    color: '#7ECAC0',
    tag: 'Smart Filtering'
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="what-we-do" className="wwd" ref={sectionRef}>
      {/* Background grid */}
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
            A Complete Ecosystem for
            <span className="gradient-text"> Circular Economy</span>
          </h2>
          <p className="wwd__desc">
            From AI-powered waste identification to a decentralised marketplace — 
            Cyclos gives you every tool to close the loop on waste.
          </p>
        </motion.div>

        <div className="wwd__grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              className="wwd__card"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
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
