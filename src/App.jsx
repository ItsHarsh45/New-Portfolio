import { useState, useRef, useEffect } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
// GooeyNav removed, using basic NavBar component
import {
  Home,
  User,
  Layers,
  FolderKanban,
  Briefcase,
  Mail,
} from 'lucide-react';
import './App.css';

const navItems = [
  { 
    label: <><span className="nav-bar__icon-wrapper"><Home size={20} /></span><span className="nav-bar__label">Home</span></>, 
    href: '#home' 
  },
  { 
    label: <><span className="nav-bar__icon-wrapper"><User size={20} /></span><span className="nav-bar__label">About</span></>, 
    href: '#about' 
  },
  { 
    label: <><span className="nav-bar__icon-wrapper"><Layers size={20} /></span><span className="nav-bar__label">Skills</span></>, 
    href: '#skills' 
  },
  { 
    label: <><span className="nav-bar__icon-wrapper"><FolderKanban size={20} /></span><span className="nav-bar__label">Projects</span></>, 
    href: '#projects' 
  },
  { 
    label: <><span className="nav-bar__icon-wrapper"><Briefcase size={20} /></span><span className="nav-bar__label">Experience</span></>, 
    href: '#experience' 
  },
  { 
    label: <><span className="nav-bar__icon-wrapper"><Mail size={20} /></span><span className="nav-bar__label">Contact</span></>, 
    href: '#contact' 
  },
];

const NavBar = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({});
  const itemRefs = useRef([]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      setHighlightStyle({
        width: activeItem.offsetWidth,
        height: activeItem.offsetHeight,
        transform: `translate(${activeItem.offsetLeft}px, ${activeItem.offsetTop}px)`,
        opacity: 1
      });
    }
  }, [activeIndex]);

  return (
    <div className="nav-bar__inner">
      <div className="nav-bar__highlight" style={highlightStyle} />
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`nav-bar__item ${activeIndex === index ? 'nav-bar__item--active' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <div className="nav-bar">
        <NavBar items={navItems} />
      </div>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="footer">
        <p className="footer__text">
          © {new Date().getFullYear()} Chanabasappa K. Built with precision & purpose.
        </p>
      </footer>
    </>
  );
}

export default App;
