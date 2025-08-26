"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ServiceCard({ title, description, icon: Icon, gradient = "from-primary to-accent" }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer triangle-clip ${isHovered ? "animate-pulse-glow" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      />
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 triangle-clip transform rotate-45 translate-x-10 -translate-y-10" />

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <CardDescription className="text-muted-foreground mb-4 leading-relaxed">{description}</CardDescription>
        <Button variant="ghost" size="sm" className="group/btn p-0 h-auto font-medium text-primary hover:text-accent">
          Daha Fazla Bilgi
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
