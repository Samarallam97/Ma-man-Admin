import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft } from 'react-icons/fi'
import { moduleService } from '../../api/services/moduleService'
import { categoryService } from '../../api/services/categoryService'

const ModuleForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState([])
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch categories for the dropdown
        const categoriesData = await categoryService.getAll()
        setCategories(categoriesData)
        
        // If edit mode, fetch the module data
        if (isEditMode) {
          const module = await moduleService.getById(id)
          reset(module)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error(t('error'))
        navigate('/module')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [id, isEditMode, navigate, reset, t])
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      // Convert categoryId to number
      data.categoryId = Number(data.categoryId)
      
      if (isEditMode) {
        await moduleService.update(id, data)
        toast.success(t('successUpdate'))
      } else {
        await moduleService.create(data)
        toast.success(t('successAdd'))
      }
      
      navigate('/module')
    } catch (error) {
      console.error('Error saving module:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/module')}
          className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={t('back')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? t('editModule') : t('addModule')}
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
              <label htmlFor="name" className="form-label">
                {t('name')}
              </label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="categoryId" className="form-label">
                {t('selectCategory')}
              </label>
              <select
                id="categoryId"
                className={`form-input ${errors.categoryId ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('categoryId', { required: true })}
              >
                <option value="">{t('selectCategory')}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/module')}
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

export default ModuleForm