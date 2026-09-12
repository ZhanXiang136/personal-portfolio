import { motion } from 'framer-motion';
import FadeComponent from '../fadeInOutComponent/fadeInOutComponent';
import './timeline.css';

const experience = [
  { organization: 'Google', role: 'Software Engineer', date: 'Jun 2026 — Present', details: ['Resolve bugs and contribute to infrastructure migrations across cluster management and process lifecycle systems.', 'Validate changes through monitoring and testing.'] },
  { organization: 'Tau Beta Pi NYO', role: 'President · Event Coordinator', date: 'Jan 2025 — May 2026', details: ['Served as chapter ambassador and chaired Executive Board and General Body meetings as President.', 'Previously planned professional development and networking events, coordinating vendors, campus partners, publicity, and feedback.'] },
  { organization: 'Brook Con', role: 'Financial Chair · Staff & Volunteer Coordinator', date: 'Jan 2024 — May 2026', url: 'https://brookcon.weebly.com/', details: ['Oversaw a $12,000 operating budget for a university convention with 1,000+ attendees.', 'Previously recruited and managed 40+ volunteers, led security operations, and contributed to the 2025 Best Program of the Year award.'] },
  { organization: 'Stony Brook University · Division of IT', role: 'IT Consultant Manager · IT Technician', date: 'Oct 2023 — May 2026', details: ['Progressed from maintaining 100+ campus IT assets to overseeing a computing center and mentoring 12+ junior staff.', 'Coordinated upgrades, handled escalated issues, and kept hardware, software, and AV systems reliable.'] },
  { organization: 'NYC Department of Social Services', role: 'IT Intern', date: 'Jun 2025 — Aug 2025', details: ['Collaborated with infrastructure and operations teams to standardize and validate system data.', 'Coordinated technical support tickets to maintain service levels and timely resolution.'] },
  { organization: 'JPMorgan Chase & Co.', role: 'Junior Coder', date: 'Oct 2021 — Jul 2023', details: ['Built an NLP-powered AI chatbot with intent detection and information retrieval, integrated with internal messaging.', 'Delivered Elasticsearch classification and retrieval services, reducing on-call support load by an estimated 50%.', 'Designed task allocation to avoid race conditions across cloud-deployed bot instances and built FastAPI REST APIs with CI/CD.', 'Presented the chatbot solution to 10+ internal platform teams and incorporated stakeholder feedback.'] },
];

const education = [
  { organization: 'Stony Brook University', role: 'B.S. Computer Science with Honors; Applied Mathematics and Statistics', date: 'Aug 2023 — May 2026', details: ['GPA: 3.82 / 4.00', 'Dean’s List: 2023–2026', 'Coursework includes data structures and algorithms, systems fundamentals, theory of computation, linear algebra, graph theory, probability, and statistics.'] },
  { organization: 'BASTA / Google Software Engineering Program', role: 'Apprentice', date: 'Mar 2025 — Dec 2025', details: ['Selected twice as one of 350 students from 2,600+ applicants for a 10-week mentorship with a Google Software Engineer.', 'Strengthened data structures, algorithms, pair programming, and technical interview skills.'] },
  { organization: 'Brooklyn Technical High School', role: 'Software Engineering Major', date: 'Sep 2019 — Jun 2023', details: ['Completed a specialized software engineering curriculum with hands-on computer science foundations.'] },
];

function JourneyColumn({ label, items }) {
  return <div className="journey-column">
    <div className="journey-column-heading"><span className="journey-signal" />{label}<span>{String(items.length).padStart(2, '0')}</span></div>
    <div className="journey-list">
      {items.map((item, index) => <FadeComponent key={item.role} direction={index % 2 ? 'left' : 'right'} delay={index * .07}>
        <motion.article className="journey-card" whileHover={{ y: -6 }} transition={{ duration: .2 }}>
          <p className="journey-date">{item.date}</p><h3>{item.url ? <a className="journey-link" href={item.url} target="_blank" rel="noreferrer">{item.organization} <span aria-hidden="true">↗</span></a> : item.organization}</h3><h4>{item.role}</h4>
          <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </motion.article>
      </FadeComponent>)}
    </div>
  </div>;
}

export default function Timeline() { return <div className="journey"><JourneyColumn label="Experience" items={experience} /><JourneyColumn label="Education" items={education} /></div>; }
