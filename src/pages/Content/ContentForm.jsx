import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft } from 'react-icons/fi'
import { contentService } from '../../api/services/contentService'
import { moduleService } from '../../api/services/moduleService'

const ContentForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modules, setModules] = useState([])
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch modules for the dropdown
        const modulesData = await moduleService.getAll()
        setModules(modulesData)
        
        // If edit mode, fetch the content data
        if (isEditMode) {
          const content = await contentService.getById(id)
          reset(content)
        } else {
          // Set default values for new content
          reset({ status: 'active' })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error(t('error'))
        navigate('/content')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [id, isEditMode, navigate, reset, t])
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      // Convert moduleId to number
      data.moduleId = Number(data.moduleId)
      
      if (isEditMode) {
        await contentService.update(id, data)
        toast.success(t('successUpdate'))
      } else {
        await contentService.create(data)
        toast.success(t('successAdd'))
      }
      
      navigate('/content')
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/content')}
          className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={t('back')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? t('editContent') : t('addContent')}
        </h1>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      ) : (
        <div className="card p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                {t('title')}
              </label>
              <input
                id="title"
                type="text"
                className={`form-input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('title', { required: true })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                {t('description')}
              </label>
              <textarea
                id="description"
                rows="4"
                className={`form-input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="moduleId" className="form-label">
                {t('selectModule')}
              </label>
              <select
                id="moduleId"
                className={`form-input ${errors.moduleId ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('moduleId', { required: true })}
              >
                <option value="">{t('selectModule')}</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
              {errors.moduleId && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="form-label">
                {t('status')}
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="active"
                    className="form-radio text-primary-600 focus:ring-primary-500"
                    {...register('status', { required: true })}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{t('active')}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="inactive"
                    className="form-radio text-primary-600 focus:ring-primary-500"
                    {...register('status', { required: true })}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{t('inactive')}</span>
                </label>
              </div>
              {errors.status && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/content')}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                    {t('saving')}
                  </span>
                ) : (
                  isEditMode ? t('save') : t('add')
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ContentForm