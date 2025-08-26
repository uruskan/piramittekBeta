"use client"

import { useEffect, useRef, useState } from "react"

// Horizontal 3D card rail with subtle motion and stylish connectors
export default function ProcessRail({
  items = [],
  height = 520,
  speed = 0.0016, // calm but clearly alive
  cardWidth = 380,
  gap = 32,
  widthFactor = 0.78, // use only a portion of viewport width
  spacingPattern = [1.0, 2.4, 3.2, 1.6, 2.8, 2.0], // stronger horizontal spread
}) {
  const wrapRef = useRef(null)
  const cardRefs = useRef([])
  const bgRef = useRef(null)
  const svgRef = useRef(null)
  const gradRef = useRef(null)
  const stop1Ref = useRef(null)
  const stop2Ref = useRef(null)
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const [dim, setDim] = useState({ w: 1200, h: height })
  const starfieldRef = useRef([])

  // ensure refs sizing
  if (cardRefs.current.length !== items.length) {
    cardRefs.current = Array(items.length)
  }

  useEffect(() => {
    const onResize = () => {
      const w = wrapRef.current?.clientWidth || 1200
      setDim({ w, h: height })
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [height])

  // animate subtle drift and redraw links (compute positions, no layout reads)
  useEffect(() => {
    const pathEls = []
    const dotEls = []
    const trailEls = []
    const tick = () => {
      tRef.current += speed
      const W = Math.floor(dim.w * widthFactor)
      const Woffset = Math.floor((dim.w - W) / 2)
      // compress to fit viewport if needed
      const baseGaps = Math.max(0, items.length - 1)
      const scale = Math.min(1, (W - baseGaps * gap) / (items.length * cardWidth))
      const cw = Math.max(260, Math.floor(cardWidth * scale))
      // compute proportional gap widths using spacingPattern
      const m = Array.from({ length: baseGaps }, (_, i) => spacingPattern[i % spacingPattern.length])
      const sumM = m.reduce((a, b) => a + b, 0) || 1
      const freeSpace = Math.max(0, W - items.length * cw)
      const gapEff = freeSpace / sumM
      const startXLocal = Math.floor((W - (items.length * cw + gapEff * sumM)) / 2)
      const startX = Woffset + startXLocal
      const baseY = Math.floor(height / 2)

      const centers = []
      // stepped pattern: low, high, mid, high, mid-low, mid (repeats)
      // matches: 1st low (lower on screen => larger +y), 2nd high (-y), 3rd mid (~0)
      const stepPattern = [60, -80, 0, 80, -40, 20]
      for (let i = 0; i < items.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        // cumulative x with proportional gaps
        let x = startX + i * cw
        if (i > 0) {
          const sumPrev = m.slice(0, i).reduce((a, b) => a + b, 0)
          x += gapEff * sumPrev
        }
        const stepOffset = stepPattern[i % stepPattern.length]
        // subtle, bubble-like drift (very small amplitudes in all directions)
        const dy = stepOffset + Math.sin(tRef.current * 2.0 + i * 0.9) * 4
        const dx = Math.cos(tRef.current * 1.6 + i * 1.05) * 3
        const rx = Math.sin(tRef.current * 0.9 + i * 0.7) * 1.2
        const ry = Math.cos(tRef.current * 0.8 + i * 0.6) * 1.2
        const sc = 1 + Math.sin(tRef.current * 1.2 + i * 0.8) * 0.01
        el.style.transform = `translate3d(${Math.round(x + dx)}px, ${Math.round(baseY + dy)}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`
        el.style.zIndex = String(1000 + i)
        el.style.width = `${cw}px`
        // approximate link anchor near card mid-height without layout reads
        centers[i] = { cx: x + cw / 2 + dx, cy: baseY + dy + 110 }
      }

      // update connectors once created
      updateLinks(centers)
      // update starry background
      updateStars()
      rafRef.current = requestAnimationFrame(tick)
    }
    const updateLinks = (centers) => {
      const svg = svgRef.current
      if (!svg) return
      const W = dim.w
      const H = height
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`)
      svg.setAttribute("width", String(W))
      svg.setAttribute("height", String(H))
      for (let i = 0; i < items.length - 1; i++) {
        const A = centers[i]
        const B = centers[i + 1]
        if (!A || !B) continue
        const dx = B.cx - A.cx
        const dy = B.cy - A.cy
        const cx = A.cx + dx * 0.5
        const cy = A.cy + dy * 0.25
        // smooth forward motion along the link (shooting star)
        const t = (tRef.current * 0.25 + i * 0.1) % 1
        const px = (1 - t) * (1 - t) * A.cx + 2 * (1 - t) * t * cx + t * t * B.cx
        const py = (1 - t) * (1 - t) * A.cy + 2 * (1 - t) * t * cy + t * t * B.cy
        // ensure elements exist
        if (!pathEls[i]) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path.setAttribute("fill", "none")
          path.setAttribute("stroke", "url(#grad)")
          path.setAttribute("stroke-width", "2")
          path.setAttribute("stroke-linecap", "round")
          path.setAttribute("stroke-dasharray", "10 8")
          svg.appendChild(path)
          pathEls[i] = path
          const trail = document.createElementNS("http://www.w3.org/2000/svg", "path")
          trail.setAttribute("fill", "none")
          trail.setAttribute("stroke", "rgba(6,182,212,0.9)")
          trail.setAttribute("stroke-width", "3")
          trail.setAttribute("stroke-linecap", "round")
          svg.appendChild(trail)
          trailEls[i] = trail
          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          dot.setAttribute("r", "3")
          dot.setAttribute("fill", "rgba(6,182,212,0.85)")
          svg.appendChild(dot)
          dotEls[i] = dot
        }
        pathEls[i].setAttribute("d", `M ${A.cx} ${A.cy} Q ${cx} ${cy} ${B.cx} ${B.cy}`)
        pathEls[i].setAttribute("stroke-dashoffset", String(-((tRef.current * 90 + i * 18) % 18)))
        // short luminous trail behind the moving star
        const prevT = Math.max(0, t - 0.08)
        const ppx = (1 - prevT) * (1 - prevT) * A.cx + 2 * (1 - prevT) * prevT * cx + prevT * prevT * B.cx
        const ppy = (1 - prevT) * (1 - prevT) * A.cy + 2 * (1 - prevT) * prevT * cy + prevT * prevT * B.cy
        trailEls[i].setAttribute("d", `M ${ppx} ${ppy} L ${px} ${py}`)
        dotEls[i].setAttribute("cx", String(px))
        dotEls[i].setAttribute("cy", String(py))
        dotEls[i].setAttribute("r", String(3.5))
      }

      // animate gradient movement across links
      if (gradRef.current) {
        const ang = (tRef.current * 80) % 360
        gradRef.current.setAttribute("gradientTransform", `rotate(${ang})`)
      }
      // animate gradient colors (subtle hue shift)
      if (stop1Ref.current && stop2Ref.current) {
        const hue = (tRef.current * 40) % 360
        stop1Ref.current.setAttribute("stop-color", `hsl(${(190 + hue) % 360}, 85%, 55%)`)
        stop2Ref.current.setAttribute("stop-color", `hsl(${(300 + hue) % 360}, 85%, 60%)`)
      }
    }

    const updateStars = () => {
      const cnv = bgRef.current
      if (!cnv) return
      const ctx = cnv.getContext("2d")
      cnv.width = dim.w
      cnv.height = height
      if (starfieldRef.current.length === 0) {
        const arr = []
        for (let i = 0; i < 220; i++) {
          arr.push({
            x: Math.random() * cnv.width,
            y: Math.random() * cnv.height,
            r: Math.random() * 1.4 + 0.3,
            p: Math.random() * Math.PI * 2,
          })
        }
        starfieldRef.current = arr
      }
      ctx.clearRect(0, 0, cnv.width, cnv.height)
      for (const s of starfieldRef.current) {
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(tRef.current * 5 + s.p))
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      // occasional background shooting star
      if (Math.random() < 0.016) {
        const sx = Math.random() * cnv.width * 0.5
        const sy = Math.random() * cnv.height * 0.5
        const ex = sx + 120 + Math.random() * 140
        const ey = sy + 40 + Math.random() * 60
        const trail = ctx.createLinearGradient(sx, sy, ex, ey)
        trail.addColorStop(0, "rgba(255,255,255,0)")
        trail.addColorStop(1, "rgba(139,92,246,0.8)")
        ctx.strokeStyle = trail
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [items, dim.w, height, cardWidth, gap, speed, widthFactor])

  // overflow hint removed by design; component scales to fit widthFactor

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height }}>
      {/* starry night background */}
      <canvas ref={bgRef} className="absolute inset-0 pointer-events-none" />
      {/* center accent emblem */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-24 h-24 opacity-80">
          <div className="absolute inset-0 border-2 border-cyan-400/50 rotate-45" />
          <div className="absolute inset-3 border border-purple-400/60 rotate-45 animate-spin-slow" />
          <div className="absolute inset-0 bg-cyan-400/5" />
        </div>
      </div>

      {/* svg defs for gradient + animated connectors */}
      <svg ref={svgRef} className="absolute inset-0 pointer-events-none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox" ref={gradRef}>
            <stop ref={stop1Ref} offset="0%" stopColor="rgba(6,182,212,0.55)" />
            <stop ref={stop2Ref} offset="100%" stopColor="rgba(139,92,246,0.55)" />
          </linearGradient>
        </defs>
      </svg>

      {/* cards */}
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {items.map((it, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute p-0 border bg-black/65 backdrop-blur-xl"
            style={{
              width: `${cardWidth}px`,
              borderColor: "rgba(255,255,255,0.18)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* bevel + notch */}
            <div className="absolute left-0 right-6 top-0 h-6" style={{ transform: "translateZ(1px)", background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0))" }} />
            <div className="absolute right-0 top-0 w-6 h-6" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.5), rgba(139,92,246,0.4))", transform: "translateZ(1px)" }} />

            {/* face */}
            <div className="relative p-6" style={{ transform: "translateZ(2px)" }}>
              <div className="mb-3 flex items-center gap-3">
                <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wider text-cyan-300 bg-cyan-400/10 border border-cyan-400/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white font-extrabold text-base truncate">{it.title}</span>
              </div>
              {it.bullets ? (
                <ul className="text-white/85 text-sm leading-relaxed grid grid-cols-1 gap-1">
                  {it.bullets.slice(0, 3).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <svg width="10" height="10" className="mt-1" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="rgba(6,182,212,0.85)" /></svg>
                      <span className="line-clamp-1">{b}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{it.desc}</p>
              )}
            </div>

            {/* ornament */}
            <svg className="absolute bottom-3 right-3 opacity-70" width="72" height="28" viewBox="0 0 72 28" style={{ transform: "translateZ(2px)" }}>
              <defs>
                <linearGradient id={`g-rail-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(6,182,212,0.8)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.8)" />
                </linearGradient>
              </defs>
              <path d="M2 14 L18 14 L24 6 L40 22 L54 8 L70 8" fill="none" stroke={`url(#g-rail-${i})`} strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* inner glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 120% at 100% 0%, rgba(139,92,246,0.12), transparent), radial-gradient(120% 120% at 0% 100%, rgba(6,182,212,0.12), transparent)" }} />
          </div>
        ))}
      </div>

      {/* no overflow hint; layout scales to fit */}
    </div>
  )
}
