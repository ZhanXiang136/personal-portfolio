import React, { useState, useEffect, useRef } from 'react';
import './fadeInOutComponent.css';

const FadeComponent = ({ direction, children }) => {
  const [isVisible, setIsVisible] = useState(true); // Start as visible
  const [animationClass, setAnimationClass] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationClass(`fade-in-${direction}`);
        } else {
          setAnimationClass(`fade-out-${direction}`);
          // Wait for animation to complete before setting display: none
          setTimeout(() => setIsVisible(false), 1000); // Match animation duration
        }
      },
      { threshold: (direction === "general" ? 0.5 : 0.1) } // Adjust as needed
    );

    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [direction]);

  return (
    <div
      ref={ref}
      className={`${animationClass} ${!isVisible}`}
      style={{ position: 'relative' }}
    >
      {children}
    </div>
  );
};

export default FadeComponent;
