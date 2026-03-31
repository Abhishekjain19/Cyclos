import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbArrowRight, TbCheck, TbArrowLeft } from 'react-icons/tb';
import './DomainPage.css';

const DOMAINS = [
  { id: 'recycled-paper', emoji: '📄', title: 'Recycled Paper & Cardboard', desc: 'Notebooks, packaging, office paper' },
  { id: 'plastic-products', emoji: '♻️', title: 'Recycled Plastics', desc: 'Bottles, containers, pellets' },
  { id: 'organic-compost', emoji: '🌱', title: 'Organic Compost', desc: 'Fertilizer, soil amendment' },
  { id: 'metal-scrap', emoji: '🔩', title: 'Metal & Alloys', desc: 'Steel, copper, aluminium scrap' },
  { id: 'textile-upcycled', emoji: '🧵', title: 'Upcycled Textiles', desc: 'Fabric, yarn, garments' },
  { id: 'ewaste', emoji: '🖥️', title: 'E-Waste Components', desc: 'Circuit boards, chips, metals' },
  { id: 'glass', emoji: '🫙', title: 'Glass Products', desc: 'Recycled glass containers and raw glass' },
  { id: 'construction-material', emoji: '🧱', title: 'Construction Materials', desc: 'Reclaimed bricks, timber, concrete' },
  { id: 'bio-fuel', emoji: '⚡', title: 'Bio-fuel & Energy', desc: 'Biogas, compost-to-energy' },
  { id: 'rubber', emoji: '🛞', title: 'Recycled Rubber', desc: 'Tires, tubing, mats' },
  { id: 'food-byproduct', emoji: '🥫', title: 'Food Byproducts', desc: 'Spent grains, oil, feed' },
  { id: 'mixed', emoji: '🌿', title: 'Mixed / General', desc: 'Open to various recycled products' },
];

export default function SecondaryDomainPage() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    updateProfile({ secondaryDomain: selected });
    setLoading(false);
    navigate('/app');
  };

  return (
    <div className="domain-page">
      <div className="domain-page__blob domain-page__blob--1" />
      <div className="domain-page__blob domain-page__blob--2" />

      <div className="container domain-page__inner">
        <motion.div
          className="domain-page__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="domain-page__step">Step 2 of 2</div>
          <h1 className="domain-page__title">Your Secondary Domain</h1>
          <p className="domain-page__sub">
            What recycled products are you interested in <em>purchasing or sourcing</em>? 
            This drives your marketplace recommendations.
          </p>
          <div className="domain-page__progress">
            <div className="domain-page__progress-bar" style={{ width: '100%' }} />
          </div>
        </motion.div>

        <motion.div
          className="domain-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {DOMAINS.map((d, i) => (
            <motion.button
              key={d.id}
              className={`domain-card ${selected === d.id ? 'domain-card--selected' : ''}`}
              onClick={() => setSelected(d.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="domain-card__emoji">{d.emoji}</span>
              <span className="domain-card__title">{d.title}</span>
              <span className="domain-card__desc">{d.desc}</span>
              {selected === d.id && (
                <motion.div
                  className="domain-card__check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <TbCheck size={12} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="domain-page__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="domain-page__footer-row">
            <button className="btn-outline" onClick={() => navigate('/onboard/primary')}>
              <TbArrowLeft size={16} /> Back
            </button>
            <button
              className="btn-primary domain-page__cta"
              onClick={handleContinue}
              disabled={!selected || loading}
            >
              <span>
                {loading ? <><div className="spinner" /> Setting up…</> : <>Go to Dashboard <TbArrowRight size={18} /></>}
              </span>
            </button>
          </div>
          <p className="domain-page__hint">Select your preferred recycled product category</p>
        </motion.div>
      </div>
    </div>
  );
}
