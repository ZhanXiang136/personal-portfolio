
import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import './timeline.css';

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
]


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
                threshold: 0.4 // percentage of element visibility (0.1 means 10%)
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
        <div key={card.id} ref={elementRef} className={"timeline-card " + (isOnScreen ? "timeline-on-screen" : "timeline-off-screen")} >
            <div className="timeline-card-inner">
                    <div className="ag-courses-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <div className="ag-courses-item_bg" style={{ backgroundColor: (color[(card.id - 1) % color.length]) }} ></div>

                        <div className="ag-courses-item_title">
                            {card.title}
                        </div>
                        <div className="ag-courses-item_content">
                            {hover ? card.content : null}
                        </div>

                        <div className="ag-courses-item_date-box">
                            Start: &nbsp;
                            <span className="ag-courses-item_date">
                                {card.date}
                            </span>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default Timeline;

const cards = [
    {
        title: "Student at Brooklyn Technical High School",
        id: 1,
        date: "SEP 2019 - JUN 2023 ",
        content: "As a Software Engineer at BTHS, I greatly benefited from the wide assortment the school finds for use and special curriculum designed for our chosen major.",
    },
    {
        content: "At CWNY I learned about essential job-readiness skills, and the motivation to pursue career and education goals.",
        title: "Apprentice at CareerWise New York",
        date: "Jul 2021 - Oct 2021",
        id: 2,
    },
    {
        content: "- Developed and deployed a chat-bot that connects the company's messaging app with team services and utilizes the agile methodology and company software to reduce the need for on-call support by relaying client system status and answering client questions\n- Developed an API that enabled data exchange between different systems\n- Attended various events to present the chat-bot to clients and network with others",
        title: "Junior Coder at JPMorgan Chase & Co.",
        date: "Oct 2021 - Jul 2023",
        id: 3,
    },
    {
        content: "Bachelor of Science - BS, Computer Science w/ Honors and Applied Mathematics and Statistics",
        title: "Student at Stony Brook Univeristy",
        date: "AUG 2023 - PRESENT",
        id: 4,
    },
    {
        content: "- Maintains and Tests technological equipment throughout the campus to ensure optimal performance and safety standards\n- Resolves customer inquiries in a timely manner and fix any issues that arises",
        title: "IT Technician at Stony Brook Univeristy",
        date: "Oct 2023 - Present",
        id: 5,
    },
];