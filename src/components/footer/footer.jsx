import "./footer.css";
import FadeComponent from "../fadeInOutComponent/fadeInOutComponent";
import { ReactComponent as GithubSVG } from "../../assets/github.svg";
import { ReactComponent as LinkedinSVG } from "../../assets/linkedin.svg";
import { ReactComponent as EmailSVG } from "../../assets/email.svg";

export default function Footer() {
  return (
    <FadeComponent direction="down">
      <footer id="footer">
        <section className="card">
          <h1 className="footer-header">Contact Me</h1>
          <form>
            <label>Name</label>
            <input type="text" />
            <label>Email</label>
            <input type="email" />
            <label>Message</label>
            <input type="message" />
          </form>
          <div className="bottom-row">
            <button>Send message</button>
            <div className="svg-logo">
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
        </section>
      </footer>
    </FadeComponent>
  );
}
