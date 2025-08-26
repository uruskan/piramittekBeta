"use client"

import { useEffect, useRef } from "react"

export default function StarfieldOverlay({ topVH = 45, density = 260 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const starsRef = useRef([])
  const cometsRef = useRef([]) // longer-lived, stylized fireballs
  const lastSpawnRef = useRef(0)
  const tRef = useRef(0)

  useEffect(() => {
    const cnv = canvasRef.current
    const ctx = cnv?.getContext("2d")
    if (!cnv || !ctx) return

    const onResize = () => {
      cnv.width = window.innerWidth
      cnv.height = Math.max(0, Math.round(window.innerHeight * (1 - topVH / 100)))
    }
    onResize()

    const ensureStars = () => {
      if (starsRef.current.length) return
      const arr = []
      const count = density
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * cnv.width,
          y: Math.random() * cnv.height,
          r: Math.random() * 1.6 + 0.2,
          p: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = arr
    }

    const tick = () => {
      const dt = 0.016
      tRef.current += dt
      // if size changed (e.g., rotate), rebuild stars
      if (cnv.width !== window.innerWidth) {
        starsRef.current = []
        onResize()
      }

      ensureStars()
      ctx.clearRect(0, 0, cnv.width, cnv.height)
      for (const s of starsRef.current) {
        const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(tRef.current * 5 + s.p))
        ctx.fillStyle = `rgba(255,255,255,${tw.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      // spawn stylized fireball comets less frequently but lasting longer
      if (tRef.current - lastSpawnRef.current > 1.4 && cometsRef.current.length < 3) {
        lastSpawnRef.current = tRef.current
        const fromLeft = Math.random() < 0.5
        const sx = fromLeft ? -40 : cnv.width + 40
        const sy = Math.random() * cnv.height * 0.9
        const speed = 120 + Math.random() * 80
        const ang = fromLeft ? (Math.random() * -0.35 - 0.05) : (Math.PI - (Math.random() * 0.35 + 0.05))
        const vx = Math.cos(ang) * speed
        const vy = Math.sin(ang) * speed
        const life = 3.5 + Math.random() * 2.0 // seconds
        const size = 3.5 + Math.random() * 2
        cometsRef.current.push({ x: sx, y: sy, vx, vy, age: 0, life, size })
      }

      // update + draw comets with fireball effect
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i]
        c.age += dt
        c.x += c.vx * dt
        c.y += c.vy * dt
        // slight gravity curve
        c.vy += 6 * dt

        // remove if out of bounds or expired
        if (c.age > c.life || c.x < -80 || c.x > cnv.width + 80 || c.y < -80 || c.y > cnv.height + 80) {
          cometsRef.current.splice(i, 1)
          continue
        }

        // tail: draw multiple blurred segments behind the head along -velocity
        const tailLen = 14
        for (let k = tailLen; k >= 0; k--) {
          const t = k / tailLen
          const px = c.x - c.vx * 0.02 * k
          const py = c.y - c.vy * 0.02 * k
          const r = c.size * (0.6 + 1.8 * (1 - t))
          const alpha = 0.08 + 0.18 * (1 - t)
          const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
          grad.addColorStop(0, `rgba(255,255,255,${alpha * 1.0})`)
          grad.addColorStop(0.4, `rgba(6,182,212,${alpha * 0.9})`)
          grad.addColorStop(1, `rgba(139,92,246,0)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()
        }

        // bright head (fireball core)
        const hr = c.size * 2.4
        const hgrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, hr)
        hgrad.addColorStop(0, "rgba(255,255,255,0.95)")
        hgrad.addColorStop(0.35, "rgba(6,182,212,0.9)")
        hgrad.addColorStop(1, "rgba(139,92,246,0.0)")
        ctx.fillStyle = hgrad
        ctx.beginPath()
        ctx.arc(c.x, c.y, hr, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    window.addEventListener("resize", onResize)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [topVH, density])

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 bottom-0 z-0"
      style={{ top: `${topVH}vh` }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
