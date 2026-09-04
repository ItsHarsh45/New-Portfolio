import { useState, useRef, useEffect } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import CursorGrid from './components/ReactBits/CursorGrid/CursorGrid';
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
  { icon: Home, label: 'Home', id: 'home' },
  { icon: User, label: 'About', id: 'about' },
  { icon: Layers, label: 'Skills', id: 'skills' },
  { icon: FolderKanban, label: 'Projects', id: 'projects' },
  { icon: Briefcase, label: 'Experience', id: 'experience' },
  { icon: Mail, label: 'Contact', id: 'contact' },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [highlightStyle, setHighlightStyle] = useState({});
  const navInnerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (hoveredIndex === null || !navInnerRef.current) {
      setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const item = itemRefs.current[hoveredIndex];
    if (!item) return;
    const navRect = navInnerRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setHighlightStyle({
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
      transform: `translate(${itemRect.left - navRect.left}px, ${itemRect.top - navRect.top}px)`,
      opacity: 1,
    });
  }, [hoveredIndex]);

  return (
    <>
      <CursorGrid
        color="#3B82F6"
        maxOpacity={0.4}
        radius={150}
        fadeDuration={1000}
        gridOpacity={0.02}
        className="global-cursor-grid"
      />
      <nav className="nav-bar" aria-label="Main navigation">
        <div
          className="nav-bar__inner"
          ref={navInnerRef}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Sliding highlight */}
          <div className="nav-bar__highlight" style={highlightStyle} />

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`nav-bar__item ${isHovered ? 'nav-bar__item--active' : ''}`}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                aria-label={item.label}
                title={item.label}
              >
                <span className="nav-bar__icon-wrapper">
                  <Icon size={20} />
                </span>
                <span className="nav-bar__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

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
