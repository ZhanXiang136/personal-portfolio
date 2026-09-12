import { motion } from 'framer-motion';
import Mugshot from '../../assets/mugshot.jpg';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './about.css';

export default function About() {
  return <div className="about">
    <FadeComponent direction="right"><div className="about-photo"><img src={Mugshot} alt="Zhan Xiang Zheng" /><span>Code, systems, stories</span></div></FadeComponent>
    <div className="about-content"><FadeComponent><p className="about-lede">I’m a software engineer at Google, working on cluster management infrastructure and process lifecycle systems.</p></FadeComponent><FadeComponent delay={.12}><p>My first games lived in Scratch. That curiosity grew through games, campus IT, and ambitious side projects into backend engineering, distributed systems, and applied AI. I graduated from Stony Brook in 2026 with a B.S. in Computer Science with Honors and Applied Mathematics and Statistics.</p></FadeComponent><FadeComponent delay={.22}><div className="about-facts"><span><b>Stony Brook</b>Class of 2026</span><span><b>Currently</b>Google · Software Engineer</span><span><b>Focus</b>Infrastructure + AI</span></div></FadeComponent><motion.a whileHover={{ x: 6 }} className="resume-link" href={`${process.env.PUBLIC_URL}/Resume.pdf`} target="_blank" rel="noreferrer">Open resume <span>↗</span></motion.a></div>
  </div>;
}
