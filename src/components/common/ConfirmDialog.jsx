import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const { t } = useTranslation()
  
  if (!isOpen) return null
  
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title || t('confirm')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ConfirmDialog