import React, { useRef, useEffect, useMemo } from "react";
import "./skill.css";
import FadeComponent from "../fadeInOutComponent/fadeInOutComponent";

const Skill = () => {
  return (
    <div className="skill">
      <div className="skill-content">
        <FadeComponent direction="up">
          <h1 className="skill-h1">The Story So Far</h1>
        </FadeComponent>
        <FadeComponent direction="left">
          <h2 className="skill-h2">
            Over the years of creating various apps, taking cs courses in and
            out the classroom, and interning at different places and learned and
            recieved
          </h2>
        </FadeComponent>
        <FadeComponent direction="down">
          <div className="skill-list-container">
            <p className="skill-list">
              Languages/Frameworks
              <ul>
                <li>Python</li>
                <li>Java</li>
                <li>C/C++</li>
                <li>HTML/CSS</li>
                <li>JS/React</li>
                <li>React</li>
                <li>NumPy/Pandas</li>
                <li>Flask</li>
                <li>FastAPI</li>
              </ul>
            </p>
            <p className="skill-list">
              Awards/Certificates
              <ul>
                <li>
                  GIAC Foundational Cybersecurity Technologies (GFACT)
                  Certificate
                </li>
                <li>2022 Lockheed Martin’s Code Quest Winner</li>
                <li>Careerwise Certificate of Completion</li>
                <li>National Cyber Scholar with Honors</li>
                <li>AP Scholar with Distinction</li>
                <li>Dean’s List</li>
              </ul>
            </p>
          </div>
        </FadeComponent>
      </div>
      <FadeComponent direction="right">
        <div className="skill-canvas">
          <SkillContainer />
        </div>
      </FadeComponent>
    </div>
  );
};

const SkillContainer = () => {
  const canvasRef = useRef(null);

  // Memoize the words array to prevent unnecessary re-renders
  const words = useMemo(
    () => [
      "Python",
      "Java",
      "C/C++",
      "HTML/CSS",
      "JS/React",
      "GFACT",
      "Dean's List",
    ],
    []
  );

  const numWords = words.length;
  const radiusRef = useRef(0); // Ref to store radius

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.parentNode.clientWidth;
    let height = canvas.parentNode.clientHeight;

    canvas.width = width;
    canvas.height = height;

    // Calculate radius based on smaller dimension of the parent container
    radiusRef.current = Math.min(width, height) / 4;

    // Calculate spawn points for each word equidistant on a circle
    const spawnPoints = [];
    for (let i = 0; i < numWords; i++) {
      const angle = (i / numWords) * Math.PI * 2; // Calculate angle for each word
      const x = width / 2 + Math.cos(angle) * radiusRef.current;
      const y = height / 2 + Math.sin(angle) * radiusRef.current;
      spawnPoints.push({ x, y });
    }

    const wordObjects = words.map((word, index) => ({
      text: word,
      x: spawnPoints[index].x,
      y: spawnPoints[index].y,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      // color: `rgb(${Math.random() * 255},${Math.random() * 255},${
      //   Math.random() * 255
      // })`, // Random color
      color: "rgb(27, 245, 212)",
      className: "word", // Add className 'word'
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height); // Clear canvas on each frame

      wordObjects.forEach((wordObj) => {
        ctx.font = "20px Arial";
        ctx.fillStyle = wordObj.color; // Set text color based on wordObject's color property
        ctx.fillText(wordObj.text, wordObj.x, wordObj.y); // Draw text at wordObj's x and y coordinates

        wordObj.x += wordObj.dx;
        wordObj.y += wordObj.dy;

        // Collision detection with walls
        if (
          wordObj.x < 0 ||
          wordObj.x + ctx.measureText(wordObj.text).width > width
        ) {
          wordObj.dx *= -1;
        }
        if (wordObj.y < 20 || wordObj.y > height) {
          wordObj.dy *= -1;
        }

        // Collision detection with other words
        wordObjects.forEach((otherWordObj) => {
          if (wordObj !== otherWordObj) {
            const distX = wordObj.x - otherWordObj.x;
            const distY = wordObj.y - otherWordObj.y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < ctx.measureText(wordObj.text).width) {
              // Adjust velocities on collision
              const dx = distX / distance;
              const dy = distY / distance;
              wordObj.dx = dx;
              wordObj.dy = dy;
              otherWordObj.dx = -dx;
              otherWordObj.dy = -dy;
            }
          }
        });
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.parentNode.clientWidth;
      height = canvas.parentNode.clientHeight;
      canvas.width = width;
      canvas.height = height;
      radiusRef.current = Math.min(width, height) / 4;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(draw);
    };
  }, [words, numWords]);

  return <canvas ref={canvasRef} className="canvas" />;
};

export default Skill;
