"use client"

import { useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion, AnimatePresence } from "framer-motion"

// THEME (tweak freely)
const THEME = {
  bg: "#05060a",
  ringCyan: "#06b6d4",
  ringPurple: "#8b5cf6",
  coreA: "#22d3ee",
  coreB: "#a78bfa",
  glow: 1.2,
}

// PROCESS CONTENT (short, punchy; adjust copy to brand)
const PROCESS_STEPS = [
  {
    key: "discover",
    title: "Discover",
    bullets: ["Goals & scope", "Risks & deps", "Success metrics"],
  },
  {
    key: "define",
    title: "Define",
    bullets: ["Personas & flows", "Design system", "A11y"],
  },
  {
    key: "design",
    title: "Design",
    bullets: ["Wireframes", "Prototypes", "Interaction model"],
  },
  {
    key: "develop",
    title: "Develop",
    bullets: ["Clean code", "Observability", "Feature flags"],
  },
  {
    key: "deploy",
    title: "Deploy",
    bullets: ["CI/CD & IaC", "Blue/Green", "SLO/SLI"],
  },
  {
    key: "iterate",
    title: "Iterate",
    bullets: ["Measure", "Learn", "Improve"],
  },
]

function PlasmaCore() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.3
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.06
    ref.current.scale.set(s, s, s)
  })
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshStandardMaterial
          color={THEME.coreA}
          emissive={THEME.coreB}
          emissiveIntensity={THEME.glow}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>
      <mesh scale={1.25}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={THEME.coreB} wireframe opacity={0.35} transparent />
      </mesh>
    </group>
  )
}

function NeonRing({ radius = 4, color = THEME.ringCyan, speed = 0.12, reverse = false }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * (reverse ? -speed : speed)
    ref.current.rotation.z = t
  })
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 256]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[radius * 0.74, 0.015, 16, 256]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function StageNode({ angle, radius, index, onHover, onClick }) {
  const ref = useRef()
  const pos = useMemo(() => {
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return [x, y, 0]
  }, [angle, radius])
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = -clock.getElapsedTime() * 0.12
  })
  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(index)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(index)
        }}
      >
        <circleGeometry args={[0.48, 48]} />
        <meshBasicMaterial color={THEME.ringCyan} opacity={0.9} transparent />
      </mesh>
    </group>
  )
}

export default function AweProcessAstrolabe() {
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  const R = 4.25

  return (
    <div className="relative w-full" style={{ height: 560 }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 42 }} gl={{ antialias: true }}>
        <color attach="background" args={[THEME.bg]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 4]} intensity={0.6} />

        <PlasmaCore />
        <NeonRing radius={R} color={THEME.ringCyan} speed={0.08} />
        <NeonRing radius={R * 0.66} color={THEME.ringPurple} speed={0.11} reverse />

        {PROCESS_STEPS.map((s, i) => {
          const a = (i / PROCESS_STEPS.length) * Math.PI * 2
          return (
            <StageNode
              key={s.key}
              angle={a}
              radius={R}
              index={i}
              onHover={setHovered}
              onClick={setActive}
            />
          )
        })}

        {/* Optional postprocessing (Bloom/Vignette/Noise) — add @react-three/postprocessing and re-enable */}

        {/* Remove OrbitControls to avoid drei; scene rotation animates elements instead */}
      </Canvas>

      {/* Hover/Active Glass Panel */}
      <AnimatePresence>
        {(hovered != null || active != null) && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 w-[min(680px,92vw)]"
          >
            <div className="relative border border-cyan-400/30 bg-black/50 backdrop-blur-xl px-6 py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10" />
              <div className="relative">
                {(() => {
                  const idx = active ?? hovered ?? 0
                  const step = PROCESS_STEPS[idx]
                  return (
                    <div className="flex items-start gap-4">
                      <div className="px-2 py-0.5 text-[10px] font-black tracking-widest text-cyan-300 border border-cyan-400/50 bg-cyan-400/10">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-extrabold text-lg mb-1">{step.title}</div>
                        <ul className="text-white/80 text-sm flex flex-wrap gap-x-4 gap-y-1">
                          {step.bullets.map((b, bi) => (
                            <li key={bi} className="before:content-['•'] before:text-cyan-300 before:mr-2">
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
