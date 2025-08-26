"use client"

import { useEffect, useRef } from "react"

export default function VortexCanvas({ particleCount = 1400 }) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5, down: false })

  useEffect(() => {
    const cnv = ref.current
    const ctx = cnv.getContext("2d")

    const onResize = () => {
      cnv.width = cnv.clientWidth
      cnv.height = cnv.clientHeight
    }
    onResize()

    const parts = new Array(particleCount).fill(0).map((_, i) => {
      const r = Math.random()
      return {
        a: r * Math.PI * 6, // angle
        r: 20 + r * 420,    // radius
        z: Math.random(),   // depth [0..1]
        s: 0.4 + Math.random() * 1.4, // speed factor
        c: 0.6 + Math.random() * 0.4, // brightness coef
      }
    })

    const tick = () => {
      tRef.current += 0.016
      const W = cnv.width
      const H = cnv.height
      const cx = W * 0.5
      const cy = H * 0.52
      // subtle vignette backdrop
      ctx.clearRect(0, 0, W, H)
      const vg = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.1, cx, cy, Math.max(W, H) * 0.8)
      vg.addColorStop(0, "rgba(0,0,0,0.0)")
      vg.addColorStop(1, "rgba(0,0,0,0.35)")
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const pull = mouseRef.current.down ? 1.8 : 1.0

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        // angular velocity: spiral flow
        const w = 0.0009 * p.s * pull
        p.a += w * (1.0 + 0.6 * Math.sin(tRef.current * 0.7 + p.z * 6))
        // slight radial breathing
        const rr = p.r + Math.sin(tRef.current * (0.4 + p.z * 0.6) + i) * 6
        // mouse parallax for center
        const ox = (mx - 0.5) * 80
        const oy = (my - 0.5) * 50
        const x = cx + Math.cos(p.a) * rr + ox * (0.2 + p.z * 0.8)
        const y = cy + Math.sin(p.a) * rr * 0.55 + oy * (0.2 + p.z * 0.8)
        // depth blur and size
        const z = p.z
        const size = (1.2 - z) * 1.6
        const alpha = 0.25 * p.c * (1.1 - z)

        // chromatic streak: draw three offset strokes for CA feel
        ctx.globalCompositeOperation = "lighter"
        ctx.fillStyle = `rgba(6,182,212,${alpha})`
        ctx.beginPath()
        ctx.arc(x + 0.8, y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(139,92,246,${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(x - 0.6, y + 0.4, size * 0.95, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(59,130,246,${alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(x, y - 0.6, size * 0.9, 0, Math.PI * 2)
        ctx.fill()
      }

      // subtle film grain
      const grd = ctx.createLinearGradient(0, 0, W, 0)
      grd.addColorStop(0, "rgba(255,255,255,0.02)")
      grd.addColorStop(1, "rgba(0,0,0,0.02)")
      ctx.globalCompositeOperation = "overlay"
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e) => {
      const rect = cnv.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }
    const onDown = () => (mouseRef.current.down = true)
    const onUp = () => (mouseRef.current.down = false)
    window.addEventListener("resize", onResize)
    cnv.addEventListener("mousemove", onMove)
    cnv.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      cnv.removeEventListener("mousemove", onMove)
      cnv.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
    }
  }, [particleCount])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

