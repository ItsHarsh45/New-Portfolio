import FadeContent from '../components/FadeContent/FadeContent';
import Magnet from '../components/ReactBits/Magnet/Magnet';
import ParticleCard from '../components/ReactBits/MagicBento/MagicBento';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="container container--narrow contact__content-wrapper">
        <FadeContent>
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            I'm currently open to new opportunities. Let's connect!
          </p>
        </FadeContent>

        <FadeContent delay={200}>
          <ParticleCard
            glowColor="59, 130, 246"
            particleCount={14}
            enableTilt={false}
            spotlightRadius={350}
            className="contact__particle-card"
          >
            <div className="contact__card-inner">
              <div className="contact__links">
                <Magnet padding={50} magnetStrength={3} wrapperClassName="contact__magnet-wrapper">
                  <a href="mailto:harshkemali123@gmail.com" className="contact__link" id="contact-email">
                    <div className="contact__link-icon">
                      <Mail size={18} />
                    </div>
                    <div className="contact__link-text">
                      <span className="contact__link-label">Email</span>
                      <span className="contact__link-value">harshkemali123@gmail.com</span>
                    </div>
                    <ArrowUpRight size={14} className="contact__arrow" />
                  </a>
                </Magnet>

                <Magnet padding={50} magnetStrength={3} wrapperClassName="contact__magnet-wrapper">
                  <a href="https://linkedin.com/in/harshkemali" target="_blank" rel="noopener noreferrer" className="contact__link" id="contact-linkedin">
                    <div className="contact__link-icon contact__link-icon--blue">
                      <LinkedinIcon size={18} />
                    </div>
                    <div className="contact__link-text">
                      <span className="contact__link-label">LinkedIn</span>
                      <span className="contact__link-value">linkedin.com/in/harshkemali</span>
                    </div>
                    <ArrowUpRight size={14} className="contact__arrow" />
                  </a>
                </Magnet>

                <Magnet padding={50} magnetStrength={3} wrapperClassName="contact__magnet-wrapper">
                  <a href="https://github.com/itsHarsh45" target="_blank" rel="noopener noreferrer" className="contact__link" id="contact-github">
                    <div className="contact__link-icon contact__link-icon--gray">
                      <GithubIcon size={18} />
                    </div>
                    <div className="contact__link-text">
                      <span className="contact__link-label">GitHub</span>
                      <span className="contact__link-value">github.com/itsHarsh45</span>
                    </div>
                    <ArrowUpRight size={14} className="contact__arrow" />
                  </a>
                </Magnet>
              </div>

              <div className="contact__cta">
                <a 
                  href="https://drive.google.com/file/d/1W0CvWNJjz6jXUNyfrx9s3bNzLRYSmR4t/view?usp=drivesdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hero__btn hero__btn--secondary"
                >
                  <FileText size={16} />
                  Download Resume
                </a>
                <p className="contact__status">
                  <span className="contact__status-dot" />
                  Currently open to work
                </p>
              </div>
            </div>
          </ParticleCard>
        </FadeContent>
      </div>
    </section>
  );
};

export default Contact;
