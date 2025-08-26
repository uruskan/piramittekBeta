"use client"

import { useEffect, useRef, useState } from "react"

export default function ProcessOrbit({
  items = [],
  radius = 320,
  speed = 0.004,
  tilt = 0, // 2D ring (like a wall clock)
  cardWidth = 320, // px
  gap = 24, // px spacing target for circumference
  showRings = true,
}) {
  const [active, setActive] = useState(0)
  const baseAngleRef = useRef(0)
  const rafRef = useRef(0)
  const cardRefs = useRef([])


  // Ensure refs length matches items
  if (cardRefs.current.length !== items.length) {
    cardRefs.current = Array(items.length)
  }

  // Imperative animation for 60fps smoothness without re-rendering each frame
  useEffect(() => {
    const tick = () => {
      const N = Math.max(1, items.length)
      const minRadius = (N * (cardWidth + gap)) / (2 * Math.PI)
      const R = Math.max(radius, minRadius)
      for (let i = 0; i < items.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const step = (i * (Math.PI * 2)) / N
        const a = baseAngleRef.current + step
        const x = Math.cos(a) * R
        const y = Math.sin(a) * R
        // Depth illusion: front (bottom) slightly larger and above others
        const depth = (Math.sin(a) + 1) / 2 // 0..1, 1 at bottom
        const scale = 0.92 + depth * 0.12
        const zIndex = 1000 + Math.round(depth * 1000)
        // Local tilt for object-3D feel (keep upright: no rotateZ to avoid upside-down text)
        const tiltX = -10 // slight toward camera
        const tiltY = 6
        el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotateX(${tilt}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`
        el.style.opacity = "1"
        el.style.zIndex = String(zIndex)
      }
      baseAngleRef.current += speed
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [items, radius, speed, tilt, cardWidth, gap])

  const N = Math.max(1, items.length)
  const minRadius = (N * (cardWidth + gap)) / (2 * Math.PI)
  const effectiveRadius = Math.max(radius, minRadius)
  const ringSize = (effectiveRadius + 80) * 2 // decorative ring diameter

  return (
    <div className="relative py-10" style={{ perspective: 1200 }}>
      <div className="relative mx-auto" style={{ transformStyle: "preserve-3d", width: `${ringSize}px`, height: `${ringSize}px` }}>
        {showRings && (
          <>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: `${ringSize}px`,
                height: `${ringSize}px`,
                background:
                  "radial-gradient(closest-side, rgba(6,182,212,0.08), transparent 60%), radial-gradient(closest-side, rgba(139,92,246,0.08), transparent 65%)",
                boxShadow: "0 0 120px rgba(59,130,246,0.12) inset",
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 pointer-events-none animate-spin-slow"
                 style={{ width: `${ringSize}px`, height: `${ringSize}px` }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/20 pointer-events-none animate-spin-slow-reverse"
                 style={{ width: `${ringSize - 160}px`, height: `${ringSize - 160}px` }} />
            {items.map((_, i) => {
              const N = Math.max(1, items.length)
              const a = (i + 0.5) * ((Math.PI * 2) / N)
              const x = Math.cos(a) * (effectiveRadius - 40)
              const y = Math.sin(a) * (effectiveRadius - 40)
              return (
                <div key={`dot-${i}`} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}>
                  <span className="block w-2.5 h-2.5 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.9), rgba(6,182,212,0.2))",
                      boxShadow: "0 0 12px rgba(6,182,212,0.6)",
                    }}
                  />
                </div>
              )
            })}
          </>
        )}

        {items.map((it, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            role="button"
            tabIndex={0}
            aria-label={it?.title}
            className="absolute left-1/2 top-1/2 text-left p-0 border bg-black/65 backdrop-blur-xl transition-colors duration-300 [backface-visibility:hidden]"
            style={{
              width: `${cardWidth}px`,
              marginLeft: `-${cardWidth / 2}px`,
              marginTop: "-160px",
              borderColor: "rgba(255,255,255,0.18)",
              transformStyle: "preserve-3d",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
            onFocus={() => setActive(index)}
          >
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              {/* top bevel */}
              <div className="absolute left-0 right-6 top-0 h-6" style={{ transform: "translateZ(1px)", background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0))" }} />
              {/* accent notch */}
              <div className="absolute right-0 top-0 w-6 h-6" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.5), rgba(139,92,246,0.4))", transform: "translateZ(1px)" }} />

              {/* front face */}
              <div className="relative p-6" style={{ transform: "translateZ(2px)" }}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wider text-cyan-300 bg-cyan-400/10 border border-cyan-400/40">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-white font-extrabold text-base truncate">{it?.title}</span>
                </div>
                {it?.bullets ? (
                  <ul className="text-white/85 text-sm leading-relaxed grid grid-cols-1 gap-1">
                    {it.bullets.slice(0,3).map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2">
                        <svg width="10" height="10" className="mt-1" viewBox="0 0 10 10">
                          <circle cx="5" cy="5" r="3" fill="rgba(6,182,212,0.85)" />
                        </svg>
                        <span className="line-clamp-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{it?.desc}</p>
                )}
              </div>

              {/* techno ornament */}
              <svg className="absolute bottom-3 right-3 opacity-70" width="72" height="28" viewBox="0 0 72 28" style={{ transform: "translateZ(2px)" }}>
                <defs>
                  <linearGradient id={`g-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(6,182,212,0.8)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.8)" />
                  </linearGradient>
                </defs>
                <path d="M2 14 L18 14 L24 6 L40 22 L54 8 L70 8" fill="none" stroke={`url(#g-${index})`} strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* inner glow gradient */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 120% at 100% 0%, rgba(139,92,246,0.12), transparent), radial-gradient(120% 120% at 0% 100%, rgba(6,182,212,0.12), transparent)" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-white/85 text-sm min-h-[1.5em]">
        {items[active]?.desc}
      </div>
    </div>
  )
}
