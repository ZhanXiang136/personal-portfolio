import React, { useState, useEffect } from "react";
import { Link, Element, Events, scrollSpy } from "react-scroll";
import About from "../about/about";
import Skill from "../skill/skill";
import Landing from "../landing/landing";
import Timeline from "../timeline/timeline";
import Projects from "../projects/projects";
import Footer from "../footer/footer";
import "./navbar.css";
import LeftBar from "../leftBar/leftBar";
import WindowDimensions from "../windowDimention/windowDimention";
import FadeComponent from "../fadeInOutComponent/fadeInOutComponent";

const Navbar = () => {
  const { height } = WindowDimensions();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();
    window.addEventListener("scroll", handleScroll);

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="navbar-container">
        <nav
          className={"navbar" + (scrollPosition !== 0 ? " navbar-down" : "")}
        >
          {navs.map((nav) => {
            return <Nav nav={nav} key={nav.id} />;
          })}
        </nav>
      </div>
      {scrollPosition >= height * 0.6 ? <LeftBar scroll={scrollPosition - (height * 0.6)} /> : null}
      {navs.map((nav) => {
        return (
          <Element name={nav.name}>
            {nav.name !== "landing" ? (
              <FadeComponent direction="up">
                {" "}
                <div className="header-container">
                  <h1 className="header-title">{nav.name}</h1>
                  <div className="header-line"></div>
                </div>
              </FadeComponent>
            ) : null}
            {nav.comp}
          </Element>
        );
      })}
    </>
  );
};

const Nav = ({ nav }) => {
  return (
    <Link
      activeClass="active"
      to={nav.name}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className="navLink"
    >
      {nav.content}
    </Link>
  );
};

export default Navbar;

const navs = [
  { name: "landing", content: "Landing", id: 1, comp: <Landing /> },
  { name: "about", content: "About", id: 2, comp: <About /> },
  { name: "skills/accolades", content: "Skill", id: 3, comp: <Skill /> },
  { name: "timeline", content: "Timeline", id: 4, comp: <Timeline /> },
  { name: "projects", content: "Project", id: 5, comp: <Projects /> },
  { name: "contact", content: "Contact", id: 6, comp: <Footer /> },
];
