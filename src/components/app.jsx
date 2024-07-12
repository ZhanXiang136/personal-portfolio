import './app.css';
import { useEffect, useState } from "react";
import Header from './header/header';
import Landing from './landing/landing'
import Timeline from './timeline/timeline'
import Projects from './projects/projects';
import Footer from './footer/footer'
import Loading from "./loading/loading";


export default function App() {
  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    // if (loading) {
    //     return <Loading/>
    // }
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
