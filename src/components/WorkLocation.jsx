import { CompassIcon, ExternalLinkIcon, MapPinIcon, SparklesIcon } from './icons.jsx'
import './WorkLocation.css'

export default function WorkLocation() {
  const mapsUrl = 'https://maps.google.com/?q=Gurugram,Haryana,India'

  return (
    <section className="location-section" id="location">
      <div className="section-head">
        <span className="section-tag location-tag">
          <MapPinIcon /> Work Location &amp; Availability
        </span>
        <h2 className="section-title">
          Based in <em>Gurugram</em>, <br />
          Delhi NCR&apos;s Technology Hub
        </h2>
        <p className="section-sub">
          Currently working as an Associate AI Engineer (L2) in Gurugram, Haryana and originally
          from Agra, UP — available for on-site, hybrid, and remote engineering opportunities.
        </p>
      </div>

      <div className="location-royal-card">
        <div className="royal-corner royal-corner--tl" />
        <div className="royal-corner royal-corner--tr" />
        <div className="royal-corner royal-corner--bl" />
        <div className="royal-corner royal-corner--br" />

        <div className="location-info-side">
          <div className="royal-badge">
            <span className="royal-crown-dot" />
            <span>Open to Impactful Roles</span>
          </div>

          <h3 className="location-city-title">Gurugram, Haryana</h3>
          <p className="location-country-sub">National Capital Region (NCR) &bull; Origin: Agra, UP</p>

          <div className="coords-capsule">
            <CompassIcon />
            <span>28.4119&deg; N &nbsp;/&nbsp; 77.0297&deg; E</span>
          </div>

          <p className="location-desc">
            Working in the Cyber City / NCR tech corridor at Meridian Solutions Pvt. Ltd. (Microsoft Gold Partner),
            collaborating across AI engineering and cybersecurity teams.
          </p>

          <ul className="royal-features">
            <li>
              <div className="royal-feat-dot" />
              <div>
                <strong>On-Site &amp; Hybrid Ready (Delhi NCR)</strong>
                <span>Immediately accessible for in-person interviews and collaborative engineering teams in Gurugram &amp; Noida.</span>
              </div>
            </li>
            <li>
              <div className="royal-feat-dot" />
              <div>
                <strong>Flexible Relocation &amp; Remote</strong>
                <span>Open to relocating across major Indian tech hubs or collaborating remotely across IST, GMT, and US timezones.</span>
              </div>
            </li>
            <li>
              <div className="royal-feat-dot" />
              <div>
                <strong>Graduating B.Tech CS (June 2026)</strong>
                <span>GLA University (8.4 CGPA) with active full-time &amp; internship industry experience since Aug 2025.</span>
              </div>
            </li>
          </ul>

          <div className="location-actions">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn location-maps-btn"
            >
              <MapPinIcon />
              <span>View Gurugram on Maps</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        <div className="location-map-side">
          <div className="royal-map-frame">
            <div className="royal-gold-halo" />

            <div className="map-image-container">
              <img
                src="/gurgaon-map.png"
                alt="Gold Cartographic Map of Gurugram, India"
                className="royal-map-img"
              />

              <div className="radar-beacon" title="Current Work Base — Gurugram">
                <span className="beacon-core" />
                <span className="beacon-wave beacon-wave--1" />
                <span className="beacon-wave beacon-wave--2" />
                <span className="beacon-tooltip">
                  <span className="tooltip-dot" />
                  <span>Gurugram &bull; NCR</span>
                </span>
              </div>

              <div className="map-shimmer" />
            </div>

            <div className="map-frame-caption">
              <span className="map-caption-tag"><SparklesIcon /> Gurugram, Haryana</span>
              <span>28.4119&deg; N, 77.0297&deg; E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
