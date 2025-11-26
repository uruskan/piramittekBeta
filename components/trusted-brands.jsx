"use client"

import { useLanguage } from "@/components/language-context"
import Link from "next/link"

export default function TrustedBrands() {
  const { language } = useLanguage()

  const translations = {
    tr: {
      title: "Bize Güvenen Markalar",
      subtitle: "Dünya çapında lider şirketler ve kurumlar bize güveniyor"
    },
    en: {
      title: "Brands That Trust Us",
      subtitle: "Leading companies and institutions worldwide trust us"
    },
    de: {
      title: "Marken, die uns vertrauen",
      subtitle: "Weltweit führende Unternehmen und Institutionen vertrauen uns"
    }
  }

  const brands = [
    {
      name: "Ulusoy Gıda",
      subtitle: "Taze Balık",
      url: "https://ulusoybalikgida.com",
      color: "cyan"
    },
    {
      name: "Baylaz",
      subtitle: "Holding",
      url: "#",
      color: "purple"
    },
    {
      name: "T.C. Tarım ve Orman",
      subtitle: "Bakanlığı",
      url: "#",
      color: "green"
    }
  ]

  const t = translations[language]

  return (
    <section className="py-20 sm:py-28 relative bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.title}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Professional logo grid with cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {brands.map((brand, index) => (
              <Link
                key={index}
                href={brand.url}
                target={brand.url.startsWith('http') ? "_blank" : undefined}
                rel={brand.url.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:scale-105 hover:bg-white/10 cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  brand.color === 'cyan' ? 'bg-cyan-500/5' :
                  brand.color === 'purple' ? 'bg-purple-500/5' :
                  'bg-green-500/5'
                }`} />

                <div className="relative z-10 text-center">
                  <div className="mb-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-white transition-colors">
                      {brand.name}
                    </h3>
                    <p className={`text-sm sm:text-base font-medium mt-1 ${
                      brand.color === 'cyan' ? 'text-cyan-400' :
                      brand.color === 'purple' ? 'text-purple-400' :
                      'text-green-400'
                    }`}>
                      {brand.subtitle}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="mt-6 flex justify-center">
                    <div className={`h-1 w-16 rounded-full ${
                      brand.color === 'cyan' ? 'bg-cyan-400' :
                      brand.color === 'purple' ? 'bg-purple-400' :
                      'bg-green-400'
                    } group-hover:w-24 transition-all duration-300`} />
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>

        {/* Stats or additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <div>
              <div className="text-3xl font-bold text-cyan-400">10+</div>
              <div className="text-sm text-gray-400 mt-1">
                {language === 'tr' ? 'Mutlu Müşteri' : language === 'en' ? 'Happy Clients' : 'Zufriedene Kunden'}
              </div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-sm text-gray-400 mt-1">
                {language === 'tr' ? 'Tamamlanan Proje' : language === 'en' ? 'Completed Projects' : 'Abgeschlossene Projekte'}
              </div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-green-400">5+</div>
              <div className="text-sm text-gray-400 mt-1">
                {language === 'tr' ? 'Yıllık Deneyim' : language === 'en' ? 'Years Experience' : 'Jahre Erfahrung'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}