"use client"

import { useEffect, useState } from 'react'

export default function SplashLoader({ onComplete, videoLoaded = false }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('loading') // loading, ready

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Irregular progress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Only complete when both progress is done AND video is loaded
    if (progress >= 100 && videoLoaded) {
      setStage('ready')
      setTimeout(() => {
        onComplete()
      }, 300) // Shorter delay since video is already ready
    }
  }, [progress, videoLoaded, onComplete])

  return (
    <div className="fixed inset-0 bg-black z-[70] flex items-center justify-center">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 animate-pulse" />
      </div>
      
      <div className="text-center space-y-8 px-6">
        {/* Logo/Brand - 2.5D Pyramid */}
        <div className="relative w-16 h-16 mx-auto">
          <svg viewBox="0 0 64 64" className="w-full h-full animate-pulse">
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="splashPyramidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="splashPyramidGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="splashPyramidGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            {/* Back face (darker) */}
            <path d="M32 12 L48 44 L32 52 Z" fill="url(#splashPyramidGradient3)" />
            
            {/* Right face (medium) */}
            <path d="M32 12 L48 44 L16 44 Z" fill="url(#splashPyramidGradient2)" />
            
            {/* Left face (brightest) */}
            <path d="M32 12 L16 44 L32 52 Z" fill="url(#splashPyramidGradient1)" />
            
            {/* Top glow */}
            <circle cx="32" cy="12" r="3" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>

        {/* Loading text */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">PiramitTek</h2>
          <p className="text-sm text-white/60">
            {stage === 'ready' ? 'Hazır!' : 'Yükleniyor...'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-white/40 text-center">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}