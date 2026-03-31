import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TbMapPin, TbSearch, TbBell, TbChevronLeft, TbHeart, TbShoppingCart, TbStarFilled } from 'react-icons/tb';
import './MarketPage.css';

const PRODUCTS = [
  { id: 1, name: 'PET', img: 'https://images.unsplash.com/photo-1611284446314-60a58a7dd514?w=200&q=80', fullName: 'PET (Water Bottles)', price: '₹25/kg', desc: 'Clean PET Plastic bottles. Durable, lightweight, and 100% recyclable PET plastic bottles, perfect for beverages, oils, and more. Eco-friendly, BPA-free.' },
  { id: 2, name: 'HDPE', img: 'https://images.unsplash.com/photo-1595085350353-847e17409246?w=200&q=80', fullName: 'High-Density Polyethylene', price: '₹35/kg', desc: 'Rigid plastic containers, milk jugs, and pipes.' },
  { id: 3, name: 'LDPE', img: 'https://images.unsplash.com/photo-1605600659873-d808a1d14b18?w=200&q=80', fullName: 'Low-Density Polyethylene', price: '₹18/kg', desc: 'Plastic bags, various containers, dispensing bottles.' },
  { id: 4, name: 'PVC', img: 'https://images.unsplash.com/photo-1518534845532-6a7e02fb0ee7?w=200&q=80', fullName: 'Polyvinyl Chloride', price: '₹20/kg', desc: 'Plumbing pipes, medical devices, wire insulation.' },
  { id: 5, name: 'PP', img: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=200&q=80', fullName: 'Polypropylene', price: '₹30/kg', desc: 'Bottle caps, straws, yogurt containers, appliances.' },
  { id: 6, name: '3L PACK', img: 'https://images.unsplash.com/photo-1620050854443-47e9a8f4c280?w=200&q=80', fullName: '3-Layer Packaging', price: '₹12/kg', desc: 'Multi-layer packaging film, chips packets, wrappers.' },
];

export default function MarketPage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(4);

  return (
    <div className="market-page">
      <div className="market-header">
        <div className="market-location">
          <div className="market-location__icon"><TbMapPin size={18} /></div>
          <div className="market-location__text">
            <span className="market-location__lbl">Your Location v</span>
            <span className="market-location__val">Eint Khedi, Acharpura</span>
          </div>
        </div>
        <div className="market-header-actions">
          <button className="market-header-btn"><TbSearch size={20} /></button>
          <button className="market-header-btn"><TbBell size={20} /></button>
        </div>
      </div>

      <div className="market-body">
        <h2 className="market-title">Products</h2>
        
        <div className="market-grid">
          {PRODUCTS.map((prod, i) => (
            <motion.div 
              key={prod.id} 
              className="market-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedProduct(prod)}
            >
              <img src={prod.img} alt={prod.name} className="market-card__img" />
              <div className="market-card__label">{prod.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="market-detail"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="market-detail__hero">
              <nav className="market-detail__nav">
                <button className="market-detail__nav-btn" onClick={() => setSelectedProduct(null)}>
                  <TbChevronLeft size={24} />
                </button>
                <button className="market-detail__nav-btn">
                  <TbHeart size={20} />
                </button>
              </nav>
              <img src={selectedProduct.img} alt={selectedProduct.fullName} className="market-detail__img" />
            </div>

            <div className="market-detail__info">
              <h1 className="market-detail__title">{selectedProduct.fullName}</h1>
              <div className="market-detail__price">{selectedProduct.price}</div>
              
              <div className="market-detail__meta">
                <span><span style={{color: '#f59e0b'}}>$$</span> Free Delivery</span>
                <span className="market-detail__rating"><TbStarFilled size={14} /> 4.5</span>
              </div>

              <div className="market-detail__desc-title">Description</div>
              <p className="market-detail__desc">{selectedProduct.desc}</p>
              
              <div className="market-detail__desc-title">Recommended For You</div>
              <div className="market-grid" style={{ marginTop: '16px' }}>
                 {PRODUCTS.slice(1, 3).map(p => (
                   <div key={p.id} className="market-card" onClick={() => setSelectedProduct(p)}>
                     <img src={p.img} alt={p.name} className="market-card__img" />
                     <div className="market-card__label">{p.name}</div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="market-detail__footer">
              <div className="market-detail__qty">
                <button className="market-detail__qty-btn" onClick={() => setQty(Math.max(1, qty-1))}>-</button>
                <span className="market-detail__qty-val">{qty} Kg</span>
                <button className="market-detail__qty-btn" onClick={() => setQty(qty+1)}>+</button>
              </div>
              <button className="market-detail__add">
                <TbShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
