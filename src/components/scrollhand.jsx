import React, { useRef, useState, useEffect } from 'react';
import './scrollableHand.css';

export default function ScrollableHand({ children, id, color }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1); // -1 for rounding
  };

  // Listen to scroll changes on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll(); // initial check

    const handleScroll = () => {
      checkScroll();
    };

    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    checkScroll(); // update when children change
  }, [children]);

  const scrollBy = (amount) => {
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="hand-wrapper">
      
      {canScrollLeft && (
        <button
          className="scroll-btn left"
          onClick={() => scrollBy(-200)}
          aria-label={`${id}-scroll-left`}
          style={{backgroundColor: color}}
        >
          &lt;
        </button>
      )}

      <div ref={containerRef} className="hand-scroll-row" style={{}}>
        {children}
      </div>

      {canScrollRight && (
        <button
          className="scroll-btn right"
          onClick={() => scrollBy(200)}
          aria-label={`${id}-scroll-right`}
          style={{backgroundColor: color}}
        >
          &gt;
        </button>
      )}
    </div>
  );
}

