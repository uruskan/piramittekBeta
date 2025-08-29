"use client"

import { createContext, useContext, useEffect, useState } from "react"

const LanguageContext = createContext({
  language: "tr",
  setLanguage: () => {},
})

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("tr")

  // hydrate from localStorage or detect browser language
  useEffect(() => {
    try {
      const saved = localStorage.getItem("piramittek:lang")
      if (saved) {
        setLanguage(saved)
      } else {
        // Detect browser/system language
        const browserLang = navigator.language || navigator.userLanguage
        if (browserLang) {
          if (browserLang.startsWith('tr')) {
            setLanguage('tr')
          } else if (browserLang.startsWith('de')) {
            setLanguage('de')
          } else {
            setLanguage('en') // Default to English for all other languages
          }
        }
      }
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

