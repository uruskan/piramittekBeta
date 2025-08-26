"use client"

import { useMemo } from "react"
import { CheckCircle, Code, Users, Rocket, TestTube, Wrench } from "lucide-react"

const icons = [Users, Code, TestTube, CheckCircle, Rocket, Wrench]

export default function ProcessTimeline({ steps = [], onStepClick }) {
  const enriched = useMemo(() => steps.map((s, i) => ({
    label: s,
    Icon: icons[i % icons.length],
    color: ["#06b6d4", "#8b5cf6", "#3b82f6", "#22c55e", "#eab308", "#f97316"][i % 6],
  })), [steps])

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute left-4 right-4 top-5 h-[2px] bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-blue-400/40" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {enriched.map(({ label, Icon, color }, idx) => (
          <div
            key={idx}
            data-proc-card
            onClick={onStepClick ? () => onStepClick(idx) : undefined}
            className="relative p-6 border border-white/10 bg-black/60 backdrop-blur-xl hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            <div className="absolute -top-3 left-6 w-6 h-6 rounded-full" style={{ background: `${color}33`, boxShadow: `0 0 16px ${color}55` }} />
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-md" style={{ background: `${color}22`, border: `1px solid ${color}` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-xs text-white/60">{idx + 1}</span>
            </div>
            <p className="text-white/85 text-sm leading-relaxed">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
