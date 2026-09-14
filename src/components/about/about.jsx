import { motion } from 'framer-motion';
import Mugshot from '../../assets/mugshot-web.jpg';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './about.css';

export default function About() {
  return <div className="about">
    <FadeComponent direction="right"><div className="about-photo"><img src={Mugshot} alt="Zhan Xiang Zheng" loading="lazy" decoding="async" /></div></FadeComponent>
    <div className="about-content"><FadeComponent><p className="about-lede">Hello, my name is Zhan Xiang Zheng, but just call me Z. I'm a software engineer at Google and a Stony Brook University graduate.</p></FadeComponent><FadeComponent delay={.12}><p>I'm enthusiastic about artificial intelligence and game development, especially AI that mimics human reasoning and games that are engaging and fun to play. My first games lived in Scratch; today, I work on cluster management at Google and explore those interests through my own projects. I graduated in 2026 with a B.S. in Computer Science with Honors and Applied Mathematics and Statistics.</p></FadeComponent><FadeComponent delay={.22}><div className="about-facts"><span><b>Currently</b>SWE @ Google</span><span><b>Focus</b>Artificial Intelligence</span><span><b>Building</b>Games + Systems</span></div></FadeComponent><motion.a whileHover={{ x: 6 }} className="resume-link" href={`${process.env.PUBLIC_URL}/Resume.pdf`} target="_blank" rel="noreferrer">Open resume <span>↗</span></motion.a></div>
  </div>;
}
