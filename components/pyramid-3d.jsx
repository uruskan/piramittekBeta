"use client"

import { useEffect, useRef } from "react"

export function Pyramid3D({ className = "", size = 200 }) {
  const canvasRef = useRef(null)
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = size
    canvas.height = size

    let rotation = 0

    const drawPyramid = () => {
      ctx.clearRect(0, 0, size, size)
      ctx.save()

      // Move to center
      ctx.translate(size / 2, size / 2)

      // Apply rotation
      ctx.rotate(rotation)

      // Draw pyramid faces with gradient
      const gradient = ctx.createLinearGradient(-50, -50, 50, 50)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)")
      gradient.addColorStop(0.5, "rgba(234, 88, 12, 0.6)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.4)")

      ctx.fillStyle = gradient
      ctx.strokeStyle = "rgba(139, 92, 246, 1)"
      ctx.lineWidth = 2

      // Front face
      ctx.beginPath()
      ctx.moveTo(0, -60)
      ctx.lineTo(-50, 40)
      ctx.lineTo(50, 40)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Left face (darker)
      ctx.fillStyle = "rgba(139, 92, 246, 0.4)"
      ctx.beginPath()
      ctx.moveTo(0, -60)
      ctx.lineTo(-50, 40)
      ctx.lineTo(-20, 20)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Right face (lighter)
      ctx.fillStyle = "rgba(234, 88, 12, 0.5)"
      ctx.beginPath()
      ctx.moveTo(0, -60)
      ctx.lineTo(50, 40)
      ctx.lineTo(20, 20)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.restore()

      rotation += 0.01
      animationRef.current = requestAnimationFrame(drawPyramid)
    }

    drawPyramid()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      className={`${className} animate-float`}
      style={{ filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))" }}
    />
  )
}
