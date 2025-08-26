"use client"

import { cloneElement, useRef } from "react"

export default function Magnetic({ children, strength = 0.2, radius = 120 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = mx - cx
    const dy = my - cy
    const dist = Math.hypot(dx, dy)
    if (dist < radius) {
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "translate3d(0,0,0)"
  }

  return cloneElement(children, {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { willChange: "transform", ...(children.props.style || {}) },
  })
}

