"use client"

import { useEffect, useState } from "react"

export default function useParallax({ speed = 0.2 } = {}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * speed)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  const style = {
    transform: `translate3d(0, ${offset.toFixed(1)}px, 0)`
  }

  return style
}

