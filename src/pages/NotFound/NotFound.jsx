import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500 dark:text-primary-400">
          404
        </h1>
        
        <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">
          {t('notFound')}
        </h2>
        
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('notFoundMessage')}
        </p>
        
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="btn btn-primary px-8 py-3"
          >
            {t('home')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound