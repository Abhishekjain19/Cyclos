import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbCamera, TbShoppingCart, TbRobot } from 'react-icons/tb';
import './BottomNav.css';

const NAV_ITEMS = [
  { icon: <TbCamera size={22} />, label: 'Scanner', path: '/scanner' },
  { icon: <TbShoppingCart size={22} />, label: 'Market', path: '/marketplace' },
  { icon: <TbRobot size={22} />, label: 'AI Chat', path: '/chatbot' },
];

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bottom-nav"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {NAV_ITEMS.map((item, i) => (
        <button
          key={i}
          className="bottom-nav__item"
          onClick={() => navigate(item.path)}
          aria-label={item.label}
        >
          <div className="bottom-nav__icon">{item.icon}</div>
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
