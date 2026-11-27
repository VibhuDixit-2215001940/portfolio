import { useEffect, useRef, useState } from 'react'
import { ArrowRight, GitHubLogo, LinkedInLogo } from './icons.jsx'
import './Hero.css'

const stats = [
  { value: '60%', label: 'Faster VAPT audits' },
  { value: '1,260+', label: 'DSA · 1653 LC peak' },
  { value: '57', label: 'Verified certifications' },
]

export default function Hero() {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Some browsers block autoplay until the element is explicitly nudged.
    const play = video.play()
    if (play?.catch) play.catch(() => {})

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      setReady(true)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className={`hero__video ${ready ? 'is-ready' : ''}`}
          src="/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__rules" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>

      <div className="hero__inner">
        <div className="hero__lead">
          <div className="hero__status-pill">
            <span className="hero__status-dot" aria-hidden="true" />
            <span>Associate AI Engineer – L2 · Meridian Solutions</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__name">Vibhu Dixit</span>
            Engineering<br />
            <em>Intelligent</em> AI<br />
            &amp; Secure Apps
          </h1>

          <p className="hero__sub">
            Vibhu Dixit is an AI Engineer &amp; Cybersecurity Specialist —
            B.Tech CS (8.4 CGPA) engineer building GenAI &amp; LangGraph agents,
            Microsoft Azure cloud systems, and automated VAPT security platforms.
          </p>

          <div className="hero__cta">
            <a className="btn btn--flame hero__go" href="#contact">
              Schedule Interview
              <span className="hero__go-dot" aria-hidden="true"><ArrowRight /></span>
            </a>

            <div className="hero__quick-links">
              <a
                href="https://www.linkedin.com/in/vibhu-dixit-b42a11251/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-pill"
              >
                <LinkedInLogo />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/VibhuDixit-2215001940"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-pill"
              >
                <GitHubLogo />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <ul className="hero__stats">
            {stats.map((stat) => (
              <li key={stat.label} className="stat">
                <span className="stat__mark" aria-hidden="true">*</span>
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
                <span className="stat__rule" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero__foot">
        <span className="hero__watermark" aria-hidden="true">VIBHU</span>
        <div className="hero__partners">
          <span className="hero__partners-label">Core Stack &amp; Credentials</span>
          <ul>
            <li>Azure (AZ-500 / AZ-104)</li>
            <li>LangChain &amp; LangGraph</li>
            <li>Node.js &amp; React</li>
            <li>OWASP &amp; VAPT</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
