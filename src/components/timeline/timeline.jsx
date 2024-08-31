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
      "- Led the development of a chatbot integrating the company’s messaging app with team services, which utilized agile methodology and company software, reducing the need for on-call support by automating client system status updates and providing answers to client queries.",
      "- Developed an API that facilitated seamless data exchange between different company systems, improving data accessibility and reducing data retrieval time.",
      "- Presented the chatbot solution across the platform and client meetings, effectively showcasing its capabilities."
    ],
    title: "Junior Coder",
    company: "JPMorgan Chase & Co.",
    date: "OCT 2021 - JUL 2023",
    id: 3,
  },
  {
    content: [
      "Relevant Courses",
      "- Computer Science - Computer Science A, System Fundamental, Data Structures & Algorithms, Theory of Computation",
      "– Math: Discrete Mathematics, Calculus I/II/III, Linear Algebra, Graph Theory, Probability and Statistics",
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
      "- Managed a campus computing manager, ensuring all equipment was up-to-date and fully functional",
      "- Trained and mentored junior IT staff, fostering a collaborative team environment and improving team performance.",
      "-----------------------------------------------------",
      "IT Technician / OCT 2023 - MAY 2024",
      "- Managed and maintained the IT infrastructure, including computers, printers, and various audiovisual tools.",
      "- Coordinated and executed software and hardware upgrades, minimizing disruption to student operations.",
    ],
    title: "IT Technician, IT Technician Manager",
    company: "Stony Brook Univeristy",
    date: "OCT 2023 - Present",
    id: 5,
  },
  {
    content: [
      "Treasurer / JUN 2024 - PRESENT",
      "- Managed a budget exceeding $10,000+ for a convention with over 1,000 attendees, ensuring all financial activities aligned with organizational goals and maintaining accurate records of all transactions.",
      "- Oversaw general logistics and served as core executive of the convention, coordinating with various departments to ensure smooth execution of all activities.",
      "-----------------------------------------------------", 
      "Staff and Security Coordinator / JAN 2024 - JUNE 2024",
      "- Recruited, trained, and managed a team of over 40 volunteers, enhancing event efficiency and ensuring all operations ran smoothly.",
      "- Led security operations for the convention, acting as the main point of contact for volunteers and ensuring the safety and security of all attendees and staff.",
    
    ],
    title: "Staff and Security Coordinator, Treasurer",
    company: "Stony Brook Univeristy Brook Con",
    date: "JAN 2023 - Present",
    id: 6,
  },
];
