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
              style={{
                background: 'linear-gradient(90deg, #000046 0%, #1CB5E0 100%)',
              }}
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
    date: "Sep 2019 - Jun 2023 ",
    content: [
      "As a Software Engineer at BTHS, I greatly benefited from the wide assortment the school finds for use and special curriculum designed for our chosen major.",
    ],
  },
  {
    content: [
      "Led the agile development of a chatbot and supporting API that automated system status updates, streamlined data exchange across platforms, and cut on-call support and data retrieval times—then presented the solution to stakeholders to drive adoption.",
    ],
    title: "Junior Coder",
    company: "JPMorgan Chase & Co.",
    date: "Oct 2021 - Jul 2023",
    id: 2,
  },
  {
    content: [
      "Relevant Courses",
      "- Computer Science - System Fundamental, Data Structures, Algorithms, Theory of Computation. Data Science, AI, Security",
      "- Math: Discrete Mathematics, Calculus I-IV, Linear Algebra, Graph Theory, Probability Theory, Statistics",
    ],
    title:
      "Bachelor of Science in Computer Science w/ Honors and Applied Mathematics and Statistics",
    company: "Stony Brook Univeristy",
    date: "Aug 2023 - Present",
    id: 3,
  },
  {
    content: [
      "IT Technician Manager (Aug 2024 - Present)",
      "Oversee the campus computing center—ensuring all hardware, software, and AV systems are up-to-date and reliable—while mentoring over a dozen junior IT staff to enhance team performance.",
      "-----------------------------------------------------",
      "IT Technician (Oct 2023 - MAY 2024)",
      "Managed and maintained 100+ campus devices and audiovisual systems, leading routine software and hardware upgrades to minimize downtime and optimize user experience.",
    ],
    title: "IT Technician - IT Technician Manager",
    company: "Stony Brook Univeristy",
    date: "Oct 2023 - Present",
    id: 4,
  },
  {
    content: [
      "Treasurer (Jun 2024 - Present)",
      "Manage a $10K+ budget and oversee all financial activities and logistical coordination for a 1,000+-attendee convention, ensuring fiscal accuracy and alignment with organizational goals.", 
      "-----------------------------------------------------", 
      "Staff & Security Coordinator (Jan 2024 - Jun 2024)",
      "Recruited, trained, and led 40+ volunteers and directed security operations to guarantee the safety and smooth execution of all convention activities.",
    ],
    title: "Staff & Security Coordinator - Treasurer",
    company: "Stony Brook Univeristy Brook Con",
    date: "Jan 2023 - Present",
    id: 5,
  },
  {
    content: [
      "President (May 2025 - Present)",
      "As President, I serve as the chapter's official representative and ex-officio committee member, chair executive and general meetings with clear agendas, and collaborate with the board to launch initiatives and drive organizational goals.",
      "-----------------------------------------------------", 
      "Event Coordinator (Jan 2025 - May 2025)",
      "In my role as Event Coordinator, I planned and executed professional and social events—overseeing venue, vendor and volunteer coordination—and led marketing efforts to boost attendance and engagement."
    ],
    title: "Event Coordinator - President",
    company: "Tau Beta Pi (NY Omicron)",
    date: "Jan 2025 - Present",
    id: 6,
  },
    {
    content: [
      "Selected from a highly competitive applicant pool to engage in 10 weeks of pair programming and mentorship with a Google Software Engineer to strengthen foundational coding skills, enhance problem-solving abilities, and prepare for technical interviews.",
    ],
    title: "Apprentice",
    company: "Basta/Google Software Engineering Program",
    date: "Mar 2025 - Jun 2025",
    id: 7,
  },
];
