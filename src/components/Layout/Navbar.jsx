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

const TIMER_MINUTES = 60 // Set the initial timer value in minutes

const Navbar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [timeLeft, setTimeLeft] = useState(TIMER_MINUTES * 60) // Convert to seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          navigate('/time-exceeded')
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
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
            {/* Timer */}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <FiClock className="w-5 h-5 mr-2" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>

            {/* Todos */}
            <button
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('todos')}
            >
              <FiCheckSquare className="w-5 h-5" />
            </button>

            {/* Diary */}
            <button
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('diary')}
            >
              <FiBook className="w-5 h-5" />
            </button>

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
            
            {/* Settings */}
            <button
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label={t('settings')}
            >
              <FiSettings className="w-5 h-5" />
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