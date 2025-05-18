import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../context/LanguageContext'
import { 
  FiHome, 
  FiFile, 
  FiBox, 
  FiFolder, 
  FiSettings, 
  FiMenu, 
  FiX 
} from 'react-icons/fi'

const Sidebar = () => {
  const { t } = useTranslation()
  const { dir } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const navItems = [
    { 
      name: t('dashboard'), 
      icon: <FiHome className="w-5 h-5" />,
      path: '/' 
    },
    { 
      name: t('content'), 
      icon: <FiFile className="w-5 h-5" />, 
      path: '/content' 
    },
    { 
      name: t('module'), 
      icon: <FiBox className="w-5 h-5" />, 
      path: '/module' 
    },
    { 
      name: t('category'), 
      icon: <FiFolder className="w-5 h-5" />,
      path: '/category' 
    },
    { 
      name: t('settings'), 
      icon: <FiSettings className="w-5 h-5" />,
      path: '/settings' 
    },
  ]
  
  const sidebarClasses = `fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-64 bg-primary-700 dark:bg-gray-800 z-10 transition-all transform ${
    isMobileMenuOpen ? 'translate-x-0' : `${dir === 'rtl' ? 'translate-x-full' : '-translate-x-full'}`
  } md:translate-x-0`
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-center h-16 bg-primary-800 dark:bg-gray-900">
            <span className="text-white text-2xl font-bold">{t('appName')}</span>
          </div>
          
          {/* Sidebar content */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-white transition-all rounded-md ${
                      isActive
                        ? 'bg-primary-600 dark:bg-gray-700'
                        : 'hover:bg-primary-600 dark:hover:bg-gray-700'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  )
}

export default Sidebar