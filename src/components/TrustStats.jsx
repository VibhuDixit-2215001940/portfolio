import { useEffect, useRef, useState } from 'react'
import { AmazonLogo, GoogleLogo, MicrosoftLogo, OpenAILogo } from './icons.jsx'
import './TrustStats.css'

const metrics = [
  { prefix: '<', value: 120, suffix: 'ms', decimals: 0, label: 'Inference & Web Latency' },
  { prefix: '', value: 99.99, suffix: '%', decimals: 2, label: 'Platform & AI Uptime' },
  { prefix: '', value: 24, suffix: '/7', decimals: 0, label: 'Autonomous AI Runtime' },
  { prefix: '', value: 150, suffix: '+', decimals: 0, label: 'High-Impact Deployments' },
]

function useCounter(target, decimals, duration, start) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime = null
    let frameId = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = ease * target
      setCount(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, start])

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count)
}

function StatItem({ item, started, index }) {
  const val = useCounter(item.value, item.decimals, 1600 + index * 100, started)

  return (
    <div className="trust-stat__card" style={{ '--delay': `${index * 0.1}s` }}>
      <div className="trust-stat__num-wrap">
        {item.prefix && <span className="trust-stat__prefix">{item.prefix}</span>}
        <span className="trust-stat__value">{val}</span>
        <span className="trust-stat__suffix">{item.suffix}</span>
      </div>
      <p className="trust-stat__label">{item.label}</p>
      <div className="trust-stat__glow" />
    </div>
  )
}

export default function TrustStats() {
  const containerRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="trust-stats" ref={containerRef}>
      {/* Overlapping Tech Ecosystem Trust Bar */}
      <div className="trust-row">
        <div className="trust-avatars" aria-hidden="true">
          <div className="trust-ring" style={{ zIndex: 4 }}>
            <div className="trust-disk"><MicrosoftLogo /></div>
          </div>
          <div className="trust-ring" style={{ zIndex: 3 }}>
            <div className="trust-disk"><AmazonLogo /></div>
          </div>
          <div className="trust-ring" style={{ zIndex: 2 }}>
            <div className="trust-disk"><GoogleLogo /></div>
          </div>
          <div className="trust-ring" style={{ zIndex: 1 }}>
            <div className="trust-disk"><OpenAILogo /></div>
          </div>
        </div>
        <div className="trust-pill">
          <span className="trust-pill__dot" />
          <span>Trusted Stack & Modern Cloud Architectures</span>
        </div>
      </div>

      {/* 4 Interactive Metrics */}
      <div className="trust-stats__grid">
        {metrics.map((metric, idx) => (
          <StatItem
            key={metric.label}
            item={metric}
            started={hasStarted}
            index={idx}
          />
        ))}
      </div>
    </section>
  )
}
