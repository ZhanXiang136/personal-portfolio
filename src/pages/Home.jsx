// src/pages/Home.jsx
import './Home.css';
import { MotionConfig } from 'framer-motion';
import Navbar from '../components/navbar/navbar';
import Ambient from '../components/ambient/ambient';

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="App">
      <Ambient />
      <Navbar />
  </div>
    </MotionConfig>
  );
}
