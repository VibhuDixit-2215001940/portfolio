import { CheckIcon, CpuIcon, LayersIcon, ShieldIcon, SparklesIcon } from './icons.jsx'
import './WhyUs.css'

const trustPillars = [
  {
    icon: <ShieldIcon />,
    title: 'Enterprise Security & Data Privacy',
    description:
      'Your proprietary business data and user information are isolated with role-based access, strict encryption, and never shared or used to train third-party public models.',
  },
  {
    icon: <CpuIcon />,
    title: 'Deterministic AI & Zero-Hallucination Guardrails',
    description:
      'We implement rigorous synthetic test suites, output validation, and citation-backed grounding to ensure AI agents behave reliably in mission-critical operations.',
  },
  {
    icon: <LayersIcon />,
    title: 'Production-Tested Code & Clean Architecture',
    description:
      'No fragile shortcuts. Every web application and automated service is designed modularly with full TypeScript type-safety, automated testing, and scalable cloud patterns.',
  },
  {
    icon: <SparklesIcon />,
    title: 'Rapid Milestones & Direct Communication',
    description:
      'Direct line of communication via private Slack/Discord, transparent sprint deliverables every week, and dedicated post-launch maintenance SLAs.',
  },
]

export default function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      <div className="section-head">
        <span className="section-tag">
          <ShieldIcon /> Built For Trust
        </span>
        <h2 className="section-title">
          Why Founders &amp; Teams <br />
          <em>Trust Our Execution</em>
        </h2>
        <p className="section-sub">
          We bridge the gap between creative visual excellence and rock-solid enterprise
          engineering so your business can scale without technical debt.
        </p>
      </div>

      <div className="why-us__grid">
        {trustPillars.map((pillar) => (
          <div key={pillar.title} className="pillar-card">
            <div className="pillar-card__icon">{pillar.icon}</div>
            <h3 className="pillar-card__title">{pillar.title}</h3>
            <p className="pillar-card__desc">{pillar.description}</p>
          </div>
        ))}
      </div>

      <div className="why-us__guarantee">
        <div className="guarantee__badge">
          <CheckIcon />
        </div>
        <div className="guarantee__text">
          <strong>100% Satisfaction &amp; Code Quality Guarantee</strong>
          <span>Full intellectual property ownership, documented repositories, and turnkey deployment handoff on every project.</span>
        </div>
      </div>
    </section>
  )
}
