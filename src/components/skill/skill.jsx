import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './skill.css';

const stack = ['Python', 'TypeScript', 'Kubernetes', 'React', 'FastAPI', 'Redis', 'PyTorch', 'MongoDB'];
const groups = [
  { label: 'Languages', items: ['Python · Java · C / C++', 'SQL · JavaScript · TypeScript'] },
  { label: 'Cloud & infrastructure', items: ['Kubernetes · Docker · AWS EC2', 'Linux · CI/CD · Ansible', 'Prometheus · Grafana'] },
  { label: 'AI & ML', items: ['PyTorch · FinBERT', 'Pandas · NumPy'] },
  { label: 'Frontend', items: ['React'] },
  { label: 'Signals', items: ['Lockheed Martin Code Quest Winner', 'National Cyber Scholar with Honors', 'Dean’s List: 2023–2026', 'GIAC Foundational Cybersecurity Technologies'] },
  { label: 'Backend & data', items: ['FastAPI · Flask · Node.js · Express · REST APIs', 'PostgreSQL · MongoDB', 'Elasticsearch · Redis'] },
];

export default function Skill() {
  const orbitRef = useRef(null);
  const visible = useInView(orbitRef);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: .5 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: .5 });
  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - bounds.top) / bounds.height - .5) * -10);
    tiltY.set(((event.clientX - bounds.left) / bounds.width - .5) * 10);
  };
  const resetTilt = () => { tiltX.set(0); tiltY.set(0); };
  return <div className="skill">
    <FadeComponent direction="right"><motion.div ref={orbitRef} className={`skill-orbit ${visible ? 'orbit-running' : ''}`} aria-label="Technical toolkit" style={{ rotateX: tiltX, rotateY: tiltY }} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="orbit-core"><span>MAKE</span><span>THINGS</span><span>MOVE</span></div>
      <div className="orbit-ring">
        {stack.map((item, index) => <div className="orbit-track" style={{ '--angle': `${index * 45}deg` }} key={item}><span className={`orbit-tag tag-${index + 1}`}>{item}</span></div>)}
      </div>
    </motion.div></FadeComponent>
    <div className="skill-content">
      <FadeComponent><p className="skill-intro">From distributed services to sentiment models: tools I use to build, measure, and improve working systems.</p></FadeComponent>
      <FadeComponent delay={.12}><div className="skill-columns">
        {groups.map(({ label, items }) => <div key={label}><p className="skill-label"><span>{label}</span><span className="skill-count">{String(items.length).padStart(2, '0')}</span></p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
      </div></FadeComponent>
    </div>
  </div>;
}
