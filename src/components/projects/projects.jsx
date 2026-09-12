import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import TicTacToe from '../ticTacToe/ticTacToe';
import PokemonBattle from '../../assets/pokemon-battle-sample.gif';
import PokemonMenu from '../../assets/pokemon-main.png';
import Maze from '../../assets/code-overflow-maze.png';
import MazeSample from '../../assets/code-overflow-maze-sample.gif';
import './projects.css';

const projects = [
  {
    title: 'Real-Time Messaging Platform', number: '01', date: 'Jan — May 2026', kind: 'Distributed systems',
    tags: ['TypeScript', 'React', 'Kubernetes', 'MongoDB', 'Redis'],
    metrics: [['550+', 'messages / sec'], ['5,000', 'peak concurrent connections']],
    context: 'Measured in load tests with simulated users',
    flow: ['React client', 'WebSocket services', 'MongoDB + Redis'],
    description: 'A messaging platform with dedicated authentication, messaging, WebSocket, media, and search services.',
    details: ['Reduced p95 message latency by 82% (462 ms → 85 ms) under simulated user load using Prometheus/Grafana to diagnose bottlenecks.', 'Automated provisioning and rollouts with Ansible; operated replicated MongoDB and Elasticsearch clusters alongside Redis, MinIO, and Longhorn storage.'],
  },
  {
    title: 'Stock Trading AI App', number: '02', date: 'Jun 2025 — May 2026', kind: 'Applied machine learning',
    tags: ['Python', 'FastAPI', 'FinBERT', 'PyTorch', 'Alpaca'],
    metrics: [['95.0%', 'validation accuracy'], ['0.950', 'weighted F1']],
    context: 'FinBERT fine-tuned collaboratively with 29K training examples',
    flow: ['Reddit ingestion', 'FinBERT signals', 'Paper trading'],
    description: 'A FastAPI pipeline that turns Reddit sentiment into ticker-level signals and executes paper trades through Alpaca.',
    details: ['Evaluated 2,996 signal decisions across 87 tickers, with position limits, market-hours checks, duplicate-position prevention, and trade logging.', 'Built a performance API comparing paper-trading returns against the S&P 500 and NASDAQ; submitted 87 paper orders during the logged evaluation.'],
  },
  {
    title: 'Tic-Tac-Toe AI', number: '03', date: 'Python · Flask', kind: 'Minimax game AI', url: 'https://github.com/ZhanXiang136/tictactoe-ai', game: true,
    tags: ['Python', 'Flask', 'Minimax', 'JavaScript'], metrics: [['3', 'ways to play'], ['1', 'optimal opponent']],
    context: 'Web, GUI, and terminal versions in one project', flow: ['Human move', 'Minimax AI', 'Win / draw state'],
    description: 'A Tic-Tac-Toe game with a Flask web app, Tkinter GUI, terminal mode, and an AI opponent built around the Minimax algorithm.',
    details: ['The playable board below is a lightweight portfolio version of the same human-versus-AI idea.', 'Open the repository to explore the full Flask, GUI, and terminal implementations.'],
  },
];

const earlierProjects = [
  { title: 'Pokemon Battle Simulator', number: '04', tags: ['Java', 'Game systems', 'UI'], image: PokemonMenu, preview: PokemonBattle, url: 'https://github.com/ZhanXiang136/PokemonGame' },
  { title: 'Infinite Maze Runner', number: '05', tags: ['JavaScript', 'Procedural play', 'Team build'], image: Maze, preview: MazeSample, url: 'https://github.com/dhuang6334/Code-Overflow' },
];

function EarlierProject({ project, index }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  return <FadeComponent direction={index ? 'left' : 'right'}>
    <motion.a ref={ref} className="project-card" href={project.url} target="_blank" rel="noreferrer"
      onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      <div className="project-image">
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" decoding="async" />
        {active && visible && !reducedMotion && <img className="project-preview" src={project.preview} alt="" decoding="async" />}
      </div>
      <div className="project-meta"><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.tags.join(' / ')}</p></div><b>↗</b></div>
    </motion.a>
  </FadeComponent>;
}

export default function Projects() {
  return <div className="project-section">{projects.map((project, index) =>
    <FadeComponent direction={index ? 'left' : 'right'} key={project.title}>
      <motion.article className={`project-card project-feature project-feature-${index + 1}`} whileHover={{ y: -4 }}>
        <div className="project-dashboard">
          <p className="project-kind">{project.kind}</p>
          {project.game && <TicTacToe />}<div className="project-metrics">{project.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          <p className="project-context">{project.context}</p>
          <ol className="project-flow" aria-label="System overview">{project.flow.map(step => <li key={step}>{step}</li>)}</ol>
        </div>
        <div className="project-meta"><span>{project.number}</span><div><h3>{project.title} {project.url && <a className="project-repo-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}>↗</a>}</h3><p>{project.date}</p></div></div>
        <div className="project-details"><p>{project.description}</p><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </motion.article>
    </FadeComponent>
  )}
    <div className="project-side-stack">
      {earlierProjects.map((project, index) => <EarlierProject key={project.title} project={project} index={index} />)}
    </div>
  </div>;
}
