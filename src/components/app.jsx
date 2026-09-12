import './app.css';
import { MotionConfig } from 'framer-motion';
import Navbar from './navbar/navbar';
import Ambient from './ambient/ambient';


export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="App">
      <Ambient />
      <Navbar />
    </div>
    </MotionConfig>
  );
}
