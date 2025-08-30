'use client'

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-context"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
  Building,
  Rocket,
  Shield,
  Heart
} from "lucide-react"
import TrustedBrands from "@/components/trusted-brands"

export default function AboutPage() {
  const { language } = useLanguage()
  const canvasRef = useRef(null)
  const [activeTeamMember, setActiveTeamMember] = useState(null)

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: ["#3b82f6", "#8b5cf6", "#06b6d4"][Math.floor(Math.random() * 3)],
    }))

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const translations = {
    tr: {
      title: "Hakkımızda",
      subtitle: "Teknolojinin gücüyle geleceği inşa ediyoruz",
      ourStory: "Hikayemiz",
      storyContent: "PiramitTek olarak, 2024 yılında kurulan genç ve dinamik bir teknoloji şirketiyiz. Karmaşık problemleri basit ve zarif yazılım çözümlerine dönüştürme tutkumuzla, müşterilerimizin dijital dönüşüm yolculuklarında güvenilir bir partner olarak yer alıyoruz.",
      mission: "Misyonumuz",
      missionContent: "Teknolojinin sınırsız potansiyelini kullanarak işletmelerin büyümesine ve gelişmesine katkı sağlamak. Her projede mükemmelliği hedefleyerek, müşterilerimizin vizyonlarını gerçeğe dönüştürüyoruz.",
      vision: "Vizyonumuz",
      visionContent: "Küresel ölçekte tanınan, yenilikçi teknoloji çözümleri sunan lider bir yazılım şirketi olmak. Sürdürülebilir ve etik değerlerle, teknolojinin geleceğini şekillendirmek.",
      ourTeam: "Ekibimiz",
      teamSubtitle: "Tutkulu profesyonellerden oluşan uzman kadromuz",
      ourValues: "Değerlerimiz",
      innovation: "Yenilikçilik",
      innovationDesc: "Sürekli öğrenme ve gelişme kültürüyle, teknolojinin en son trendlerini takip ediyor ve uyguluyoruz.",
      quality: "Kalite",
      qualityDesc: "Her projede en yüksek kalite standartlarını hedefliyor, kod kalitesinden müşteri deneyimine kadar mükemmelliği arıyoruz.",
      trust: "Güven",
      trustDesc: "Şeffaflık ve dürüstlük ilkeleriyle hareket ediyor, müşterilerimizle uzun vadeli güvene dayalı ilişkiler kuruyoruz.",
      collaboration: "İşbirliği",
      collaborationDesc: "Takım çalışması ve açık iletişimle, müşterilerimizle birlikte başarıya ulaşıyoruz.",
      workCulture: "Çalışma Kültürümüz",
      workCultureDesc: "Modern ve yenilikçi çalışma yaklaşımımız",
      location: "İstanbul, Türkiye",
      contactUs: "Bizimle İletişime Geçin",
      joinTeam: "Ekibimize Katılın",
      stats: {
        projects: "Tamamlanan Proje",
        clients: "Mutlu Müşteri", 
        founding: "Kuruluş Yılı",
        team: "Uzman Ekip"
      }
    },
    en: {
      title: "About Us",
      subtitle: "Building the future with the power of technology",
      ourStory: "Our Story",
      storyContent: "As PiramitTek, we are a young and dynamic technology company founded in 2024. With our passion for transforming complex problems into simple and elegant software solutions, we stand as a reliable partner in our clients' digital transformation journeys.",
      mission: "Our Mission",
      missionContent: "To contribute to the growth and development of businesses using the limitless potential of technology. We transform our clients' visions into reality by aiming for excellence in every project.",
      vision: "Our Vision",
      visionContent: "To be a globally recognized leading software company providing innovative technology solutions. To shape the future of technology with sustainable and ethical values.",
      ourTeam: "Our Team",
      teamSubtitle: "Our expert team of passionate professionals",
      ourValues: "Our Values",
      innovation: "Innovation",
      innovationDesc: "We follow and apply the latest technology trends with a culture of continuous learning and development.",
      quality: "Quality",
      qualityDesc: "We aim for the highest quality standards in every project, seeking excellence from code quality to customer experience.",
      trust: "Trust",
      trustDesc: "We act with principles of transparency and honesty, building long-term trust-based relationships with our clients.",
      collaboration: "Collaboration",
      collaborationDesc: "We achieve success together with our clients through teamwork and open communication.",
      workCulture: "Our Work Culture",
      workCultureDesc: "Our modern and innovative work approach",
      location: "Istanbul, Turkey",
      contactUs: "Contact Us",
      joinTeam: "Join Our Team",
      stats: {
        projects: "Completed Projects",
        clients: "Happy Clients",
        founding: "Founded",
        team: "Expert Team"
      }
    },
    de: {
      title: "Über Uns",
      subtitle: "Die Zukunft mit der Kraft der Technologie gestalten",
      ourStory: "Unsere Geschichte",
      storyContent: "Als PiramitTek sind wir ein junges und dynamisches Technologieunternehmen, das 2024 gegründet wurde. Mit unserer Leidenschaft, komplexe Probleme in einfache und elegante Softwarelösungen zu verwandeln, stehen wir als zuverlässiger Partner auf den digitalen Transformationsreisen unserer Kunden.",
      mission: "Unsere Mission",
      missionContent: "Zum Wachstum und zur Entwicklung von Unternehmen beizutragen, indem wir das grenzenlose Potenzial der Technologie nutzen. Wir verwandeln die Visionen unserer Kunden in die Realität, indem wir in jedem Projekt nach Exzellenz streben.",
      vision: "Unsere Vision",
      visionContent: "Ein weltweit anerkanntes führendes Softwareunternehmen zu sein, das innovative Technologielösungen anbietet. Die Zukunft der Technologie mit nachhaltigen und ethischen Werten zu gestalten.",
      ourTeam: "Unser Team",
      teamSubtitle: "Unser Expertenteam aus leidenschaftlichen Fachleuten",
      ourValues: "Unsere Werte",
      innovation: "Innovation",
      innovationDesc: "Wir verfolgen und wenden die neuesten Technologietrends mit einer Kultur des kontinuierlichen Lernens und der Entwicklung an.",
      quality: "Qualität",
      qualityDesc: "Wir streben in jedem Projekt nach den höchsten Qualitätsstandards und suchen Exzellenz von der Codequalität bis zur Kundenerfahrung.",
      trust: "Vertrauen",
      trustDesc: "Wir handeln nach den Prinzipien von Transparenz und Ehrlichkeit und bauen langfristige vertrauensbasierte Beziehungen zu unseren Kunden auf.",
      collaboration: "Zusammenarbeit",
      collaborationDesc: "Wir erreichen gemeinsam mit unseren Kunden Erfolg durch Teamarbeit und offene Kommunikation.",
      workCulture: "Unsere Arbeitskultur",
      workCultureDesc: "Unser moderner und innovativer Arbeitsansatz",
      location: "Istanbul, Türkei",
      contactUs: "Kontaktieren Sie uns",
      joinTeam: "Unserem Team beitreten",
      stats: {
        projects: "Abgeschlossene Projekte",
        clients: "Zufriedene Kunden",
        founding: "Gegründet",
        team: "Expertenteam"
      }
    }
  }

  const t = translations[language]

  // Team members data - actual team from piramittek.com
  const teamMembers = [
    {
      id: 1,
      name: "Süleyman Beyt Baylas",
      role: "CEO",
      image: "/beytBaylas.jpeg", // From piramittek.com
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 2,
      name: "Tahir Erdogan",
      role: "CFO",
      image: "/tahirErdogan.jpeg", // From piramittek.com
      linkedin: "#"
    },
    {
      id: 3,
      name: "Umut Piynar",
      role: "CTO",
      image: "/umutPiynar.png", // From piramittek.com
      linkedin: "#",
      github: "#"
    }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: t.innovation,
      description: t.innovationDesc,
      color: "#3b82f6"
    },
    {
      icon: Award,
      title: t.quality,
      description: t.qualityDesc,
      color: "#8b5cf6"
    },
    {
      icon: Shield,
      title: t.trust,
      description: t.trustDesc,
      color: "#06b6d4"
    },
    {
      icon: Heart,
      title: t.collaboration,
      description: t.collaborationDesc,
      color: "#10b981"
    }
  ]

  const stats = [
    { number: "10+", label: t.stats.projects },
    { number: "8+", label: t.stats.clients },
    { number: "2024", label: t.stats.founding },
    { number: "3", label: t.stats.team }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 border-2 border-cyan-400 rotate-45 animate-spin-slow" />
                <div className="absolute inset-2 border border-purple-400 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
                }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {t.ourStory}
                </h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  {t.storyContent}
                </p>
                <div className="flex gap-4">
                  <div className="w-2 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t.mission}</h3>
                      <p className="text-white/70 text-sm">{t.missionContent}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t.vision}</h3>
                      <p className="text-white/70 text-sm">{t.visionContent}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl animate-pulse" />
                  <div className="absolute inset-4 border-2 border-cyan-400/30 rounded-2xl" />
                  <div className="absolute inset-8 border border-purple-400/30 rounded-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 border-2 border-cyan-400 rotate-45 animate-spin-slow" />
                      <div className="absolute inset-4 border border-purple-400 rotate-45 animate-spin-reverse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t.ourValues}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: value.color + "20", border: `2px solid ${value.color}` }}
                  >
                    <Icon size={24} style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t.ourTeam}
            </h2>
            <p className="text-white/70">{t.teamSubtitle}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative"
                onMouseEnter={() => setActiveTeamMember(member.id)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
                  {/* Team member photo */}
                  <div className="aspect-square relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
                      activeTeamMember === member.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex items-center justify-center h-full gap-3">
                        {member.linkedin && (
                          <a href={member.linkedin} className="p-2 bg-white/10 rounded-lg hover:bg-cyan-400/20 transition-colors">
                            <Linkedin size={20} className="text-white" />
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} className="p-2 bg-white/10 rounded-lg hover:bg-cyan-400/20 transition-colors">
                            <Github size={20} className="text-white" />
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} className="p-2 bg-white/10 rounded-lg hover:bg-cyan-400/20 transition-colors">
                            <Twitter size={20} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Work Culture Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t.workCulture}
              </h2>
              <p className="text-white/70">{t.workCultureDesc}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Work Environment Inspiration */}
              <div className="space-y-4">
                <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/office/modern-office-workspace.jpg"
                    alt="Modern workspace inspiration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <div className="flex items-center gap-2 text-white">
                      <Rocket size={20} className="text-cyan-400" />
                      <span>{language === "tr" ? "Geleceği birlikte inşa ediyoruz" : language === "en" ? "Building the future together" : "Gemeinsam die Zukunft gestalten"}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/office/office-hallway.jpg"
                      alt="Professional environment"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/office/workspace-desk.jpg"
                      alt="Modern workspace"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              
              {/* Work Culture Features */}
              <div className="space-y-6">
                <div className="p-6 border border-white/10 bg-black/50 backdrop-blur-sm rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">{language === "tr" ? "Çalışma Prensiblerimiz" : language === "en" ? "Our Work Principles" : "Unsere Arbeitsprinzipien"}</h3>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span>{language === "tr" ? "Uzaktan ve esnek çalışma modeli" : language === "en" ? "Remote and flexible work model" : "Remote und flexibles Arbeitsmodell"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>{language === "tr" ? "Sürekli öğrenme ve gelişim fırsatları" : language === "en" ? "Continuous learning and development opportunities" : "Kontinuierliche Lern- und Entwicklungsmöglichkeiten"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>{language === "tr" ? "Açık iletişim ve şeffaflık" : language === "en" ? "Open communication and transparency" : "Offene Kommunikation und Transparenz"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>{language === "tr" ? "İnovasyon odaklı takım çalışması" : language === "en" ? "Innovation-focused teamwork" : "Innovationsorientierte Teamarbeit"}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold w-full sm:flex-1"
                    asChild
                  >
                    <Link href="/iletisim">
                      {t.contactUs}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold bg-transparent w-full sm:flex-1"
                  >
                    {t.joinTeam}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 sm:p-12 border border-cyan-400/30 bg-black/70 backdrop-blur-xl rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {language === "tr" 
                    ? "Projelerinizi Birlikte Hayata Geçirelim"
                    : language === "en"
                    ? "Let's Bring Your Projects to Life Together"
                    : "Lassen Sie uns Ihre Projekte gemeinsam zum Leben erwecken"}
                </h2>
                <p className="text-white/80 mb-8">
                  {language === "tr" 
                    ? "Teknoloji yolculuğunuzda güvenilir partneriniz olmaktan mutluluk duyarız."
                    : language === "en"
                    ? "We would be happy to be your reliable partner in your technology journey."
                    : "Wir würden uns freuen, Ihr zuverlässiger Partner auf Ihrer Technologiereise zu sein."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black px-8 py-4 font-bold"
                    asChild
                  >
                    <Link href="/iletisim">
                      {language === "tr" ? "İletişime Geç" : language === "en" ? "Contact Us" : "Kontaktieren Sie uns"}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 px-8 py-4 font-bold bg-transparent"
                    asChild
                  >
                    <Link href="/projeler">
                      {language === "tr" ? "Projelerimizi İncele" : language === "en" ? "View Our Projects" : "Unsere Projekte ansehen"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}