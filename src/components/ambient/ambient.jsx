import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './ambient.css';

const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 61 + 13) % 100}%`,
  top: `${(i * 37 + 7) % 100}%`,
  animationDelay: `${-i * 2.7}s`,
  animationDuration: `${22 + (i % 5) * 4}s`,
}));

export default function Ambient() {
  const layer = useRef(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('background-paused', paused || hidden || reducedMotion);
    return () => document.documentElement.classList.remove('background-paused');
  }, [paused, hidden, reducedMotion]);

  useEffect(() => {
    if (paused || hidden || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = null;
    let x = 0;
    let y = 0;
    const move = event => {
      x = (event.clientX / window.innerWidth - .5) * 20;
      y = (event.clientY / window.innerHeight - .5) * 20;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        layer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = null;
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, [paused, hidden, reducedMotion]);

  return <>
    <div className={`ambient ${paused || hidden || reducedMotion ? 'ambient-paused' : ''}`} aria-hidden="true">
      <div className="ambient-aurora aurora-one" /><div className="ambient-aurora aurora-two" />
      <div className="ambient-particles" ref={layer}>{particles.map((style, i) => <span key={i} style={style} />)}</div>
    </div>
    {!reducedMotion && <button type="button" className="ambient-toggle" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '▶' : 'Ⅱ'} <span>{paused ? 'Resume background' : 'Pause background'}</span></button>}
  </>;
}
