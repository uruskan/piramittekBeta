"use client"

import { useLanguage } from "@/components/language-context"
import Image from "next/image"

export default function TrustedBrands() {
  const { language } = useLanguage()
  
  const translations = {
    tr: {
      title: "Bize Güvenen Markalar",
      subtitle: "Güvenilir teknoloji ortağınız"
    },
    en: {
      title: "Brands That Trust Us",
      subtitle: "Your trusted technology partner"
    },
    de: {
      title: "Marken, die uns vertrauen",
      subtitle: "Ihr vertrauenswürdiger Technologiepartner"
    }
  }
  
  const t = translations[language]
  
  return (
    <section className="py-16 sm:py-20 relative bg-black/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-white/60 text-sm">
            {t.subtitle}
          </p>
        </div>
        
        {/* Simple logo grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 items-center">
            
            {/* Ulusoy Gıda Logo */}
            <div className="flex items-center justify-center p-6 sm:p-8">
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg width="150" height="60" viewBox="0 0 150 60" className="w-full h-auto max-w-[120px] sm:max-w-[150px]">
                  <text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-lg font-bold">
                    ULUSOY
                  </text>
                  <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-cyan-400 text-xs">
                    GIDA BALIK
                  </text>
                </svg>
              </div>
            </div>

            {/* Baylaz Holding Logo */}
            <div className="flex items-center justify-center p-6 sm:p-8">
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg width="150" height="60" viewBox="0 0 150 60" className="w-full h-auto max-w-[120px] sm:max-w-[150px]">
                  <text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-lg font-bold">
                    BAYLAZ
                  </text>
                  <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-purple-400 text-xs">
                    HOLDING
                  </text>
                </svg>
              </div>
            </div>

            {/* T.C. Tarım ve Orman Bakanlığı Logo */}
            <div className="flex items-center justify-center p-6 sm:p-8">
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg width="150" height="80" viewBox="0 0 150 80" className="w-full h-auto max-w-[120px] sm:max-w-[150px]">
                  {/* Simple emblem */}
                  <circle cx="75" cy="25" r="12" className="fill-none stroke-green-500 stroke-1" />
                  <path d="M75 18 L78 23 L83 23 L78.5 27 L80.5 32 L75 28 L69.5 32 L71.5 27 L67 23 L72 23 Z" 
                    className="fill-green-500" />
                  {/* Text */}
                  <text x="50%" y="55" textAnchor="middle" className="fill-white text-[10px] font-bold">
                    T.C. TARIM VE ORMAN
                  </text>
                  <text x="50%" y="68" textAnchor="middle" className="fill-green-400 text-[9px]">
                    BAKANLIĞI
                  </text>
                </svg>
              </div>
            </div>

          </div>
        </div>
        
        {/* Optional: Simple divider line */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}