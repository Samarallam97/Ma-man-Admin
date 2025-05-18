import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const TimeLimitExceeded = () => {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-500 dark:text-primary-400 mb-4">
          {t('timeExceeded')}
        </h1>
        
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('timeExceededMessage')}
        </p>
        
        <div className="mt-8">
          <Link
            to="/"
            className="btn btn-primary px-8 py-3"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TimeLimitExceeded