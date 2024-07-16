import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./timeline.css";

const Timeline = () => {
  return (
    <div className="timeline">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="horizontal-scrolling">
      <div className="in-place">
        <motion.div style={{ x }} className="motion">
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
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      {
        root: null, // null means the viewport
        threshold: 0.5, // percentage of element visibility (0.1 means 10%)
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      key={card.id}
      ref={elementRef}
      className={
        "timeline-card " +
        (isOnScreen ? "timeline-on-screen" : "timeline-off-screen")
      }
    >
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
              ? card.content.map((card) => {
                  return (
                    <div style={{fontSize: "1.6rem"}}>{card}</div>
                  )
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
  );
};

export default Timeline;

const cards = [
  {
    company: "Brooklyn Technical High School",
    title: "Software Engineer Major",
    id: 1,
    date: "SEP 2019 - JUN 2023 ",
    content:
      ["As a Software Engineer at BTHS, I greatly benefited from the wide assortment the school finds for use and special curriculum designed for our chosen major."],
  },
  {
    content:
      ["At CWNY I learned about essential job-readiness skills, and the motivation to pursue career and education goals."],
    title: "Apprentice Trainee",
    company: "CareerWise New York",
    date: "JUL 2021 - OCT 2021",
    id: 2,
  },
  {
    content:
      [
        "– Developed and deployed a chat-bot that connects the company’s messaging app with team services and utilizes the agile methodology and company software to reduce the need for on-call support by relaying client system status and answering client questions",
        "– Developed an API that enabled data exchange between different company systems"
      ],
    title: "Junior Coder",
    company: "JPMorgan Chase & Co.",
    date: "OCT 2021 - JUL 2023",
    id: 3,
  },
  {
    content: ["Relevant Courses", "– Computer Science: Discrete Mathematics, Computer Science A, Data Structures, System Fundamental, Theory of Computation", "– Math: Calculus I/II/III, Linear Algebra, Graph Theory, Probability and Statistics"],
    title:
      "Bachelor of Science in Computer Science w/ Honors and Applied Mathematics and Statistics",
    company: "Stony Brook Univeristy",
    date: "AUG 2023 - PRESENT",
    id: 4,
  },
  {
    content:
      [
        "– Performed computer system maintenance throughout the campus",
        "– Inspected and tested equipments to ensure optimal performance and safety standards",
        "– Resolved customer inquiries in a timely manner"
      ],
    title: "IT Technician",
    company: "Stony Brook Univeristy",
    date: "OCT 2023 - Present",
    id: 5,
  },
  {
    content:
        [
        "Staff Coordinator",
        "– Gathered, managed, and trained over 25+ volunteers for the events",
        "– Inspected and tested equipments to ensure optimal performance and safety standards",
        "– Resolved customer inquiries in a timely manner",
        "",
        "Treasurer",
        "- Manage the convention's budget",
        "- Perform various executive tasks and logistics for the convention"
        ],
    title: "Staff Coordinator 2024, Treasurer 2025",
    company: "Stony Brook Univeristy Brook Con",
    date: "JAN 2023 - Present",
    id: 6,
  },
];
