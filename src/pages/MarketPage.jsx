import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TbChevronLeft, TbShoppingCart, TbSearch,
  TbHeart, TbStarFilled, TbChevronRight
} from 'react-icons/tb';
import './MarketPage.css';

/* ── Category tabs (secondary domains + All) ─────────── */
const CATEGORIES = [
  { id: 'all',      emoji: '🌿', label: 'All'      },
  { id: 'compost',  emoji: '🌱', label: 'Compost'  },
  { id: 'metals',   emoji: '🔩', label: 'Metals'   },
  { id: 'textiles', emoji: '🧵', label: 'Textiles' },
  { id: 'biofuel',  emoji: '⚡', label: 'Bio Fuel' },
  { id: 'rubber',   emoji: '🛞', label: 'Rubber'   },
];

/* ── Product catalogue ───────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, category: 'compost',
    name: 'Organic Compost Mix',
    desc: 'Premium kitchen-waste compost blend, rich in nitrogen and micronutrients. Ideal for home gardens and urban farming. Produced by the local eco-hub.',
    price: '₹80/kg',
    img: 'https://images.unsplash.com/photo-1591189824523-749ef1e41888?w=400&q=80',
  },
  {
    id: 2, category: 'metals',
    name: 'Reclaimed Copper Wire',
    desc: 'Stripped copper wire recovered from certified e-waste facilities. 99.5 % purity, ready for remanufacturing or resale.',
    price: '₹350/kg',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 3, category: 'textiles',
    name: 'Upcycled Denim Fabric',
    desc: 'Salvaged denim from manufacturing offcuts. Washed, sorted, and baled in 10 kg lots. Perfect for patchwork and artisan fashion.',
    price: '₹120/kg',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80',
  },
  {
    id: 4, category: 'biofuel',
    name: 'Waste Cooking Oil',
    desc: 'Filtered used cooking oil collected from restaurants. Ready for biodiesel conversion. Available in 20-litre containers.',
    price: '₹45/L',
    img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
  },
  {
    id: 5, category: 'rubber',
    name: 'Ground Tyre Crumb',
    desc: 'Fine rubber crumb derived from end-of-life tyres. Used in sports surfaces, playground flooring, and asphalt modification.',
    price: '₹30/kg',
    img: 'https://images.unsplash.com/photo-1518534845532-6a7e02fb0ee7?w=400&q=80',
  },
  {
    id: 6, category: 'metals',
    name: 'Aluminium Scrap Sheets',
    desc: 'Clean aluminium offcuts from fabrication units. Sorted by alloy grade. Minimum order 5 kg.',
    price: '₹95/kg',
    img: 'https://images.unsplash.com/photo-1605600659873-d808a1d14b18?w=400&q=80',
  },
  {
    id: 7, category: 'compost',
    name: 'Vermicompost Pellets',
    desc: 'Slow-release vermicompost in easy-to-handle pellet form. Enriches soil structure and boosts crop yield by up to 30 %.',
    price: '₹110/kg',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  },
  {
    id: 8, category: 'textiles',
    name: 'Cotton Rag Bundles',
    desc: 'Sorted cotton rags from garment factories — dust-free, absorbent, and ready for industrial wiping or paper pulp use.',
    price: '₹55/kg',
    img: 'https://images.unsplash.com/photo-1620050854443-47e9a8f4c280?w=400&q=80',
  },
];

export default function MarketPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleWish = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const openProduct = (p) => { setSelected(p); setQty(1); };

  return (
    <div className="mkt-page">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mkt-header">
        <button className="mkt-back-btn" onClick={() => navigate(-1)}>
          <TbChevronLeft size={22} />
        </button>
        <h2 className="mkt-header__title">Our Products</h2>
        <button className="mkt-cart-btn">
          <TbShoppingCart size={20} />
        </button>
      </div>

      {/* ── Search bar ─────────────────────────────────────── */}
      <div className="mkt-search-wrap">
        <TbSearch size={18} className="mkt-search-icon" />
        <input
          className="mkt-search"
          placeholder="Search Products"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="mkt-search-btn"><TbSearch size={16} /></button>
      </div>

      {/* ── Category chips ─────────────────────────────────── */}
      <div className="mkt-cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`mkt-cat${activeCategory === cat.id ? ' mkt-cat--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="mkt-cat__icon">{cat.emoji}</span>
            <span className="mkt-cat__label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Product list ───────────────────────────────────── */}
      <div className="mkt-list">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              className="mkt-empty"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No products found 🔍
            </motion.div>
          ) : (
            filtered.map((prod, i) => (
              <motion.div
                key={prod.id}
                className="mkt-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => openProduct(prod)}
              >
                <div className="mkt-item__img-wrap">
                  <img src={prod.img} alt={prod.name} className="mkt-item__img" />
                </div>
                <div className="mkt-item__body">
                  <p className="mkt-item__name">{prod.name}</p>
                  <p className="mkt-item__price">{prod.price}</p>
                </div>
                <button
                  className={`mkt-item__wish${wishlist.includes(prod.id) ? ' mkt-item__wish--active' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleWish(prod.id); }}
                >
                  <TbHeart size={16} />
                </button>
                <TbChevronRight size={16} className="mkt-item__arrow" />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Detail sheet ───────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="mkt-detail"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            {/* hero image */}
            <div className="mkt-detail__hero">
              <nav className="mkt-detail__nav">
                <button className="mkt-detail__nav-btn" onClick={() => setSelected(null)}>
                  <TbChevronLeft size={22} />
                </button>
                <button
                  className={`mkt-detail__nav-btn${wishlist.includes(selected.id) ? ' mkt-detail__nav-btn--wish' : ''}`}
                  onClick={() => toggleWish(selected.id)}
                >
                  <TbHeart size={20} />
                </button>
              </nav>
              <img src={selected.img} alt={selected.name} className="mkt-detail__img" />
            </div>

            {/* info */}
            <div className="mkt-detail__info">
              <h1 className="mkt-detail__title">{selected.name}</h1>
              <p className="mkt-detail__price">{selected.price}</p>

              <div className="mkt-detail__meta">
                <span>🚚 Free Delivery</span>
                <span className="mkt-detail__rating"><TbStarFilled size={13} /> 4.5</span>
              </div>

              <p className="mkt-detail__desc-title">Description</p>
              <p className="mkt-detail__desc">{selected.desc}</p>

              <p className="mkt-detail__desc-title">You may also like</p>
              <div className="mkt-also-list">
                {PRODUCTS.filter(p => p.id !== selected.id && p.category === selected.category).slice(0, 2).map(p => (
                  <div key={p.id} className="mkt-also-item" onClick={() => openProduct(p)}>
                    <img src={p.img} alt={p.name} className="mkt-also-item__img" />
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="mkt-detail__footer">
              <div className="mkt-detail__qty">
                <button className="mkt-detail__qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="mkt-detail__qty-val">{qty} kg</span>
                <button className="mkt-detail__qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="mkt-detail__add">
                <TbShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
