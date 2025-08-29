"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Building, Globe, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

import { useLanguage } from "@/components/language-context"

export default function ContactPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    honey_pot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 4 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: ["#06b6d4", "#8b5cf6", "#10b981"][Math.floor(Math.random() * 3)],
      pulsePhase: Math.random() * Math.PI * 2,
    }))

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Update and draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            const alpha = (1 - distance / 200) * 0.3
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Add data packets flowing along connections
            if (distance < 150) {
              const progress = (time * 0.5 + i * 0.1) % 1
              const packetX = node.x + (otherNode.x - node.x) * progress
              const packetY = node.y + (otherNode.y - node.y) * progress

              ctx.beginPath()
              ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
              ctx.fillStyle = "#06b6d4"
              ctx.fill()
            }
          }
        })
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Pulsing effect
        const pulseSize = node.radius + Math.sin(time * 2 + node.pulsePhase) * 2

        // Outer glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize + 4, 0, Math.PI * 2)
        ctx.fillStyle = node.color + "20"
        ctx.fill()

        // Main node
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle =
          node.color +
          Math.floor(node.opacity * 255)
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  

  const services = [
    { value: "software", label: { tr: "Yazılım Geliştirme", en: "Software Development", de: "Softwareentwicklung" } },
    { value: "ai", label: { tr: "Yapay Zeka & ML", en: "AI & Machine Learning", de: "KI & Maschinelles Lernen" } },
    { value: "iot", label: { tr: "IoT & Otomasyon", en: "IoT & Automation", de: "IoT & Automatisierung" } },
    { value: "security", label: { tr: "Siber Güvenlik", en: "Cybersecurity", de: "Cybersicherheit" } },
    { value: "mobile", label: { tr: "Mobil Geliştirme", en: "Mobile Development", de: "Mobile Entwicklung" } },
    { value: "consulting", label: { tr: "IT Danışmanlık", en: "IT Consulting", de: "IT-Beratung" } },
  ]

  const translations = {
    tr: {
      title: "İletişim",
      subtitle: "Projeleriniz için bizimle iletişime geçin",
      backHome: "Ana Sayfa",
      contactInfo: "İletişim Bilgileri",
      email: "E-posta",
      address: "Adres",
      getInTouch: "Bize Ulaşın",
      name: "Ad Soyad",
      email: "E-posta",
      company: "Şirket",
      phone: "Telefon",
      service: "Hizmet Seçin",
      message: "Mesajınız",
      send: "Gönder",
      sending: "Gönderiliyor...",
      thankYou: "Teşekkürler!",
      successMessage: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      officeHours: "Çalışma Saatleri",
      mondayFriday: "Pazartesi - Cuma: 09:00 - 18:00",
      responseTime: "Yanıt Süresi",
      within24Hours: "24 saat içinde",
      selectService: "Hizmet seçin...",
    },
    en: {
      title: "Contact",
      subtitle: "Get in touch with us for your projects",
      backHome: "Home",
      contactInfo: "Contact Information",
      email: "Email",
      address: "Address",
      getInTouch: "Get In Touch",
      name: "Full Name",
      email: "Email",
      company: "Company",
      phone: "Phone",
      service: "Select Service",
      message: "Your Message",
      send: "Send",
      sending: "Sending...",
      thankYou: "Thank You!",
      successMessage: "Your message has been sent successfully. We will get back to you as soon as possible.",
      officeHours: "Office Hours",
      mondayFriday: "Monday - Friday: 09:00 - 18:00",
      responseTime: "Response Time",
      within24Hours: "Within 24 hours",
      selectService: "Select service...",
    },
    de: {
      title: "Kontakt",
      subtitle: "Kontaktieren Sie uns für Ihre Projekte",
      backHome: "Startseite",
      contactInfo: "Kontaktinformationen",
      email: "E-Mail",
      address: "Adresse",
      getInTouch: "Kontakt aufnehmen",
      name: "Vollständiger Name",
      email: "E-Mail",
      company: "Unternehmen",
      phone: "Telefon",
      service: "Service auswählen",
      message: "Ihre Nachricht",
      send: "Senden",
      sending: "Wird gesendet...",
      thankYou: "Vielen Dank!",
      successMessage:
        "Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei Ihnen melden.",
      officeHours: "Bürozeiten",
      mondayFriday: "Montag - Freitag: 09:00 - 18:00",
      responseTime: "Antwortzeit",
      within24Hours: "Innerhalb von 24 Stunden",
      selectService: "Service auswählen...",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />

      {/* Global nav is provided by layout */}

      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="relative">
              <div className="p-8 border border-cyan-400/30 bg-black/70 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                    <MessageSquare className="text-cyan-400" />
                    {t.getInTouch}
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-green-400 mb-4">{t.thankYou}</h3>
                      <p className="text-white/80 leading-relaxed">{t.successMessage}</p>
                    </div>
                  ) : (
                    <form action="https://formspree.io/f/xpwqvaqn" method="POST" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 mb-2 text-sm font-bold">{t.name} *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[44px] touch-manipulation"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 mb-2 text-sm font-bold">{t.email} *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[44px] touch-manipulation"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 mb-2 text-sm font-bold">{t.company}</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[44px] touch-manipulation"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 mb-2 text-sm font-bold">{t.phone}</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[44px] touch-manipulation"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2 text-sm font-bold">{t.service}</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[44px] touch-manipulation"
                        >
                          <option value="">{t.selectService}</option>
                          {services.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label[language]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2 text-sm font-bold">{t.message} *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full p-3 bg-black/50 border border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <div className="absolute opacity-0 h-0 w-0">
                        <label>
                          Don't fill this out if you're human:
                          <input
                            type="text"
                            name="honey_pot"
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.honey_pot}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold py-4 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                            {t.sending}
                          </>
                        ) : (
                          <>
                            <Send size={16} className="mr-2" />
                            {t.send}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="p-8 border border-purple-400/30 bg-black/70 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                    <Building className="text-purple-400" />
                    {t.contactInfo}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-white mb-1">{t.email}</h3>
                        <p className="text-white/80">contact@piramittek.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-white mb-1">{t.address}</h3>
                        <p className="text-white/80">
                          {language === "tr" ? "Teknokent Binası" : language === "en" ? "Technology Center Building" : "Technologiezentrum Gebäude"}
                          <br />
                          {language === "tr" ? "İstanbul, Türkiye" : language === "en" ? "Istanbul, Turkey" : "Istanbul, Türkei"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-white mb-1">{t.officeHours}</h3>
                        <p className="text-white/80">{t.mondayFriday}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Globe className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-white mb-1">{t.responseTime}</h3>
                        <p className="text-white/80">{t.within24Hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-6 border border-green-400/30 bg-black/70 backdrop-blur-xl">
                <div className="text-center">
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {language === "tr"
                      ? "Ücretsiz Konsültasyon"
                      : language === "en"
                        ? "Free Consultation"
                        : "Kostenlose Beratung"}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {language === "tr"
                      ? "İlk görüşme tamamen ücretsizdir. Projenizi değerlendirip size en uygun çözümü öneriyoruz."
                      : language === "en"
                        ? "The first consultation is completely free. We evaluate your project and suggest the most suitable solution."
                        : "Die erste Beratung ist völlig kostenlos. Wir bewerten Ihr Projekt und schlagen die am besten geeignete Lösung vor."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
