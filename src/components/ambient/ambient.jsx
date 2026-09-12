import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './ambient.css';

export default function Ambient() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('background-paused', paused);
    return () => document.documentElement.classList.remove('background-paused');
  }, [paused]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let frame;
    let lastTime = 0;
    let scrollImpulse = 0;
    let previousScroll = window.scrollY;
    let particles = [];
    const pointer = { x: -1000, y: -1000 };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // A capped backing store keeps high-density displays from turning this
      // decorative layer into a full-screen high-resolution render target.
      const scale = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      particles = Array.from({ length: width < 700 ? 14 : 28 }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: .15 + Math.random() * .3, phase: Math.random() * Math.PI * 2 }));
    };
    const move = event => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const scroll = () => {
      scrollImpulse = Math.max(-8, Math.min(8, (window.scrollY - previousScroll) * .08));
      previousScroll = window.scrollY;
    };
    const draw = time => {
      frame = requestAnimationFrame(draw);
      // Twenty frames per second is enough for ambient motion and leaves the
      // main thread available for scrolling, hover, and the game.
      if (time - lastTime < 50) return;
      const delta = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      scrollImpulse *= .94;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= (p.speed + scrollImpulse) * delta;
        p.x += Math.sin(time * .0003 + p.phase) * .18 * delta;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distanceSquared = dx * dx + dy * dy;
        const nearPointer = distanceSquared < 32400;
        ctx.fillStyle = i % 5 === 0 ? '#aa8aff' : '#50dfff';
        ctx.globalAlpha = nearPointer ? .75 : .3;
        ctx.fillRect(p.x, p.y, 2, 2);
        if (nearPointer) {
          const distance = Math.sqrt(distanceSquared);
          ctx.strokeStyle = '#50f5ff';
          ctx.globalAlpha = (1 - distance / 180) * .25;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        const next = particles[i + 1];
        if (next && Math.hypot(next.x - p.x, next.y - p.y) < 160) {
          ctx.strokeStyle = '#168bff'; ctx.globalAlpha = .16;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) { lastTime = 0; frame = requestAnimationFrame(draw); }
    };
    resize();
    if (!document.hidden) frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reducedMotion, paused]);

  return <>
    <div className={`ambient ${paused || reducedMotion ? 'ambient-paused' : ''}`} aria-hidden="true"><div className="ambient-aurora aurora-one" /><div className="ambient-aurora aurora-two" /><canvas ref={canvasRef} /></div>
    {!reducedMotion && <button type="button" className="ambient-toggle" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '▶' : 'Ⅱ'} <span>{paused ? 'Resume background' : 'Pause background'}</span></button>}
  </>;
}
