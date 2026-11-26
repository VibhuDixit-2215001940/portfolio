import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import QRCode from 'qrcode'
import './TreeQRCode.css'

const SWATCHES = [
  { name: 'Spring Pink', hex: '#fca5bb', pink: '#f89ab2', white: '#fff5f7', trunk: '#42281d', bg: '#faeff1' },
  { name: 'Lavender', hex: '#b39ddb', pink: '#b39ddb', white: '#f3e5f5', trunk: '#311b42', bg: '#f5eff8' },
  { name: 'Crimson', hex: '#ef5350', pink: '#ef5350', white: '#ffebee', trunk: '#3e1a1a', bg: '#fbf0f0' },
  { name: 'Amber Gold', hex: '#ffca28', pink: '#ffb300', white: '#fff8e1', trunk: '#3e2723', bg: '#fbf7ee' },
  { name: 'Sky Breeze', hex: '#42a5f5', pink: '#64b5f6', white: '#e3f2fd', trunk: '#1a2733', bg: '#eef5fb' },
  { name: 'Pure White', hex: '#ffffff', pink: '#e0e0e0', white: '#ffffff', trunk: '#263238', bg: '#f5f5f5' },
]

export default function TreeQRCode() {
  const mountRef = useRef(null)
  const [isTopView, setIsTopView] = useState(false)
  const [activeSwatch, setActiveSwatch] = useState(SWATCHES[0])
  const [breezeOn, setBreezeOn] = useState(true)
  const [bloomOn, setBloomOn] = useState(true)
  const [activeTab, setActiveTab] = useState('Spring')

  const linkedInUrl = 'https://www.linkedin.com/in/vibhu-dixit-b42a11251/'

  const sceneRefs = useRef({
    camera: null,
    renderer: null,
    scene: null,
    treeGroup: null,
    canopyMeshes: [],
    darkMat: null,
    fallenMesh: null,
    petalsSystem: null,
    petalVelocities: [],
    targetCamPos: new THREE.Vector3(15, 17, 15),
    targetLook: new THREE.Vector3(0, 2.2, 0),
    isTop: false,
    breeze: true,
  })

  const calcTopDistance = () => {
    const container = mountRef.current
    if (!container) return 30
    const w = container.clientWidth
    const h = container.clientHeight || 540
    const aspect = w / h
    // Platform width is ~13.5. Ensure full platform + quiet zone fits both horizontally & vertically
    const minSpan = Math.min(aspect, 1.0)
    return Math.max(28, 20.5 / (0.65 * minSpan))
  }

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight || 540

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(activeSwatch.bg)
    sceneRefs.current.scene = scene

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000)
    camera.position.set(15, 17, 15)
    camera.lookAt(0, 2.2, 0)
    sceneRefs.current.camera = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)
    sceneRefs.current.renderer = renderer

    // 2. Warm Studio Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f6, 1.8)
    scene.add(ambientLight)

    const mainSun = new THREE.DirectionalLight(0xffffff, 2.4)
    mainSun.position.set(14, 25, 16)
    mainSun.castShadow = true
    mainSun.shadow.mapSize.width = 1024
    mainSun.shadow.mapSize.height = 1024
    mainSun.shadow.camera.near = 0.5
    mainSun.shadow.camera.far = 60
    mainSun.shadow.camera.left = -10
    mainSun.shadow.camera.right = 10
    mainSun.shadow.camera.top = 10
    mainSun.shadow.camera.bottom = -10
    mainSun.shadow.bias = -0.0008
    scene.add(mainSun)

    const fillLight = new THREE.DirectionalLight(0xffdbe3, 0.9)
    fillLight.position.set(-15, 12, -12)
    scene.add(fillLight)

    // 3. Ground QR Platform with Generous Quiet Zone
    const qr = QRCode.create(linkedInUrl, { errorCorrectionLevel: 'H' })
    const size = qr.modules.size
    const platformGroup = new THREE.Group()

    const tileSize = 0.33
    const basePadding = 3 // Extra border margin so QR code is never cut off
    const totalTiles = size + basePadding * 2
    const totalWidth = totalTiles * tileSize

    // Main bevel slab
    const slabGeo = new THREE.BoxGeometry(totalWidth + 0.6, 0.5, totalWidth + 0.6)
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0xf5eded,
      roughness: 0.8,
    })
    const slab = new THREE.Mesh(slabGeo, slabMat)
    slab.position.y = -0.26
    slab.receiveShadow = true
    platformGroup.add(slab)

    // Instanced QR Tiles
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
    })
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0xa89a9c, // Soft stone grey-rose in 3D mode
      roughness: 0.5,
    })
    sceneRefs.current.darkMat = darkMat

    const tileGeo = new THREE.BoxGeometry(tileSize * 0.95, 0.08, tileSize * 0.95)

    let darkCount = 0
    let lightCount = 0
    for (let r = 0; r < totalTiles; r++) {
      for (let c = 0; c < totalTiles; c++) {
        const qrR = r - basePadding
        const qrC = c - basePadding
        const isDark = qrR >= 0 && qrR < size && qrC >= 0 && qrC < size ? qr.modules.get(qrC, qrR) : false
        if (isDark) darkCount++
        else lightCount++
      }
    }

    const darkMesh = new THREE.InstancedMesh(tileGeo, darkMat, darkCount)
    const lightMesh = new THREE.InstancedMesh(tileGeo, lightMat, lightCount)
    darkMesh.receiveShadow = true
    lightMesh.receiveShadow = true

    const dummy = new THREE.Object3D()
    let dIdx = 0
    let lIdx = 0
    const offset = (totalTiles * tileSize) / 2 - tileSize / 2

    for (let r = 0; r < totalTiles; r++) {
      for (let c = 0; c < totalTiles; c++) {
        const qrR = r - basePadding
        const qrC = c - basePadding
        const isDark = qrR >= 0 && qrR < size && qrC >= 0 && qrC < size ? qr.modules.get(qrC, qrR) : false

        dummy.position.set(c * tileSize - offset, isDark ? 0.04 : 0.01, r * tileSize - offset)
        dummy.updateMatrix()

        if (isDark) darkMesh.setMatrixAt(dIdx++, dummy.matrix)
        else lightMesh.setMatrixAt(lIdx++, dummy.matrix)
      }
    }

    platformGroup.add(darkMesh)
    platformGroup.add(lightMesh)
    scene.add(platformGroup)

    // 4. Stylized Bonsai Tree
    const treeGroup = new THREE.Group()
    sceneRefs.current.treeGroup = treeGroup

    // Twisted trunk geometry
    const trunkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeSwatch.trunk),
      roughness: 0.75,
      metalness: 0.08,
      flatShading: true,
    })

    // Main curved trunk
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, 0.9, -0.1),
      new THREE.Vector3(-0.35, 1.9, 0.25),
      new THREE.Vector3(0.1, 2.9, 0.1),
    ])
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 20, 0.48, 8, false)
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat)
    trunkMesh.castShadow = true
    trunkMesh.receiveShadow = true
    treeGroup.add(trunkMesh)

    // Left main bough
    const leftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 2.9, 0.1),
      new THREE.Vector3(-0.8, 3.4, 0.5),
      new THREE.Vector3(-1.6, 3.7, 0.6),
    ])
    const leftBranch = new THREE.Mesh(new THREE.TubeGeometry(leftCurve, 12, 0.3, 7, false), trunkMat)
    leftBranch.castShadow = true
    treeGroup.add(leftBranch)

    // Right main bough
    const rightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 2.9, 0.1),
      new THREE.Vector3(0.9, 3.3, -0.4),
      new THREE.Vector3(1.7, 3.6, -0.5),
    ])
    const rightBranch = new THREE.Mesh(new THREE.TubeGeometry(rightCurve, 12, 0.28, 7, false), trunkMat)
    rightBranch.castShadow = true
    treeGroup.add(rightBranch)

    // Flared Root Feet
    const roots = [
      [0.7, 0.5],
      [-0.65, 0.6],
      [0.2, -0.8],
      [-0.7, -0.4],
      [0.55, -0.45],
    ]
    roots.forEach(([rx, rz]) => {
      const rCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(rx * 0.55, 0.2, rz * 0.55),
        new THREE.Vector3(rx, 0.02, rz),
      ])
      const rMesh = new THREE.Mesh(new THREE.TubeGeometry(rCurve, 8, 0.22, 6, false), trunkMat)
      rMesh.castShadow = true
      treeGroup.add(rMesh)
    })

    // 5. Faceted Dappled Cherry Blossom Canopy
    const canopyMeshes = []
    const pinkCol = new THREE.Color(activeSwatch.pink)
    const whiteCol = new THREE.Color(activeSwatch.white)

    const createFacetedCluster = (radius, pos) => {
      const geo = new THREE.IcosahedronGeometry(radius, 1)
      const nonIndexed = geo.toNonIndexed ? geo.toNonIndexed() : geo
      const count = nonIndexed.attributes.position.count
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count; i += 3) {
        const isWhite = Math.random() < 0.35
        const c = isWhite ? whiteCol : pinkCol

        const jitter = (Math.random() - 0.5) * 0.08
        const r = Math.min(Math.max(c.r + jitter, 0), 1)
        const g = Math.min(Math.max(c.g + jitter, 0), 1)
        const b = Math.min(Math.max(c.b + jitter, 0), 1)

        for (let j = 0; j < 3; j++) {
          colors[(i + j) * 3] = r
          colors[(i + j) * 3 + 1] = g
          colors[(i + j) * 3 + 2] = b
        }
      }

      nonIndexed.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.65,
        flatShading: true,
        transparent: true,
        opacity: 0.98,
      })

      const mesh = new THREE.Mesh(nonIndexed, mat)
      mesh.position.set(pos[0], pos[1], pos[2])
      mesh.castShadow = true
      mesh.receiveShadow = true
      canopyMeshes.push(mesh)
      treeGroup.add(mesh)
    }

    const clusters = [
      [1.65, [0, 4.4, 0]],
      [1.35, [-1.2, 4.1, 0.8]],
      [1.4, [1.3, 4.2, -0.7]],
      [1.2, [0.8, 4.5, 0.9]],
      [1.25, [-0.9, 4.6, -0.9]],
      [1.4, [0, 5.2, 0.1]],
      [1.0, [-1.9, 3.8, 0.4]],
      [1.05, [1.8, 3.9, -0.5]],
      [0.9, [0.3, 4.9, 1.4]],
      [0.95, [-0.6, 5.0, -1.3]],
      [0.85, [1.5, 4.4, 0.8]],
      [0.8, [-1.5, 4.5, -0.6]],
      [0.75, [0, 3.7, 1.5]],
      [0.75, [-0.4, 3.6, -1.4]],
    ]

    clusters.forEach(([rad, pos]) => createFacetedCluster(rad, pos))
    sceneRefs.current.canopyMeshes = canopyMeshes

    // 6. Flowering Pink Bushes on Floor Platform
    const createBush = (bx, bz, count) => {
      const bushGroup = new THREE.Group()
      bushGroup.position.set(bx, 0.05, bz)

      for (let i = 0; i < count; i++) {
        const h = Math.random() * 0.45 + 0.35
        const sprigGeo = new THREE.ConeGeometry(0.12, h, 5)
        const sprigMat = new THREE.MeshStandardMaterial({
          color: Math.random() < 0.7 ? pinkCol : whiteCol,
          flatShading: true,
          roughness: 0.6,
        })
        const sprig = new THREE.Mesh(sprigGeo, sprigMat)
        sprig.position.set((Math.random() - 0.5) * 0.65, h / 2, (Math.random() - 0.5) * 0.65)
        sprig.rotation.x = (Math.random() - 0.5) * 0.3
        sprig.rotation.z = (Math.random() - 0.5) * 0.3
        sprig.castShadow = true
        bushGroup.add(sprig)
      }
      treeGroup.add(bushGroup)
    }

    createBush(-2.2, 2.2, 14)
    createBush(-2.4, -2.1, 12)
    createBush(2.2, -1.8, 12)

    // 7. Fallen Petals on Ground
    const fallenGeo = new THREE.CircleGeometry(0.08, 5)
    fallenGeo.rotateX(-Math.PI / 2)
    const fallenMat = new THREE.MeshStandardMaterial({
      color: pinkCol,
      roughness: 0.7,
      side: THREE.DoubleSide,
    })
    const fallenCount = 45
    const fallenMesh = new THREE.InstancedMesh(fallenGeo, fallenMat, fallenCount)
    const fDummy = new THREE.Object3D()

    for (let i = 0; i < fallenCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * 3.8 + 0.4
      fDummy.position.set(Math.cos(angle) * dist, 0.03, Math.sin(angle) * dist)
      fDummy.rotation.y = Math.random() * Math.PI
      fDummy.scale.setScalar(Math.random() * 0.6 + 0.7)
      fDummy.updateMatrix()
      fallenMesh.setMatrixAt(i, fDummy.matrix)
    }
    platformGroup.add(fallenMesh)
    sceneRefs.current.fallenMesh = fallenMesh

    scene.add(treeGroup)

    // 8. Wind Petals Particle System
    const petalCount = 70
    const petalGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(petalCount * 3)
    const pVel = []

    for (let i = 0; i < petalCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 1] = Math.random() * 5 + 0.5
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10
      pVel.push({
        x: Math.random() * 0.04 + 0.015,
        y: -(Math.random() * 0.015 + 0.012),
        z: (Math.random() - 0.5) * 0.02,
        sway: Math.random() * Math.PI * 2,
      })
    }

    petalGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const petalMat = new THREE.PointsMaterial({
      color: pinkCol,
      size: 0.22,
      transparent: true,
      opacity: 0.9,
    })
    const petalsSystem = new THREE.Points(petalGeo, petalMat)
    scene.add(petalsSystem)
    sceneRefs.current.petalsSystem = petalsSystem
    sceneRefs.current.petalVelocities = pVel

    // 9. Animation Loop
    let frameId
    let time = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      time += 0.02

      camera.position.lerp(sceneRefs.current.targetCamPos, 0.075)
      camera.lookAt(sceneRefs.current.targetLook)

      // Idle tree sway only in 3D mode
      if (!sceneRefs.current.isTop && treeGroup && treeGroup.visible) {
        treeGroup.rotation.y = Math.sin(time * 0.4) * 0.035
      }

      // Breeze simulation
      if (sceneRefs.current.breeze && petalsSystem && petalsSystem.visible) {
        const positions = petalGeo.attributes.position.array
        for (let i = 0; i < petalCount; i++) {
          const v = pVel[i]
          v.sway += 0.03
          positions[i * 3] += v.x + Math.sin(v.sway) * 0.01
          positions[i * 3 + 1] += v.y
          positions[i * 3 + 2] += v.z

          if (positions[i * 3 + 1] < 0.05 || positions[i * 3] > 6) {
            positions[i * 3 + 1] = 5.2
            positions[i * 3] = (Math.random() - 0.7) * 7
            positions[i * 3 + 2] = (Math.random() - 0.5) * 7
          }
        }
        petalGeo.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    animate()

    // 10. Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight || 540
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)

      // Update distance if in top-scan view so it never clips
      if (sceneRefs.current.isTop) {
        const topDist = calcTopDistance()
        sceneRefs.current.targetCamPos.set(0, topDist, 0.001)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [linkedInUrl, activeSwatch])

  // Camera Toggle: 3D Isometric <-> Top-Down Scanning View (100% Full & Unclipped)
  const toggleView = () => {
    const nextTop = !isTopView
    setIsTopView(nextTop)
    sceneRefs.current.isTop = nextTop

    const topDist = calcTopDistance()

    if (nextTop) {
      // 1. Move camera high enough so 100% of the platform + borders fit with margin
      sceneRefs.current.targetCamPos = new THREE.Vector3(0, topDist, 0.001)
      sceneRefs.current.targetLook = new THREE.Vector3(0, 0, 0)

      // 2. Hide the tree, bushes, and loose petals so center is completely unobstructed
      if (sceneRefs.current.treeGroup) {
        sceneRefs.current.treeGroup.visible = false
      }
      if (sceneRefs.current.fallenMesh) {
        sceneRefs.current.fallenMesh.visible = false
      }
      if (sceneRefs.current.petalsSystem) {
        sceneRefs.current.petalsSystem.visible = false
      }

      // 3. Switch to high-contrast dark tiles for instant smartphone camera scanning
      if (sceneRefs.current.darkMat) {
        sceneRefs.current.darkMat.color.set(0x211216)
      }
    } else {
      // Return to 3D Isometric View
      sceneRefs.current.targetCamPos = new THREE.Vector3(15, 17, 15)
      sceneRefs.current.targetLook = new THREE.Vector3(0, 2.2, 0)

      // Restore tree and foliage
      if (sceneRefs.current.treeGroup) {
        sceneRefs.current.treeGroup.visible = true
      }
      if (sceneRefs.current.fallenMesh) {
        sceneRefs.current.fallenMesh.visible = true
      }
      if (sceneRefs.current.petalsSystem) {
        sceneRefs.current.petalsSystem.visible = true
      }

      // Restore soft stone tile color
      if (sceneRefs.current.darkMat) {
        sceneRefs.current.darkMat.color.set(0xa89a9c)
      }
    }
  }

  const handleSwatchSelect = (swatch) => {
    setActiveSwatch(swatch)
  }

  return (
    <section className="tree-qr-section" id="connect">
      <div className="section-head">
        <span className="section-tag">
          🌸 Interactive 3D Bonsai QR
        </span>
        <h2 className="section-title">
          Connect with <em>Vibhu Dixit</em> <br />
          on LinkedIn
        </h2>
        <p className="section-sub">
          A stylized 3D cherry blossom garden built in Three.js where the ground tiles form
          a real scannable QR code. Tap the tree to switch between 3D view and top-down scan mode!
        </p>
      </div>

      <div className="cherry-template-card">
        {/* 3D Canvas */}
        <div className="cherry-canvas-wrap" ref={mountRef} onClick={toggleView}>
          <button
            type="button"
            className={`cherry-tap-hint ${isTopView ? 'cherry-tap-hint--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleView()
            }}
          >
            {isTopView ? '🔍 Scanning View Active (Tap for 3D Tree)' : '👆 Tap the tree to see QR code'}
          </button>
        </div>

        {/* Preset Controls & Color Swatches matching template */}
        <div className="cherry-modifiers-pill">
          <div className="cherry-tabs">
            <button
              type="button"
              className={`cherry-tab ${activeTab === 'Spring' ? 'cherry-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('Spring')
                handleSwatchSelect(SWATCHES[0])
              }}
            >
              🌸 Spring
            </button>
            <button
              type="button"
              className={`cherry-tab ${bloomOn ? 'cherry-tab--active' : ''}`}
              onClick={() => {
                const next = !bloomOn
                setBloomOn(next)
                sceneRefs.current.canopyMeshes.forEach((m) => {
                  m.visible = next
                })
              }}
            >
              🌸 Bloom
            </button>
            <button
              type="button"
              className={`cherry-tab ${breezeOn ? 'cherry-tab--active' : ''}`}
              onClick={() => {
                const next = !breezeOn
                setBreezeOn(next)
                sceneRefs.current.breeze = next
              }}
            >
              🍃 Breeze
            </button>
            <button
              type="button"
              className={`cherry-tab ${isTopView ? 'cherry-tab--active' : ''}`}
              onClick={toggleView}
              title="Toggle 3D / Top View"
            >
              {isTopView ? '📐 Top Scan' : '🌐 3D Tree'}
            </button>
          </div>

          <div className="cherry-swatches">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                className={`cherry-swatch-dot ${activeSwatch.name === swatch.name ? 'cherry-swatch-dot--active' : ''}`}
                style={{ backgroundColor: swatch.hex }}
                onClick={() => handleSwatchSelect(swatch)}
                title={swatch.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
