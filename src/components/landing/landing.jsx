import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import Mugshot from '../../assets/mugshot-web.jpg';
import './landing.css';

export default function Landing() {
  const [active, setActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const moveGlow = (event) => { const box = event.currentTarget.getBoundingClientRect(); mouseX.set(event.clientX - box.left); mouseY.set(event.clientY - box.top); };
  return <section id="home" className="landing" onMouseMove={moveGlow} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
    <motion.div className="hero-glow" style={{ x: glowX, y: glowY, opacity: active ? 1 : 0 }} />
    <div className="hero-grid" />
    <div className="hero-content">
      <motion.p className="hero-status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}><span /> Software Engineer @ Google</motion.p>
      <motion.h1 initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .08 } } }}>
        {'Zhan Xiang Zheng'.split(' ').map((word) => <motion.span key={word} variants={{ hidden: { opacity: 0, y: 72, rotate: 3 }, show: { opacity: 1, y: 0, rotate: 0 } }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>)}
      </motion.h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .65 }}><p>I work on cluster management at Google. Outside work, I build games and experiment with AI.</p><div className="hero-actions"><a href="#projects" className="hero-link">See the work <b>↓</b></a><a href="#arcade" className="hero-play">Play a game <span aria-hidden="true">↗</span></a></div></motion.div>
    </div>
    <motion.div className="hero-portrait" initial={{ opacity: 0, scale: .88, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .32, duration: .9, ease: [0.22, 1, 0.36, 1] }}><div className="portrait-ring ring-one" /><div className="portrait-ring ring-two" /><img src={Mugshot} alt="Zhan Xiang Zheng" /><span className="portrait-label">SWE / 2026</span></motion.div>
    <div className="hero-index">SYSTEMS / AI</div>
  </section>;
}
