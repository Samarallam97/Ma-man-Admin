import { useTranslation } from 'react-i18next'
import { FiAlertTriangle } from 'react-icons/fi'

function ErrorMessage({ message }) {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <FiAlertTriangle size={48} className="text-error-500 mb-4" />
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
        {t('errors.generic')}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        {message}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        {t('errors.retry')}
      </button>
    </div>
  )
}

export default ErrorMessage