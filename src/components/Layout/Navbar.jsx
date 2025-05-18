import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { 
  FiSun, 
  FiMoon, 
  FiGlobe, 
  FiSettings,
  FiLogOut,
  FiBell,
  FiUser,
  FiCheckSquare,
  FiBook,
  FiClock
} from 'react-icons/fi'


const Navbar = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-all">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">
                {t('appName')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">


            {/* Notifications */}
            <button
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('notifications')}
            >
              <FiBell className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('language')}
            >
              <FiGlobe className="w-5 h-5" />
            </button>
            
            
            {/* Profile */}
            <button
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('profile')}
            >
              <FiUser className="w-5 h-5" />
            </button>
            
            {/* Logout */}
            <button
              className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('logout')}
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar