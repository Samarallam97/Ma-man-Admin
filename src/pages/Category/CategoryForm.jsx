import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft } from 'react-icons/fi'
import { categoryService } from '../../api/services/categoryService'

const CategoryForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  useEffect(() => {
    
    if (isEditMode) {
      const fetchCategory = async () => {
        try {
          
          setIsLoading(true)
          const category = await categoryService.getById(id)
          reset(category)
        } catch (error) {
          console.error('Error fetching category:', error)
          toast.error(t('error') , error)
          navigate('/category')
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchCategory()
    }
  }, [id, isEditMode, navigate, reset, t])
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      
      if (isEditMode) {
        await categoryService.update(id, data)
        toast.success(t('successUpdate'))
      } else {
        await categoryService.create(data)
        toast.success(t('successAdd'))
      }
      
      navigate('/category')
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/category')}
          className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={t('back')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? t('editCategory') : t('addCategory')}
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
  {/* ID (Only in Edit Mode) */}
  {isEditMode && (
    <div className="mb-4">
      <label htmlFor="id" className="form-label">{t('id')}</label>
      <input
        id="id"
        type="text"
        className="form-input"
        {...register('id')}
        disabled
      />
    </div>
  )}

  {/* Name */}
  <div className="mb-4">
    <label htmlFor="name" className="form-label">{t('name')}</label>
    <input
      id="name"
      type="text"
      className={`form-input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('name', { required: true })}
    />
    {errors.name && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* Name AR */}
  <div className="mb-4">
    <label htmlFor="nameAR" className="form-label">{t('nameAR')}</label>
    <input
      id="nameAR"
      type="text"
      className={`form-input ${errors.nameAR ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('nameAR', { required: true })}
    />
    {errors.nameAR && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* Description */}
  <div className="mb-4">
    <label htmlFor="description" className="form-label">{t('description')}</label>
    <input
      id="description"
      type="text"
      className={`form-input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('description', { required: true })}
    />
    {errors.description && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* Description AR */}
  <div className="mb-4">
    <label htmlFor="descriptionAR" className="form-label">{t('descriptionAR')}</label>
    <input
      id="descriptionAR"
      type="text"
      className={`form-input ${errors.descriptionAR ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('descriptionAR', { required: true })}
    />
    {errors.descriptionAR && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* Picture URL */}
  <div className="mb-4">
    <label htmlFor="picutureUrl" className="form-label">{t('picutureUrl')}</label>
    <input
      id="picutureUrl"
      type="text"
      className={`form-input ${errors.picutureUrl ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('picutureUrl', { required: true })}
    />
    {errors.picutureUrl && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* Color */}
  <div className="mb-4">
    <label htmlFor="color" className="form-label">{t('color')}</label>
    <input
      id="color"
      type="color"
      defaultValue="#0000FF" // default blue
      className={`form-input ${errors.color ? 'border-error-500 focus:ring-error-500' : ''}`}
      {...register('color', { required: true })}
    />
    {errors.color && <p className="text-error-500">{t('required')}</p>}
  </div>

  {/* CreatedByAdminId (Hidden) */}
  <input
    type="hidden"
    value="0e4ea752-8f93-4f1d-a74f-e7c0917febe0"
    {...register('createdByAdminId')}
  />

  {/* Buttons */}
  <div className="flex justify-end space-x-3 mt-6">
    <button type="button" onClick={() => navigate('/category')} className="btn btn-secondary" disabled={isSubmitting}>
      {t('cancel')}
    </button>
    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
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

export default CategoryForm