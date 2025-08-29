'use client'

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Brain, Wifi, Shield, Smartphone, Users, ArrowLeft, ExternalLink, ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import MobileServiceCard from "@/components/mobile-service-card"

export default function ServicesPage() {
  const { language } = useLanguage()
  const [activeService, setActiveService] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"][Math.floor(Math.random() * 4)],
    }))

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw and update particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const services = [
    {
      id: "software",
      title: {
        tr: "Özel Yazılım & Ürün Geliştirme",
        en: "Custom Software & Product Development",
        de: "Individuelle Software- & Produktentwicklung",
      },
      icon: Code,
      color: "#3B82F6",
      description: {
        tr: "İşletmenizin özel ihtiyaçlarına yönelik, ölçeklenebilir ve güvenli yazılım çözümleri üretiyoruz.",
        en: "We build scalable and secure software solutions tailored to your business's specific needs.",
        de: "Wir erstellen skalierbare und sichere Softwarelösungen, die auf die spezifischen Anforderungen Ihres Unternehmens zugeschnitten sind.",
      },
      features: {
        tr: ["Kurumsal Web Uygulamaları", "Mobil Uygulamalar (iOS & Android)", "SaaS Platformları", "API Tasarımı ve Geliştirme"],
        en: ["Enterprise Web Applications", "Mobile Apps (iOS & Android)", "SaaS Platforms", "API Design and Development"],
        de: ["Unternehmens-Webanwendungen", "Mobile Apps (iOS & Android)", "SaaS-Plattformen", "API-Design und -Entwicklung"],
      },
      technologies: ["React", "Next.js", "Node.js", "Python", "Java", "Go", "PostgreSQL", "MongoDB", "AWS", "Azure", "GCP", "Docker", "Kubernetes"],
      caseStudies: [
        {
          title: {
            tr: "E-ticaret Platformu",
            en: "E-commerce Platform",
            de: "E-Commerce-Plattform",
          },
          link: "#",
        },
        {
          title: {
            tr: "Fintech Uygulaması",
            en: "Fintech Application",
            de: "Fintech-Anwendung",
          },
          link: "#",
        },
      ],
    },
    {
      id: "architecture",
      title: {
        tr: "Kurumsal Mimari",
        en: "Enterprise Architecture",
        de: "Unternehmensarchitektur",
      },
      icon: Users,
      color: "#8B5CF6",
      description: {
        tr: "Teknoloji ve iş stratejilerinizi uyumlu hale getiren, geleceğe dönük ve sağlam mimari planlar oluşturuyoruz.",
        en: "We create future-proof and robust architectural plans that align your technology and business strategies.",
        de: "Wir erstellen zukunftssichere und robuste Architekturpläne, die Ihre Technologie- und Geschäftsstrategien aufeinander abstimmen.",
      },
      features: {
        tr: ["Teknoloji Yol Haritası", "Sistem Entegrasyonu", "Mikroservis Mimarisi", "API Yönetimi", "Veri Mimarisi"],
        en: ["Technology Roadmap", "System Integration", "Microservice Architecture", "API Management", "Data Architecture"],
        de: ["Technologie-Roadmap", "Systemintegration", "Microservice-Architektur", "API-Management", "Datenarchitektur"],
      },
      technologies: ["TOGAF", "ArchiMate", "DDD", "Event-Driven Architecture", "API Gateway", "Service Mesh"],
      caseStudies: [
        {
          title: {
            tr: "Banka Sistemi Modernizasyonu",
            en: "Banking System Modernization",
            de: "Modernisierung des Banksystems",
          },
          link: "#",
        },
      ],
    },
    {
      id: "platform-engineering",
      title: {
        tr: "Platform Mühendisliği",
        en: "Platform Engineering",
        de: "Plattform-Engineering",
      },
      icon: Code,
      color: "#10B981",
      description: {
        tr: "Geliştirme ekiplerinizin verimliliğini artıran, self-servis ve otomatize edilmiş iç geliştirici platformları (IDP) kuruyoruz.",
        en: "We build self-service and automated internal developer platforms (IDPs) that increase the efficiency of your development teams.",
        de: "Wir erstellen Self-Service- und automatisierte interne Entwicklerplattformen (IDPs), die die Effizienz Ihrer Entwicklungsteams steigern.",
      },
      features: {
        tr: ["Internal Developer Platform (IDP)", "CI/CD Otomasyonu", "Geliştirici Portalı", "Gözlemlenebilirlik Platformu"],
        en: ["Internal Developer Platform (IDP)", "CI/CD Automation", "Developer Portal", "Observability Platform"],
        de: ["Interne Entwicklerplattform (IDP)", "CI/CD-Automatisierung", "Entwicklerportal", "Beobachtbarkeitsplattform"],
      },
      technologies: ["Kubernetes", "Terraform", "Ansible", "Backstage", "ArgoCD", "Jenkins", "GitLab CI", "Prometheus", "Grafana"],
      caseStudies: [],
    },
    {
      id: "sre-devops",
      title: {
        tr: "SRE/DevOps & CI/CD",
        en: "SRE/DevOps & CI/CD",
        de: "SRE/DevOps & CI/CD",
      },
      icon: Rocket,
      color: "#EF4444",
      description: {
        tr: "Yazılım teslimat süreçlerinizi hızlandıran, güvenilirliği ve verimliliği artıran otomasyon çözümleri sunuyoruz.",
        en: "We provide automation solutions that accelerate your software delivery processes, increasing reliability and efficiency.",
        de: "Wir bieten Automatisierungslösungen, die Ihre Software-Bereitstellungsprozesse beschleunigen und die Zuverlässigkeit und Effizienz erhöhen.",
      },
      features: {
        tr: ["CI/CD Pijpline Kurulumu", "Altyapı Otomasyonu (IaC)", "Konteynerizasyon", "Gözlemlenebilirlik ve İzleme"],
        en: ["CI/CD Pipeline Setup", "Infrastructure as Code (IaC)", "Containerization", "Observability and Monitoring"],
        de: ["CI/CD-Pipeline-Einrichtung", "Infrastruktur als Code (IaC)", "Containerisierung", "Beobachtbarkeit und Überwachung"],
      },
      technologies: ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitLab CI", "Prometheus", "Grafana", "ELK Stack"],
      caseStudies: [],
    },
    {
      id: "cloud",
      title: {
        tr: "Bulut (AWS/Azure/GCP)",
        en: "Cloud (AWS/Azure/GCP)",
        de: "Cloud (AWS/Azure/GCP)",
      },
      icon: Wifi,
      color: "#F59E0B",
      description: {
        tr: "İş yüklerinizi buluta taşıyor, optimize ediyor ve yönetiyoruz. Güvenli ve ölçeklenebilir bulut altyapıları tasarlıyoruz.",
        en: "We migrate, optimize, and manage your workloads in the cloud. We design secure and scalable cloud infrastructures.",
        de: "Wir migrieren, optimieren und verwalten Ihre Workloads in der Cloud. Wir entwerfen sichere und skalierbare Cloud-Infrastrukturen.",
      },
      features: {
        tr: ["Bulut Stratejisi ve Geçiş", "Altyapı Otomasyonu (IaC)", "Landing Zone Kurulumu", "Maliyet Optimizasyonu"],
        en: ["Cloud Strategy and Migration", "Infrastructure as Code (IaC)", "Landing Zone Setup", "Cost Optimization"],
        de: ["Cloud-Strategie und -Migration", "Infrastruktur als Code (IaC)", "Landing-Zone-Einrichtung", "Kostenoptimierung"],
      },
      technologies: ["AWS", "Azure", "Google Cloud Platform", "Terraform", "CloudFormation", "ARM Templates", "Kubernetes (EKS, AKS, GKE)"],
      caseStudies: [],
    },
    {
      id: "data-ai-ml",
      title: {
        tr: "Veri & AI/ML",
        en: "Data & AI/ML",
        de: "Daten & KI/ML",
      },
      icon: Brain,
      color: "#06B6D4",
      description: {
        tr: "Verilerinizi değerli içgörülere dönüştüren, yapay zeka ve makine öğrenmesi destekli çözümler geliştiriyoruz.",
        en: "We develop AI and machine learning powered solutions that turn your data into valuable insights.",
        de: "Wir entwickeln KI- und maschinengestützte Lösungen, die Ihre Daten in wertvolle Erkenntnisse umwandeln.",
      },
      features: {
        tr: ["Veri Pijpline'ları", "MLOps", "Büyük Veri Analitiği", "Doğal Dil İşleme (NLP)", "Bilgisayarlı Görü"],
        en: ["Data Pipelines", "MLOps", "Big Data Analytics", "Natural Language Processing (NLP)", "Computer Vision"],
        de: ["Datenpipelines", "MLOps", "Big-Data-Analytik", "Verarbeitung natürlicher Sprache (NLP)", "Computer Vision"],
      },
      technologies: ["Python", "R", "Spark", "Kafka", "Airflow", "Kubeflow", "TensorFlow", "PyTorch", "scikit-learn"],
      caseStudies: [],
    },
    {
      id: "security",
      title: {
        tr: "Güvenlik",
        en: "Security",
        de: "Sicherheit",
      },
      icon: Shield,
      color: "#3B82F6",
      description: {
        tr: "Uygulama ve altyapı güvenliğinizi sağlıyor, tehditleri proaktif olarak yönetiyoruz.",
        en: "We secure your application and infrastructure, proactively managing threats.",
        de: "Wir sichern Ihre Anwendung und Infrastruktur und verwalten Bedrohungen proaktiv.",
      },
      features: {
        tr: ["Uygulama Güvenliği (AppSec)", "Tehdit Modelleme", "Sıfır Güven Mimarisi", "SAST/DAST", "SOC2/ISO27001 Hazırlığı"],
        en: ["Application Security (AppSec)", "Threat Modeling", "Zero Trust Architecture", "SAST/DAST", "SOC2/ISO27001 Readiness"],
        de: ["Anwendungssicherheit (AppSec)", "Bedrohungsmodellierung", "Zero-Trust-Architektur", "SAST/DAST", "SOC2/ISO27001-Bereitschaft"],
      },
      technologies: ["OWASP", "NIST", "CIS Benchmarks", "Snyk", "Checkmarx", "Veracode", "Wazuh", "SIEM"],
      caseStudies: [],
    },
    {
      id: "mobile",
      title: {
        tr: "Mobil",
        en: "Mobile",
        de: "Mobil",
      },
      icon: Smartphone,
      color: "#8B5CF6",
      description: {
        tr: "Kullanıcı dostu ve performans odaklı, iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz.",
        en: "We develop user-friendly and performance-oriented native and cross-platform mobile applications for iOS and Android platforms.",
        de: "Wir entwickeln benutzerfreundliche und leistungsorientierte native und plattformübergreifende mobile Anwendungen für iOS- und Android-Plattformen.",
      },
      features: {
        tr: ["Native iOS (Swift)", "Native Android (Kotlin)", "Cross-Platform (React Native, Flutter)", "Mobil UI/UX Tasarımı"],
        en: ["Native iOS (Swift)", "Native Android (Kotlin)", "Cross-Platform (React Native, Flutter)", "Mobile UI/UX Design"],
        de: ["Natives iOS (Swift)", "Natives Android (Kotlin)", "Plattformübergreifend (React Native, Flutter)", "Mobiles UI/UX-Design"],
      },
      technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Realm", "CoreData"],
      caseStudies: [],
    },
    {
      id: "iot",
      title: {
        tr: "IoT",
        en: "IoT",
        de: "IoT",
      },
      icon: Wifi,
      color: "#10B981",
      description: {
        tr: "Fiziksel dünyayı dijital sistemlere bağlayan, akıllı ve bağlantılı cihaz çözümleri sunuyoruz.",
        en: "We provide smart and connected device solutions that connect the physical world to digital systems.",
        de: "Wir bieten intelligente und vernetzte Gerätelösungen, die die physische Welt mit digitalen Systemen verbinden.",
      },
      features: {
        tr: ["Gömülü Sistemler", "Sensör Entegrasyonu", "Cihaz Yönetimi", "Veri Toplama ve Analizi"],
        en: ["Embedded Systems", "Sensor Integration", "Device Management", "Data Collection and Analysis"],
        de: ["Eingebettete Systeme", "Sensorintegration", "Geräteverwaltung", "Datenerfassung und -analyse"],
      },
      technologies: ["C/C++", "Python", "MQTT", "CoAP", "LoRaWAN", "Zephyr", "FreeRTOS", "Azure IoT Hub", "AWS IoT Core"],
      caseStudies: [],
    },
    {
      id: "ux",
      title: {
        tr: "UX",
        en: "UX",
        de: "UX",
      },
      icon: Users,
      color: "#EF4444",
      description: {
        tr: "Kullanıcılarınızı anlayan, onlara keyifli ve verimli bir deneyim sunan sezgisel arayüzler tasarlıyoruz.",
        en: "We design intuitive interfaces that understand your users and provide them with an enjoyable and efficient experience.",
        de: "Wir gestalten intuitive Benutzeroberflächen, die Ihre Benutzer verstehen und ihnen ein angenehmes und effizientes Erlebnis bieten.",
      },
      features: {
        tr: ["Kullanıcı Araştırması", "Persona ve Senaryo Geliştirme", "Wireframing ve Prototipleme", "Kullanılabilirlik Testleri"],
        en: ["User Research", "Persona and Scenario Development", "Wireframing and Prototyping", "Usability Testing"],
        de: ["Benutzerforschung", "Persona- und Szenarioentwicklung", "Wireframing und Prototyping", "Benutzerfreundlichkeitstests"],
      },
      technologies: ["Figma", "Sketch", "Adobe XD", "InVision", "Maze", "UserTesting.com"],
      caseStudies: [],
    },
  ]

  const translations = {
    tr: {
      title: "Hizmetlerimiz",
      subtitle: "Teknoloji alanında sunduğumuz profesyonel çözümler",
      backHome: "Ana Sayfa",
      features: "Özellikler",
      technologies: "Teknolojiler",
      getQuote: "Teklif Al",
      learnMore: "Daha Fazla Bilgi",
      caseStudies: "Örnek Projeler",
    },
    en: {
      title: "Our Services",
      subtitle: "Professional solutions we offer in technology",
      backHome: "Home",
      features: "Features",
      technologies: "Technologies",
      getQuote: "Get Quote",
      learnMore: "Learn More",
      caseStudies: "Case Studies",
    },
    de: {
      title: "Unsere Dienstleistungen",
      subtitle: "Professionelle Lösungen, die wir in der Technologie anbieten",
      backHome: "Startseite",
      features: "Funktionen",
      technologies: "Technologien",
      getQuote: "Angebot erhalten",
      learnMore: "Mehr erfahren",
      caseStudies: "Fallstudien",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-35" />

      {/* Global nav is provided by layout */}

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 border-2 border-cyan-400 rotate-45 animate-spin-slow" />
              <div className="absolute inset-2 border border-purple-400 rotate-45 animate-spin-reverse" />
              <div className="absolute inset-4 border border-blue-400 rotate-45 animate-spin-slow" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 px-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile Collapsible Cards */}
          <div className="block md:hidden space-y-3 max-w-2xl mx-auto">
            {services.map((service) => (
              <MobileServiceCard
                key={service.id}
                service={service}
                language={language}
                t={t}
                onGetQuote={() => window.location.href = '/iletisim'}
              />
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className="group relative p-4 sm:p-6 lg:p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 touch-manipulation"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
                    transform: `perspective(1000px) rotateX(${index % 2 === 0 ? "2deg" : "-2deg"}) rotateY(${index % 3 === 0 ? "1deg" : "-1deg"})`,
                  }}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: service.color + "20", border: `2px solid ${service.color}` }}
                      >
                        <Icon size={32} style={{ color: service.color }} className="group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {service.title[language]}
                      </h3>
                    </div>

                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{service.description[language]}</p>

                    <div className="mb-6">
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{t.features}:</h4>
                      <ul className="space-y-2">
                        {service.features[language].map((feature, idx) => (
                          <li key={idx} className="text-white/70 text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{t.technologies}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-white/10 border border-white/20 text-white/80 hover:border-cyan-400/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {service.caseStudies && service.caseStudies.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-white mb-3">{t.caseStudies}:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {service.caseStudies.map((study, idx) => (
                            <div key={idx} className="bg-white/5 p-3 border border-white/10 hover:border-cyan-400/50 transition-colors">
                              <p className="font-bold text-sm text-white/90">{study.title[language]}</p>
                              <a href={study.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">
                                {t.learnMore} <ArrowRight className="inline w-3 h-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold flex-1 min-h-[44px] touch-manipulation"
                      >
                        <Link href="/iletisim">{t.getQuote}</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 bg-transparent min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                      >
                        <Link href="/projeler">
                          <ExternalLink size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                      activeService === service.id ? "animate-pulse" : ""
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${service.color}60, transparent)`,
                    }}
                  />

                  <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-cyan-400 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity animate-spin-slow" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 border border-purple-400 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity animate-spin-reverse" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 px-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {language === "tr"
                ? "Projenizi Hayata Geçirelim"
                : language === "en"
                  ? "Let's Bring Your Project to Life"
                  : "Lassen Sie uns Ihr Projekt zum Leben erwecken"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed px-4">
              {language === "tr"
                ? "Teknoloji ihtiyaçlarınız için özel çözümler geliştirmeye hazırız. Projelerinizi birlikte planlayalım."
                : language === "en"
                  ? "We're ready to develop custom solutions for your technology needs. Let's plan your projects together."
                  : "Wir sind bereit, maßgeschneiderte Lösungen für Ihre Technologiebedürfnisse zu entwickeln. Lassen Sie uns Ihre Projekte gemeinsam planen."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black px-12 py-6 font-bold transform hover:scale-105 transition-all duration-300 min-h-[44px] touch-manipulation"
              >
                <Link href="/iletisim">
                  {language === "tr"
                    ? "Ücretsiz Konsültasyon"
                    : language === "en"
                      ? "Free Consultation"
                      : "Kostenlose Beratung"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-12 py-6 font-bold transform hover:scale-105 transition-all duration-300 bg-transparent min-h-[44px] touch-manipulation"
              >
                <Link href="/projeler">
                  {language === "tr"
                    ? "Portföyümüzü İnceleyin"
                    : language === "en"
                      ? "View Our Portfolio"
                      : "Unser Portfolio ansehen"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}