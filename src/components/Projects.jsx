import { ArrowRight, CheckIcon, ExternalLinkIcon, GitHubLogo, SparklesIcon } from './icons.jsx'
import './Projects.css'

const projects = [
  {
    category: 'Cybersecurity & Telemetry · Aug 2025 – Present',
    title: 'SecurityAstra — Automated VAPT & Endpoint Telemetry',
    description:
      'Designed and executed automated vulnerability assessment across web applications, endpoints, and network infrastructure with system-level event collection and behavioral threat detection.',
    highlights: [
      'Automated VAPT scanning across web apps, endpoints & network layers',
      'Collected & analyzed process activity and system telemetry for threat detection',
      'Supported secure deployment & infrastructure security assessments',
    ],
    metric: 'End-to-End VAPT',
    metricSub: 'Web, Endpoint & Network',
    stack: ['Python', 'Nmap', 'VirusTotal', 'WDK'],
    linkLabel: 'View on GitHub',
    linkHref: 'https://github.com/VibhuDixit-2215001940',
    external: true,
    featured: true,
  },
  {
    category: 'Full-Stack Web & AI · Oct 2023 – Dec 2023',
    title: 'Swipe2Clean — AI-Powered Waste Management Solution',
    description:
      'Full-cycle waste management platform for pickup, recycling, and sanitization featuring real-time tracking, AI image-based waste recognition, geolocation, and gamified user engagement.',
    highlights: [
      'Improved waste collection by 40% & waste collection efficiency by 20%',
      'Boosted user participation by 65% and reported cleanups by 30% via leaderboards & rewards',
      'Partnered with 5+ startups, NGOs, and businesses to drive recycling adoption',
    ],
    metric: '+40% Collection',
    metricSub: '+65% user participation',
    stack: ['Express.js', 'Node.js', 'React.js', 'AI Vision', 'Geolocation'],
    linkLabel: 'View on GitHub',
    linkHref: 'https://github.com/VibhuDixit-2215001940',
    external: true,
    featured: true,
  },
  {
    category: 'Meridian Solutions · Aug 2025 – Aug 2026',
    title: 'Web-Based VAPT Automation Platform',
    description:
      'Engineered an enterprise web-based vulnerability assessment and penetration testing automation platform during my Cybersecurity Internship to streamline security testing workflows.',
    highlights: [
      'Reduced security assessment turnaround time by 60%',
      'Minimized manual audit overhead via automated web vulnerability pipelines',
    ],
    metric: '60% Faster Audits',
    metricSub: 'Automated security workflows',
    stack: ['Web Security', 'VAPT', 'OWASP Top 10', 'Automation'],
    linkLabel: 'Discuss This Work',
    linkHref: '#contact',
    external: false,
    featured: false,
  },
  {
    category: 'Meridian Solutions · Aug 2026 – Present',
    title: 'Enterprise AI Workflows & Agentic Automation',
    description:
      'Designing and integrating AI-driven automation solutions and LLM workflows at a Microsoft Gold Partner to eliminate repetitive manual operations and improve business efficiency.',
    highlights: [
      'Built scalable GenAI & RAG workflows aligned with enterprise requirements',
      'Collaborated across cross-functional teams for production AI deployment',
    ],
    metric: 'Associate AI L2',
    metricSub: 'Production AI automation',
    stack: ['LangChain', 'LangGraph', 'LangSmith', 'RAG', 'Microsoft Azure'],
    linkLabel: 'Discuss This Work',
    linkHref: '#contact',
    external: false,
    featured: false,
  },
]

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-head">
        <span className="section-tag">
          <SparklesIcon /> Selected Work &amp; Projects
        </span>
        <h2 className="section-title">
          Proven Engineering &amp; <br />
          <em>Measurable Impact</em>
        </h2>
        <p className="section-sub">
          From automated cybersecurity telemetry and full-stack AI platforms to enterprise
          GenAI workflows shipped in production.
        </p>
      </div>

      <div className="projects__grid">
        {projects.map((project, idx) => (
          <div
            key={project.title}
            className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
            style={{ '--proj-idx': idx }}
          >
            <div>
              <div className="project-card__header">
                <span className="project-card__cat">{project.category}</span>
                <div className="project-card__impact">
                  <span className="impact__metric">{project.metric}</span>
                  <span className="impact__sub">{project.metricSub}</span>
                </div>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <ul className="project-card__bullets">
                  {project.highlights.map((item) => (
                    <li key={item}>
                      <span className="proj-check"><CheckIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="project-card__footer">
              <div className="project-card__tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.linkHref}
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
                className="project-card__link"
              >
                {project.external && <GitHubLogo />}
                <span>{project.linkLabel}</span>
                <ExternalLinkIcon />
              </a>
            </div>

            <div className="project-card__accent" />
          </div>
        ))}
      </div>

      <div className="projects__cta-box">
        <div className="cta-box__copy">
          <h4>Hiring for AI Engineering, Full-Stack, or Cloud Security?</h4>
          <p>Explore my repositories on GitHub or reach out directly to discuss how I can add value to your engineering team.</p>
        </div>
        <a href="#contact" className="btn btn--flame">
          Connect for Roles
          <ArrowRight />
        </a>
      </div>
    </section>
  )
}
