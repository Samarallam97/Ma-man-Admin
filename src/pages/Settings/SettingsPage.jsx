import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi'

const SettingsPage = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('settings')}
      </h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Appearance settings */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {t('appearance')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                  {theme === 'dark' ? (
                    <FiMoon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <FiSun className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {theme === 'dark' ? t('darkMode') : t('lightMode')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {theme === 'dark' 
                      ? t('Dark theme for reduced eye strain in low light')
                      : t('Light theme for better visibility in bright environments')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleTheme}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#2970ff' : '#d1d5db',
                }}
              >
                <span
                  className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                  <FiGlobe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {t('language')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'العربية' : 'English'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleLanguage}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                style={{ 
                  backgroundColor: language === 'ar' ? '#2970ff' : '#d1d5db',
                }}
              >
                <span
                  className={`${
                    language === 'ar' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* User preferences */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {t('preferences')}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('User preference settings will be implemented in a future update.')}
          </p>
          
          <div className="opacity-50 pointer-events-none">
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                {t('emailNotifications')}
              </label>
              <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 dark:bg-gray-600">
                <span className="inline-block w-4 h-4 transform bg-white rounded-full translate-x-1" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                {t('systemTheme')}
              </label>
              <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 dark:bg-gray-600">
                <span className="inline-block w-4 h-4 transform bg-white rounded-full translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage