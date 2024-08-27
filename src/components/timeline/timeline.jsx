import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import "./timeline.css";
import FadeComponent from "../fadeInOutComponent/fadeInOutComponent";

const Timeline = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section
      ref={targetRef}
      style={{ height: (cards.length * 150).toString() + "vh" }}
      className="timeline"
    >
      <div className="timeline-scrolling">
        <motion.div style={{ x }} className="timeline-motion">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const color = [
  "#8B0000",
  "#FF8C00",
  "#FFA500",
  "#006400",
  "#0A3D62",
  "#4B0082",
];

const Card = ({ card }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <FadeComponent direction="general">
      <div key={card.id} className={"timeline-card"}>
        <div className="timeline-card-inner">
          <div
            className="timeline-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="timeline-circle-bg"
              style={{ backgroundColor: color[(card.id - 1) % color.length] }}
            ></div>

            <div className="timeline-title">
              <div className="timeline-title_company">{card.company}</div>
              <div className="timeline-title_title">{card.title}</div>
            </div>
            <div className="timeline-content">
              {hover
                ? card.content.map((content, index) => {
                    return (
                      <div key={index} className="timeline-card-info">
                        {content}
                      </div>
                    );
                  })
                : null}
            </div>

            <br />

            <div className="timeline-datebox">
              Start: &nbsp;
              <span className="timeline-date">{card.date}</span>
            </div>
          </div>
        </div>
      </div>
    </FadeComponent>
  );
};

export default Timeline;

const cards = [
  {
    company: "Brooklyn Technical High School",
    title: "Software Engineer Major",
    id: 1,
    date: "SEP 2019 - JUN 2023 ",
    content: [
      "As a Software Engineer at BTHS, I greatly benefited from the wide assortment the school finds for use and special curriculum designed for our chosen major.",
    ],
  },
  {
    content: [
      "At CWNY I learned about essential job-readiness skills, and the motivation to pursue career and education goals.",
    ],
    title: "Apprentice Trainee",
    company: "CareerWise New York",
    date: "JUL 2021 - OCT 2021",
    id: 2,
  },
  {
    content: [
      "– Developed and deployed a chat-bot that connects the company’s messaging app with team services and utilizes the agile methodology and company software to reduce the need for on-call support by relaying client system status and answering client questions",
      "– Developed an API that enabled data exchange between different company systems",
    ],
    title: "Junior Coder",
    company: "JPMorgan Chase & Co.",
    date: "OCT 2021 - JUL 2023",
    id: 3,
  },
  {
    content: [
      "Relevant Courses",
      "– Computer Science: Discrete Mathematics, Computer Science A, Data Structures, System Fundamental, Theory of Computation",
      "– Math: Calculus I/II/III, Linear Algebra, Graph Theory, Probability and Statistics",
    ],
    title:
      "Bachelor of Science in Computer Science w/ Honors and Applied Mathematics and Statistics",
    company: "Stony Brook Univeristy",
    date: "AUG 2023 - PRESENT",
    id: 4,
  },
  {
    content: [
      "IT Technician Manager / AUG 2024 - PRESENT",
      "In addition to everything done as an IT Technician:",
      "- In charge of supplies and maintenance of computer labs and create weekly reports",
      "- Train new hires and interns, ensuring the smooth operation of the university’s computer systems",
      "-----------------------------------------------------",
      "IT Technician / OCT 2023 - MAY 2024",
      "- Maintained and troublershoot over 50+ audiovisual systems, printers, computers throuhout campus",
      "- Solved over 20+ technical inquiries from students and staffs",
      "- Collaborated with other campus IT department to address technical issues, and implement solutions to meet the needs of students, faculty, and staff",
    ],
    title: "IT Technician, IT Technician Manager",
    company: "Stony Brook Univeristy",
    date: "OCT 2023 - Present",
    id: 5,
  },
  {
    content: [
      "Treasurer / JUN 2024 - PRESENT",
      "- Manage convention’s budget with over 1000 attending people",
      "- Responsible for general logistics of the convention and co-head of the convention",
      "-----------------------------------------------------",
      "Staff and Security Coordinator / JAN 2024 - JUNE 2024",
      "- Gathered, managed, and trained over 40+ volunteers for the events",
      "- Responsible for main security and being the main point of contact for volunteers",
    
    ],
    title: "Staff and Security Coordinator, Treasurer",
    company: "Stony Brook Univeristy Brook Con",
    date: "JAN 2023 - Present",
    id: 6,
  },
];
