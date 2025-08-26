"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-context"

export default function SiteNav() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const barRef = useRef(null)

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
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const onNavLeave = () => {}

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="relative">
        {/* Aurora backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora h-full w-full" />
        </div>
        {/* Glass bar */}
        <div ref={barRef} onMouseLeave={onNavLeave} className="relative bg-black/70 backdrop-blur-2xl border-b border-cyan-400/20 glass-grain">
          <div className="container mx-auto px-6">
            <div className="h-16 flex items-center justify-between">
              {/* Brand mark */}
              <Link href="/" className="flex items-center gap-3 group">
                <span className="relative w-7 h-7 grid place-items-center">
                  <span className="absolute inset-0 rotate-45 border-2 border-cyan-400 group-hover:animate-spin-slow" />
                  <span className="absolute inset-[3px] rotate-45 border border-purple-400" />
                  <span className="relative text-[10px] font-black text-cyan-400">PT</span>
                </span>
                <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">PiramitTek</span>
              </Link>

              {/* Centered nav */}
              <div className="hidden md:flex items-center gap-1 relative">
                {items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-bold transition-colors group ${
                        active ? "text-cyan-400" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{t[item.key]}</span>
                      {active && (
                        <span className="absolute left-4 right-4 -bottom-[6px] h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Lang */}
              <div className="flex items-center gap-2">
                {["tr", "en", "de"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs font-bold transition-all px-2 py-1 border backdrop-blur-sm ${
                      language === lang
                        ? "text-cyan-400 border-cyan-400 bg-cyan-400/10"
                        : "text-white/60 hover:text-white border-white/20 hover:border-white/40"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scanning line */}
          <div className="relative h-[2px] overflow-hidden">
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute inset-0 nav-shimmer" />
          </div>
        </div>
      </div>
    </nav>
  )
}
