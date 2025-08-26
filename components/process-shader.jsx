"use client"

import { useEffect, useRef } from "react"

export default function ProcessShader({ height = 260, opacity = 0.35, colors = ["#06b6d4", "#8b5cf6", "#3b82f6"] }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = height
    }
    resize()
    window.addEventListener("resize", resize)

    let t = 0
    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // layered sine waves with gradient
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y = h/2 + Math.sin((x + t * (1 + i*0.2)) * 0.01 + i) * (20 + i*10)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        const c1 = colors[i % colors.length];
        grad.addColorStop(0, c1 + "22")
        grad.addColorStop(0.5, c1 + "55")
        grad.addColorStop(1, c1 + "22")
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.stroke()
      }

      t += 1.6
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [height])

  return <canvas ref={canvasRef} className="absolute inset-x-0 -top-12" style={{ opacity }} />
}

