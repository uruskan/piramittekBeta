"use client"

import { useEffect, useRef } from "react"

export default function ProcessGraph({ className = "", nodeCount = 6 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
    }
    resize()
    window.addEventListener("resize", resize)

    const colors = ["#06b6d4", "#8b5cf6", "#3b82f6", "#22c55e", "#eab308", "#f97316"]
    let t = 0

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      // center pyramid (wireframe)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.strokeStyle = "rgba(6,182,212,0.6)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, -70)
      ctx.lineTo(-70, 60)
      ctx.lineTo(70, 60)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()

      // orbiting nodes
      const R = Math.min(w, 900) / 3.2
      for (let i = 0; i < nodeCount; i++) {
        const angle = t * 0.5 + (i * Math.PI * 2) / nodeCount
        const x = w / 2 + Math.cos(angle) * R
        const y = h / 2 + Math.sin(angle) * (R * 0.5)

        // connection
        ctx.beginPath()
        ctx.moveTo(w / 2, h / 2)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "rgba(139, 92, 246, 0.25)"
        ctx.lineWidth = 1
        ctx.stroke()

        // node glow
        const c = colors[i % colors.length]
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fillStyle = c + "33"
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, y, 4 + 2 * Math.sin(t + i), 0, Math.PI * 2)
        ctx.fillStyle = c
        ctx.fill()
      }

      t += 0.02
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [nodeCount])

  return <canvas ref={canvasRef} className={`w-full h-[400px] ${className}`} />
}

