"use client"

import { useEffect, useRef, useState } from "react"

// A fresh, self-contained development flow showcase
// Big spacing between compact cards, twinkling starfield, glowing connectors
export default function DevFlow({ items = [], height = 560 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const cardRefs = useRef([])
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const [dim, setDim] = useState({ w: 1200, h: height })
  const motionRef = useRef([]) // smoothed per-card motion state

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

  useEffect(() => {
    const cnv = canvasRef.current
    const ctx = cnv?.getContext("2d")
    if (!cnv || !ctx) return

    const stepPattern = [90, -120, 0, 130, -80, 40]
    const baseCardW = 260
    const cardH = 170
    const baseGap = 220 // target large spacing - increased for better balance
    const minGap = 35
    const minScale = 0.6 // never smaller than 60% width

    // Compute base positions
    const layout = () => {
      const W = dim.w
      cnv.width = W
      cnv.height = height

      // Determine effective card width and gap so all items fit
      const n = items.length
      let effCardW = baseCardW
      let effGap = baseGap
      if (n > 1) {
        // If too wide, first try reducing gap down to minGap
        let total = n * effCardW + (n - 1) * effGap
        if (total > W) {
          effGap = minGap
          total = n * effCardW + (n - 1) * effGap
        }
        // If still too wide, scale down cards but keep readable
        if (total > W) {
          const scale = Math.max(minScale, (W - (n - 1) * effGap) / (n * baseCardW))
          effCardW = Math.floor(baseCardW * scale)
          total = n * effCardW + (n - 1) * effGap
        }
      } else {
        effGap = 0
      }

      const totalWidth = n * effCardW + (n - 1) * effGap
      const startX = Math.max(16, Math.floor((W - totalWidth) / 2))
      const baseY = Math.floor(height / 2)
      const pos = []
      for (let i = 0; i < items.length; i++) {
        const x = startX + i * (effCardW + effGap)
        const y = baseY + stepPattern[i % stepPattern.length]
        pos.push({ x, y, w: effCardW })
      }
      return pos
    }

    // draw connectors + shooting stars (no per-section starfield)
    const draw = (centers) => {
      ctx.clearRect(0, 0, cnv.width, cnv.height)

      // Connectors
      for (let i = 0; i < centers.length - 1; i++) {
        const A = centers[i]
        const B = centers[i + 1]
        const cx = A.x + (B.x - A.x) * 0.5
        const cy = A.y + (B.y - A.y) * 0.25

        // soft glow line
        ctx.strokeStyle = "rgba(6,182,212,0.35)"
        ctx.lineWidth = 2
        ctx.setLineDash([10, 8])
        ctx.lineDashOffset = -((tRef.current * 50 + i * 8) % 18)
        ctx.beginPath()
        ctx.moveTo(A.x, A.y)
        ctx.quadraticCurveTo(cx, cy, B.x, B.y)
        ctx.stroke()

        // animated shooting star along the path
        const tt = (tRef.current * 0.25 + i * 0.12) % 1
        const omt = 1 - tt
        const px = omt * omt * A.x + 2 * omt * tt * cx + tt * tt * B.x
        const py = omt * omt * A.y + 2 * omt * tt * cy + tt * tt * B.y

        const pprev = Math.max(0, tt - 0.1)
        const omtp = 1 - pprev
        const tx = omtp * omtp * A.x + 2 * omtp * pprev * cx + pprev * pprev * B.x
        const ty = omtp * omtp * A.y + 2 * omtp * pprev * cx + pprev * pprev * B.y

        const trailGrad = ctx.createLinearGradient(tx, ty, px, py)
        trailGrad.addColorStop(0, "rgba(6,182,212,0.0)")
        trailGrad.addColorStop(1, "rgba(139,92,246,0.9)")
        ctx.strokeStyle = trailGrad
        ctx.setLineDash([])
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.stroke()

        ctx.fillStyle = "rgba(6,182,212,0.95)"
        ctx.beginPath()
        ctx.arc(px, py, 3.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      tRef.current += 0.013
      const base = layout()
      const centers = []
      for (let i = 0; i < items.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const bx = base[i].x
        const by = base[i].y
        const bw = base[i].w
        // smoothed, organic bubble drift using eased targets
        if (!motionRef.current[i]) motionRef.current[i] = { dx: 0, dy: 0, rx: 0, ry: 0, sc: 1 }
        const t = tRef.current
        // layered sines for more organic motion at low frequency
        const dxT = Math.cos(t * 0.6 + i * 0.9) * 2.2 + Math.cos(t * 0.17 + i * 0.3) * 0.8
        const dyT = Math.sin(t * 0.5 + i * 0.7) * 2.6 + Math.sin(t * 0.21 + i * 0.4) * 0.9
        const rxT = Math.sin(t * 0.25 + i * 0.6) * 0.9
        const ryT = Math.cos(t * 0.22 + i * 0.5) * 0.9
        const scT = 1 + Math.sin(t * 0.3 + i * 0.4) * 0.006
        const s = motionRef.current[i]
        const ease = 0.1
        s.dx += (dxT - s.dx) * ease
        s.dy += (dyT - s.dy) * ease
        s.rx += (rxT - s.rx) * ease
        s.ry += (ryT - s.ry) * ease
        s.sc += (scT - s.sc) * ease
        el.style.transform = `translate3d(${bx + s.dx}px, ${by - cardH / 2 + s.dy}px, 0) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${s.sc})`
        el.style.width = `${bw}px`
        centers[i] = { x: bx + bw / 2 + s.dx, y: by + s.dy }
      }

      draw(centers)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [items, dim.w, height])

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {/* center ornament removed by request */}

      {/* cards */}
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {items.map((it, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute p-0 border bg-black/65 backdrop-blur-xl"
            style={{
              borderColor: "rgba(255,255,255,0.16)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              clipPath: "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* bevel + notch */}
            <div className="absolute left-0 right-6 top-0 h-6" style={{ transform: "translateZ(1px)", background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0))" }} />
            <div className="absolute right-0 top-0 w-6 h-6" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.5), rgba(139,92,246,0.4))", transform: "translateZ(1px)" }} />

            {/* face */}
            <div className="relative p-6" style={{ transform: "translateZ(2px)" }}>
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wider text-cyan-300 bg-cyan-400/10 border border-cyan-400/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-white font-extrabold text-base leading-tight">{it.title}</h3>
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

              {/* ornament */}
              <svg className="absolute bottom-3 right-3 opacity-70" width="72" height="28" viewBox="0 0 72 28" style={{ transform: "translateZ(2px)" }}>
                <defs>
                  <linearGradient id={`g-dev-${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(6,182,212,0.8)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.8)" />
                  </linearGradient>
                </defs>
                <path d="M2 14 L18 14 L24 6 L40 22 L54 8 L70 8" fill="none" stroke={`url(#g-dev-${i})`} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* inner glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 120% at 100% 0%, rgba(139,92,246,0.12), transparent), radial-gradient(120% 120% at 0% 100%, rgba(6,182,212,0.12), transparent)" }} />
          </div>
        ))}
      </div>
    </div>
  )
}
