import { useEffect, useState } from 'react'
import { CheckIcon, Close, ExternalLinkIcon, Globe, SparklesIcon } from './icons.jsx'
import './ClientWork.css'

const clientDeliveries = [
  {
    id: 'zentrevo',
    client: 'ZENTREVO Travel Co.',
    category: 'Travel & Concierge Platform',
    title: 'Zentrevo — Curated Journeys & Travel Portal',
    url: 'https://www.zentrevo.in/',
    displayUrl: 'www.zentrevo.in',
    screenshot: '/client-work/zentrevo.png',
    screenshotAlt: 'Zentrevo live travel portal hero and journey search interface',
    overview:
      'Bespoke travel planning and private concierge agency offering custom domestic (17 National journeys) and international (30 journeys across 48 countries) itineraries with 24/7 WhatsApp support.',
    solution:
      'Built an editorial-grade responsive web platform featuring multi-destination discovery, date & party-size journey search, live ₹ INR currency toggle, itinerary inquiry flows, and WhatsApp + AI assistant integration.',
    highlights: [
      'Custom journey search bar (Destination, Dates, Party Size)',
      'Curated National & International itinerary carousels with INR pricing',
      'Integrated WhatsApp concierge & interactive AI travel assistant',
    ],
    tags: ['Responsive Web', 'Editorial UI', 'Search & Filtering', 'AI & WhatsApp'],
  },
  {
    id: 'cleanmax-prism',
    client: 'CleanMax Assets',
    category: 'Enterprise DPR & Site Monitoring',
    title: 'CleanMax PRISM — Project Reporting & Site Monitoring',
    url: 'http://20.235.119.84/dpr/login',
    displayUrl: '20.235.119.84/dpr/login',
    screenshot: '/client-work/cleanmax-prism.png',
    screenshotAlt: 'CleanMax PRISM Project Reporting, Insight and Site Monitoring portal login',
    overview:
      'Internal enterprise Daily Progress Report (DPR) and site-monitoring workspace for CleanMax Assets teams managing Offsite & Carbon renewable energy deployments.',
    solution:
      'Delivered a secure role-based enterprise portal supporting 10 distinct operational roles, corporate credential authentication, session persistence, and streamlined site-level DPR reporting workflows.',
    highlights: [
      '10-role RBAC architecture (Super Admin & site operations)',
      'Corporate workspace authentication with persistent session controls',
      'Centralized Project Reporting, Insight & Site Monitoring (PRISM)',
    ],
    tags: ['Enterprise Portal', 'RBAC (10 Roles)', 'DPR Workflows', 'Site Monitoring'],
  },
  {
    id: 'intune-attendance',
    client: 'CleanMax',
    category: 'Workforce AI & Microsoft SSO',
    title: 'CleanMax Attendance AI — Intune Workforce Portal',
    url: 'https://intune-attendence.vercel.app/',
    displayUrl: 'intune-attendence.vercel.app',
    screenshot: '/client-work/intune-attendance.png',
    screenshotAlt: 'CleanMax Intune Attendance AI Portal with Microsoft SSO',
    overview:
      'Enterprise workforce attendance AI portal built for CleanMax teams with Intune/corporate identity integration and multi-tier role access.',
    solution:
      'Engineered a clean authentication gateway and attendance portal supporting Microsoft SSO ("Sign in with Microsoft"), credential login, multi-role RBAC switching, and edge deployment on Vercel.',
    highlights: [
      'Microsoft SSO enterprise identity integration alongside credential auth',
      'Multi-role access hierarchy with Super Admin & operational views',
      'Production-hosted on Vercel with responsive UI',
    ],
    tags: ['Attendance AI', 'Microsoft SSO', 'RBAC', 'Vercel'],
  },
  {
    id: 'cleanmax-corporate',
    client: 'CleanMax Enviro Energy Solutions',
    category: 'Corporate Flagship · Renewable Energy',
    title: 'CleanMax — Net-Zero & C&I Renewable Energy Platform',
    url: 'https://www.cleanmax.com/',
    displayUrl: 'www.cleanmax.com',
    screenshot: '/client-work/cleanmax-corporate.png',
    screenshotAlt: 'CleanMax corporate website hero banner — Powering Sustainability',
    overview:
      'Corporate digital flagship for Asia’s #1 commercial & industrial (C&I) renewable energy provider managing a 4.2 GW operational portfolio across 593+ corporate clients.',
    solution:
      'Delivered a high-impact enterprise web experience showcasing Offsite Solar/Wind/Hybrid Farms, Onsite Solar, Carbon Solutions, global case studies (Google, Equinix, BIAL, Cisco), and lead-capture funnels.',
    highlights: [
      'Showcases 4.2 GW portfolio & 593+ enterprise clients across 10+ states',
      'Dedicated solution hubs for Offsite, Onsite Solar, and Carbon solutions',
      'Enterprise partnership showcase, careers portal & contact workflows',
    ],
    tags: ['Corporate Flagship', 'Enterprise UX', 'Interactive Motion', 'Sustainability'],
  },
]

