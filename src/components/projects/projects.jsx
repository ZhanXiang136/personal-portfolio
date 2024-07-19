import "./projects.css";
import PokemonBattle from "../../assets/pokemon-battle-sample.gif";
import PokemonMenu from "../../assets/pokemon-main.png";
import CodeOverFlowMaze from "../../assets/code-overflow-maze.png";
import CodeOverFlowMazeSample from "../../assets/code-overflow-maze-sample.gif";
import React from "react";
import FadeComponent from "../fadeInOutComponent/fadeInOutComponent";

const ProjectCard = ({
  url,
  backgroundImage,
  mainText,
  hoverImage,
  hoverText,
}) => {
  return (
    <FadeComponent direction="down">
      <div className="project-card">
        <a href={url} alt={mainText}>
          <img src={backgroundImage} alt="Project Background" />
          <div className="overlay">
            <div className="text-content">{mainText}</div>
            <div className="hover-content">
              <img src={hoverImage} alt="Hover Background" />
              <div>{hoverText}</div>
            </div>
          </div>
        </a>
      </div>
    </FadeComponent>
  );
};

const projects = [
  {
    backgroundImage: PokemonMenu,
    mainText: "Pokemon Battle Simulator",
    hoverImage: PokemonBattle,
    hoverText: "Click Me",
    url: "https://github.com/ZhanXiang136/PokemonGame",
  },
  {
    backgroundImage: CodeOverFlowMaze,
    mainText: "Infinite Maze Runner",
    hoverImage: CodeOverFlowMazeSample,
    hoverText: "Click Me",
    url: "https://github.com/dhuang6334/Code-Overflow",
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <div className="project-section">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          url={project.url}
          backgroundImage={project.backgroundImage}
          mainText={project.mainText}
          hoverImage={project.hoverImage}
          hoverText={project.hoverText}
        />
      ))}
    </div>
  );
};

export default Projects;
