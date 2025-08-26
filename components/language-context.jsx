"use client"

import { createContext, useContext, useEffect, useState } from "react"

const LanguageContext = createContext({
  language: "tr",
  setLanguage: () => {},
})

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("tr")

  // hydrate from localStorage once on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("piramittek:lang")
      if (saved) setLanguage(saved)
    } catch {}
  }, [])

  // persist changes
  useEffect(() => {
    try {
      localStorage.setItem("piramittek:lang", language)
    } catch {}
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

