import { useEffect, useMemo, useState } from 'react'
import { certificates } from '../data/certificates.js'
import { AwardIcon, CalendarIcon, CheckIcon, Close, ExternalLinkIcon, MicrosoftLogo, ShieldIcon, TerminalIcon } from './icons.jsx'
import './Credentials.css'

const codingPlatforms = [
  {
    name: 'LeetCode',
    stat: '360+',
    statLabel: 'Problems Solved',
    highlight: 'Peak Rating 1653',
    sub: '2.3 Lakh+ views on published solutions',
    href: 'https://leetcode.com',
  },
  {
    name: 'CodeChef',
    stat: '450+',
    statLabel: 'Questions Tackled',
    highlight: '3 Stars Rating',
    sub: 'Consistent competitive problem solving',
    href: 'https://www.codechef.com',
  },
  {
    name: 'Codeforces',
    stat: '450+',
    statLabel: 'Challenges Practiced',
    highlight: 'Peak Rating 1105',
    sub: 'Algorithmic speed & contest practice',
    href: 'https://codeforces.com',
  },
]

const categoryTabs = [
  { id: 'all', label: 'All' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'cloud', label: 'Microsoft & Cloud' },
  { id: 'ai', label: 'AI & GenAI' },
  { id: 'dev', label: 'Dev & DSA' },
]

