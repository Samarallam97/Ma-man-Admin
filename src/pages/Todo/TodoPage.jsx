import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { FiCalendar, FiTag, FiFilter } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import { todoService } from '../../api/services/todoService'

const TodoPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  })

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const data = await todoService.getAll(filters)
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
      toast.error(t('error'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [filters])

  const handleStatusChange = async (todoId, newStatus) => {
    try {
      const todo = todos.find(t => t.id === todoId)
      const updatedTodo = await todoService.update(todoId, { 
        ...todo,
        status: newStatus 
      })

      if (newStatus === 'completed') {
        toast.success(t('congratulations'))
      }

      setTodos(prevTodos => 
        prevTodos.map(t => t.id === todoId ? updatedTodo : t)
      )
    } catch (error) {
      console.error('Error updating todo status:', error)
      toast.error(t('error'))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div>
      <PageHeader 
        title={t('todos')} 
        actionLabel="addTodo"
        actionPath="/todos/add"
      />

      {/* Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder={t('search')}
              className="form-input"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div>
            <select
              className="form-input"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">{t('allStatuses')}</option>
              <option value="in_progress">{t('inProgress')}</option>
              <option value="completed">{t('completed')}</option>
              <option value="paused">{t('paused')}</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="form-input"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div>
            <input
              type="date"
              className="form-input"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Todos List */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">{t('noTodos')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {todo.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {todo.description}
                  </p>
                  
                  {/* Meta information */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(todo.status)}`}>
                      {t(todo.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
                      {t(todo.priority)}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <FiCalendar className="mr-1" />
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                    {todo.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
                      >
                        <FiTag className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Notes */}
                  {todo.notes.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('notes')}:
                      </h4>
                      <ul className="mt-1 space-y-1">
                        {todo.notes.map((note, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            • {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="ml-4 flex flex-col space-y-2">
                  <button
                    onClick={() => handleStatusChange(todo.id, 'completed')}
                    className="btn btn-primary text-sm"
                    disabled={todo.status === 'completed'}
                  >
                    {t('complete')}
                  </button>
                  <button
                    onClick={() => handleStatusChange(todo.id, 'paused')}
                    className="btn btn-secondary text-sm"
                    disabled={todo.status === 'paused'}
                  >
                    {t('pause')}
                  </button>
                  <button
                    onClick={() => navigate(`/todos/edit/${todo.id}`)}
                    className="btn btn-secondary text-sm"
                  >
                    {t('edit')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoPage