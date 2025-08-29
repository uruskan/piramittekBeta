"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight, Clock, CheckCircle } from "lucide-react"

export default function MobileProcessSteps({ items, translations = {} }) {
  const [expandedItem, setExpandedItem] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const canvasRef = useRef(null)

  // Mini canvas animation for mobile
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = 60

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: ["#06b6d4", "#8b5cf6", "#3b82f6"][Math.floor(Math.random() * 3)],
    }))

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  // Auto-progress through steps for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="relative">
      {/* Progress bar with animated particles */}
      <div className="relative mb-6">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-[60px] opacity-30" />
        <div className="relative flex justify-between items-center px-4 py-2">
          {items.map((_, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-500 transform
                  ${index <= activeStep 
                    ? 'bg-gradient-to-br from-cyan-400 to-purple-400 scale-110 shadow-lg shadow-cyan-400/50' 
                    : 'bg-gray-800 border border-gray-700'
                  }
                `}
              >
                {index < activeStep ? (
                  <CheckCircle size={16} className="text-black" />
                ) : (
                  <span className={`text-xs font-bold ${index <= activeStep ? 'text-black' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              {index < items.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-800" />
                  <div 
                    className={`
                      absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400
                      transition-transform duration-1000 transform
                      ${index < activeStep ? 'translate-x-0' : '-translate-x-full'}
                    `}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stylish accordion cards */}
      <div className="space-y-4">
        {items.map((item, index) => {
          // Handle both old and new formats
          const Icon = item.icon || ChevronRight
          const isExpanded = expandedItem === index
          const isActive = activeStep === index
          const hasActivities = item.activities && item.activities.length > 0
          const hasDeliverables = item.deliverables && item.deliverables.length > 0

          return (
            <div
              key={item.id || index}
              className={`
                relative overflow-hidden rounded-xl transition-all duration-500 transform
                ${isActive ? 'scale-[1.02]' : 'scale-100'}
                ${isExpanded ? 'shadow-2xl shadow-cyan-400/20' : 'shadow-lg shadow-black/50'}
              `}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.1) 100%)'
                  : 'rgba(0,0,0,0.6)',
                border: isActive ? '1px solid rgba(6,182,212,0.5)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Animated border gradient */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl opacity-50">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-x" />
                  <div className="absolute inset-[1px] bg-black rounded-xl" />
                </div>
              )}

              <button
                onClick={() => setExpandedItem(isExpanded ? -1 : index)}
                className="relative w-full p-5 text-left transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon with glow effect */}
                    <div className="relative">
                      <div className={`
                        absolute inset-0 rounded-lg blur-xl
                        ${isActive ? 'bg-cyan-400/40' : 'bg-transparent'}
                      `} />
                      <div className={`
                        relative p-3 rounded-lg transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border-cyan-400/40' 
                          : 'bg-white/5 border-white/10'
                        } border
                      `}>
                        <Icon size={24} className={isActive ? "text-cyan-400" : "text-white/60"} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`
                          text-lg font-bold transition-colors duration-300
                          ${isActive ? 'text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text' : 'text-white'}
                        `}>
                          {item.title}
                        </h3>
                        {item.duration && (
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                            ${isActive 
                              ? 'bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-300 border border-cyan-400/30' 
                              : 'bg-white/5 text-white/50 border border-white/10'
                            }
                          `}>
                            <Clock size={10} className="inline mr-1" />
                            {item.duration}
                          </span>
                        )}
                      </div>
                      <p className={`
                        text-sm transition-colors duration-300 line-clamp-2
                        ${isActive ? 'text-cyan-100/90' : 'text-white/60'}
                      `}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`
                    transition-all duration-300 transform
                    ${isExpanded ? 'rotate-180' : 'rotate-0'}
                  `}>
                    <ChevronDown 
                      size={20} 
                      className={isActive ? "text-cyan-400" : "text-white/40"} 
                    />
                  </div>
                </div>
              </button>
              
              {/* Expanded content with smooth animation */}
              <div className={`
                grid transition-all duration-500 ease-in-out
                ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-white/10 pt-4">
                      {/* Handle both old (bullets) and new (activities/deliverables) formats */}
                      {item.bullets ? (
                        // Old format with bullets array
                        <div className="space-y-2">
                          {item.bullets.map((bullet, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center gap-2 text-xs text-white/70 p-2 bg-white/5 rounded-lg backdrop-blur-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // New format with activities and deliverables
                        <div className="grid gap-4">
                          {/* Activities section */}
                          {hasActivities && (
                            <div>
                              <h4 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
                                {translations.activities || 'Activities'}
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {item.activities.map((activity, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex items-center gap-2 text-xs text-white/70 p-2 bg-white/5 rounded-lg backdrop-blur-sm"
                                  >
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                                    <span>{activity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Deliverables section */}
                          {hasDeliverables && (
                            <div>
                              <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full" />
                                {translations.deliverables || 'Deliverables'}
                              </h4>
                              <div className="space-y-2">
                                {item.deliverables.map((deliverable, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex items-center gap-2 text-xs text-white/70 p-2 bg-white/5 rounded-lg backdrop-blur-sm"
                                  >
                                    <CheckCircle size={12} className="text-purple-400 flex-shrink-0" />
                                    <span>{deliverable}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </div>
  )
}