"use client"

import { useEffect } from "react"

export default function CursorTrail() {
  useEffect(() => {
    const dots = Array.from({ length: 8 }).map((_, i) => {
      const el = document.createElement("div")
      el.className = "cursor-dot"
      el.style.setProperty("--i", String(i))
      document.body.appendChild(el)
      return { el, x: 0, y: 0 }
    })

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMove)

    const tick = () => {
      let x = mouseX
      let y = mouseY
      dots.forEach((d, idx) => {
        d.x += (x - d.x) * 0.18
        d.y += (y - d.y) * 0.18
        d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0)`
        x += (d.x - x) * 0.22
        y += (d.y - y) * 0.22
      })
      raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      dots.forEach((d) => d.el.remove())
    }
  }, [])

  return null
}
