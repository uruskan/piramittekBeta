"use client"

import { Button } from "@/components/ui/button"
import { Pyramid3D } from "./pyramid-3d"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-noir-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 triangle-clip bg-primary/5 animate-triangle-morph" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 triangle-clip bg-accent/5 animate-triangle-morph"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 triangle-clip bg-primary/10 animate-triangle-morph"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 3D Pyramid */}
          <div className="mb-8 flex justify-center">
            <Pyramid3D size={300} className="animate-rotate-3d" />
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
            İnovatif Yazılım Çözümleri
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Karmaşık fikirleri zarif yazılımlara dönüştürüyoruz
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium animate-pulse-glow group"
              onClick={scrollToServices}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Hizmetlerimizi Keşfedin
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent"
            >
              İletişime Geçin
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 text-primary mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
