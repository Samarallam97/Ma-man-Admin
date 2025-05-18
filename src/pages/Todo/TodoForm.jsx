import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi'
import { todoService } from '../../api/services/todoService'

const TodoForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    if (isEditMode) {
      const fetchTodo = async () => {
        try {
          setIsLoading(true)
          const todo = await todoService.getById(id)
          reset({
            ...todo,
            dueDate: todo.dueDate.split('T')[0]
          })
          setTags(todo.tags)
          setNotes(todo.notes)
        } catch (error) {
          console.error('Error fetching todo:', error)
          toast.error(t('error'))
          navigate('/todos')
        } finally {
          setIsLoading(false)
        }
      }
      fetchTodo()
    }
  }, [id, isEditMode, navigate, reset, t])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()])
      setNewNote('')
    }
  }

  const handleRemoveNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      const todoData = {
        ...data,
        tags,
        notes,
        dueDate: new Date(data.dueDate).toISOString()
      }

      if (isEditMode) {
        await todoService.update(id, todoData)
        toast.success(t('successUpdate'))
      } else {
        await todoService.create(todoData)
        toast.success(t('successAdd'))
      }

      navigate('/todos')
    } catch (error) {
      console.error('Error saving todo:', error)
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/todos')}
          className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={t('back')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? t('editTodo') : t('addTodo')}
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
                rows="3"
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
              <label htmlFor="category" className="form-label">
                {t('category')}
              </label>
              <input
                id="category"
                type="text"
                className={`form-input ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('category', { required: true })}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate" className="form-label">
                {t('dueDate')}
              </label>
              <input
                id="dueDate"
                type="date"
                className={`form-input ${errors.dueDate ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('dueDate', { required: true })}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="priority" className="form-label">
                {t('priority')}
              </label>
              <select
                id="priority"
                className={`form-input ${errors.priority ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('priority', { required: true })}
              >
                <option value="low">{t('low')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="high">{t('high')}</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">
                {t('status')}
              </label>
              <select
                className={`form-input ${errors.status ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('status', { required: true })}
              >
                <option value="in_progress">{t('inProgress')}</option>
                <option value="completed">{t('completed')}</option>
                <option value="paused">{t('paused')}</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-error-500">
                  {t('required')}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">
                {t('tags')}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="form-input flex-1"
                  placeholder={t('enterTag')}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-primary"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                {t('notes')}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="form-input flex-1"
                  placeholder={t('enterNote')}
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="btn btn-primary"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{note}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveNote(index)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/todos')}
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

export default TodoForm