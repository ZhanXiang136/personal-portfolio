// src/pages/Home.jsx
import './Home.css';
import { useEffect, useState } from "react";
import Navbar from '../components/navbar/navbar';
import Loading from "../components/loading/loading";
import Ambient from '../components/ambient/ambient';

export default function Home() {
  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if (loading) {
        return <Loading/>
    }
  return (
    <div className="Home">
      <Ambient />
      <Navbar />
  </div>
  );
}
