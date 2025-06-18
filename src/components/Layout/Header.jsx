import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { 
  FiSun, 
  FiMoon, 
  FiMenu,
  FiGlobe
} from 'react-icons/fi'

export default function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-primary-800 dark:bg-primary-950 shadow-md transition-all">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-primary-300 dark:text-primary-400 text-xl font-bold">
                {t('appName')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">


            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-primary-300 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-primary-300 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('language')}
            >
              <FiGlobe className="w-5 h-5" />
            </button>
 
          </div>
        </div>
      </div>
    </nav>
  )
}