"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-context"
import { Menu, X } from "lucide-react"

export default function MobileNav() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

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

  // Lock body scroll when menu is open with smooth transition
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 z-[9999]">
        {/* Glass morphism background with animated aurora */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-blue-500/5 animate-gradient-x" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0 animate-shimmer" />
        </div>
        
        <div className="relative flex items-center justify-between h-full px-4">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 relative">
              <div className="absolute inset-0 rotate-45 border-2 border-cyan-400 group-hover:border-purple-400 transition-all duration-500 group-hover:animate-spin-slow" />
              <div className="absolute inset-[3px] rotate-45 border border-purple-400 group-hover:border-cyan-400 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-cyan-400 group-hover:text-white transition-colors duration-500">PT</span>
              </div>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-all duration-300 group-hover:tracking-wider">PiramitTek</span>
          </Link>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-12 h-12 flex items-center justify-center text-white hover:text-cyan-400 transition-all duration-300 rounded-lg overflow-hidden group ${
              isOpen ? 'bg-cyan-400/10 text-cyan-400' : 'hover:bg-white/5'
            }`}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            {isOpen && (
              <div className="absolute inset-0 border border-cyan-400/30 rounded-lg animate-pulse" />
            )}
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)}>
          {/* Animated backdrop with neural network effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/10 to-blue-500/5 animate-pulse" />
          </div>
          
          {/* Menu Panel with sophisticated design */}
          <div 
            className="absolute top-16 left-0 right-0 bottom-0 overflow-y-auto animate-in slide-in-from-top-2 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass morphism panel */}
            <div className="m-4 rounded-2xl overflow-hidden border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl">
              {/* Header section with animated border */}
              <div className="relative p-6 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
                <h2 className="text-xl font-bold text-white mb-2">
                  {language === "tr" ? "Menü" : language === "en" ? "Navigation" : "Navigation"}
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
              </div>
              
              {/* Navigation Links with enhanced design */}
              <div className="p-4 space-y-2">
                {items.map((item, index) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group relative block px-6 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
                        active
                          ? "text-cyan-400 bg-gradient-to-r from-cyan-400/10 to-purple-400/5 border border-cyan-400/30 shadow-lg"
                          : "text-white hover:text-cyan-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-white/10 border border-transparent hover:border-white/20"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-lg font-semibold tracking-wide">{t[item.key]}</span>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          active ? 'bg-cyan-400 animate-pulse' : 'bg-white/20 group-hover:bg-cyan-400/60'
                        }`} />
                      </div>
                      
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 rounded-full animate-shimmer" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Enhanced Language Switcher */}
              <div className="p-6 pt-4 border-t border-white/10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-xl" />
                  <div className="relative p-4">
                    <h3 className="text-white/80 text-sm font-bold mb-4 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                      {language === "tr" ? "Dil Seçimi" : language === "en" ? "Language" : "Sprache"}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {["tr", "en", "de"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang)
                            setIsOpen(false)
                          }}
                          className={`group relative py-3 px-4 text-sm font-bold rounded-lg border transition-all duration-300 overflow-hidden ${
                            language === lang
                              ? "text-cyan-400 border-cyan-400/50 bg-gradient-to-r from-cyan-400/15 to-purple-400/10 shadow-lg scale-105"
                              : "text-white/80 border-white/20 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-white/10 hover:to-cyan-400/5 hover:scale-105"
                          }`}
                        >
                          {/* Background animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Text */}
                          <span className="relative z-10">{lang.toUpperCase()}</span>
                          
                          {/* Active pulse effect */}
                          {language === lang && (
                            <div className="absolute inset-0 border border-cyan-400/30 rounded-lg animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer decoration */}
              <div className="h-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-blue-400/20" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}