export default function ClientWork() {
  const [activeShot, setActiveShot] = useState(null)

  useEffect(() => {
    if (!activeShot) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveShot(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeShot])

  return (
    <section className="client-work" id="client-work">
      <div className="section-head">
        <span className="section-tag">
          <Globe /> Live Client Deliveries
        </span>
        <h2 className="section-title">
          Production Client Portals <br />
          <em>Shipped &amp; Live</em>
        </h2>
        <p className="section-sub">
          Real-world web applications and enterprise portals delivered to clients — from
          travel concierge platforms to renewable energy corporate flagships and RBAC enterprise tools.
        </p>
      </div>

      <div className="client-grid">
        {clientDeliveries.map((item) => (
          <article key={item.id} className="client-card">
            {/* Browser Chrome + Live Screenshot Preview */}
            <div className="client-browser">
              <div className="client-browser__bar">
                <div className="client-browser__dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <div className="client-browser__url" title={item.url}>
                  <span className="live-dot" aria-hidden="true" />
                  <span>{item.displayUrl}</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="client-browser__ext"
                  aria-label={`Open ${item.title} in new tab`}
                >
                  <ExternalLinkIcon />
                </a>
              </div>

              <button
                type="button"
                className="client-browser__shot"
                onClick={() => setActiveShot(item)}
                aria-label={`Enlarge screenshot of ${item.title}`}
              >
                <img src={item.screenshot} alt={item.screenshotAlt} loading="lazy" />
                <span className="shot-zoom-hint">Click to preview full screenshot</span>
              </button>
            </div>

            {/* Card Copy */}
            <div className="client-card__body">
              <div className="client-card__meta">
                <span className="client-card__cat">{item.category}</span>
                <span className="client-card__client">{item.client}</span>
              </div>

              <h3 className="client-card__title">{item.title}</h3>

              <div className="client-card__blocks">
                <div className="client-block">
                  <span className="client-block__label">Overview</span>
                  <p>{item.overview}</p>
                </div>
                <div className="client-block">
                  <span className="client-block__label client-block__label--accent">
                    <SparklesIcon /> Solution Delivered
                  </span>
                  <p>{item.solution}</p>
                </div>
              </div>

              <ul className="client-card__highlights">
                {item.highlights.map((pt) => (
                  <li key={pt}>
                    <span className="client-check"><CheckIcon /></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="client-card__footer">
              <div className="client-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
              >
                <span>Visit Live Portal</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Screenshot Lightbox Modal */}
      {activeShot && (
        <div
          className="shot-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeShot.title}
          onClick={() => setActiveShot(null)}
        >
          <div className="shot-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="shot-modal__head">
              <div>
                <h4>{activeShot.title}</h4>
                <span>{activeShot.url}</span>
              </div>
              <div className="shot-modal__actions">
                <a
                  href={activeShot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--flame shot-modal__visit"
                >
                  <span>Open Live</span>
                  <ExternalLinkIcon />
                </a>
                <button
                  type="button"
                  className="shot-modal__close"
                  aria-label="Close preview"
                  onClick={() => setActiveShot(null)}
                >
                  <Close />
                </button>
              </div>
            </div>
            <div className="shot-modal__img-wrap">
              <img src={activeShot.screenshot} alt={activeShot.screenshotAlt} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
