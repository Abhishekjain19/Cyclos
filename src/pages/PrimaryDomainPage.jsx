import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbArrowRight, TbCheck } from 'react-icons/tb';
import './DomainPage.css';

const DOMAINS = [
  { id: 'manufacturing', emoji: '🏭', title: 'Manufacturing', desc: 'Industrial production, assembly, fabrication' },
  { id: 'hospitality', emoji: '🏨', title: 'Hospitality & Food', desc: 'Restaurants, hotels, food processing' },
  { id: 'healthcare', emoji: '🏥', title: 'Healthcare', desc: 'Hospitals, clinics, pharma labs' },
  { id: 'construction', emoji: '🏗️', title: 'Construction', desc: 'Building materials, demolition waste' },
  { id: 'retail', emoji: '🛒', title: 'Retail & Commerce', desc: 'Packaging, unsold goods, returns' },
  { id: 'agriculture', emoji: '🌾', title: 'Agriculture', desc: 'Crop residue, organic waste, farm byproducts' },
  { id: 'electronics', emoji: '💻', title: 'Electronics & IT', desc: 'E-waste, circuit boards, cables' },
  { id: 'textile', emoji: '👕', title: 'Textile & Fashion', desc: 'Fabric scraps, unsold inventory' },
  { id: 'education', emoji: '🎓', title: 'Education', desc: 'Paper, stationery, lab waste' },
  { id: 'municipal', emoji: '🏛️', title: 'Municipal Body', desc: 'Community waste management' },
  { id: 'logistics', emoji: '🚚', title: 'Logistics & Transport', desc: 'Packaging, oil, tire waste' },
  { id: 'other', emoji: '🌿', title: 'Other', desc: 'General or mixed waste categories' },
];

export default function PrimaryDomainPage() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    updateProfile({ primaryDomain: selected });
    setLoading(false);
    navigate('/onboard/secondary');
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
          <div className="domain-page__step">Step 1 of 2</div>
          <h1 className="domain-page__title">Your Primary Domain</h1>
          <p className="domain-page__sub">
            Where do you work or operate? This helps us tailor recycling opportunities for the waste <em>you generate</em>.
          </p>
          <div className="domain-page__progress">
            <div className="domain-page__progress-bar" style={{ width: '50%' }} />
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
          <button
            className="btn-primary domain-page__cta"
            onClick={handleContinue}
            disabled={!selected || loading}
          >
            <span>
              {loading ? <><div className="spinner" /> Saving…</> : <>Continue <TbArrowRight size={18} /></>}
            </span>
          </button>
          <p className="domain-page__hint">Select your primary industry domain to proceed</p>
        </motion.div>
      </div>
    </div>
  );
}
