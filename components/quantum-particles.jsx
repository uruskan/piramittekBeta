"use client"

import { useEffect, useRef } from "react"

export function QuantumParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle-trail"
      particle.style.left = Math.random() * window.innerWidth + "px"
      particle.style.animationDelay = Math.random() * 4 + "s"
      particle.style.animationDuration = Math.random() * 3 + 2 + "s"

      const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]

      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 6000)
    }

    const interval = setInterval(createParticle, 200)

    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
