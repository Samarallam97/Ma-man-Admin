import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useLanguage } from '../../context/LanguageContext'

const Layout = () => {
  const { dir } = useLanguage()
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <Navbar />
        
        {/* Page content */}
        <main 
          className={`flex-1 overflow-y-auto p-6 ${dir === 'rtl' ? 'mr-64' : 'ml-64'} md:${dir === 'rtl' ? 'mr-64' : 'ml-64'} sm:${dir === 'rtl' ? 'mr-0' : 'ml-0'}`}
        >
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout