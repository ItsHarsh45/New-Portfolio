import FadeContent from '../components/FadeContent/FadeContent';
import FaultyTerminal from '../components/ReactBits/FaultyTerminal/FaultyTerminal';
import VariableProximity from '../components/ReactBits/VariableProximity/VariableProximity';
import TextType from '../components/ReactBits/TextType/TextType';
import { ArrowDown, FileText } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <FaultyTerminal
          scale={1}
          gridMul={[3, 1.5]}
          digitSize={1}
          timeScale={0.3}
          scanlineIntensity={0.5}
          glitchAmount={1.2}
          flickerAmount={0.8}
          noiseAmp={1.5}
          tint="#1E3A8A" /* Deep blue tint */
          brightness={0.8}
          mouseReact={true}
          mouseStrength={0.2}
          curvature={0.1}
          className="hero__terminal-bg"
        />
        <div className="hero__gradient" />
      </div>

      <div className="hero__content">
        <FadeContent delay={100}>
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            OPEN TO WORK
          </div>
        </FadeContent>

        <h1 className="hero__title">
          <VariableProximity
            label="DATA ANALYST & DEVELOPER"
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 900"
            radius={200}
            falloff="gaussian"
            className="hero__name-proximity"
          />
        </h1>

        <div className="hero__role">
          <TextType
            text={[
              "Python · Pandas · SQL",
              "Power BI · DAX · Excel",
              "React · Javascript · HTML",
              "Building actionable insights from raw data."
            ]}
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={2000}
            cursorCharacter="_"
            className="hero__role-texttype"
          />
        </div>

        <FadeContent delay={800}>
          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary" onClick={scrollToProjects}>
              View Projects
              <ArrowDown size={16} />
            </button>
            <a
              href="https://drive.google.com/file/d/1W0CvWNJjz6jXUNyfrx9s3bNzLRYSmR4t/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--secondary"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </FadeContent>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
