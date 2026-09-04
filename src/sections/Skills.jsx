import FadeContent from '../components/FadeContent/FadeContent';
import LogoLoop from '../components/ReactBits/LogoLoop/LogoLoop';
import { Database, BarChart3, Code2, Settings } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    id: 'data',
    title: 'DATA ANALYTICS',
    icon: <Database size={16} />,
    color: '#3B82F6',
    direction: 'left',
    speed: 40,
    skills: [
      { name: 'SQL', node: 'SQL' },
      { name: 'PostgreSQL', node: 'PostgreSQL' },
      { name: 'MySQL', node: 'MySQL' },
      { name: 'Python', node: 'Python' },
      { name: 'Pandas', node: 'Pandas' },
      { name: 'NumPy', node: 'NumPy' },
      { name: 'Data Cleaning', node: 'Data Cleaning' },
      { name: 'EDA', node: 'EDA' },
    ],
  },
  {
    id: 'viz',
    title: 'BUSINESS INTELLIGENCE',
    icon: <BarChart3 size={16} />,
    color: '#8B5CF6',
    direction: 'right',
    speed: 35,
    skills: [
      { name: 'Power BI', node: 'Power BI' },
      { name: 'DAX', node: 'DAX' },
      { name: 'Excel', node: 'Excel' },
      { name: 'Dashboards', node: 'Interactive Dashboards' },
      { name: 'Data Storytelling', node: 'Data Storytelling' },
    ],
  },
  {
    id: 'dev',
    title: 'DEVELOPMENT',
    icon: <Code2 size={16} />,
    color: '#22C55E',
    direction: 'left',
    speed: 45,
    skills: [
      { name: 'React', node: 'React' },
      { name: 'JavaScript', node: 'JavaScript' },
      { name: 'HTML / CSS', node: 'HTML / CSS' },
      { name: 'Python', node: 'Python Scripts' },
    ],
  },
  {
    id: 'tools',
    title: 'DATABASE / TOOLS',
    icon: <Settings size={16} />,
    color: '#F59E0B',
    direction: 'right',
    speed: 30,
    skills: [
      { name: 'Firebase', node: 'Firebase' },
      { name: 'Supabase', node: 'Supabase' },
      { name: 'Git', node: 'Git' },
      { name: 'GitHub', node: 'GitHub' },
      { name: 'REST APIs', node: 'REST APIs' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section skills" aria-label="Skills">
      <div className="container">
        <FadeContent>
          <h2 className="section__title">Technical Stack</h2>
          <p className="section__subtitle">
            Core technologies powering my data pipelines and web applications
          </p>
        </FadeContent>

        <div className="skills__loops">
          {skillCategories.map((cat, idx) => (
            <FadeContent key={cat.id} delay={150 + idx * 100}>
              <div className="skills__category">
                <div className="skills__category-header" style={{ color: cat.color }}>
                  {cat.icon}
                  <h3>{cat.title}</h3>
                </div>
                
                <div className="skills__logoloop-wrapper">
                  <LogoLoop
                    logos={cat.skills}
                    speed={cat.speed}
                    direction={cat.direction}
                    pauseOnHover={true}
                    fadeOut={true}
                    fadeOutColor="var(--color-bg)"
                    logoHeight={40}
                    gap={24}
                    className="skills__logoloop"
                    renderItem={(item) => (
                      <div className="skills__pill">
                        {item.node}
                      </div>
                    )}
                  />
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
