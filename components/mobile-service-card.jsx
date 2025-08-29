"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MobileServiceCard({ service, language, t, onGetQuote }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = service.icon

  return (
    <div className="border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: service.color + "20", border: `1px solid ${service.color}` }}
          >
            <Icon size={20} style={{ color: service.color }} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white line-clamp-1">
              {service.title[language]}
            </h3>
            <p className="text-xs text-white/60 line-clamp-1 mt-1">
              {service.description[language]}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronDown size={16} className="text-cyan-400 flex-shrink-0 ml-2" />
        ) : (
          <ChevronRight size={16} className="text-white/60 flex-shrink-0 ml-2" />
        )}
      </button>
      
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/10 space-y-4">
          <p className="text-sm text-white/80 leading-relaxed">
            {service.description[language]}
          </p>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-2">{t.features}:</h4>
            <ul className="grid grid-cols-1 gap-1">
              {service.features[language].slice(0, 4).map((feature, idx) => (
                <li key={idx} className="text-xs text-white/70 flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-2">{t.technologies}:</h4>
            <div className="flex flex-wrap gap-1">
              {service.technologies.slice(0, 6).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-white/10 border border-white/20 text-white/80 rounded"
                >
                  {tech}
                </span>
              ))}
              {service.technologies.length > 6 && (
                <span className="px-2 py-1 text-xs text-white/60">
                  +{service.technologies.length - 6} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={onGetQuote}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold flex-1 text-xs py-2"
            >
              {t.getQuote}
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 bg-transparent px-3"
            >
              <Link href="/projeler">
                <ExternalLink size={14} />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}