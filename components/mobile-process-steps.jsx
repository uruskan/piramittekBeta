"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function MobileProcessSteps({ items }) {
  const [expandedItem, setExpandedItem] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
        >
          <button
            onClick={() => setExpandedItem(expandedItem === index ? -1 : index)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-xs font-bold text-cyan-400">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-white/60 mt-1 line-clamp-1">{item.desc}</p>
              </div>
            </div>
            {expandedItem === index ? (
              <ChevronDown size={16} className="text-cyan-400" />
            ) : (
              <ChevronRight size={16} className="text-white/60" />
            )}
          </button>
          
          {expandedItem === index && (
            <div className="px-4 pb-4 border-t border-white/10">
              <p className="text-sm text-white/80 mb-3">{item.desc}</p>
              <ul className="space-y-1">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-xs text-white/70 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}