import { useEffect, useState } from 'react';
import About from '../about/about';
import Skill from '../skill/skill';
import Landing from '../landing/landing';
import Timeline from '../timeline/timeline';
import Projects from '../projects/projects';
import Footer from '../footer/footer';
import NeonArcade from '../neonArcade/neonArcade';
import './navbar.css';

const links = [['about', 'A Little About Me'], ['skills', 'Built With Curiosity'], ['timeline', 'Experience & Education'], ['projects', 'Projects'], ['arcade', 'A Little Detour'], ['contact', 'Contact']];

function SectionTitle({ number, title }) {
  return <div className="section-heading"><span className="section-kicker">{number}</span><h2>{title}</h2></div>;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <>
    <header className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <a className="wordmark" href="#home" aria-label="Zhan Xiang Zheng home">ZXZ<span>.</span></a>
      <nav className="navbar" aria-label="Primary navigation">
        {links.map(([id, label]) => <a className="navLink" href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      <a className="nav-resume" href={`${process.env.PUBLIC_URL}/Resume.pdf`} target="_blank" rel="noreferrer">Resume <span>↗</span></a>
    </header>
    <main>
      <Landing />
      <section id="about" className="site-section"><SectionTitle number="01" title="A Little About Me" /><About /></section>
      <section id="skills" className="site-section section-tint"><SectionTitle number="02" title="Built With Curiosity" /><Skill /></section>
      <section id="timeline" className="site-section"><SectionTitle number="03" title="Experience & Education" /><Timeline /></section>
      <section id="projects" className="site-section section-tint"><SectionTitle number="04" title="Projects" /><Projects /></section>
      <section id="arcade" className="site-section"><SectionTitle number="05" title="A Little Detour" /><NeonArcade /></section>
    </main>
    <section id="contact" className="site-section"><Footer /></section>
  </>;
}
