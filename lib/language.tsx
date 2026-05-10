'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'th'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  isThai: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-language', language)
  }, [language])

  const value = useMemo<LanguageContextValue>(() => {
    const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage)

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguageState(current => (current === 'en' ? 'th' : 'en')),
      isThai: language === 'th',
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
