import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiFile, FiBox, FiFolder, FiBarChart2 } from 'react-icons/fi'
import { contentService } from '../../api/services/contentService'
import { moduleService } from '../../api/services/moduleService'
import { categoryService } from '../../api/services/categoryService'

const Dashboard = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    contents: { total: 0, active: 0, inactive: 0 },
    modules: { total: 0 },
    categories: { total: 0 }
  })
  const [recentContents, setRecentContents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [contents, modules, categories] = await Promise.all([
          contentService.getAll(),
          moduleService.getAll(),
          categoryService.getAll()
        ])
        
        // Calculate stats
        const activeContents = contents.filter(c => c.status === 'active')
        const inactiveContents = contents.filter(c => c.status === 'inactive')
        
        setStats({
          contents: {
            total: contents.length,
            active: activeContents.length,
            inactive: inactiveContents.length
          },
          modules: { total: modules.length },
          categories: { total: categories.length }
        })
        
        // Get recent contents (sorted by createdAt)
        const sortedContents = [...contents].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 5)
        
        // Enrich content data with module info
        const enrichedContents = sortedContents.map(content => {
          const module = modules.find(m => m.id === content.moduleId)
          return {
            ...content,
            moduleName: module ? module.name : 'Unknown'
          }
        })
        
        setRecentContents(enrichedContents)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {t('dashboard')}
      </h1>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{t('contents')}</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.contents.total}</h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <div>
                      <span className="text-xs text-white/80">{t('active')}</span>
                      <p className="text-white text-sm">{stats.contents.active}</p>
                    </div>
                    <div>
                      <span className="text-xs text-white/80">{t('inactive')}</span>
                      <p className="text-white text-sm">{stats.contents.inactive}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <FiFile className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-secondary-500 to-secondary-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{t('modules')}</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.modules.total}</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <FiBox className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{t('categories')}</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.categories.total}</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <FiFolder className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent contents */}
          <div className="card p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t('recentContents')}
              </h2>
              <Link to="/content" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                {t('viewAll')}
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('title')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('module')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('createdAt')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentContents.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        {t('noData')}
                      </td>
                    </tr>
                  ) : (
                    recentContents.map((content) => (
                      <tr key={content.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                          <Link to={`/content/edit/${content.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                            {content.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {content.moduleName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            content.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {t(content.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(content.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t('quickActions')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/content/add" 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              >
                <FiFile className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">{t('addContent')}</span>
              </Link>
              
              <Link 
                to="/module/add" 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              >
                <FiBox className="w-5 h-5 text-secondary-600 dark:text-secondary-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">{t('addModule')}</span>
              </Link>
              
              <Link 
                to="/category/add" 
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              >
                <FiFolder className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">{t('addCategory')}</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard