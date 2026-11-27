import './Experience.css'

const roles = [
  {
    title: 'Associate AI Engineer – Level 2',
    period: 'Aug 2026 – Present',
    status: 'Now',
    summary:
      'Building GenAI workflows and agent setups for enterprise teams — RAG, LangChain/LangGraph, and Microsoft AI Studio — aimed at cutting repetitive operational work.',
    points: [
      'Design AI automation around real process bottlenecks, then ship it into the tools people already use.',
      'Partner with product and ops teams so LLM features land in production, not as one-off demos.',
    ],
    stack: ['Gen AI', 'RAG', 'AI Agents', 'LangChain', 'LangGraph', 'Microsoft AI Studio'],
  },
  {
    title: 'Cybersecurity Intern',
    period: 'Aug 2025 – Aug 2026',
    status: '60% faster audits',
    summary:
      'Built a web VAPT automation platform that replaced slow manual assessment cycles while keeping coverage intact.',
    points: [
      'Brought security assessment turnaround down by about 60% through automated vulnerability workflows.',
      'Ran OWASP-focused testing on web apps so issues showed up earlier in the release cycle.',
    ],
    stack: ['VAPT Automation', 'OWASP Top 10', 'Python', 'Nmap', 'Threat Detection'],
  },
]

const extras = [
  {
    title: 'C & DSA Technical Mentor',
    detail: 'Ran structured sessions teaching C and DSA basics to 180 students.',
    when: 'Sept – Oct 2023',
  },
  {
    title: 'Smart India Hackathon',
    detail: 'Internal Third Runner-Up with a university engineering team.',
    when: 'July – Aug 2023',
  },
]

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="exp-intro">
        <p className="exp-kicker">Experience</p>
        <h2 className="exp-heading">
          Meridian, campus,
          <br />
          <em>and the work between</em>
        </h2>
        <p className="exp-lede">
          Cybersecurity automation into production AI at Meridian Solutions — backed by
          a B.Tech in CS and a few years of mentoring and hackathons along the way.
        </p>
      </div>

      <div className="exp-board">
        <header className="exp-employer">
          <div className="exp-employer__main">
            <p className="exp-employer__place">Gurugram · Microsoft Gold Partner</p>
            <h3 className="exp-employer__name">Meridian Solutions Pvt. Ltd.</h3>
          </div>
          <time className="exp-employer__span" dateTime="2025-08">
            Aug 2025 – Present
          </time>
        </header>

        <ol className="exp-roles">
          {roles.map((role) => (
            <li key={role.title} className="exp-entry">
              <div className="exp-entry__meta">
                <span className="exp-entry__period">{role.period}</span>
                <span className="exp-entry__status">{role.status}</span>
              </div>

              <div className="exp-entry__body">
                <h4 className="exp-entry__title">{role.title}</h4>
                <p className="exp-entry__summary">{role.summary}</p>
                <ul className="exp-entry__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="exp-entry__stack" aria-label="Tools used">
                  {role.stack.join(' · ')}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="exp-foundation">
        <article className="exp-edu">
          <p className="exp-foundation__label">Education</p>
          <h3 className="exp-edu__school">GLA University</h3>
          <p className="exp-edu__degree">B.Tech · Computer Science</p>
          <p className="exp-edu__meta">
            Mathura, UP · July 2022 – June 2026
            <span className="exp-edu__cgpa">CGPA 8.4</span>
          </p>
        </article>

        <div className="exp-extras" aria-label="Leadership and extracurricular">
          <p className="exp-foundation__label">Beyond the desk</p>
          <ul className="exp-extras__list">
            {extras.map((item) => (
              <li key={item.title} className="exp-extra">
                <div className="exp-extra__text">
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
                <span className="exp-extra__when">{item.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
