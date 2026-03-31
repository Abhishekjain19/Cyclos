import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbArrowLeft, TbMessageCircle, TbBell, TbClipboardList, TbX } from 'react-icons/tb';
import './DomainPage.css';

const DOMAINS = [
  { id: 'cloth', emoji: '👕', title: 'CLOTH', bg: '#d4a373' },
  { id: 'ewaste', emoji: '💻', title: 'E-WASTE', bg: '#8ecae6' },
  { id: 'paper', emoji: '📰', title: 'PAPER', bg: '#e0e1dd' },
  { id: 'glass', emoji: '🫙', title: 'GLASS', bg: '#4a4e69' },
  { id: 'plastic', emoji: '🥤', title: 'PLASTIC', bg: '#f8edeb' },
];

export default function PrimaryDomainPage() {
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
    updateProfile({ primaryDomain: selected[0] }); // Just taking the first for now to maintain compat
    setLoading(false);
    navigate('/onboard/secondary');
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
          🌍🪴
        </motion.div>
        
        <motion.div
          className="domain-page__title-pill"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Select Waste Type
        </motion.div>
      </div>

      <div className="domain-page__body">
        <div className="domain-page__list-header">
          <div className="domain-page__list-header-left">
            <span>Waste price list</span>
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
          {DOMAINS.map((d, i) => {
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
          {loading ? 'PROCESSING...' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
}
