import { ExternalLinkIcon, LinkedInLogo, SparklesIcon } from './icons.jsx'
import './LinkedInConnect.css'

export default function LinkedInConnect() {
  const linkedInUrl = 'https://www.linkedin.com/in/vibhu-dixit-b42a11251/'

  return (
    <section className="linkedin-section" id="connect">
      <div className="section-head">
        <span className="section-tag">
          <SparklesIcon /> Professional Network
        </span>
        <h2 className="section-title">
          Connect with <em>Vibhu Dixit</em> <br />
          on LinkedIn
        </h2>
        <p className="section-sub">
          Let&apos;s discuss modern web development, custom AI implementations, or potential collaboration.
          Scan the QR code below or tap to open directly.
        </p>
      </div>

      <div className="linkedin-card-wrap">
        <div className="linkedin-card">
          {/* Decorative Corner Flairs */}
          <div className="card-corner card-corner--tl" />
          <div className="card-corner card-corner--tr" />
          <div className="card-corner card-corner--bl" />
          <div className="card-corner card-corner--br" />

          {/* Left: Profile & Verification */}
          <div className="linkedin-card__profile">
            <div className="profile-header">
              <div className="profile-badge">
                <span className="profile-status-dot" />
                <span>Available for Select Projects</span>
              </div>
              <h3 className="profile-name">Vibhu Dixit</h3>
              <p className="profile-role">Full-Stack Web &amp; AI Solutions Engineer</p>
            </div>

            <p className="profile-bio">
              Specializing in high-performance web applications, autonomous AI agents,
              and intelligent RAG systems engineered to scale reliably.
            </p>

            <div className="profile-actions">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--flame linkedin-cta"
              >
                <LinkedInLogo />
                <span>Open LinkedIn Profile</span>
                <ExternalLinkIcon />
              </a>
            </div>

            <div className="profile-meta">
              <span>Verified Identity</span>
              <span className="meta-sep">&bull;</span>
              <span>100% Direct Response</span>
            </div>
          </div>

          {/* Right: The High-Contrast QR Code */}
          <div className="linkedin-card__qr-box">
            <div className="qr-frame">
              <div className="qr-glow-ring" />
              <div className="qr-wrapper">
                <img
                  src="/linkedin-qr.svg"
                  alt="Scan to open Vibhu Dixit's LinkedIn profile"
                  className="qr-image"
                />
              </div>
              <div className="qr-scan-bar" />
            </div>

            <div className="qr-caption">
              <span className="qr-icon-tag"><LinkedInLogo /></span>
              <span>Scan with phone camera to connect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
