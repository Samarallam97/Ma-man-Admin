import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(() => {
    // Check for saved language preference or use browser language
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      return savedLanguage
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'ar' ? 'ar' : 'en'
  })

  const [dir, setDir] = useState(language === 'ar' ? 'rtl' : 'ltr')

  // Update language when changed
  useEffect(() => {
    i18n.changeLanguage(language)
    setDir(language === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('language', language)
  }, [language, i18n])

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}