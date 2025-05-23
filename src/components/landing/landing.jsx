import './landing.css';
import Home from'./spline'
import TypewriterComponent from 'typewriter-effect';

export default function Landing() {
    return (
        <section className='landing' id='landing'>
            <div className='center'>
                <TypewriterComponent
                    options={{
                        autoStart: true,
                        loop: true,
                        delay: 80,
                        strings: ["Hello! I'm Z.", "I'm a software developer."]
                    }}
                />
            </div>
            <Home />
        </section>
    )
}