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
        {/* Logo/Brand */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-2 border-cyan-400 rotate-45 animate-spin" />
          <div className="absolute inset-2 border border-purple-400 rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-black text-cyan-400">PT</span>
          </div>
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