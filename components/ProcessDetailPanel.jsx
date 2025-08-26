'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function ProcessDetailPanel({ step, onClose }) {
  if (!step) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-gray-900 border border-cyan-400/50 p-8 rounded-lg max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-400">{step.title.tr}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 text-white/80">
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">ADRs (Architecture Decision Records)</h3>
            <p>{step.adr || "Örnek ADR metni. Bu alana ilgili ADR içeriği gelecek."}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Threat Modeling</h3>
            <p>{step.threatModeling || "Örnek tehdit modelleme metni. Bu alana ilgili tehdit modelleme içeriği gelecek."}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Performance Baselines</h3>
            <p>{step.perfBaselines || "Örnek performans başlangıç metni. Bu alana ilgili performans başlangıç içeriği gelecek."}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">SLOs (Service Level Objectives)</h3>
            <p>{step.slos || "Örnek SLO metni. Bu alana ilgili SLO içeriği gelecek."}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
