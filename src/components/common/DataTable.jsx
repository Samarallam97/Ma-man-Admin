import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const DataTable = ({ data = [], columns, onEdit, onDelete, isLoading }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : []
  
  // Filter data based on search term
  const filteredData = searchTerm
    ? safeData.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : safeData
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder={t('search')}
          className="form-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {t(column.header)}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {t('loading')}
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {t('noData')}
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                    >
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title={t('edit')}
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title={t('delete')}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable