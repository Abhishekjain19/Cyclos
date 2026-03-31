import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbEdit, TbBell, TbLeaf, TbBolt, TbRecycle, TbShirt, TbPlant2 } from 'react-icons/tb';

/* Secondary domain materials — icon + colour mapping */
const SECONDARY_MATERIALS = [
  { id: 'compost', label: 'Compost', Icon: TbPlant2, bg: '#dcfce7' },
  { id: 'metals', label: 'Metals', Icon: TbRecycle, bg: '#e0f2fe' },
  { id: 'textiles', label: 'Textiles', Icon: TbShirt, bg: '#fef08a' },
  { id: 'biofuel', label: 'Bio Fuel', Icon: TbBolt, bg: '#ffedd5' },
  { id: 'rubber', label: 'Rubber', Icon: TbLeaf, bg: '#f3e8ff' },
];
import MapSection from '../components/MapSection';
import LocalFactsCarousel from '../components/LocalFactsCarousel';
import './MainPage.css';

export default function MainPage() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.name?.split(' ')[0] || 'Leonard';
  const fullName = user?.name || 'Leonard N. Olson';
  const locationText = userProfile?.primaryDomain ? 'Malleshwaram, Bengaluru' : 'Local Eco Hub';

  return (
    <div className="main-page">
      {/* Top Purple Block */}
      <motion.div
        className="dash-header__block"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Pill */}
        <div className="dash-profile-pill">
          <div className="dash-profile-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div className="dash-profile-info">
            <h2 className="dash-profile-name">{fullName}</h2>
            <p className="dash-profile-sub">{locationText}</p>
          </div>
          <div className="dash-profile-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="dash-profile-edit" aria-label="Notifications" onClick={() => navigate('/notifications')}>
              <TbBell size={16} />
            </button>
            <button className="dash-profile-edit" aria-label="Dashboard" onClick={() => navigate('/dashboard')}>
              <TbEdit size={16} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="dash-stats-row">
          <div className="dash-stat-minicard" style={{ background: '#1a1625' }}>
            <span className="dash-stat-val">3.5 kg</span>
            <span className="dash-stat-label">Recycle</span>
          </div>
          <div className="dash-stat-minicard" style={{ background: '#1a1625' }}>
            <span className="dash-stat-val">5.2 g</span>
            <span className="dash-stat-label">Carbon</span>
          </div>
          <div className="dash-stat-minicard" style={{ background: '#1a1625' }}>
            <span className="dash-stat-val">5287</span>
            <span className="dash-stat-label">Points</span>
          </div>
        </div>
      </motion.div>

      <div className="dash-content">
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dash-section-header">
            <h3 className="dash-section-title">Nearby bin stations</h3>
            {/* <a href="#" className="dash-section-viewall">View all</a>` */}
          </div>
          <div className="dash-map-card">
            <MapSection domain={userProfile?.secondaryDomain} />
          </div>
        </motion.div>

        {/* Materials Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '32px' }}
        >
          <div className="dash-section-header" style={{ marginTop: '32px' }}>
            <h3 className="dash-section-title">Materials</h3>
            <a href="/marketplace" className="dash-section-viewall">View all</a>
          </div>

          <div className="dash-materials-scroll">
            {SECONDARY_MATERIALS.map(({ id, label, Icon, bg }) => (
              <div key={id} className="material-card" style={{ background: bg }}>
                <Icon size={32} color="#110e1b" style={{ position: 'absolute', top: 16, opacity: 0.2 }} />
                <div className="material-card__label">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Local Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '120px' }}
        >
          <hr style={{ height: "2px", borderWidth: 0, backgroundColor: "white" }} />
          <LocalFactsCarousel location={locationText} />
          <hr style={{ height: "2px", borderWidth: 0, backgroundColor: "white" }} />
        </motion.div>
      </div>
    </div>
  );
}
