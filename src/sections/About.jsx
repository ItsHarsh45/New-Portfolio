import FadeContent from '../components/FadeContent/FadeContent';
import ParticleCard from '../components/ReactBits/MagicBento/MagicBento';
import CountUp from '../components/ReactBits/CountUp/CountUp';
import { GraduationCap, Calendar } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about" aria-label="About Me">
      <div className="container container--narrow">
        <FadeContent>
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">
            Bridging raw data and actionable business insights
          </p>
        </FadeContent>

        <FadeContent delay={200}>
          <ParticleCard
            glowColor="59, 130, 246"
            particleCount={10}
            enableTilt={false}
            spotlightRadius={300}
            className="about__bio-particle"
          >
            <div className="about__bio-card">
              <p className="about__bio-text">
                I'm a Computer Science graduate (CGPA: 8.06) from Atria Institute of Technology,
                passionate about Data Analytics and Software Development. I specialize in building
                end-to-end data pipelines using <strong>Python</strong>, <strong>SQL</strong>, and
                <strong> Power BI</strong>, and developing web applications with <strong>ReactJS</strong>.
              </p>
              <p className="about__bio-text">
                My approach combines strong analytical thinking with practical development skills —
                from writing complex SQL queries and performing EDA, to building interactive dashboards
                that stakeholders can actually use to make decisions.
              </p>
            </div>
          </ParticleCard>
        </FadeContent>

        <FadeContent delay={300}>
          <div className="about__stats-row">
            <div className="about__stat">
              <span className="about__stat-number">
                <CountUp from={0} to={8.06} duration={2.5} />
              </span>
              <span className="about__stat-label">CGPA</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-number">
                <CountUp from={0} to={3} duration={2} />
              </span>
              <span className="about__stat-label">Projects</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-number">
                <CountUp from={0} to={1} duration={1.5} />
                +
              </span>
              <span className="about__stat-label">Year Experience</span>
            </div>
          </div>
        </FadeContent>

        <FadeContent delay={400}>
          <h3 className="about__section-label">Education</h3>
          <div className="about__edu-grid">
            <ParticleCard
              glowColor="59, 130, 246"
              particleCount={8}
              enableTilt={true}
              spotlightRadius={200}
              className="about__edu-particle"
            >
              <div className="about__edu-card">
                <div className="about__edu-icon">
                  <GraduationCap size={20} />
                </div>
                <div className="about__edu-body">
                  <h4 className="about__edu-degree">B.E. Computer Science</h4>
                  <p className="about__edu-school">Atria Institute of Technology</p>
                  <div className="about__edu-meta">
                    <span><Calendar size={13} /> 2021 – 2025</span>
                    <span className="about__edu-score">CGPA: 8.06</span>
                  </div>
                </div>
              </div>
            </ParticleCard>

            <ParticleCard
              glowColor="139, 92, 246"
              particleCount={8}
              enableTilt={true}
              spotlightRadius={200}
              className="about__edu-particle"
            >
              <div className="about__edu-card">
                <div className="about__edu-icon about__edu-icon--purple">
                  <GraduationCap size={20} />
                </div>
                <div className="about__edu-body">
                  <h4 className="about__edu-degree">Pre-University (Computer Science)</h4>
                  <p className="about__edu-school">ICS, Mahesh PUC</p>
                  <div className="about__edu-meta">
                    <span><Calendar size={13} /> 2019 – 2021</span>
                  </div>
                </div>
              </div>
            </ParticleCard>
          </div>
        </FadeContent>
      </div>
    </section>
  );
};

export default About;
