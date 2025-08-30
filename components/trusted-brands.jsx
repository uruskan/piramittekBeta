"use client"

import { useLanguage } from "@/components/language-context"

export default function TrustedBrands() {
  const { language } = useLanguage()
  
  const translations = {
    tr: {
      title: "Bize Güvenen Markalar",
      subtitle: "Güvenilir teknoloji ortağınız olarak, sektör liderleriyle çalışıyoruz"
    },
    en: {
      title: "Brands That Trust Us",
      subtitle: "As your trusted technology partner, we work with industry leaders"
    },
    de: {
      title: "Marken, die uns vertrauen",
      subtitle: "Als Ihr vertrauenswürdiger Technologiepartner arbeiten wir mit Branchenführern"
    }
  }
  
  const t = translations[language]
  
  const brands = [
    {
      name: "ULUSOY GIDA BALIK",
      shortName: "ULUSOY",
      subtitle: "GIDA BALIK",
      color: "cyan"
    },
    {
      name: "BAYLAZ HOLDING",
      shortName: "BAYLAZ",
      subtitle: "HOLDING",
      color: "purple"
    },
    {
      name: "T.C. TARIM VE ORMAN BAKANLIĞI",
      shortName: "T.C.",
      subtitle: "TARIM VE ORMAN",
      extraLine: "BAKANLIĞI",
      hasEmblem: true,
      color: "green"
    }
  ]
  
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 px-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {t.title}
        </h2>
        
        <p className="text-center text-white/60 text-sm mb-12">
          {t.subtitle}
        </p>
        
        {/* Desktop version */}
        <div className="hidden md:block relative">
          <div className="flex items-center justify-center gap-16 lg:gap-20">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative transition-all duration-500 hover:scale-110"
              >
                <div className="p-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <div className="relative">
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500
                      ${brand.color === 'cyan' ? 'bg-cyan-500' : brand.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'}`} />
                    
                    {brand.hasEmblem ? (
                      <div className="relative w-40 h-28 flex flex-col items-center justify-center">
                        <svg viewBox="0 0 200 120" className="w-full h-full">
                          <circle cx="100" cy="35" r="20" className="fill-none stroke-green-500 stroke-2 opacity-80" />
                          <path d="M100 20 L105 30 L115 30 L107 37 L110 47 L100 40 L90 47 L93 37 L85 30 L95 30 Z" 
                            className="fill-green-500 opacity-80" />
                          <text x="50%" y="70" textAnchor="middle" className="fill-white/80 text-base font-bold">
                            {brand.shortName}
                          </text>
                          <text x="50%" y="88" textAnchor="middle" className="fill-green-400 text-xs">
                            {brand.subtitle}
                          </text>
                          <text x="50%" y="104" textAnchor="middle" className="fill-green-400 text-xs">
                            {brand.extraLine}
                          </text>
                        </svg>
                      </div>
                    ) : (
                      <div className="relative w-40 h-20 flex flex-col items-center justify-center">
                        <div className={`text-2xl font-bold text-white/80 mb-1`}>
                          {brand.shortName}
                        </div>
                        <div className={`text-sm ${brand.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                          {brand.subtitle}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile version - vertical stack */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="relative w-full max-w-xs"
              >
                <div className="p-6 border border-white/10 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center justify-center">
                    {brand.hasEmblem ? (
                      <div className="relative w-32 h-24 flex flex-col items-center justify-center">
                        <svg viewBox="0 0 200 120" className="w-full h-full">
                          <circle cx="100" cy="30" r="15" className="fill-none stroke-green-500 stroke-2 opacity-80" />
                          <path d="M100 20 L103 27 L110 27 L105 32 L107 39 L100 35 L93 39 L95 32 L90 27 L97 27 Z" 
                            className="fill-green-500 opacity-80" />
                          <text x="50%" y="60" textAnchor="middle" className="fill-white/80 text-sm font-bold">
                            {brand.shortName}
                          </text>
                          <text x="50%" y="76" textAnchor="middle" className="fill-green-400 text-xs">
                            {brand.subtitle}
                          </text>
                          <text x="50%" y="90" textAnchor="middle" className="fill-green-400 text-xs">
                            {brand.extraLine}
                          </text>
                        </svg>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-xl font-bold text-white/80 mb-1">
                          {brand.shortName}
                        </div>
                        <div className={`text-sm ${brand.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                          {brand.subtitle}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated line */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}