import { motion } from 'framer-motion';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './footer.css';

export default function Footer() { return <footer><FadeComponent><p className="contact-kicker">06 / Have An Idea?</p><h2>Let’s Make<br /><i>Something Move.</i></h2><motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} className="email-button" href="mailto:zhanxiangzheng136@gmail.com">zhanxiangzheng136@gmail.com <span>↗</span></motion.a><div className="footer-bottom"><span>© 2026 Zhan Xiang Zheng</span><div><a href="https://github.com/ZhanXiang136" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/zhanxiangzheng" target="_blank" rel="noreferrer">LinkedIn</a></div></div></FadeComponent></footer>; }
