import { useRef, useEffect, useState } from 'react';
import './LocalFactsCarousel.css';

const GET_FACTS = (loc) => [
  { img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&q=80', title: `${loc} Recycling Rate`, body: `Recent data shows ${loc} has improved its residential recycling rate to 34% this year. Let's push for 50%!`, color: '#6366f1' },
  { img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&q=80', title: `E-Waste in ${loc}`, body: `${loc} produces roughly 4.2 kg of e-waste per capita annually. Keep electronics out of normal bins.`, color: '#ec4899' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&q=80', title: `Composting Initiative`, body: `New ${loc} district initiatives are promoting local composting to reduce landfill methane by 20%.`, color: '#10b981' },
  { img: 'https://images.unsplash.com/photo-1611284446314-60a58a7dd514?w=200&q=80', title: `Plastic Ban Impact`, body: `Since local regulations updated, single-use plastic volume in ${loc} facilities has dropped by 12%.`, color: '#f59e0b' },
  { img: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=200&q=80', title: 'Local Collection', body: `Waste management routes in ${loc} cover over 400 miles weekly. Help them by sorting properly!`, color: '#3b82f6' },
  { img: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?w=200&q=80', title: 'Protect Our Waters', body: `Proper waste sorting in ${loc} directly impacts the cleanliness of our state's water bodies.`, color: '#0ea5e9' }
];

export default function LocalFactsCarousel({ location }) {
  const tickerRef = useRef(null);
  const wrapRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Parse location to a shorter format if possible
  let shortLocation = location?.includes(',') ? location.split(',')[1].trim() : (location?.split(' ')[0] || 'Your Region');
  if (shortLocation.toLowerCase() === 'local') {
    shortLocation = 'Your City';
  }
  const facts = GET_FACTS(shortLocation);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Clone children for infinite scroll effect (handled purely by CSS if possible, but JS for seamless)
    // Actually, since user wants manual scroll, let's use a native CSS auto-scroll via keyframes 
    // and rely on overflow / drag for manual scroll, OR standard JS scroll.
    
    // Instead of raw transform translation which breaks native scrolling, 
    // let's animate the scrollLeft property directly!
    let raf;
    let pos = ticker.scrollLeft;

    const animate = () => {
      if (!isHovered && !isDragging) {
        pos += 0.5; // scroll speed
        if (pos >= ticker.scrollWidth / 2) {
           pos = 0; // reset
        }
        ticker.scrollLeft = pos;
      } else {
        // sync pos with manual scroll
        pos = ticker.scrollLeft;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, isDragging]);

  // Handle Drag to scroll manually
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tickerRef.current.offsetLeft);
    setScrollLeft(tickerRef.current.scrollLeft);
  };
  const onMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tickerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    tickerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="local-facts" 
      ref={wrapRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <div 
         className="local-facts__track" 
         ref={tickerRef}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onMouseMove={onMouseMove}
      >
        {/* Double the facts for infinite loop effect */}
        {[...facts, ...facts].map((f, i) => (
          <div key={i} className="local-fact-card">
            <img src={f.img} alt={f.title} className="local-fact-card__img" />
            <h3 className="local-fact-card__title">{f.title}</h3>
            <p className="local-fact-card__body">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
