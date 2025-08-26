"use client"

import { useEffect, useRef } from "react"

export default function ProcessLinks() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const getCards = () => Array.from(document.querySelectorAll('[data-proc-card]'))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 400
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', resize)

    let t = 0
    const draw = () => {
      resize()
      const cards = getCards()
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0,0,canvas.width,canvas.height)

      for (let i=0; i<cards.length-1; i++) {
        const a = cards[i].getBoundingClientRect()
        const b = cards[i+1].getBoundingClientRect()
        const ax = a.left + a.width/2 - rect.left
        const ay = a.top + a.height/2 - rect.top
        const bx = b.left + b.width/2 - rect.left
        const by = b.top + b.height/2 - rect.top

        // control point for the curve
        const cx = (ax + bx) / 2 + (ay - by) * 0.4;
        const cy = (ay + by) / 2 + (bx - ax) * 0.4;

        // line
        const grad = ctx.createLinearGradient(ax, ay, bx, by)
        grad.addColorStop(0, 'rgba(6,182,212,0.35)')
        grad.addColorStop(1, 'rgba(139,92,246,0.35)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.quadraticCurveTo(cx, cy, bx, by)
        ctx.stroke()

        // traveling dot
        const p = (Math.sin(t/30 + i) + 1)/2 // 0..1
        const t_curve = p;
        const px = Math.pow(1 - t_curve, 2) * ax + 2 * (1 - t_curve) * t_curve * cx + Math.pow(t_curve, 2) * bx;
        const py = Math.pow(1 - t_curve, 2) * ay + 2 * (1 - t_curve) * t_curve * cy + Math.pow(t_curve, 2) * by;
        
        const pulse = (Math.sin(t/10 + i) + 1) / 2; // 0..1
        const size = 3 + pulse * 3;
        const opacity = 0.5 + pulse * 0.5;

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI*2)
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`
        ctx.fill()
      }

      t += 1
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