function CertificateVisual({ cert, large = false }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (cert.image && !imgFailed) {
    return (
      <div className={`cert-pic ${large ? 'cert-pic--large' : ''}`}>
        <img
          src={cert.image}
          alt={`${cert.name} certificate`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </div>
    )
  }

  return (
    <div className={`cert-pic cert-pic--generated cert-pic--${cert.kind || 'security'} ${large ? 'cert-pic--large' : ''}`}>
      <div className="cert-sheet">
        <div className="cert-sheet__corner cert-sheet__corner--tl" />
        <div className="cert-sheet__corner cert-sheet__corner--tr" />
        <div className="cert-sheet__corner cert-sheet__corner--bl" />
        <div className="cert-sheet__corner cert-sheet__corner--br" />

        <div className="cert-sheet__top">
          <span className="cert-sheet__crest">
            {cert.kind === 'microsoft' ? <MicrosoftLogo /> : <ShieldIcon />}
          </span>
          <span className="cert-sheet__issuer-tag">{cert.issuer}</span>
        </div>

        <div className="cert-sheet__body">
          <span className="cert-sheet__kicker">Verified Credential</span>
          <strong className="cert-sheet__title">{cert.name}</strong>
          <span className="cert-sheet__holder">Awarded to Vibhu Dixit</span>
        </div>

        <div className="cert-sheet__foot">
          <span className="cert-sheet__code">{cert.code}</span>
          <span className="cert-sheet__seal" aria-hidden="true">
            <AwardIcon />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Credentials() {
  const [paused, setPaused] = useState(false)
  const [fastSpeed, setFastSpeed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    if (!selectedCert) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedCert])

  const filteredCerts = useMemo(() => {
    if (activeCategory === 'all') return certificates
    if (activeCategory === 'cloud') {
      return certificates.filter((c) => c.category === 'cloud' || c.kind === 'microsoft')
    }
    return certificates.filter((c) => c.category === activeCategory)
  }, [activeCategory])

  const secondsPerCard = fastSpeed ? 2.1 : 4.2
  const marqueeDuration = `${Math.max(18, filteredCerts.length * secondsPerCard)}s`

  return (
    <section className="credentials" id="credentials">
      <div className="section-head">
        <span className="section-tag">
          <AwardIcon /> Verified Credentials
        </span>
        <h2 className="section-title">
          Competitive Programming &amp; <br />
          <em>{certificates.length} Industry Certifications</em>
        </h2>
        <p className="section-sub">
          Backed by 1,260+ solved algorithmic challenges across major coding platforms and{' '}
          {certificates.length} verified certifications across Microsoft Azure, Cloud, Cybersecurity, and GenAI.
        </p>
      </div>

      {/* Coding Platforms Row */}
      <div className="coding-grid">
        {codingPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="coding-card"
          >
            <div className="coding-card__top">
              <div className="coding-card__brand">
                <span className="coding-card__icon"><TerminalIcon /></span>
                <h3>{platform.name}</h3>
              </div>
              <span className="coding-card__pill">{platform.highlight}</span>
            </div>

            <div className="coding-card__metric">
              <span className="coding-card__num">{platform.stat}</span>
              <span className="coding-card__label">{platform.statLabel}</span>
            </div>

            <div className="coding-card__foot">
              <span>{platform.sub}</span>
              <ExternalLinkIcon />
            </div>
          </a>
        ))}
      </div>

      {/* Automatic Horizontal Moving Certificates Carousel */}
      <div className="certs-wrap">
        <div className="certs-header">
          <div>
            <h3>Licenses &amp; Certifications ({filteredCerts.length})</h3>
            <span>Auto-scrolling showcase — hover any certificate to pause or click to inspect &amp; verify</span>
          </div>

          <div className="certs-controls">
            <button
              type="button"
              className="certs-toggle-btn"
              onClick={() => setFastSpeed((f) => !f)}
              aria-pressed={fastSpeed}
            >
              {fastSpeed ? '2x Speed' : '1x Speed'}
            </button>
            <button
              type="button"
              className="certs-toggle-btn"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? '▶ Resume' : '❚❚ Pause'}
            </button>
            <a
              href="https://www.linkedin.com/in/vibhu-dixit-b42a11251/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="certs-linkedin-link"
            >
              <span>LinkedIn Profile</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="certs-filters" role="tablist" aria-label="Filter certifications by domain">
          {categoryTabs.map((tab) => {
            const count =
              tab.id === 'all'
                ? certificates.length
                : tab.id === 'cloud'
                  ? certificates.filter((c) => c.category === 'cloud' || c.kind === 'microsoft').length
                  : certificates.filter((c) => c.category === tab.id).length

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                className={`certs-filter-pill ${activeCategory === tab.id ? 'certs-filter-pill--active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="certs-filter-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div
          key={`${activeCategory}-${fastSpeed}`}
          className={`certs-marquee ${paused ? 'certs-marquee--paused' : ''}`}
          style={{ '--marquee-duration': marqueeDuration }}
        >
          <div className="certs-track">
            {[0, 1].map((dupIndex) => (
              <div key={dupIndex} className="certs-track__group" aria-hidden={dupIndex === 1}>
                {filteredCerts.map((cert) => (
                  <button
                    key={`${dupIndex}-${cert.id}`}
                    type="button"
                    className="cert-slide"
                    onClick={() => setSelectedCert(cert)}
                    tabIndex={dupIndex === 1 ? -1 : 0}
                  >
                    <CertificateVisual cert={cert} />

                    <div className="cert-slide__meta">
                      <div className="cert-slide__issuer-row">
                        <span className="cert-slide__issuer">{cert.issuer}</span>
                        <span className="cert-card__code">{cert.code}</span>
                      </div>

                      <h4 className="cert-slide__title">{cert.name}</h4>

                      <div className="cert-slide__dates">
                        <span className="cert-date-pill">
                          <CalendarIcon />
                          <span>Issued {cert.issued || 'Verified'}</span>
                        </span>
                        {cert.expires ? (
                          <span
                            className={`cert-date-pill ${
                              cert.expired ? 'cert-date-pill--expired' : 'cert-date-pill--exp'
                            }`}
                          >
                            <span>{cert.expired ? `Expired ${cert.expires}` : `Expires ${cert.expires}`}</span>
                          </span>
                        ) : (
                          <span className="cert-date-pill">
                            <span>No Expiration</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Summary Banner */}
      <div className="why-us__guarantee">
        <div className="guarantee__badge">
          <CheckIcon />
        </div>
        <div className="guarantee__text">
          <strong>Production-Ready AI, Cloud &amp; Security Profile</strong>
          <span>
            Ready to contribute immediately across Generative AI (LangChain/LangGraph/RAG), Full-Stack Node.js/React, and Microsoft Azure Security.
          </span>
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.name}
          onClick={() => setSelectedCert(null)}
        >
          <div className="cert-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal__head">
              <div>
                <span className="cert-modal__issuer">Issued by {selectedCert.issuer}</span>
                <h4>{selectedCert.name}</h4>
              </div>
              <button
                type="button"
                className="cert-modal__close"
                aria-label="Close certificate preview"
                onClick={() => setSelectedCert(null)}
              >
                <Close />
              </button>
            </div>

            <div className="cert-modal__body">
              <CertificateVisual cert={selectedCert} large />

              <div className="cert-modal__details">
                <div className="cert-modal__stat">
                  <span>Issued Date</span>
                  <strong>{selectedCert.issued || 'Verified'}</strong>
                </div>
                <div className="cert-modal__stat">
                  <span>Expiration</span>
                  <strong>
                    {selectedCert.expires
                      ? selectedCert.expired
                        ? `Expired ${selectedCert.expires}`
                        : `Expires ${selectedCert.expires}`
                      : 'No Expiration'}
                  </strong>
                </div>
                <div className="cert-modal__stat">
                  <span>Credential ID</span>
                  <strong className="cert-modal__id">{selectedCert.credentialId || selectedCert.code}</strong>
                </div>
              </div>

              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--flame cert-modal__btn"
                >
                  <span>Show / Verify Credential</span>
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
