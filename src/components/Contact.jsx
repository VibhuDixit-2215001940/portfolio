import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CalendarIcon, CheckIcon, ChevronDown, GitHubLogo, LinkedInLogo, MailIcon, PhoneIcon } from './icons.jsx'
import './Contact.css'

const roleOptions = [
  { value: 'AI / GenAI Engineer', label: 'AI / GenAI Engineer' },
  { value: 'Full-Stack Software Engineer', label: 'Full-Stack Software Engineer' },
  { value: 'Cloud & Cybersecurity Engineer', label: 'Cloud & Cybersecurity Engineer' },
  { value: 'Software Development Engineer (SDE)', label: 'Software Development Engineer (SDE)' },
  { value: 'Technical Collaboration / Other', label: 'Technical Collaboration / Other' },
]

const workModeOptions = [
  { value: 'Hybrid — Gurugram / Delhi NCR', label: 'Hybrid — Gurugram / Delhi NCR' },
  { value: 'On-Site (Open to Relocation)', label: 'On-Site (Open to Relocation)' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Full-Time / Immediate Joiner', label: 'Full-Time / Discussion' },
]

function SmoothSelect({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const selectedItem = options.find((o) => o.value === value) || options[0]

  return (
    <div className={`custom-select ${isOpen ? 'custom-select--open' : ''}`} ref={selectRef}>
      <button
        type="button"
        className="custom-select__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className="custom-select__content">
          <span>{selectedItem.label}</span>
        </span>
        <span className="custom-select__chev" aria-hidden="true">
          <ChevronDown />
        </span>
      </button>

      {isOpen && (
        <ul className="custom-select__menu" role="listbox" aria-label={label}>
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-select__option ${isSelected ? 'custom-select__option--selected' : ''}`}
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
              >
                <div className="custom-select__opt-left">
                  <span>{opt.label}</span>
                </div>
                {isSelected && (
                  <span className="custom-select__opt-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'AI / GenAI Engineer',
    workMode: 'Hybrid — Gurugram / Delhi NCR',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          workMode: formData.workMode,
          service: formData.role,
          budget: formData.workMode,
          message: formData.message,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        throw new Error(data.error || 'Failed to send message.')
      }
    } catch (err) {
      console.warn('Form submit warning:', err)
      setErrorMsg(
        err.message ||
          'Connection error. Please reach out directly via email at vibhudixit88@gmail.com or +91 7500211114.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="section-head">
        <span className="section-tag">
          <CalendarIcon /> Recruiter &amp; Hiring Contact
        </span>
        <h2 className="section-title">
          Let&apos;s Discuss Your Next <br />
          <em>Engineering Hire</em>
        </h2>
        <p className="section-sub">
          Hiring for AI Engineering, Full-Stack Software Development, or Cloud &amp; Security?
          Reach out directly to schedule an interview or request my full resume.
        </p>
      </div>

      <div className="contact__inner">
        <div className="contact__info">
          <div className="info-card">
            <div className="contact-profile">
              <img
                src="/vibhu-avatar-136.png"
                srcSet="/vibhu-avatar-136.png 1x, /vibhu-avatar-272.png 2x"
                width="68"
                height="68"
                alt="Vibhu Dixit"
                className="contact-profile__avatar"
              />
              <div>
                <span className="contact-profile__badge">Open to Opportunities</span>
                <h3>Vibhu Dixit</h3>
                <span className="contact-profile__role">Associate AI Engineer – Level 2</span>
              </div>
            </div>
            <p>
              Associate AI Engineer (L2) at Meridian Solutions Pvt. Ltd. with hands-on production
              experience in GenAI, RAG, Azure cloud security, and full-stack development.
            </p>

            <ul className="info-perks">
              <li>
                <span className="perk-check"><CheckIcon /></span>
                <div>
                  <strong>Fast Response (Within 12 Hours)</strong>
                  <span>Direct communication for HR screenings and technical interview scheduling.</span>
                </div>
              </li>
              <li>
                <span className="perk-check"><CheckIcon /></span>
                <div>
                  <strong>Strong CS &amp; DSA Fundamentals</strong>
                  <span>B.Tech CS (8.4 CGPA) · 1,260+ coding problems solved (1653 LeetCode Peak).</span>
                </div>
              </li>
              <li>
                <span className="perk-check"><CheckIcon /></span>
                <div>
                  <strong>57+ Cloud, AI &amp; Security Certifications</strong>
                  <span>AZ-500, SC-300, AZ-104, SC-900, AZ-900, CCNA, SentinelOne, EC-Council &amp; more.</span>
                </div>
              </li>
            </ul>

            <div className="contact-methods">
              <a href="mailto:vibhudixit88@gmail.com" className="method-pill">
                <MailIcon />
                <span>vibhudixit88@gmail.com</span>
              </a>
              <a href="tel:+917500211114" className="method-pill">
                <PhoneIcon />
                <span>+91 7500211114</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vibhu-dixit-b42a11251/"
                target="_blank"
                rel="noopener noreferrer"
                className="method-pill"
              >
                <LinkedInLogo />
                <span>linkedin.com/in/vibhu-dixit-b42a11251</span>
              </a>
              <a
                href="https://github.com/VibhuDixit-2215001940"
                target="_blank"
                rel="noopener noreferrer"
                className="method-pill"
              >
                <GitHubLogo />
                <span>github.com/VibhuDixit-2215001940</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact__form-wrap">
          {submitted ? (
            <div className="form-success">
              <div className="success-badge"><CheckIcon /></div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you for reaching out. Your note has been delivered to{' '}
                <strong>vibhudixit88@gmail.com</strong>, and a confirmation has been sent to{' '}
                <strong>{formData.email}</strong>. I will respond within 12 hours!
              </p>
              <button
                type="button"
                className="btn btn--light"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    name: '',
                    email: '',
                    role: 'AI / GenAI Engineer',
                    workMode: 'Hybrid — Gurugram / Delhi NCR',
                    message: '',
                  })
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Recruiter / Work Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label id="role-label">Role / Opportunity</label>
                  <SmoothSelect
                    label="Role / Opportunity"
                    value={formData.role}
                    options={roleOptions}
                    onChange={(val) => setFormData({ ...formData, role: val })}
                  />
                </div>
                <div className="form-field">
                  <label id="workmode-label">Work Mode / Location</label>
                  <SmoothSelect
                    label="Work Mode / Location"
                    value={formData.workMode}
                    options={workModeOptions}
                    onChange={(val) => setFormData({ ...formData, workMode: val })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Role Details / Interview Availability</label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  placeholder="Share the role, team, tech stack, or preferred interview slots..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {errorMsg && (
                <div className="form-error-alert" role="alert">
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn--flame submit-btn"
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                <span>{submitting ? 'Sending Message...' : 'Send Interview / Role Inquiry'}</span>
                <ArrowRight />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
