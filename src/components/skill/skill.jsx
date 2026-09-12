import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './skill.css';

const stack = ['Python', 'TypeScript', 'Kubernetes', 'React', 'FastAPI', 'Redis', 'PyTorch', 'MongoDB'];
const groups = [
  { label: 'Languages', items: ['Python · Java · C / C++', 'SQL · JavaScript · TypeScript'] },
  { label: 'Cloud & infrastructure', items: ['Kubernetes · Docker · AWS EC2', 'Linux · CI/CD · Ansible', 'Prometheus · Grafana'] },
  { label: 'AI & ML', items: ['PyTorch · FinBERT', 'Pandas · NumPy'] },
  { label: 'Frontend', items: ['React'] },
  { label: 'Signals', items: ['GIAC Foundational Cybersecurity Technologies', 'Lockheed Martin Code Quest Winner', 'National Cyber Scholar with Honors', 'Dean’s List: 2023–2026'] },
  { label: 'Backend & data', items: ['FastAPI · Flask · Node.js · Express · REST APIs', 'PostgreSQL · MongoDB', 'Elasticsearch · Redis'] },
];

export default function Skill() {
  return <div className="skill">
    <FadeComponent direction="right"><div className="skill-orbit" aria-label="Technical toolkit">
      <div className="orbit-core">MAKE<br />THINGS<br /><i>MOVE</i></div>
      {stack.map((item, index) => <span className={`orbit-tag tag-${index + 1}`} key={item}>{item}</span>)}
    </div></FadeComponent>
    <div className="skill-content">
      <FadeComponent><p className="skill-intro">From distributed services to sentiment models: tools I use to build, measure, and improve working systems.</p></FadeComponent>
      <FadeComponent delay={.12}><div className="skill-columns">
        {groups.map(({ label, items }) => <div key={label}><p className="skill-label">{label}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
      </div></FadeComponent>
    </div>
  </div>;
}
