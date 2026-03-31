import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';
import {
  TbLeaf, TbStar, TbCloudSnow, TbRecycle, TbShoppingBag,
  TbBell, TbSettings, TbLogout, TbTrendingUp, TbAward
} from 'react-icons/tb';
import BottomNav from '../components/BottomNav';
import MapSection from '../components/MapSection';
import TipsCarousel from '../components/TipsCarousel';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const STAT_CARDS = (profile, name) => [
  {
    label: 'Eco Points',
    value: 1284,
    icon: <TbStar size={20} />,
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    suffix: 'pts',
    change: '+18 today'
  },
  {
    label: 'Carbon Saved',
    value: 6.8,
    icon: <TbCloudSnow size={20} />,
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    suffix: 'T CO₂',
    change: '+0.3 this week'
  },
  {
    label: 'Items Recycled',
    value: 47,
    icon: <TbRecycle size={20} />,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
    suffix: 'items',
    change: '+3 this month'
  },
  {
    label: 'Purchases',
    value: 12,
    icon: <TbShoppingBag size={20} />,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
    suffix: 'orders',
    change: 'Last: 2 days ago'
  },
];

function AnimatedCounter({ end, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = decimals > 0
            ? obj.val.toFixed(decimals)
            : Math.floor(obj.val).toLocaleString();
        }
      }
    });
  }, [inView, end, decimals]);

  return <span ref={ref}>0</span>;
}

export default function MainPage() {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = STAT_CARDS(userProfile, user?.name);
  const firstName = user?.name?.split(' ')[0] || 'Eco Hero';

  return (
    <div className="main-page">
      {/* Top Header */}
      <motion.header
        className="main-header"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container main-header__inner">
          <div className="main-header__brand">
            <div className="main-header__logo">
              <TbLeaf size={18} />
            </div>
            <span className="main-header__logo-text">Cyclos</span>
          </div>
          <div className="main-header__actions">
            <button className="main-header__icon-btn" aria-label="Notifications">
              <TbBell size={20} />
              <span className="main-header__notif-dot" />
            </button>
            <button className="main-header__icon-btn" aria-label="Settings">
              <TbSettings size={20} />
            </button>
            <button className="main-header__icon-btn main-header__logout" onClick={handleLogout} aria-label="Logout">
              <TbLogout size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="container main-page__content">
        {/* Mini Dashboard */}
        <motion.section
          className="dash-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="dash-section__top">
            <div className="dash-section__greeting">
              <div className="dash-section__avatar">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="dash-section__hello">{greeting}, <strong>{firstName}!</strong> 👋</p>
                <p className="dash-section__domain">
                  {userProfile?.primaryDomain
                    ? `🏭 ${userProfile.primaryDomain.charAt(0).toUpperCase() + userProfile.primaryDomain.slice(1)} · Producer`
                    : '🌿 Eco Advocate'}
                </p>
              </div>
            </div>
            <div className="dash-section__level">
              <TbAward size={16} />
              <span>Green Champion</span>
            </div>
          </div>

          <div className="dash-stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="dash-stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="dash-stat-card__icon" style={{ color: s.color, background: s.bg }}>
                  {s.icon}
                </div>
                <div className="dash-stat-card__body">
                  <div className="dash-stat-card__value">
                    {s.label === 'Carbon Saved'
                      ? <><AnimatedCounter end={s.value} decimals={1} /><span className="dash-stat-card__suffix"> {s.suffix}</span></>
                      : <><AnimatedCounter end={s.value} /><span className="dash-stat-card__suffix"> {s.suffix}</span></>
                    }
                  </div>
                  <div className="dash-stat-card__label">{s.label}</div>
                  <div className="dash-stat-card__change">
                    <TbTrendingUp size={11} /> {s.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="section-label">
            <span>📍 Nearby Marketplace</span>
            {userProfile?.secondaryDomain && (
              <span className="section-label__tag">
                {userProfile.secondaryDomain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            )}
          </div>
          <MapSection domain={userProfile?.secondaryDomain} />
        </motion.section>

        {/* Tips Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ marginBottom: '120px' }}
        >
          <div className="section-label">
            <span>💡 Tips & Facts</span>
          </div>
          <TipsCarousel />
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
}
