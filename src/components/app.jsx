import './app.css';
import { useEffect, useState } from "react";
import Navbar from './navbar/navbar';
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
      <Navbar />
  </div>
  );
}
