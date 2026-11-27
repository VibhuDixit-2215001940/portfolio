import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { skillBoxes, skillTools } from '../data/skillsJourney.js'
import { SkillLogo } from './SkillLogos.jsx'
import { ArrowRight, CheckIcon, Close, CodeIcon, CpuIcon, LayersIcon, ShieldIcon, SparklesIcon } from './icons.jsx'
import './Services.css'
import './Skills.css'

const boxIcons = {
  'ai-genai': <CpuIcon />,
  'cloud-security': <ShieldIcon />,
  'web-fullstack': <CodeIcon />,
  'languages-data': <LayersIcon />,
}

export default function Skills() {
  const [viewMode, setViewMode] = useState('scattered') // 'scattered' | 'sorted'
  const [openBoxId, setOpenBoxId] = useState(null)
  const [selectedToolId, setSelectedToolId] = useState(null)

  const toolsByBox = useMemo(() => {
    const map = {}
    skillBoxes.forEach((b) => {
      map[b.id] = skillTools.filter((t) => t.boxId === b.id)
    })
    return map
  }, [])

  const activeBox = useMemo(
    () => skillBoxes.find((b) => b.id === openBoxId) || null,
    [openBoxId]
  )

  const activeBoxTools = useMemo(
    () => (openBoxId ? toolsByBox[openBoxId] || [] : []),
    [openBoxId, toolsByBox]
  )

  const selectedTool = useMemo(
    () => skillTools.find((t) => t.id === selectedToolId) || null,
    [selectedToolId]
  )

  const handleSort = () => {
    setViewMode('sorted')
  }

  const handleScatter = () => {
    setOpenBoxId(null)
    setSelectedToolId(null)
    setViewMode('scattered')
  }

  const handleOpenBox = (boxId) => {
    setViewMode('sorted')
    setOpenBoxId(boxId)
    const first = (toolsByBox[boxId] || [])[0]
    setSelectedToolId(first ? first.id : null)
  }

  const handleSelectTool = (tool) => {
    setViewMode('sorted')
    setOpenBoxId(tool.boxId)
    setSelectedToolId(tool.id)
  }

  const handleCycleTool = (dir) => {
    if (!activeBoxTools.length || !selectedToolId) return
    const idx = activeBoxTools.findIndex((t) => t.id === selectedToolId)
    const nextIdx = (idx + dir + activeBoxTools.length) % activeBoxTools.length
    setSelectedToolId(activeBoxTools[nextIdx].id)
  }

  return (
    <section className="services skills-section" id="skills">
      <div className="section-head">
        <span className="section-tag">
          <SparklesIcon /> Technical Arsenal
        </span>
        <h2 className="section-title">
          Skills Across <em>AI, Cloud</em> <br />
          &amp; Full-Stack Security
        </h2>
        <p className="section-sub">
          Click anywhere on the toolkit card to sort logos into domain boxes. Open a box,
          then pick a logo to see how I used it.
        </p>
      </div>

      <div className="skills-toolbar">
        <div className="skills-toolbar__hint">
          <span className={`skills-pulse ${viewMode === 'sorted' ? 'is-sorted' : ''}`} />
          <span>
            {openBoxId
              ? `Viewing ${activeBox?.title} — click any logo for journey usage`
              : viewMode === 'sorted'
                ? 'Sorted into 4 boxes — click a box or any logo to explore'
                : 'Click anywhere on the card to sort logos into boxes'}
          </span>
        </div>

        <div className="skills-toolbar__actions">
          <button
            type="button"
            className={`skills-mode-btn ${viewMode === 'scattered' ? 'is-active' : ''}`}
            onClick={handleScatter}
          >
            Scatter Logos
          </button>
          <button
            type="button"
            className={`skills-mode-btn ${viewMode === 'sorted' && !openBoxId ? 'is-active' : ''}`}
            onClick={() => {
              setOpenBoxId(null)
              setSelectedToolId(null)
              handleSort()
            }}
          >
            Sort into Boxes
          </button>
        </div>
      </div>

      <LayoutGroup id="skills-playground">
        <div className="skills-arena">
          {viewMode === 'scattered' && (
            <button
              type="button"
              className="skills-scatter-stage"
              onClick={handleSort}
              aria-label="Click to sort toolkit into domain boxes"
            >
              <div className="skills-scatter-canvas" aria-label="Scattered technical tools">
                {skillTools.map((tool) => (
                  <motion.span
                    key={tool.id}
                    layoutId={`skill-chip-${tool.id}`}
                    className="skill-chip skill-chip--floating"
                    style={{
                      left: `${tool.scatter.left}%`,
                      top: `${tool.scatter.top}%`,
                      '--chip-accent': tool.accent,
                    }}
                    initial={{ rotate: tool.scatter.rotate, opacity: 0.85 }}
                    animate={{
                      opacity: 1,
                      y: [0, -6, 0],
                      rotate: [
                        tool.scatter.rotate,
                        tool.scatter.rotate + 1.5,
                        tool.scatter.rotate,
                      ],
                    }}
                    transition={{
                      layout: { type: 'spring', stiffness: 260, damping: 24 },
                      y: {
                        duration: 3.4,
                        repeat: Infinity,
                        delay: tool.scatter.delay,
                        ease: 'easeInOut',
                      },
                      rotate: {
                        duration: 4.2,
                        repeat: Infinity,
                        delay: tool.scatter.delay,
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    <span className="skill-chip__icon">
                      <SkillLogo id={tool.id} color={tool.accent} />
                    </span>
                    <span className="skill-chip__name">{tool.name}</span>
                  </motion.span>
                ))}
              </div>

              <div className="skills-scatter-cta">
                <span>Click anywhere to sort into boxes</span>
                <ArrowRight />
              </div>
            </button>
          )}

          {viewMode === 'sorted' && !openBoxId && (
            <div className="services__grid skills-boxes-grid">
              {skillBoxes.map((box, index) => {
                const boxTools = toolsByBox[box.id] || []
                return (
                  <motion.div
                    key={box.id}
                    layout
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="service-card skill-box-card"
                    style={{ '--box-accent': box.accent }}
                    onClick={() => handleOpenBox(box.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleOpenBox(box.id)
                      }
                    }}
                  >
                    <div className="service-card__top">
                      <div className="service-card__icon">{boxIcons[box.id]}</div>
                      <div className="skill-box-card__meta">
                        <span className="service-card__badge">{box.badge}</span>
                        <span className="skill-box-card__count">{boxTools.length} tools</span>
                      </div>
                    </div>

                    <h3 className="service-card__title">{box.title}</h3>
                    <p className="service-card__desc">{box.description}</p>

                    <div className="skill-box-chips">
                      {boxTools.map((tool) => (
                        <motion.button
                          key={tool.id}
                          type="button"
                          layoutId={`skill-chip-${tool.id}`}
                          className="skill-chip skill-chip--sorted"
                          style={{ '--chip-accent': tool.accent }}
                          transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectTool(tool)
                          }}
                        >
                          <span className="skill-chip__icon">
                            <SkillLogo id={tool.id} color={tool.accent} />
                          </span>
                          <span className="skill-chip__name">{tool.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="skill-box-card__foot">
                      <span>Open box to inspect tools</span>
                      <ArrowRight />
                    </div>

                    <div className="service-card__glow" />
                  </motion.div>
                )
              })}
            </div>
          )}

          <AnimatePresence mode="wait">
            {viewMode === 'sorted' && openBoxId && activeBox && (
              <motion.div
                key={activeBox.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="box-explorer"
              >
                <div className="box-explorer__header">
                  <button
                    type="button"
                    className="box-back-btn"
                    onClick={() => {
                      setOpenBoxId(null)
                      setSelectedToolId(null)
                    }}
                  >
                    <span>&larr; All 4 Boxes</span>
                  </button>

                  <div className="box-tabs" role="tablist" aria-label="Skill boxes">
                    {skillBoxes.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        role="tab"
                        aria-selected={b.id === openBoxId}
                        className={`box-tab ${b.id === openBoxId ? 'is-active' : ''}`}
                        onClick={() => handleOpenBox(b.id)}
                      >
                        <span className="box-tab__icon">{boxIcons[b.id]}</span>
                        <span>{b.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="box-explorer__grid">
                  <div className="box-logos-panel">
                    <div className="box-logos-panel__head">
                      <div>
                        <span className="box-logos-panel__badge">{activeBox.badge}</span>
                        <h3>{activeBox.title}</h3>
                      </div>
                      <span className="box-logos-panel__sub">
                        Click any logo to see how I used it
                      </span>
                    </div>

                    <div className="box-logos-grid">
                      {activeBoxTools.map((tool) => {
                        const isSelected = tool.id === selectedToolId
                        return (
                          <motion.button
                            key={tool.id}
                            type="button"
                            layoutId={`skill-chip-${tool.id}`}
                            className={`logo-tile ${isSelected ? 'is-selected' : ''}`}
                            style={{ '--chip-accent': tool.accent }}
                            onClick={() => setSelectedToolId(tool.id)}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="logo-tile__emblem">
                              <SkillLogo id={tool.id} color={tool.accent} />
                            </span>
                            <span className="logo-tile__name">{tool.name}</span>
                            <span className="logo-tile__cta">
                              {isSelected ? 'Viewing Usage' : 'View Usage'}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedTool ? (
                      <motion.div
                        key={selectedTool.id}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.22 }}
                        className="journey-panel"
                        style={{ '--chip-accent': selectedTool.accent }}
                      >
                        <div className="journey-panel__top">
                          <div className="journey-panel__id">
                            <span className="journey-panel__logo">
                              <SkillLogo id={selectedTool.id} color={selectedTool.accent} />
                            </span>
                            <div>
                              <span className="journey-panel__kicker">How I Used This in My Journey</span>
                              <h4>{selectedTool.name}</h4>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="journey-panel__close"
                            aria-label="Clear tool selection"
                            onClick={() => setSelectedToolId(null)}
                          >
                            <Close />
                          </button>
                        </div>

                        <ul className="journey-panel__points">
                          {selectedTool.journey.map((point) => (
                            <li key={point}>
                              <span className="journey-check"><CheckIcon /></span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="journey-panel__nav">
                          <button
                            type="button"
                            className="journey-nav-btn"
                            onClick={() => handleCycleTool(-1)}
                          >
                            &larr; Previous Tool
                          </button>
                          <button
                            type="button"
                            className="journey-nav-btn"
                            onClick={() => handleCycleTool(1)}
                          >
                            Next Tool &rarr;
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-journey"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="journey-panel journey-panel--empty"
                      >
                        <SparklesIcon />
                        <h4>Select a Logo Inside {activeBox.title}</h4>
                        <p>
                          Click any tool emblem on the left to view 3–4 focused points on how I
                          applied it across projects, internships, and client portals.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </section>
  )
}
