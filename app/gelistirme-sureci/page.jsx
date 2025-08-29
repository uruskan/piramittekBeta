"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock, Users, Code, TestTube, Rocket, Wrench, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProcessGraph from "@/components/process-graph"
import { useLanguage } from "@/components/language-context"
import MobileProcessSteps from "@/components/mobile-process-steps"

export default function ProcessPage() {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = Array.from({ length: 8 }, (_, i) => ({
      x: (canvas.width / 9) * (i + 1),
      y: canvas.height / 2 + Math.sin(i * 0.5) * 100,
      targetY: canvas.height / 2 + Math.sin(i * 0.5) * 100,
      radius: 8,
      connections: [],
      active: i === activeStep,
      color: i <= activeStep ? "#06b6d4" : "#374151",
    }))

    // Connect adjacent nodes
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].connections.push(i + 1)
    }

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node states
      nodes.forEach((node, i) => {
        node.active = i === activeStep
        node.color = i <= activeStep ? "#06b6d4" : "#374151"
      })

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const targetNode = nodes[connectionIndex]
          if (targetNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.strokeStyle = i < activeStep ? "#06b6d4" : "#374151"
            ctx.lineWidth = i < activeStep ? 3 : 1
            ctx.stroke()

            // Add flowing particles on active connections
            if (i < activeStep) {
              const progress = (Date.now() * 0.001) % 1
              const particleX = node.x + (targetNode.x - node.x) * progress
              const particleY = node.y + (targetNode.y - node.y) * progress

              ctx.beginPath()
              ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
              ctx.fillStyle = "#06b6d4"
              ctx.fill()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        // Outer glow for active node
        if (node.active) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2)
          ctx.fillStyle = "#06b6d440"
          ctx.fill()
        }

        // Main node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Node number
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(i + 1, node.x, node.y + 4)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [activeStep])

  const processSteps = [
    {
      id: "discovery",
      title: {
        tr: "Keşif & Analiz",
        en: "Discovery & Analysis",
        de: "Entdeckung & Analyse",
      },
      icon: Users,
      duration: {
        tr: "1-2 Hafta",
        en: "1-2 Weeks",
        de: "1-2 Wochen",
      },
      description: {
        tr: "Projenizin gereksinimlerini detaylı olarak analiz ediyor, hedeflerinizi belirliyoruz.",
        en: "We analyze your project requirements in detail and define your goals.",
        de: "Wir analysieren Ihre Projektanforderungen im Detail und definieren Ihre Ziele.",
      },
      activities: {
        tr: ["İhtiyaç Analizi", "Teknik Araştırma", "Proje Kapsamı Belirleme", "Zaman Planlaması"],
        en: ["Needs Analysis", "Technical Research", "Project Scope Definition", "Timeline Planning"],
        de: ["Bedarfsanalyse", "Technische Recherche", "Projektumfang Definition", "Zeitplanung"],
      },
      deliverables: {
        tr: ["Proje Dokümantasyonu", "Teknik Spesifikasyon", "Zaman Çizelgesi"],
        en: ["Project Documentation", "Technical Specification", "Timeline"],
        de: ["Projektdokumentation", "Technische Spezifikation", "Zeitplan"],
      },
    },
    {
      id: "planning",
      title: {
        tr: "Planlama & Tasarım",
        en: "Planning & Design",
        de: "Planung & Design",
      },
      icon: Code,
      duration: {
        tr: "2-3 Hafta",
        en: "2-3 Weeks",
        de: "2-3 Wochen",
      },
      description: {
        tr: "Sistem mimarisini tasarlıyor, kullanıcı deneyimini planlıyoruz.",
        en: "We design the system architecture and plan the user experience.",
        de: "Wir entwerfen die Systemarchitektur und planen die Benutzererfahrung.",
      },
      activities: {
        tr: ["Sistem Mimarisi", "UI/UX Tasarım", "Veritabanı Tasarımı", "API Planlama"],
        en: ["System Architecture", "UI/UX Design", "Database Design", "API Planning"],
        de: ["Systemarchitektur", "UI/UX Design", "Datenbankdesign", "API-Planung"],
      },
      deliverables: {
        tr: ["Mimari Dokümantasyonu", "Tasarım Prototipleri", "Veritabanı Şeması"],
        en: ["Architecture Documentation", "Design Prototypes", "Database Schema"],
        de: ["Architekturdokumentation", "Design-Prototypen", "Datenbankschema"],
      },
    },
    {
      id: "development",
      title: {
        tr: "Geliştirme",
        en: "Development",
        de: "Entwicklung",
      },
      icon: Code,
      duration: {
        tr: "4-8 Hafta",
        en: "4-8 Weeks",
        de: "4-8 Wochen",
      },
      description: {
        tr: "Agile metodoloji ile iteratif geliştirme sürecini yürütüyoruz.",
        en: "We conduct iterative development process with Agile methodology.",
        de: "Wir führen einen iterativen Entwicklungsprozess mit Agile-Methodik durch.",
      },
      activities: {
        tr: ["Frontend Geliştirme", "Backend Geliştirme", "API Entegrasyonu", "Veritabanı İmplementasyonu"],
        en: ["Frontend Development", "Backend Development", "API Integration", "Database Implementation"],
        de: ["Frontend-Entwicklung", "Backend-Entwicklung", "API-Integration", "Datenbankimplementierung"],
      },
      deliverables: {
        tr: ["Çalışan Prototip", "Kaynak Kodu", "API Dokümantasyonu"],
        en: ["Working Prototype", "Source Code", "API Documentation"],
        de: ["Funktionierender Prototyp", "Quellcode", "API-Dokumentation"],
      },
    },
    {
      id: "testing",
      title: {
        tr: "Test & QA",
        en: "Testing & QA",
        de: "Testen & QA",
      },
      icon: TestTube,
      duration: {
        tr: "1-2 Hafta",
        en: "1-2 Weeks",
        de: "1-2 Wochen",
      },
      description: {
        tr: "Kapsamlı testler yaparak yazılımın kalitesini ve güvenilirliğini sağlıyoruz.",
        en: "We ensure software quality and reliability through comprehensive testing.",
        de: "Wir gewährleisten Softwarequalität und Zuverlässigkeit durch umfassende Tests.",
      },
      activities: {
        tr: ["Unit Testler", "Entegrasyon Testleri", "Performans Testleri", "Güvenlik Testleri"],
        en: ["Unit Tests", "Integration Tests", "Performance Tests", "Security Tests"],
        de: ["Unit-Tests", "Integrationstests", "Leistungstests", "Sicherheitstests"],
      },
      deliverables: {
        tr: ["Test Raporları", "Bug Raporları", "Performans Analizi"],
        en: ["Test Reports", "Bug Reports", "Performance Analysis"],
        de: ["Testberichte", "Fehlerberichte", "Leistungsanalyse"],
      },
    },
    {
      id: "deployment",
      title: {
        tr: "Dağıtım & Yayın",
        en: "Deployment & Release",
        de: "Bereitstellung & Veröffentlichung",
      },
      icon: Rocket,
      duration: {
        tr: "3-5 Gün",
        en: "3-5 Days",
        de: "3-5 Tage",
      },
      description: {
        tr: "Yazılımı canlı ortama güvenli bir şekilde dağıtıyor ve yayınlıyoruz.",
        en: "We safely deploy and release the software to the live environment.",
        de: "Wir stellen die Software sicher in der Live-Umgebung bereit und veröffentlichen sie.",
      },
      activities: {
        tr: ["Sunucu Kurulumu", "Domain Konfigürasyonu", "SSL Sertifikası", "Monitoring Kurulumu"],
        en: ["Server Setup", "Domain Configuration", "SSL Certificate", "Monitoring Setup"],
        de: ["Server-Setup", "Domain-Konfiguration", "SSL-Zertifikat", "Monitoring-Setup"],
      },
      deliverables: {
        tr: ["Canlı Sistem", "Dağıtım Dokümantasyonu", "Monitoring Dashboard"],
        en: ["Live System", "Deployment Documentation", "Monitoring Dashboard"],
        de: ["Live-System", "Bereitstellungsdokumentation", "Monitoring-Dashboard"],
      },
    },
    {
      id: "maintenance",
      title: {
        tr: "Bakım & Destek",
        en: "Maintenance & Support",
        de: "Wartung & Support",
      },
      icon: Wrench,
      duration: {
        tr: "Sürekli",
        en: "Ongoing",
        de: "Laufend",
      },
      description: {
        tr: "Sürekli izleme, güncelleme ve teknik destek hizmeti sağlıyoruz.",
        en: "We provide continuous monitoring, updates, and technical support services.",
        de: "Wir bieten kontinuierliche Überwachung, Updates und technischen Support.",
      },
      activities: {
        tr: ["Sistem İzleme", "Güvenlik Güncellemeleri", "Performans Optimizasyonu", "Teknik Destek"],
        en: ["System Monitoring", "Security Updates", "Performance Optimization", "Technical Support"],
        de: ["Systemüberwachung", "Sicherheitsupdates", "Leistungsoptimierung", "Technischer Support"],
      },
      deliverables: {
        tr: ["Aylık Raporlar", "Güncelleme Notları", "Destek Dokümantasyonu"],
        en: ["Monthly Reports", "Update Notes", "Support Documentation"],
        de: ["Monatliche Berichte", "Update-Notizen", "Support-Dokumentation"],
      },
    },
  ]

  const translations = {
    tr: {
      title: "Geliştirme Sürecimiz",
      subtitle: "Projelerinizi hayata geçirirken izlediğimiz sistematik yaklaşım",
      backHome: "Ana Sayfa",
      duration: "Süre",
      activities: "Aktiviteler",
      deliverables: "Çıktılar",
      nextStep: "Sonraki Adım",
      prevStep: "Önceki Adım",
      startProject: "Proje Başlat",
      getConsultation: "Ücretsiz Konsültasyon",
    },
    en: {
      title: "Our Development Process",
      subtitle: "The systematic approach we follow to bring your projects to life",
      backHome: "Home",
      duration: "Duration",
      activities: "Activities",
      deliverables: "Deliverables",
      nextStep: "Next Step",
      prevStep: "Previous Step",
      startProject: "Start Project",
      getConsultation: "Free Consultation",
    },
    de: {
      title: "Unser Entwicklungsprozess",
      subtitle: "Der systematische Ansatz, den wir verfolgen, um Ihre Projekte zum Leben zu erwecken",
      backHome: "Startseite",
      duration: "Dauer",
      activities: "Aktivitäten",
      deliverables: "Ergebnisse",
      nextStep: "Nächster Schritt",
      prevStep: "Vorheriger Schritt",
      startProject: "Projekt starten",
      getConsultation: "Kostenlose Beratung",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-45" />

      {/* Global nav is provided by layout */}

      <section className="pt-24 sm:pt-28 pb-4 sm:pb-6 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 px-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 relative">
        <div className="container mx-auto px-6">
          {/* Mobile Collapsible Steps */}
          <div className="block md:hidden max-w-2xl mx-auto">
            <MobileProcessSteps 
              items={processSteps.map(step => ({
                title: step.title[language],
                desc: step.description[language],
                bullets: [...step.activities[language], ...step.deliverables[language]]
              }))} 
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={step.id} className="relative p-4 sm:p-6 border border-white/15 hover:border-cyan-400/50 bg-black/60 backdrop-blur-xl transition-all touch-manipulation">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/40">
                    {React.createElement(step.icon, { size: 24, className: "text-cyan-400" })}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title[language]}</h3>
                  <span className="ml-auto text-xs text-white/60 uppercase tracking-wider">{step.duration[language]}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{step.description[language]}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-white/90 mb-2">{t.activities}</h4>
                  <ul className="space-y-1 text-white/70 text-sm list-disc list-inside">
                    {step.activities[language].slice(0, 4).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/90 mb-2">{t.deliverables}</h4>
                  <ul className="space-y-1 text-white/70 text-sm list-disc list-inside">
                    {step.deliverables[language].slice(0, 3).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {language === "tr"
                ? "Projenizi Başlatalım"
                : language === "en"
                  ? "Let's Start Your Project"
                  : "Lassen Sie uns Ihr Projekt starten"}
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              {language === "tr"
                ? "Deneyimli ekibimizle projenizi profesyonel bir şekilde hayata geçirelim."
                : language === "en"
                  ? "Let's bring your project to life professionally with our experienced team."
                  : "Lassen Sie uns Ihr Projekt professionell mit unserem erfahrenen Team zum Leben erwecken."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black px-12 py-6 font-bold transform hover:scale-105 transition-all duration-300"
              >
                {t.startProject}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-12 py-6 font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                {t.getConsultation}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
