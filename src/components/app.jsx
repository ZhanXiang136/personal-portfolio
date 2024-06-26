import './app.css';
import Header from './header/header';
import Landing from './landing/landing'
import Timeline from './timeline/timeline'
import Projects from './projects/projects';
import Footer from './footer/footer'

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Landing />
        <Timeline />
        <Projects />
      </main>
      <Footer />
  </div>
  );
}