import "./about.css";
import React from "react";

export default function About() {
  const openPDF = () => {
    window.open(
      `${process.env.PUBLIC_URL}/Resume.pdf`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <div className="about">
      <div className="about-photo">
        <img
          className="about-image"
          src="https://placehold.jp/150x150.png"
          alt="my-image"
        ></img>
      </div>
      <div className="about-content">
        <h1 className="about-h1">Yahello, my name is Zhan Xiang Zheng!</h1>
        <h2 className="about-h2">SBU '26, CS/AMS Major, Software Developer</h2>
        <p className="about-info">
          Current Student at Stony Brook University and double majoring in
          Computer Science and Applied Math and Statistics
        </p>
        <p className="about-info">
          I first started with Scratch developing games and later branched to
          text-based languages creating apps. Now, my interest shift to AI/ML
          developement.
        </p>
        <p className="about-info">
          My hobbies include playing basketball, watching anime, and sometimes
          you can catch me hanging out with friends
        </p>
        <button className="about-button" onClick={openPDF}>Download Resume</button>
      </div>
    </div>
  );
}
