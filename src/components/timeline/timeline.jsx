import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
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

const Card = ({ card }) => {
  return (
    <div key={card.id} className="timeline-card group">
        <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="timeline-card-overlay group-hover:scale-110"
      ></div>

      <div className="timeline-card-inner">
        <p className="card-text">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Timeline;

const cards = [
  {
    url: "https://placehold.co/600x400",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/https://placehold.co/600x400",
    title: "Title 2",
    id: 2,
  },
  {
    url: "https://placehold.co/600x400",
    title: "Title 3",
    id: 3,
  },
  {
    url: "https://placehold.co/600x400",
    title: "Title 4",
    id: 4,
  },
  {
    url: "https://placehold.co/600x400",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/https://placehold.co/600x400",
    title: "Title 6",
    id: 6,
  },
  {
    url: "https://placehold.co/600x400",
    title: "Title 7",
    id: 7,
  },
];