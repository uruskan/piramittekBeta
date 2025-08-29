"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-context"
import { Menu, X } from "lucide-react"

export default function SiteNav() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const barRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = {
    tr: { home: "Ana Sayfa", services: "Hizmetlerimiz", process: "Geliştirme Süreci", projects: "Projeler", contact: "İletişim" },
    en: { home: "Home", services: "Services", process: "Process", projects: "Projects", contact: "Contact" },
    de: { home: "Startseite", services: "Dienstleistungen", process: "Prozess", projects: "Projekte", contact: "Kontakt" },
  }[language]

  const items = [
    { key: "home", href: "/" },
    { key: "services", href: "/hizmetlerimiz" },
    { key: "process", href: "/gelistirme-sureci" },
    { key: "projects", href: "/projeler" },
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

  // Handle mobile menu body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const onNavLeave = () => {}

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-3xl' : 'backdrop-blur-xl'}`}>
      <div className="relative">
        {/* Aurora backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora h-full w-full" />
        </div>
        {/* Glass bar */}
        <div 
          ref={barRef} 
          onMouseLeave={onNavLeave} 
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

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1 relative">
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
              <div className="hidden md:flex items-center gap-2">
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black z-40">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-0">
                {items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-sm font-semibold py-3 px-4 border-b border-white/10 transition-all duration-200 min-h-[44px] flex items-center ${
                        active 
                          ? "text-cyan-400 bg-cyan-400/5" 
                          : "text-white hover:text-cyan-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="relative">
                        {t[item.key]}
                        {active && (
                          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                        )}
                      </span>
                    </Link>
                  )
                })}
                
                {/* Mobile Language Switcher */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <h3 className="text-white/50 text-xs font-bold mb-3 uppercase tracking-wider px-4">
                    {language === "tr" ? "Dil" : language === "en" ? "Language" : "Sprache"}
                  </h3>
                  <div className="grid grid-cols-3 gap-1 px-4">
                    {["tr", "en", "de"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang)
                          setMobileMenuOpen(false)
                        }}
                        className={`relative text-xs font-bold transition-all duration-200 py-2 px-3 rounded border overflow-hidden min-h-[36px] flex items-center justify-center ${
                          language === lang
                            ? "text-cyan-400 border-cyan-400/40 bg-cyan-400/10"
                            : "text-white hover:text-cyan-300 border-white/20 hover:border-cyan-400/40 hover:bg-white/10"
                        }`}
                      >
                        <span className="relative z-10">{lang.toUpperCase()}</span>
                        {language === lang && (
                          <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
