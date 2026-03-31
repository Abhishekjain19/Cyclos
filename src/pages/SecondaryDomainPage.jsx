import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbArrowLeft, TbMessageCircle, TbBell, TbClipboardList, TbX } from 'react-icons/tb';
import './DomainPage.css';

const SECONDARY_DOMAINS = [
  { id: 'compost', emoji: '🌱', title: 'COMPOST', bg: '#8ecae6' },
  { id: 'metals', emoji: '🔩', title: 'METALS', bg: '#e0e1dd' },
  { id: 'textiles', emoji: '🧵', title: 'TEXTILES', bg: '#d4a373' },
  { id: 'biofuel', emoji: '⚡', title: 'BIO FUEL', bg: '#f8edeb' },
  { id: 'rubber', emoji: '🛞', title: 'RUBBER', bg: '#4a4e69' },
];

export default function SecondaryDomainPage() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    updateProfile({ secondaryDomain: selected[0] });
    setLoading(false);
    navigate('/app');
  };

  return (
    <div className="domain-page">
      <div className="domain-page__header">
        <div className="domain-page__nav">
          <button className="domain-page__nav-btn" onClick={() => navigate(-1)}>
            <TbArrowLeft size={22} />
          </button>
          <div className="domain-page__nav-icons">
            <TbMessageCircle />
            <TbBell />
          </div>
        </div>
        
        <motion.div 
          className="domain-page__illustration"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        >
          📦🏭
        </motion.div>
        
        <motion.div
          className="domain-page__title-pill"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Select Sourcing Needs
        </motion.div>
      </div>

      <div className="domain-page__body">
        <div className="domain-page__list-header">
          <div className="domain-page__list-header-left">
            <span>Market price list</span>
            <TbClipboardList size={18} />
          </div>
          <motion.div 
            className="domain-page__list-header-right"
            key={selected.length}
            initial={{ scale: 1.1, color: '#aee1d8' }}
            animate={{ scale: 1, color: '#ffffff' }}
          >
            {selected.length} Selected <TbX size={16} onClick={() => setSelected([])} />
          </motion.div>
        </div>

        <motion.div 
          className="domain-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {SECONDARY_DOMAINS.map((d, i) => {
            const isSelected = selected.includes(d.id);
            return (
              <motion.div
                key={d.id}
                className={`domain-card ${isSelected ? 'domain-card--selected' : ''}`}
                style={{ backgroundColor: d.bg }}
                onClick={() => toggleSelect(d.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!isSelected && <span className="domain-card__plus">+</span>}
                <span className="domain-card__emoji">{d.emoji}</span>
                <span className="domain-card__title">{d.title}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="domain-page__footer">
        <button 
          className="domain-page__cta"
          onClick={handleContinue}
          disabled={selected.length === 0 || loading}
        >
          {loading ? 'PROCESSING...' : 'GO TO DASHBOARD'}
        </button>
      </div>
    </div>
  );
}
