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
                        strings: ["Hello! I'm Zhan Xiang Zheng", "I'm an inspiring AI and Game Developer"]
                    }}
                />
            </div>
            < Home />
        </section>
    )
}