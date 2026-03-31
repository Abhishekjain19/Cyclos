import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { TbEdit, TbHome, TbScan, TbMapPin, TbPlant, TbLeaf, TbTrophy } from 'react-icons/tb';
import MapSection from '../components/MapSection';
import './MainPage.css';

export default function MainPage() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const firstName = user?.name?.split(' ')[0] || 'Leonard';
  const fullName = user?.name || 'Leonard N. Olson';
  const locationText = userProfile?.primaryDomain ? '20 Cooper Square, NY 10' : 'Local Eco Hub';

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
          <button className="dash-profile-edit" aria-label="Edit Profile">
            <TbEdit size={16} />
          </button>
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
            <h3 className="dash-section-title">Nearby bin station</h3>
            <a href="#" className="dash-section-viewall">View all</a>
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
          style={{ marginBottom: '80px' }}
        >
          <div className="dash-section-header" style={{ marginTop: '32px' }}>
            <h3 className="dash-section-title">Materials</h3>
            <a href="/marketplace" className="dash-section-viewall">View all</a>
          </div>
          
          <div className="dash-materials-scroll">
            <div className="material-card material-bg-1">
               <TbPlant size={32} color="#110e1b" style={{ position: 'absolute', top: 16, opacity: 0.2 }} />
               <div className="material-card__label">Plastic</div>
            </div>
            <div className="material-card material-bg-2">
               <TbLeaf size={32} color="#110e1b" style={{ position: 'absolute', top: 16, opacity: 0.2 }} />
               <div className="material-card__label">Glass</div>
            </div>
            <div className="material-card material-bg-3">
               <TbTrophy size={32} color="#110e1b" style={{ position: 'absolute', top: 16, opacity: 0.2 }} />
               <div className="material-card__label">Paper</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Replaced Bottom Nav with the custom floating one */}
      <div className="bottom-nav-app">
        <div className="bottom-nav-app__icon active">
          <TbHome />
        </div>
        <div 
           className="bottom-nav-app__scan" 
           onClick={() => navigate('/scanner')}
        >
          <TbScan />
        </div>
        <div 
           className="bottom-nav-app__icon"
           onClick={() => navigate('/marketplace')}
        >
          <TbMapPin />
        </div>
      </div>
    </div>
  );
}
