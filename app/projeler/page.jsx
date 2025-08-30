"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Zap,
  Shield,
  Smartphone,
  Brain,
  Wifi,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"

export default function ProjectsPage() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const projects = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      color: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][Math.floor(Math.random() * 5)],
      category: ["web", "mobile", "ai", "iot", "security"][Math.floor(Math.random() * 5)],
      connections: [],
    }))

    // Create connections between nearby projects
    projects.forEach((project, i) => {
      projects.slice(i + 1).forEach((otherProject, j) => {
        const dx = project.x - otherProject.x
        const dy = project.y - otherProject.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150 && Math.random() > 0.7) {
          project.connections.push(i + j + 1)
        }
      })
    })

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      projects.forEach((project, i) => {
        project.connections.forEach((connectionIndex) => {
          if (connectionIndex < projects.length) {
            const targetProject = projects[connectionIndex]
            ctx.beginPath()
            ctx.moveTo(project.x, project.y)
            ctx.lineTo(targetProject.x, targetProject.y)
            ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Update and draw projects
      projects.forEach((project) => {
        project.x += project.vx
        project.y += project.vy

        if (project.x < 0 || project.x > canvas.width) project.vx *= -1
        if (project.y < 0 || project.y > canvas.height) project.vy *= -1

        project.x = Math.max(0, Math.min(canvas.width, project.x))
        project.y = Math.max(0, Math.min(canvas.height, project.y))

        // Draw project node
        ctx.beginPath()
        ctx.arc(project.x, project.y, project.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          project.color +
          Math.floor(project.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Highlight active category
        if (activeCategory === "all" || activeCategory === project.category) {
          ctx.beginPath()
          ctx.arc(project.x, project.y, project.radius + 2, 0, Math.PI * 2)
          ctx.strokeStyle = project.color
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [activeCategory])

  const projects = [
    {
      id: 1,
      title: {
        tr: "E-Ticaret Platformu",
        en: "E-Commerce Platform",
        de: "E-Commerce-Plattform",
      },
      category: "web",
      icon: Code,
      color: "#3B82F6",
      image: "/modern-ecommerce-dashboard.png",
      description: {
        tr: "Modern ve kullanıcı dostu e-ticaret platformu. React, Node.js ve PostgreSQL kullanılarak geliştirildi.",
        en: "Modern and user-friendly e-commerce platform. Developed using React, Node.js and PostgreSQL.",
        de: "Moderne und benutzerfreundliche E-Commerce-Plattform. Entwickelt mit React, Node.js und PostgreSQL.",
      },
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      features: {
        tr: ["Ürün Yönetimi", "Ödeme Entegrasyonu", "Sipariş Takibi", "Admin Paneli"],
        en: ["Product Management", "Payment Integration", "Order Tracking", "Admin Panel"],
        de: ["Produktverwaltung", "Zahlungsintegration", "Bestellverfolgung", "Admin-Panel"],
      },
      duration: "3 ay",
      team: "4 kişi",
      year: "2024",
    },
    {
      id: 2,
      title: {
        tr: "Akıllı Ev Otomasyon Sistemi",
        en: "Smart Home Automation System",
        de: "Smart Home Automatisierungssystem",
      },
      category: "iot",
      icon: Wifi,
      color: "#10B981",
      image: "/smart-home-automation-dashboard-with-iot-devices.png",
      description: {
        tr: "IoT sensörleri ve akıllı cihazlarla ev otomasyonu. Mobil uygulama ile uzaktan kontrol.",
        en: "Home automation with IoT sensors and smart devices. Remote control with mobile app.",
        de: "Hausautomation mit IoT-Sensoren und intelligenten Geräten. Fernsteuerung mit mobiler App.",
      },
      technologies: ["React Native", "Arduino", "MQTT", "Firebase", "ESP32"],
      features: {
        tr: ["Işık Kontrolü", "Sıcaklık Yönetimi", "Güvenlik Sistemi", "Enerji Takibi"],
        en: ["Light Control", "Temperature Management", "Security System", "Energy Monitoring"],
        de: ["Lichtsteuerung", "Temperaturmanagement", "Sicherheitssystem", "Energieüberwachung"],
      },
      duration: "4 ay",
      team: "3 kişi",
      year: "2024",
    },
    {
      id: 3,
      title: {
        tr: "AI Destekli Müşteri Hizmetleri",
        en: "AI-Powered Customer Service",
        de: "KI-gestützter Kundenservice",
      },
      category: "ai",
      icon: Brain,
      color: "#8B5CF6",
      image: "/ai-chatbot-interface-with-neural-network-visualiza.png",
      description: {
        tr: "Doğal dil işleme ile akıllı chatbot. 7/24 müşteri desteği ve otomatik ticket yönetimi.",
        en: "Intelligent chatbot with natural language processing. 24/7 customer support and automatic ticket management.",
        de: "Intelligenter Chatbot mit natürlicher Sprachverarbeitung. 24/7 Kundensupport und automatisches Ticket-Management.",
      },
      technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI", "Redis"],
      features: {
        tr: ["Doğal Dil Anlama", "Çok Dilli Destek", "Ticket Yönetimi", "Analitik Dashboard"],
        en: ["Natural Language Understanding", "Multi-language Support", "Ticket Management", "Analytics Dashboard"],
        de: ["Natürliches Sprachverständnis", "Mehrsprachiger Support", "Ticket-Management", "Analytics-Dashboard"],
      },
      duration: "5 ay",
      team: "5 kişi",
      year: "2023",
    },
    {
      id: 4,
      title: {
        tr: "Mobil Bankacılık Uygulaması",
        en: "Mobile Banking Application",
        de: "Mobile Banking-Anwendung",
      },
      category: "mobile",
      icon: Smartphone,
      color: "#06B6D4",
      image: "/mobile-banking-app-interface-with-security-feature.png",
      description: {
        tr: "Güvenli mobil bankacılık uygulaması. Biyometrik kimlik doğrulama ve gelişmiş güvenlik özellikleri.",
        en: "Secure mobile banking application. Biometric authentication and advanced security features.",
        de: "Sichere Mobile Banking-Anwendung. Biometrische Authentifizierung und erweiterte Sicherheitsfeatures.",
      },
      technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometrics"],
      features: {
        tr: ["Biyometrik Giriş", "Para Transferi", "Fatura Ödeme", "Yatırım Takibi"],
        en: ["Biometric Login", "Money Transfer", "Bill Payment", "Investment Tracking"],
        de: ["Biometrische Anmeldung", "Geldtransfer", "Rechnungszahlung", "Investment-Tracking"],
      },
      duration: "6 ay",
      team: "6 kişi",
      year: "2023",
    },
    {
      id: 5,
      title: {
        tr: "Siber Güvenlik Dashboard",
        en: "Cybersecurity Dashboard",
        de: "Cybersicherheits-Dashboard",
      },
      category: "security",
      icon: Shield,
      color: "#EF4444",
      image: "/cybersecurity-threat-dashboard.png",
      description: {
        tr: "Gerçek zamanlı tehdit izleme ve güvenlik analizi platformu. SIEM entegrasyonu ile kapsamlı koruma.",
        en: "Real-time threat monitoring and security analysis platform. Comprehensive protection with SIEM integration.",
        de: "Echtzeit-Bedrohungsüberwachung und Sicherheitsanalyseplattform. Umfassender Schutz mit SIEM-Integration.",
      },
      technologies: ["React", "Python", "Elasticsearch", "Kibana", "Docker"],
      features: {
        tr: ["Tehdit Analizi", "Log Yönetimi", "Alarm Sistemi", "Raporlama"],
        en: ["Threat Analysis", "Log Management", "Alert System", "Reporting"],
        de: ["Bedrohungsanalyse", "Log-Management", "Alarmsystem", "Berichterstattung"],
      },
      duration: "4 months",
      team: 4,
      year: "2024",
    },
    {
      id: 6,
      title: {
        tr: "Kurumsal ERP Sistemi",
        en: "Enterprise ERP System",
        de: "Unternehmens-ERP-System",
      },
      category: "web",
      icon: Code,
      color: "#F59E0B",
      image: "/enterprise-erp-system-dashboard-with-modules.png",
      description: {
        tr: "Kapsamlı kurumsal kaynak planlama sistemi. Modüler yapı ile özelleştirilebilir çözüm.",
        en: "Comprehensive enterprise resource planning system. Customizable solution with modular structure.",
        de: "Umfassendes Enterprise Resource Planning System. Anpassbare Lösung mit modularer Struktur.",
      },
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker"],
      features: {
        tr: ["İnsan Kaynakları", "Muhasebe", "Stok Yönetimi", "CRM"],
        en: ["Human Resources", "Accounting", "Inventory Management", "CRM"],
        de: ["Personalwesen", "Buchhaltung", "Lagerverwaltung", "CRM"],
      },
      duration: "8 ay",
      team: "8 kişi",
      year: "2023",
    },
  ]

  const categories = [
    { id: "all", label: { tr: "Tümü", en: "All", de: "Alle" }, icon: Zap },
    { id: "web", label: { tr: "Web", en: "Web", de: "Web" }, icon: Code },
    { id: "mobile", label: { tr: "Mobil", en: "Mobile", de: "Mobil" }, icon: Smartphone },
    { id: "ai", label: { tr: "AI/ML", en: "AI/ML", de: "KI/ML" }, icon: Brain },
    { id: "iot", label: { tr: "IoT", en: "IoT", de: "IoT" }, icon: Wifi },
    { id: "security", label: { tr: "Güvenlik", en: "Security", de: "Sicherheit" }, icon: Shield },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const translations = {
    tr: {
      title: "Projelerimiz",
      subtitle: "Gerçekleştirdiğimiz başarılı projeler ve çözümler",
      backHome: "Ana Sayfa",
      viewProject: "Projeyi İncele",
      technologies: "Teknolojiler",
      features: "Özellikler",
      duration: "Süre",
      team: "Ekip",
      year: "Yıl",
      closeProject: "Kapat",
      allProjects: "Tüm Projeler",
      projectCount: "proje",
      projectPrivacy: "🔒 Projelerimiz gizlilik anlaşmaları nedeniyle korunmaktadır. Detaylı bilgi için bizimle iletişime geçin.",
      getInfo: "Bilgi Al",
    },
    en: {
      title: "Our Projects",
      subtitle: "Successful projects and solutions we have implemented",
      backHome: "Home",
      viewProject: "View Project",
      technologies: "Technologies",
      features: "Features",
      duration: "Duration",
      team: "Team",
      year: "Year",
      closeProject: "Close",
      allProjects: "All Projects",
      projectCount: "projects",
      projectPrivacy: "🔒 Our projects are protected due to confidentiality agreements. Contact us for detailed information.",
      getInfo: "Get Info",
    },
    de: {
      title: "Unsere Projekte",
      subtitle: "Erfolgreiche Projekte und Lösungen, die wir umgesetzt haben",
      backHome: "Startseite",
      viewProject: "Projekt ansehen",
      technologies: "Technologien",
      features: "Funktionen",
      duration: "Dauer",
      team: "Team",
      year: "Jahr",
      closeProject: "Schließen",
      allProjects: "Alle Projekte",
      projectCount: "Projekte",
      projectPrivacy: "🔒 Unsere Projekte sind aufgrund von Vertraulichkeitsvereinbarungen geschützt. Kontaktieren Sie uns für detaillierte Informationen.",
      getInfo: "Info erhalten",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-35" />

      {/* Global nav is provided by layout */}

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 px-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">{t.subtitle}</p>
        </div>
      </section>

      <section className="pb-8 sm:pb-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 sm:px-6 border transition-all duration-300 min-h-[44px] touch-manipulation ${
                    isActive
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                      : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-bold text-sm">{category.label[language]}</span>
                </button>
              )
            })}
          </div>

          <div className="text-center text-white/60">
            <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> {t.projectCount}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project) => {
              const Icon = project.icon
              return (
                <div
                  key={project.id}
                  className="group relative border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer touch-manipulation"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title[language]}
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title[language]}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-white/60 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          <span>{project.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                      <div>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description[language]}
                        </p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold"
                        >
                          {t.viewProject}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}60, transparent)`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-400/30 bg-black/90 backdrop-blur-xl">
            <div className="p-8">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title[language]}
                    className="w-full h-64 object-cover mb-6"
                  />

                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title[language]}</h2>

                  <p className="text-white/90 leading-relaxed mb-6">{selectedProject.description[language]}</p>

                  <div className="p-4 bg-white/5 border border-white/20 rounded-lg">
                    <p className="text-white/80 text-sm text-center">
                      {t.projectPrivacy}
                    </p>
                    <Button 
                      className="mt-3 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold"
                      asChild
                    >
                      <Link href="/iletisim">
                        {t.getInfo}
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{t.technologies}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm bg-white/10 border border-white/20 text-white/90">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{t.features}</h3>
                    <ul className="space-y-2">
                      {selectedProject.features[language].map((feature, idx) => (
                        <li key={idx} className="text-white/80 flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{selectedProject.duration}</div>
                      <div className="text-sm text-white/60">{t.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{selectedProject.team}</div>
                      <div className="text-sm text-white/60">{t.team}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{selectedProject.year}</div>
                      <div className="text-sm text-white/60">{t.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
