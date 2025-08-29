"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-context"

export default function DesktopNav() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const barRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const t = {
    tr: { home: "Ana Sayfa", about: "Hakkımızda", services: "Hizmetlerimiz", process: "Geliştirme Süreci", projects: "Projeler", contact: "İletişim" },
    en: { home: "Home", about: "About", services: "Services", process: "Process", projects: "Projects", contact: "Contact" },
    de: { home: "Startseite", about: "Über Uns", services: "Dienstleistungen", process: "Prozess", projects: "Projekte", contact: "Kontakt" },
  }[language]

  const items = [
    { key: "home", href: "/" },
    { key: "services", href: "/hizmetlerimiz" },
    { key: "process", href: "/gelistirme-sureci" },
    { key: "projects", href: "/projeler" },
    { key: "about", href: "/hakkimizda" },
    { key: "contact", href: "/iletisim" },
  ]

  useEffect(() => {
    const onMove = (e) => {
      if (!barRef.current) return
      const rect = barRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      barRef.current.style.setProperty("--mx", `${x}px`)
    }
    
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <nav className={`hidden md:block fixed top-0 w-full z-[9999] transition-all duration-500 ${scrolled ? 'backdrop-blur-3xl' : 'backdrop-blur-xl'}`}>
      <div className="relative">
        {/* Aurora backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora h-full w-full" />
        </div>
        
        {/* Glass bar */}
        <div 
          ref={barRef}
          className={`relative transition-all duration-500 border-b glass-grain ${scrolled ? 'bg-black/85 border-cyan-400/30' : 'bg-black/70 border-cyan-400/20'}`}
        >
          <div className="container mx-auto px-6">
            <div className="h-16 flex items-center justify-between">
              {/* Brand mark */}
              <Link href="/" className="flex items-center gap-3 group">
                <span className="relative w-7 h-7 grid place-items-center">
                  <span className="absolute inset-0 rotate-45 border-2 border-cyan-400 group-hover:animate-spin-slow transition-transform duration-500" />
                  <span className="absolute inset-[3px] rotate-45 border border-purple-400 group-hover:border-cyan-400 transition-colors duration-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <span className="relative text-[10px] font-black text-cyan-400 group-hover:text-white transition-colors duration-500">PT</span>
                </span>
                <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-all duration-300 group-hover:tracking-wider">PiramitTek</span>
              </Link>

              {/* Desktop nav */}
              <div className="flex items-center gap-1 relative">
                {items.map((item) => {
                  const active = pathname === item.href
                  const isHovered = hoveredItem === item.key
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onMouseEnter={() => setHoveredItem(item.key)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 group ${
                        active ? "text-cyan-400" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {/* Hover glow effect */}
                      <span className={`absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                      
                      {/* Text with scale effect */}
                      <span className={`relative z-10 inline-block transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        {t[item.key]}
                      </span>
                      
                      {/* Active indicator with animation */}
                      {active && (
                        <span className="absolute left-4 right-4 -bottom-[6px] h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 animate-pulse" />
                      )}
                      
                      {/* Hover underline */}
                      {!active && (
                        <span className={`absolute left-4 right-4 -bottom-[6px] h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${isHovered ? 'scale-x-100 opacity-60' : 'scale-x-0 opacity-0'} origin-center`} />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Desktop Language buttons */}
              <div className="flex items-center gap-2">
                {["tr", "en", "de"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`relative text-xs font-bold transition-all duration-300 px-3 py-2 border overflow-hidden group min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      language === lang
                        ? "text-cyan-400 border-cyan-400 bg-cyan-400/10 scale-105"
                        : "text-white/60 hover:text-white border-white/20 hover:border-white/40 hover:scale-105"
                    }`}
                  >
                    {/* Background sweep animation */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    
                    {/* Text */}
                    <span className="relative z-10">{lang.toUpperCase()}</span>
                    
                    {/* Active pulse effect */}
                    {language === lang && (
                      <span className="absolute inset-0 bg-cyan-400/20 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced scanning line with multiple layers */}
          <div className="relative h-[2px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute inset-0 nav-shimmer" />
            {/* Additional pulsing line */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  )
}