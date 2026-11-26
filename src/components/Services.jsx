import { CheckIcon, CodeIcon, CpuIcon, RocketIcon, SparklesIcon } from './icons.jsx'
import './Services.css'

const services = [
  {
    icon: <CodeIcon />,
    badge: 'Core Expertise',
    title: 'High-Performance Web Development',
    description:
      'Architecting blazingly fast, scalable web applications built with Next.js, React, and cloud-native backends designed for enterprise reliability.',
    features: [
      'Next.js 15 & React 19 production architecture',
      'Pixel-perfect responsive design with sub-second page loads',
      'Robust REST & GraphQL APIs with PostgreSQL / MongoDB',
      'Enterprise security, authentication & cloud deployment',
    ],
  },
  {
    icon: <CpuIcon />,
    badge: 'Cutting-Edge AI',
    title: 'Autonomous AI Agents & Workflows',
    description:
      'Developing goal-driven AI agents that reason, browse, connect to APIs, and execute complex business workflows autonomously 24/7.',
    features: [
      'Multi-agent orchestration & asynchronous execution',
      'Custom tool-calling & deep enterprise system integration',
      'Automated data pipelines, scraping & intelligence reporting',
      'Self-healing background task monitors & notifications',
    ],
  },
  {
    icon: <SparklesIcon />,
    badge: 'Enterprise Intelligence',
    title: 'Production LLMs & Context-Aware RAG',
    description:
      'Transforming unstructured enterprise documents into private, context-grounded AI knowledge bases with zero hallucination and strict security.',
    features: [
      'Vector search indexing with Pinecone, Qdrant & pgvector',
      'Advanced hybrid retrieval & semantic re-ranking',
      'Multi-model flexibility (OpenAI, Claude 3.5, Gemini 1.5/2.0)',
      'Granular data privacy & role-based document access',
    ],
  },
  {
    icon: <RocketIcon />,
    badge: 'Rapid Launch',
    title: 'AI SaaS & MVP Rapid Engineering',
    description:
      'Accelerating time-to-market from concept to production-ready deployed software with payments, authentication, and core AI features in weeks.',
    features: [
      'Stripe billing, subscription tiers & customer management',
      'Production analytics, telemetry & user session tracking',
      'Automated CI/CD pipelines & zero-downtime deployments',
      'Post-launch SLA support, scaling & code audits',
    ],
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-head">
        <span className="section-tag">
          <SparklesIcon /> What We Deliver
        </span>
        <h2 className="section-title">
          Engineering the Next Generation of <br />
          <em>Web & Intelligent AI</em> Systems
        </h2>
        <p className="section-sub">
          We combine modern software craft with state-of-the-art AI models to build
          reliable, high-impact digital solutions that drive measurable business outcomes.
        </p>
      </div>

      <div className="services__grid">
        {services.map((service, index) => (
          <div key={service.title} className="service-card" style={{ '--card-idx': index }}>
            <div className="service-card__top">
              <div className="service-card__icon">{service.icon}</div>
              <span className="service-card__badge">{service.badge}</span>
            </div>

            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>

            <ul className="service-card__features">
              {service.features.map((feat) => (
                <li key={feat}>
                  <span className="service-card__check"><CheckIcon /></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="service-card__glow" />
          </div>
        ))}
      </div>
    </section>
  )
}
