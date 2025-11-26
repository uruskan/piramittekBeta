'use client'

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Brain, Wifi, Shield, ChevronDown, Mail, ExternalLink } from "lucide-react"
import { Pyramid3D } from "@/components/pyramid-3d"
import { NeuralNetwork } from "@/components/neural-network"
import useParallax from "@/components/use-parallax"
import DevFlow from "@/components/dev-flow"
import StarfieldOverlay from "@/components/starfield-overlay"
import Magnetic from "@/components/magnetic"
import HeroTilt from "@/components/hero-tilt"
import { useLanguage } from "@/components/language-context"
import { SectionAnimator } from "@/components/SectionAnimator"
import MobileProcessSteps from "@/components/mobile-process-steps"
import TrustedBrands from "@/components/trusted-brands"

export default function HomePage() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const pyramidParallax = useParallax({ speed: -0.05 })
  const titleParallax = useParallax({ speed: -0.02 })
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [glitchOn, setGlitchOn] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const services = [
    {
      id: "software",
      title:
        language === "tr" ? "Yazılım Geliştirme" : language === "en" ? "Software Development" : "Softwareentwicklung",
      icon: Code,
      color: "#3B82F6",
      angle: 0,
      description:
        language === "tr"
          ? "Özel yazılım çözümleri ve web uygulamaları"
          : language === "en"
            ? "Custom software solutions and web applications"
            : "Maßgeschneiderte Software-Lösungen und Webanwendungen",
    },
    {
      id: "ai",
      title:
        language === "tr"
          ? "Yapay Zeka & ML"
          : language === "en"
            ? "AI & Machine Learning"
            : "KI & Maschinelles Lernen",
      icon: Brain,
      color: "#8B5CF6",
      angle: 60,
      description:
        language === "tr"
          ? "Akıllı sistemler ve makine öğrenmesi çözümleri"
          : language === "en"
            ? "Intelligent systems and machine learning solutions"
            : "Intelligente Systeme und maschinelle Lernlösungen",
    },
    {
      id: "iot",
      title: language === "tr" ? "IoT & Otomasyon" : language === "en" ? "IoT & Automation" : "IoT & Automatisierung",
      icon: Wifi,
      color: "#10B981",
      angle: 120,
      description:
        language === "tr"
          ? "Nesnelerin interneti ve otomasyon sistemleri"
          : language === "en"
            ? "Internet of Things and automation systems"
            : "Internet der Dinge und Automatisierungssysteme",
    },
    {
      id: "security",
      title: language === "tr" ? "Siber Güvenlik" : language === "en" ? "Cybersecurity" : "Cybersicherheit",
      icon: Shield,
      color: "#EF4444",
      angle: 180,
      description:
        language === "tr"
          ? "Güvenlik denetimleri ve koruma sistemleri"
          : language === "en"
            ? "Security audits and protection systems"
            : "Sicherheitsaudits und Schutzsysteme",
    },
    {
      id: "consulting",
      title: language === "tr" ? "IT Danışmanlık" : language === "en" ? "IT Consulting" : "IT-Beratung",
      icon: Code,
      color: "#F59E0B",
      angle: 240,
      description:
        language === "tr"
          ? "Teknoloji stratejisi ve dijital dönüşüm"
          : language === "en"
            ? "Technology strategy and digital transformation"
            : "Technologiestrategie und digitale Transformation",
    },
    {
      id: "mobile",
      title: language === "tr" ? "Mobil Geliştirme" : language === "en" ? "Mobile Development" : "Mobile Entwicklung",
      icon: Code,
      color: "#06B6D4",
      angle: 300,
      description:
        language === "tr"
          ? "iOS ve Android uygulama geliştirme"
          : language === "en"
            ? "iOS and Android app development"
            : "iOS- und Android-App-Entwicklung",
    },
  ]

  const translations = {
    tr: {
      enter: "SİSTEME ERİŞİM İÇİN BASIN VE TUTUN",
      welcome: "PİRAMİTTEK",
      subtitle: "Karmaşık fikirleri zarif yazılımlara dönüştürüyoruz",
      explore: "SİSTEME GİR",
      services: "HİZMETLERİMİZ",
      process: "GELİŞTİRME SÜRECİMİZ",
      projects: "PROJELER",
      contact: "İLETİŞİM",
      connect: "BAĞLANTI KUR",
      aboutTitle: "Yenilikçi Yazılım Çözümleri",
      aboutDesc: "İhtiyaçlarınızı gerçekten karşılayan çözümler sunmak için müşteri odaklı bir yaklaşım",
      capabilities: "Yeteneklerimiz",
      trustedBrands: "Bize Güvenen Markalar",
      trustedBrandsDesc: "Güvenilir teknoloji ortağınız olarak, sektör liderleriyle çalışıyoruz",
      skills: [
        "Web Uygulamaları",
        "Mobil (iOS/Android)",
        "AI / ML",
        "IoT",
        "Siber Güvenlik",
        "Bulut (AWS/Azure/GCP)",
        "DevOps & CI/CD",
        "Mikroservis Mimarisi",
        "UI/UX",
        "Veri Mühendisliği",
      ],
      serviceBullets: [
        "Mimari & ölçeklenebilirlik",
        "Performans ve güvenlik",
        "Uçtan uca teslimat"
      ],
      processItems: [
        { title: 'Keşif & Analiz', desc: 'Proje gereksinimlerinizi analiz ediyor ve hedeflerinizi belirliyoruz.', bullets: ['İhtiyaç Analizi', 'Teknik Araştırma', 'Proje Kapsamı', 'Zaman Planlaması'] },
        { title: 'Tasarım & Planlama', desc: 'Sistem mimarisini tasarlıyor ve kullanıcı deneyimini planlıyoruz.', bullets: ['UI/UX Tasarım', 'Sistem Mimarisi', 'Veritabanı Tasarımı', 'API Planlama'] },
        { title: 'Geliştirme', desc: 'Modern teknolojiler ile güvenli ve ölçeklenebilir çözümler geliştiriyoruz.', bullets: ['Frontend Geliştirme', 'Backend Geliştirme', 'API Entegrasyonu', 'Güvenlik İmplementasyonu'] },
        { title: 'Test & Kalite', desc: 'Kapsamlı testlerle yazılım kalitesini ve güvenilirliğini sağlıyoruz.', bullets: ['Otomatik Testler', 'Performans Testleri', 'Güvenlik Testleri', 'Kullanıcı Testleri'] },
        { title: 'Dağıtım & Yayın', desc: 'Yazılımınızı güvenli şekilde canlı ortama dağıtıyor ve yayınlıyoruz.', bullets: ['Sunucu Kurulumu', 'Domain Konfigürasyonu', 'SSL ve Güvenlik', 'İzleme Sistemleri'] },
        { title: 'Bakım & Destek', desc: 'Sürekli izleme, güncelleme ve teknik destek hizmeti sağlıyoruz.', bullets: ['Sistem İzleme', 'Güvenlik Güncellemeleri', 'Performans Optimizasyonu', '7/24 Teknik Destek'] },
      ],
      processSteps: [
        "Keşif & Planlama - İhtiyaçlarınızı anlama",
        "Tasarım & Mimari - Plan oluşturma",
        "Geliştirme - Çözümü inşa etme",
        "Test & QA - Kaliteyi sağlama",
        "Dağıtım - Çözümü teslim etme",
        "Bakım & Destek - Sürekli iyileştirme",
      ],
      faq: "Sık Sorulan Sorular",
      contactInfo: "İletişim Bilgileri",
    },
    en: {
      enter: "PRESS & HOLD FOR SYSTEM ACCESS",
      welcome: "PIRAMITTEK",
      subtitle: "We turn complex ideas into elegant software",
      explore: "ENTER SYSTEM",
      services: "OUR SERVICES",
      process: "DEVELOPMENT PROCESS",
      projects: "PROJECTS",
      contact: "CONTACT",
      connect: "ESTABLISH CONNECTION",
      aboutTitle: "Innovative Software Solutions",
      aboutDesc: "A client-centric approach to deliver solutions that truly meet your needs",
      capabilities: "Our Capabilities",
      trustedBrands: "Brands That Trust Us",
      trustedBrandsDesc: "As your trusted technology partner, we work with industry leaders",
      skills: [
        "Web Applications",
        "Mobile (iOS/Android)",
        "AI / ML",
        "IoT",
        "Cybersecurity",
        "Cloud (AWS/Azure/GCP)",
        "DevOps & CI/CD",
        "Microservices Architecture",
        "UI/UX",
        "Data Engineering",
      ],
      serviceBullets: [
        "Architecture & scalability",
        "Performance and security",
        "End-to-end delivery"
      ],
      processItems: [
        { title: 'Discovery & Analysis', desc: 'We analyze your project requirements and define your goals clearly.', bullets: ['Needs Analysis', 'Technical Research', 'Project Scope', 'Timeline Planning'] },
        { title: 'Design & Planning', desc: 'We design system architecture and plan optimal user experience.', bullets: ['UI/UX Design', 'System Architecture', 'Database Design', 'API Planning'] },
        { title: 'Development', desc: 'We build secure and scalable solutions using modern technologies.', bullets: ['Frontend Development', 'Backend Development', 'API Integration', 'Security Implementation'] },
        { title: 'Testing & Quality', desc: 'We ensure software quality and reliability through comprehensive testing.', bullets: ['Automated Tests', 'Performance Tests', 'Security Tests', 'User Testing'] },
        { title: 'Deployment & Release', desc: 'We safely deploy and release your software to the live environment.', bullets: ['Server Setup', 'Domain Configuration', 'SSL & Security', 'Monitoring Systems'] },
        { title: 'Maintenance & Support', desc: 'We provide continuous monitoring, updates and technical support services.', bullets: ['System Monitoring', 'Security Updates', 'Performance Optimization', '24/7 Technical Support'] },
      ],
      processSteps: [
        "Discovery & Planning - Understanding your needs",
        "Design & Architecture - Creating the blueprint",
        "Development - Building the solution",
        "Testing & QA - Ensuring quality",
        "Deployment - Delivering the solution",
        "Maintenance & Support - Continuous improvement",
      ],
      faq: "Frequently Asked Questions",
      contactInfo: "Contact Information",
    },
    de: {
      enter: "DRÜCKEN UND HALTEN FÜR SYSTEMZUGANG",
      welcome: "PIRAMITTEK",
      subtitle: "Wir verwandeln komplexe Ideen in elegante Software",
      explore: "SYSTEM BETRETEN",
      services: "UNSERE DIENSTLEISTUNGEN",
      process: "ENTWICKLUNGSPROZESS",
      projects: "PROJEKTE",
      contact: "KONTAKT",
      connect: "VERBINDUNG HERSTELLEN",
      aboutTitle: "Innovative Software-Lösungen",
      aboutDesc:
        "Ein kundenorientierter Ansatz zur Bereitstellung von Lösungen, die Ihre Bedürfnisse wirklich erfüllen",
      capabilities: "Unsere Fähigkeiten",
      trustedBrands: "Marken, die uns vertrauen",
      trustedBrandsDesc: "Als Ihr vertrauenswürdiger Technologiepartner arbeiten wir mit Branchenführern",
      skills: [
        "Webanwendungen",
        "Mobil (iOS/Android)",
        "KI / ML",
        "IoT",
        "Cybersicherheit",
        "Cloud (AWS/Azure/GCP)",
        "DevOps & CI/CD",
        "Microservices-Architektur",
        "UI/UX",
        "Datentechnik",
      ],
      serviceBullets: [
        "Architektur & Skalierbarkeit",
        "Leistung und Sicherheit",
        "End-to-End-Lieferung"
      ],
      processItems: [
        { title: 'Entdeckung & Analyse', desc: 'Wir analysieren Ihre Projektanforderungen und definieren Ihre Ziele klar.', bullets: ['Bedarfsanalyse', 'Technische Recherche', 'Projektumfang', 'Zeitplanung'] },
        { title: 'Design & Planung', desc: 'Wir entwerfen die Systemarchitektur und planen optimale Benutzererfahrung.', bullets: ['UI/UX Design', 'Systemarchitektur', 'Datenbankdesign', 'API-Planung'] },
        { title: 'Entwicklung', desc: 'Wir entwickeln sichere und skalierbare Lösungen mit modernen Technologien.', bullets: ['Frontend-Entwicklung', 'Backend-Entwicklung', 'API-Integration', 'Sicherheitsimplementierung'] },
        { title: 'Tests & Qualität', desc: 'Wir gewährleisten Softwarequalität und Zuverlässigkeit durch umfassende Tests.', bullets: ['Automatisierte Tests', 'Leistungstests', 'Sicherheitstests', 'Benutzertests'] },
        { title: 'Bereitstellung & Release', desc: 'Wir stellen Ihre Software sicher in der Live-Umgebung bereit und veröffentlichen sie.', bullets: ['Server-Setup', 'Domain-Konfiguration', 'SSL & Sicherheit', 'Monitoring-Systeme'] },
        { title: 'Wartung & Support', desc: 'Wir bieten kontinuierliche Überwachung, Updates und technische Support-Services.', bullets: ['Systemüberwachung', 'Sicherheitsupdates', 'Leistungsoptimierung', '24/7 Technischer Support'] },
      ],
      processSteps: [
        "Entdeckung & Planung - Ihre Bedürfnisse verstehen",
        "Design & Architektur - Den Bauplan erstellen",
        "Entwicklung - Die Lösung bauen",
        "Testen & QA - Qualität sicherstellen",
        "Bereitstellung - Die Lösung liefern",
        "Wartung & Support - Kontinuierliche Verbesserung",
      ],
      faq: "Häufig gestellte Fragen",
      contactInfo: "Kontaktinformationen",
    },
  }

  const t = translations[language]

  const taglines =
    language === "tr"
      ? [
          "FinTech, IoT, SaaS, Siber Güvenlik",
          "Kurumsal yazılım, yüksek ölçek, düşük gecikme",
          "Fikirden ürüne: uçtan uca teslimat",
        ]
      : language === "en"
        ? [
            "FinTech, IoT, SaaS, Cybersecurity",
            "Enterprise software, high scale, low latency",
            "From idea to product: end-to-end delivery",
          ]
        : [
            "FinTech, IoT, SaaS, Cybersicherheit",
            "Enterprise-Software, hohe Skalierung, niedrige Latenz",
            "Von der Idee zum Produkt: End-to-End",
          ]

  useEffect(() => {
    const id = setInterval(() => setTaglineIndex((i) => (i + 1) % taglines.length), 3000)
    return () => clearInterval(id)
  }, [language])

  useEffect(() => {
    setGlitchOn(true)
    const to = setTimeout(() => setGlitchOn(false), 500)
    return () => clearTimeout(to)
  }, [taglineIndex])

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <StarfieldOverlay />

      <section className="min-h-[100vh] sm:min-h-[88vh] flex items-center justify-center relative overflow-hidden pt-20 sm:pt-16">
        <HeroTilt>
          <div className="absolute inset-0 z-0">
            <NeuralNetwork />
          </div>
        </HeroTilt>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-5" />
        <HeroTilt>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-90 pointer-events-none z-0" style={pyramidParallax}>
            <div className="absolute -inset-16 -z-10" style={{
              background: "radial-gradient(closest-side, rgba(139,92,246,0.18), rgba(6,182,212,0.08) 45%, transparent 70%)",
              filter: "blur(6px)",
            }} />
            <div className="block sm:hidden">
              <Pyramid3D size={200} />
            </div>
            <div className="hidden sm:block">
              <Pyramid3D size={360} />
            </div>
          </div>
        </HeroTilt>
        <div className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent" style={titleParallax}>
            {t.welcome}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-2 leading-relaxed px-2">{t.subtitle}</p>
          <p className={`text-xs sm:text-sm md:text-base text-white/70 mb-8 sm:mb-10 px-4 ${glitchOn ? 'glitch' : ''}`} data-text={taglines[taglineIndex]}>
            {taglines[taglineIndex]}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4" style={{ perspective: '1000px' }}>
            <HeroTilt>
              <Magnetic>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black px-6 py-3.5 sm:px-10 sm:py-5 text-sm sm:text-lg font-bold transition-all duration-300 min-h-[44px] touch-manipulation w-full sm:w-auto"
                >
                  <Link href="/hizmetlerimiz">{t.services}</Link>
                </Button>
              </Magnetic>
            </HeroTilt>
            <HeroTilt>
              <Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 px-6 py-3.5 sm:px-10 sm:py-5 text-sm sm:text-lg font-bold bg-transparent min-h-[44px] touch-manipulation w-full sm:w-auto"
                >
                  <Link href="/projeler">{t.projects}</Link>
                </Button>
              </Magnetic>
            </HeroTilt>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      <SectionAnimator>
        <section className="py-12 sm:py-16 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t.capabilities}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-4">
            {t.skills.map((tag) => (
              <Magnetic key={tag}>
                <span
                  className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-white/20 text-white/80 bg-white/5 hover:border-cyan-400/50 hover:text-white transition-all duration-300 relative overflow-hidden min-h-[36px] flex items-center justify-center touch-manipulation"
                >
                  <span className="relative z-10">{tag}</span>
                  <span className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </span>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>
    </SectionAnimator>

      <SectionAnimator>
        <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 px-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.services}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Magnetic key={service.id}>
                  <div
                    className="group relative p-4 sm:p-6 lg:p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 touch-manipulation"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                    }}
                  >
                  <div className="relative z-10">
                    <Icon size={48} style={{ color: service.color }} className="mb-6 group-hover:animate-pulse" />
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{service.description}</p>
                    <ul className="text-white/70 text-sm space-y-1 mb-4">
                      {t.serviceBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-cyan-400 inline-block rounded-full" /> 
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, transparent)`,
                    }}
                  />
                </div>
              </Magnetic>
              )
            })}
          </div>
        </div>
      </section>
    </SectionAnimator>

      <SectionAnimator>
        <section className="py-12 sm:py-16 lg:py-20 relative" id="process">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 px-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t.process}
            </h2>
            <div className="relative">
              <div className="block lg:hidden">
                <MobileProcessSteps items={t.processItems} />
              </div>
              <div className="hidden lg:block">
                <DevFlow
                  height={560}
                  items={t.processItems}
                />
              </div>
            </div>
          </div>
        </section>
      </SectionAnimator>

      <SectionAnimator>
        <TrustedBrands />
      </SectionAnimator>

      <SectionAnimator>
        <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 px-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.contact}
          </h2>

          <div className="max-w-2xl mx-auto px-4">
            <div className="relative p-4 sm:p-6 lg:p-8 border border-cyan-400/30 bg-black/70 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />

              <div className="relative z-10">
                <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black px-8 py-4 sm:px-12 sm:py-6 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-300 min-h-[44px] touch-manipulation w-full sm:w-auto">
                  <Link href="/iletisim">{t.connect}</Link>
                </Button>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/60">
                  <div className="flex items-center gap-2 min-h-[44px]">
                    <Mail size={16} />
                    <span className="text-xs sm:text-sm">contact@piramittek.com</span>
                  </div>
                  <div className="flex items-center gap-2 min-h-[44px]">
                    <ExternalLink size={16} />
                    <span className="text-xs sm:text-sm">piramittek.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionAnimator>
    </div>
  )
}