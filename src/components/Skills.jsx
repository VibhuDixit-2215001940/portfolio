import { CodeIcon, CpuIcon, LayersIcon, ShieldIcon, SparklesIcon } from './icons.jsx'
import './Services.css'

const skillGroups = [
  {
    icon: <CpuIcon />,
    badge: 'Primary Focus',
    title: 'AI & Generative AI',
    description:
      'Building production-grade LLM applications, retrieval pipelines, multi-step agentic workflows, and computer vision integrations.',
    skills: ['NLP', 'LLMs', 'Gen AI', 'RAG', 'AI Agents', 'LangChain', 'LangGraph', 'LangSmith', 'Microsoft AI Studio', 'YOLO', 'Image Processing'],
  },
  {
    icon: <ShieldIcon />,
    badge: 'Cloud & Security',
    title: 'Cloud, Infrastructure & Security',
    description:
      'Architecting automated VAPT testing, endpoint telemetry, threat detection, and cloud deployments centered on Microsoft Azure.',
    skills: ['Microsoft Azure', 'AWS (Exposure)', 'GCP (Exposure)', 'CI/CD Concepts', 'Bash Scripting', 'Microsoft Fabric & Sentinel', 'Threat Detection', 'OWASP Top 10'],
  },
  {
    icon: <CodeIcon />,
    badge: 'Web Engineering',
    title: 'Frontend & Backend Development',
    description:
      'Designing responsive interfaces and resilient RESTful APIs backed by relational and NoSQL data stores.',
    skills: ['Node.js', 'Express.js', 'React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    icon: <LayersIcon />,
    badge: 'Core CS & Data',
    title: 'Languages, Databases & Tooling',
    description:
      'Strong problem-solving foundation in Java, JavaScript, and Python paired with modern databases and version control.',
    skills: ['JavaScript', 'Java', 'Python', 'MongoDB', 'MySQL', 'Git', 'GitHub', 'VS Code'],
  },
]

export default function Skills() {
  return (
    <section className="services" id="skills">
      <div className="section-head">
        <span className="section-tag">
          <SparklesIcon /> Technical Arsenal
        </span>
        <h2 className="section-title">
          Skills Across <em>AI, Cloud</em> <br />
          &amp; Full-Stack Security
        </h2>
        <p className="section-sub">
          A practical, production-tested toolkit spanning Generative AI agents, Microsoft Azure
          security operations, and modern web engineering.
        </p>
      </div>

      <div className="services__grid">
        {skillGroups.map((group, index) => (
          <div key={group.title} className="service-card" style={{ '--card-idx': index }}>
            <div className="service-card__top">
              <div className="service-card__icon">{group.icon}</div>
              <span className="service-card__badge">{group.badge}</span>
            </div>

            <h3 className="service-card__title">{group.title}</h3>
            <p className="service-card__desc">{group.description}</p>

            <div className="skill-pill-wrap">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="service-card__glow" />
          </div>
        ))}
      </div>
    </section>
  )
}
