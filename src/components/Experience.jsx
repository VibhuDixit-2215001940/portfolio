import { BriefcaseIcon, CheckIcon, GraduationCapIcon, TrophyIcon, UsersIcon } from './icons.jsx'
import './Experience.css'

const roles = [
  {
    title: 'Associate AI Engineer – Level 2',
    period: 'Aug 2026 – Present',
    badge: 'Current Role',
    highlights: [
      'Working on AI-driven solutions and intelligent automation to improve business processes and operational efficiency.',
      'Developing and integrating AI-based workflows and applications to automate repetitive tasks and enhance productivity.',
      'Collaborating with cross-functional teams to design and implement scalable AI solutions aligned with business requirements.',
    ],
    tags: ['Gen AI', 'RAG', 'AI Agents', 'LangChain', 'LangGraph', 'Microsoft AI Studio'],
  },
  {
    title: 'Cybersecurity Intern',
    period: 'Aug 2025 – Aug 2026',
    badge: '60% Faster Audits',
    highlights: [
      'Developed a web-based VAPT automation platform, reducing security assessment time by 60% and minimizing manual effort.',
      'Implemented automated security testing workflows to accelerate vulnerability detection across web applications.',
    ],
    tags: ['VAPT Automation', 'OWASP Top 10', 'Python', 'Nmap', 'Threat Detection'],
  },
]

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="section-head">
        <span className="section-tag">
          <BriefcaseIcon /> Career &amp; Academics
        </span>
        <h2 className="section-title">
          Professional Experience &amp; <br />
          <em>Academic Foundation</em>
        </h2>
        <p className="section-sub">
          Hands-on industry engineering at a Microsoft Gold Partner paired with a strong
          Computer Science foundation and technical leadership.
        </p>
      </div>

      <div className="exp-layout">
        {/* Work Experience Card */}
        <div className="exp-company-card">
          <div className="exp-company-header">
            <div>
              <span className="exp-company-pill">Microsoft Gold Partner</span>
              <h3 className="exp-company-name">Meridian Solutions Pvt. Ltd.</h3>
              <p className="exp-company-meta">Gurugram, Haryana &bull; Aug 2025 – Present</p>
            </div>
            <div className="exp-company-icon">
              <BriefcaseIcon />
            </div>
          </div>

          <div className="exp-timeline">
            {roles.map((role) => (
              <div key={role.title} className="exp-role">
                <div className="exp-role-dot" aria-hidden="true" />
                <div className="exp-role-head">
                  <div>
                    <h4 className="exp-role-title">{role.title}</h4>
                    <span className="exp-role-period">{role.period}</span>
                  </div>
                  <span className="exp-role-badge">{role.badge}</span>
                </div>

                <ul className="exp-role-list">
                  {role.highlights.map((item) => (
                    <li key={item}>
                      <span className="exp-check"><CheckIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {role.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education + Extracurricular Leadership */}
        <div className="exp-side-col">
          <div className="edu-card">
            <div className="edu-card__top">
              <div className="edu-card__icon">
                <GraduationCapIcon />
              </div>
              <span className="edu-card__cgpa">CGPA: 8.4</span>
            </div>

            <span className="edu-card__label">Education</span>
            <h3 className="edu-card__school">GLA University</h3>
            <p className="edu-card__degree">Bachelor of Technology in Computer Science</p>
            <p className="edu-card__meta">Mathura, UP &bull; July 2022 – June 2026</p>
          </div>

          <div className="extra-card">
            <h3 className="extra-card__heading">Leadership &amp; Extracurricular</h3>

            <div className="extra-item">
              <div className="extra-item__icon">
                <UsersIcon />
              </div>
              <div>
                <h4>C &amp; DSA Technical Mentor</h4>
                <p>Taught basic C and Data Structures &amp; Algorithms to <strong>180 students</strong> in structured online sessions.</p>
                <span className="extra-item__date">Sept 2023 – Oct 2023</span>
              </div>
            </div>

            <div className="extra-item">
              <div className="extra-item__icon">
                <TrophyIcon />
              </div>
              <div>
                <h4>Smart India Hackathon (SIH)</h4>
                <p>Achieved <strong>Internal Third Runner-Up</strong> among competing university engineering teams.</p>
                <span className="extra-item__date">July 2023 – Aug 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
