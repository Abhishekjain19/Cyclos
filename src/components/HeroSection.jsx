import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TbArrowRight, TbLeaf, TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import './HeroSection.css';

const NEWS_CARDS = [
  {
    id: 0,
    tag: 'CRISIS',
    title: "Pacific Garbage Patch now three times the size of France — and growing.",
    excerpt: "New satellite imagery confirms the Great Pacific Garbage Patch has expanded by 8% since 2024, trapping an estimated 80,000 tonnes of plastic and decimating surface-layer marine life. MORE",
    img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80',
    date: 'Mar 28, 2026',
  },
  {
    id: 1,
    tag: 'URGENT',
    title: "75% of the world's coral reefs suffered bleaching events in 2026.",
    excerpt: "The fourth global mass bleaching event on record has left scientists alarmed as rising sea surface temperatures stripped colour — and life — from reef systems across the Indo-Pacific. MORE",
    img: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&q=80',
    date: 'Mar 25, 2026',
  },
  {
    id: 2,
    tag: 'ALERT',
    title: "Microplastic concentrations in deep ocean trenches double since 2020.",
    excerpt: "Researchers sampling the Mariana Trench found microplastic densities of 2,200 particles per litre — twice the 2020 baseline — raising fears of permanent contamination of the hadal zone. MORE",
    img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
    date: 'Mar 20, 2026',
  },
  {
    id: 3,
    tag: 'LATEST',
    title: "One in three marine species now listed as threatened by IUCN Red List.",
    excerpt: "The updated IUCN Red List documents 34% of assessed marine species as Vulnerable, Endangered, or Critically Endangered — driven by pollution, overfishing, and habitat degradation. MORE",
    img: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80',
    date: 'Mar 15, 2026',
  },
  {
    id: 4,
    tag: 'REPORT',
    title: "Ocean dead zones hit 700 globally as agricultural runoff intensifies.",
    excerpt: "Hypoxic dead zones — where dissolved oxygen is too low to support life — have expanded to 245,000 km² of ocean floor, fuelled by nitrogen-heavy fertiliser runoff from coastal agriculture. MORE",
    img: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600&q=80',
    date: 'Mar 10, 2026',
  },
];

function NewsCarousel() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const total = NEWS_CARDS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  useEffect(() => {
    if (isHovered || expanded !== null) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, expanded, total]);

  return (
    <div
      className="news-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="news-carousel__viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="news-card"
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setExpanded(active)}
          >
            <img src={NEWS_CARDS[active].img} alt={NEWS_CARDS[active].title} className="news-card__img" />
            <div className="news-card__overlay" />
            <div className="news-card__content">
              <span className="news-card__tag">{NEWS_CARDS[active].tag}</span>
              <h3 className="news-card__title">"{NEWS_CARDS[active].title}"</h3>
              <p className="news-card__date">{NEWS_CARDS[active].date}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side peek cards */}
        <div className="news-carousel__peek news-carousel__peek--left" onClick={prev}>
          <img src={NEWS_CARDS[(active - 1 + total) % total].img} alt="" />
        </div>
        <div className="news-carousel__peek news-carousel__peek--right" onClick={next}>
          <img src={NEWS_CARDS[(active + 1) % total].img} alt="" />
        </div>

        {/* Arrow buttons */}
        <button className="news-carousel__arrow news-carousel__arrow--left" onClick={prev} aria-label="Previous">
          <TbChevronLeft size={20} />
        </button>
        <button className="news-carousel__arrow news-carousel__arrow--right" onClick={next} aria-label="Next">
          <TbChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="news-carousel__dots">
        {NEWS_CARDS.map((_, i) => (
          <button
            key={i}
            className={`news-carousel__dot ${i === active ? 'news-carousel__dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            className="news-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
          >
            <motion.div
              className="news-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="news-modal__close" onClick={() => setExpanded(null)} aria-label="Close">✕</button>
              <img src={NEWS_CARDS[expanded].img} alt={NEWS_CARDS[expanded].title} className="news-modal__img" />
              <div className="news-modal__body">
                <span className="news-card__tag">{NEWS_CARDS[expanded].tag}</span>
                <h2 className="news-modal__title">{NEWS_CARDS[expanded].title}</h2>
                <p className="news-modal__excerpt">{NEWS_CARDS[expanded].excerpt}</p>
                <p className="news-modal__date">{NEWS_CARDS[expanded].date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Forest background */}
      <div className="hero__bg" />
      <div className="hero__bg-overlay" />

      <div className="container hero__body">
        {/* Left — text */}
        <div className="hero__left">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TbLeaf size={14} />
            <span>Marine Ecosystem Monitor · 2026</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Restore What
            <br />
            <span className="hero__title-accent">We've Lost</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Cyclos unites ocean advocates, researchers, and coastal communities
            to track marine pollution, monitor biodiversity collapse, and
            combat the over-exploitation of our ocean resources.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <Link to="/signup" className="hero__cta-btn">
              Join the Mission <TbArrowRight size={18} />
            </Link>
            <a href="#what-we-do" className="hero__ghost-btn">See How It Works</a>
          </motion.div>
        </div>

        {/* Right — news carousel */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__carousel-label">
            <span className="hero__carousel-dot" />
            Ocean Crisis Updates
          </div>
          <NewsCarousel />
        </motion.div>
      </div>

      {/* Bottom wave separator */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0E2425" />
        </svg>
      </div>
    </section>
  );
}
