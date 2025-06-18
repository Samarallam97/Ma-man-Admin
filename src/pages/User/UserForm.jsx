import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft } from 'react-icons/fi'
import { userService } from '../../api/services/userService'

const UserForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          setIsLoading(true)
          const user = await userService.getById(id)
          reset(user)
        } catch (error) {
          console.error('Error fetching user:', error)
          toast.error(t('error'))
          navigate('/user')
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchUser()
    }
  }, [id, isEditMode, navigate, reset, t])
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      
      if (isEditMode) {
        await userService.update(id, data)
        toast.success(t('successUpdate'))
      } else {
        await userService.create(data)
        toast.success(t('successAdd'))
      }
      
      navigate('/user')
    } catch (error) {
      console.error('Error saving user:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/user')}
          className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={t('back')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? t('editUser') : t('addUser')}
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
              <label htmlFor="fullName" className="form-label">
                {t('fullName')}
              </label>
              <input
                id="fullName"
                type="text"
                className={`form-input ${errors.fullName ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('fullName', { required: true })}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                {t('email')}
              </label>
              <input
                id="email"
                type="text"
                className={`form-input ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                {t('password')}
              </label>
              <input
                id="password"
                type="text"
                className={`form-input ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            
                        <div className="mb-4">
              <label htmlFor="role" className="form-label">
                {t('role')}
              </label>
              <input
                id="role"
                type="text"
                className={`form-input ${errors.role ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('role', { required: true })}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/user')}
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

export default UserForm