import { motion } from 'framer-motion';

const offsets = { up: [0, 32], down: [0, -32], left: [32, 0], right: [-32, 0], general: [0, 16] };

export default function FadeComponent({ direction = 'up', children, delay = 0, className = '' }) {
  const [x, y] = offsets[direction] || offsets.up;
  return <motion.div className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
