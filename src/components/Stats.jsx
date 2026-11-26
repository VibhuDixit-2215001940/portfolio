import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(val) {
        if (ref.current) {
          ref.current.textContent = prefix + val.toFixed(decimals) + suffix
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

function Typewriter({ text, delay = 0, speed = 0.014, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: speed, delayChildren: delay },
        },
      }}
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

const candidateStats = [
  { value: 60, suffix: '%', decimals: 0, label: 'Faster VAPT Security Audits' },
  { value: 1260, suffix: '+', decimals: 0, label: 'DSA Problems Solved' },
  { value: 57, suffix: '', decimals: 0, label: 'Verified Cloud & Security Certs' },
  { value: 8.4, suffix: '', decimals: 1, label: 'B.Tech CS CGPA · GLA University' },
  { value: 180, suffix: '+', decimals: 0, label: 'Students Mentored in C & DSA' },
]

const aiVideoOptions = [
  { id: 'network', label: 'Neural AI Network', url: '/ai-network.mp4' },
  { id: 'circuit', label: 'Processor Circuit', url: 'https://assets.mixkit.co/videos/47051/47051-720.mp4' },
  { id: 'mesh', label: 'Cyber Matrix', url: 'https://assets.mixkit.co/videos/34302/34302-720.mp4' },
]

const maskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='m53.54,45.42c2.19-3.79,7.67-3.79,9.86,0l4.54,7.87c1.17,2.02,1.17,4.51,0,6.54l-8.15,13.81c-1.68,2.91.42,6.55,3.78,6.55h17.81c3.45,0,5.61-3.74,3.89-6.73l-28.76-49.81c-2.95-5.12-10.34-5.12-13.29,0l-28.46,49.3c-1.86,3.22.46,7.24,4.18,7.24h10.23c2.55,0,4.91-1.36,6.19-3.57l18.18-31.19Z'/%3E%3C/svg%3E")`

const maskStyle = {
  WebkitMaskImage: maskSvg,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskImage: maskSvg,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
}

export default function Stats() {
  const [selectedVideo, setSelectedVideo] = useState(aiVideoOptions[0].url)

  return (
    <section
      id="stats"
      className="relative text-white py-12 md:py-24 px-6 md:px-12 lg:px-14 xl:px-[120px] w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #080201 0%, #140501 14%, #0d0300 45%, #050100 80%, #000000 100%)',
      }}
    >
      {/* Top Ambient Ember Blend Glow */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 61, 0, 0.08) 0%, rgba(20, 6, 1, 0) 100%)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255, 106, 0, 0.12) 0%, transparent 75%)',
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto z-10">
        {/* Top Controls: Recruiter Quick Snapshot & AI Visual Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/[0.06]">
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-amber-500/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              AI Visual:
            </span>
            <div className="inline-flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full p-1 text-xs">
              {aiVideoOptions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVideo(v.url)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all duration-200 ${
                    selectedVideo === v.url
                      ? 'bg-amber-600/35 text-amber-300 border border-amber-500/40 shadow-sm font-medium'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/75">
              Gurugram, Haryana &amp; Agra, UP
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/35 text-amber-300 font-medium">
              B.Tech CS &apos;26 · CGPA 8.4
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 xl:gap-20 items-center justify-between">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="flex-1 w-full max-w-xl flex flex-col justify-start"
          >
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
              <Typewriter text="Engineering Impact" delay={0} speed={0.012} />
              <br />
              <Typewriter text="in " delay={0.22} speed={0.012} />
              <span className="font-dm-serif italic font-normal text-amber-400">
                <Typewriter text="AI, Cloud &amp; Security" delay={0.3} speed={0.012} />
              </span>
            </h2>

            <p className="text-base md:text-lg text-white/55 leading-relaxed font-light max-w-lg whitespace-normal mb-14">
              <Typewriter
                text="Combining strong algorithmic foundations with hands-on experience in Generative AI workflows, LangGraph agents, and automated VAPT security engineering at a Microsoft Gold Partner."
                delay={0.1}
                speed={0.01}
              />
            </p>

            {/* Stats Grid */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24"
            >
              {candidateStats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: 'easeOut' },
                    },
                  }}
                  className="flex flex-col"
                >
                  <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                    <AnimatedCounter
                      value={item.value}
                      suffix={item.suffix}
                      decimals={item.decimals}
                    />
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-white/45 uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Logo-Masked AI Video */}
          <div className="relative flex justify-center items-center shrink-0 w-full lg:w-auto lg:flex-1">
            <div
              className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 61, 0, 0.22) 0%, rgba(255, 138, 31, 0.08) 45%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
              className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[460px] aspect-square origin-center"
              style={maskStyle}
            >
              <video
                key={selectedVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={selectedVideo}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
