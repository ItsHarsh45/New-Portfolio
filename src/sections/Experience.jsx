import AnimatedContent from '../components/ReactBits/AnimatedContent/AnimatedContent';
import './Experience.css';

const experienceData = [
  {
    role: 'Digital Interaction Advisor',
    company: '24/7.ai (Client: Optus)',
    date: 'Apr 2025 – Apr 2026',
    description: [
      'Used customer data and CRM insights to identify needs and recommend tailored products/services, supporting sales target achievement.',
      'Guided business customers toward data-informed solutions while ensuring compliance and consistent service quality.',
      'Delivered clear, structured communication of information and options to customers across high-volume interactions.'
    ],
    tags: ['Customer Analytics', 'CRM', 'Data-Driven Sales', 'B2B Communication']
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section experience" aria-label="Experience">
      <div className="container container--narrow">
        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8}>
          <h2 className="section__title">Experience</h2>
          <p className="section__subtitle">
            Professional work experience and career journey
          </p>
        </AnimatedContent>

        <div className="experience__timeline">
          {experienceData.map((job, idx) => (
            <AnimatedContent
              key={idx}
              distance={100}
              direction="vertical"
              delay={0.2}
              duration={0.8}
              ease="power3.out"
              className="experience__item"
            >
              <div className="experience__item-header">
                <div>
                  <h3 className="experience__role">{job.role}</h3>
                  <p className="experience__company">{job.company}</p>
                </div>
                <div className="experience__date">{job.date}</div>
              </div>

              <ul className="experience__list">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>

              <div className="experience__tags">
                {job.tags.map((tag, i) => (
                  <span key={i} className="experience__tag">{tag}</span>
                ))}
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
