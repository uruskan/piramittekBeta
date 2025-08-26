"use client"

import { useRef } from "react"

export default function HeroTilt({ children, maxTilt = 8 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const rx = ((my - rect.height / 2) / rect.height) * -maxTilt
    const ry = ((mx - rect.width / 2) / rect.width) * maxTilt
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 200ms ease" }}>
      {children}
    </div>
  )
}

