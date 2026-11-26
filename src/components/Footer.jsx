import './Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#main" className="footer__logo">
            <img className="footer__avatar" src="/vibhu-avatar.jpg" alt="Vibhu Dixit" />
            <span>Vibhu Dixit</span>
          </a>
          <p className="footer__tagline">
            Associate AI Engineer – Level 2 at Meridian Solutions Pvt. Ltd. Building scalable
            Generative AI workflows, full-stack applications, and automated cybersecurity systems.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <div className="footer__col">
            <span className="footer__col-title">Portfolio</span>
            <ul>
              <li><a href="#experience">Experience &amp; Education</a></li>
              <li><a href="#skills">Technical Skills</a></li>
              <li><a href="#projects">Projects &amp; Impact</a></li>
              <li><a href="#client-work">Live Client Portals</a></li>
              <li><a href="#credentials">Coding &amp; Certifications</a></li>
              <li><a href="#location">Location (Gurugram)</a></li>
              <li><a href="#contact">Contact / Hire Me</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Profiles &amp; Contact</span>
            <ul>
              <li><a href="https://www.linkedin.com/in/vibhu-dixit-b42a11251/" target="_blank" rel="noopener noreferrer">LinkedIn &rarr;</a></li>
              <li><a href="https://github.com/VibhuDixit-2215001940" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a></li>
              <li><a href="mailto:vibhudixit88@gmail.com">vibhudixit88@gmail.com</a></li>
              <li><a href="tel:+917500211114">+91 7500211114</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Vibhu Dixit. B.Tech CSE &apos;26 &bull; Gurugram / Agra, India.</p>
        <button type="button" className="footer__top-btn" onClick={scrollToTop}>
          Back to Top &uarr;
        </button>
      </div>
    </footer>
  )
}
