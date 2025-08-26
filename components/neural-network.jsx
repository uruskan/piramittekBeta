"use client"

import { useEffect, useRef } from "react"

export function NeuralNetwork() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Create neural network nodes
    const nodes = [
      { x: 100, y: 100, layer: 0 },
      { x: 100, y: 200, layer: 0 },
      { x: 100, y: 300, layer: 0 },
      { x: 300, y: 150, layer: 1 },
      { x: 300, y: 250, layer: 1 },
      { x: 500, y: 200, layer: 2 },
    ]

    // Create connections
    const connections = []
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && Math.abs(node.layer - otherNode.layer) === 1) {
          connections.push({ from: node, to: otherNode })
        }
      })
    })

    // Animate connections
    connections.forEach((conn, index) => {
      setTimeout(() => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", conn.from.x)
        line.setAttribute("y1", conn.from.y)
        line.setAttribute("x2", conn.to.x)
        line.setAttribute("y2", conn.to.y)
        line.setAttribute("stroke", "#3b82f6")
        line.setAttribute("stroke-width", "2")
        line.setAttribute("stroke-dasharray", "5,5")
        line.classList.add("animate-neural-network")
        svg.appendChild(line)
      }, index * 200)
    })

    // Add nodes
    nodes.forEach((node, index) => {
      setTimeout(() => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", node.x)
        circle.setAttribute("cy", node.y)
        circle.setAttribute("r", "8")
        circle.setAttribute("fill", "#8b5cf6")
        circle.setAttribute("stroke", "#3b82f6")
        circle.setAttribute("stroke-width", "2")
        circle.classList.add("animate-pulse")
        svg.appendChild(circle)
      }, index * 300)
    })
  }, [])

  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" />
    </div>
  )
}
