import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PageHeader = ({ title, actionLabel, actionPath }) => {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
        {title}
      </h1>
      
      {actionLabel && actionPath && (
        <Link
          to={actionPath}
          className="btn btn-primary"
        >
          {t(actionLabel)}
        </Link>
      )}
    </div>
  )
}

export default PageHeader