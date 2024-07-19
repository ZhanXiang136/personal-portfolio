import React from "react";
import "./leftBar.css";
import { ReactComponent as GithubSVG } from "../../assets/github.svg";
import { ReactComponent as LinkedinSVG } from "../../assets/linkedin.svg";
import { ReactComponent as EmailSVG } from "../../assets/email.svg";

const LeftBar = ({scroll}) => {
  const scrollPosition = Math.min(scroll*.05, 25).toString() + "pt";
  return (
    <div className="left-bar" style={{left: scrollPosition}}>
      <div className="contact-info">
        <div className="contact-item">zhanxiangzheng@gmail.com</div>
        <div className="separator"></div>
        <div className="contact-item">
          <div className="left-bar-svg-logo">
            <div className="github">
              <a href="https://github.com/ZhanXiang136">
                <GithubSVG />
              </a>
            </div>
            <div className="linkedin">
              <a href="https://www.linkedin.com/in/zhan-xiang-zheng-9b962b219/">
                <LinkedinSVG />
              </a>
            </div>
            <div className="email">
              <a href="mailto:zhanxiangzheng136@gmail.com?subject=Mail from Personal Site">
                <EmailSVG />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
