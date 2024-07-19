// src/components/FadeInOutComponent.js

import React, { useState, useEffect, useRef } from "react";
import "./fadeInOutComponent.css";

const FadeInOutComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust this value to determine when the element is considered visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={isVisible ? "fade-in" : "fade-out"}>
      {children}
    </div>
  );
};

export default FadeInOutComponent;
