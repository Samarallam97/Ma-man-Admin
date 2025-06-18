import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { contentService } from '../../api/services/contentService'
import { moduleService } from '../../api/services/moduleService'

const ContentPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [contents, setContents] = useState([])
  const [modules, setModules] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null })
  
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [contentsData, modulesData] = await Promise.all([
        contentService.getAll(),
        moduleService.getAll()
      ])
      
      
      // Enrich content data with module names
      const enrichedContents = contentsData.data.map(content => {
        const module = modulesData.data.find(m => m.id === content.moduleId)
        return {
          ...content,
          moduleName: module ? module.name : 'Unknown'
        }
      })
      
      setContents(enrichedContents)
      
      setModules(modulesData)
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const handleEdit = (id) => {
    navigate(`/content/edit/${id}`)
  }
  
  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id })
  }
  
  const handleDeleteConfirm = async () => {
    try {
      await contentService.delete(deleteDialog.id)
      await fetchData() // Refresh data
      toast.success(t('successDelete'))
    } catch (error) {
      console.error('Error deleting content:', error)
      toast.error(t('error'))
    } finally {
      setDeleteDialog({ isOpen: false, id: null })
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  
  // Table columns
  const columns = [
    { key: 'type', header: 'type' },
    { key: 'contentUrl', header: 'contentUrl' },
    { key: 'moduleName', header: 'module' },
    { key: 'title', header: 'title' },
    { key: 'description', header: 'description' },
    // { 
    //   key: 'status', 
    //   header: 'status',
    //   render: (item) => (
    //     <span className={`px-2 py-1 text-xs rounded-full ${
    //       item.status === 'active'
    //         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    //         : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    //     }`}>
    //       {t(item.status)}
    //     </span>
    //   )
    // },
    { 
      key: 'createdAt', 
      header: 'createdAt',
      render: (item) => formatDate(item.createdAt)
    }
  ]
  
  return (
    <div>
      <PageHeader 
        title={t('contentManagement')} 
        actionLabel="addContent"
        actionPath="/content/add"
      />
      
      <DataTable
        data={contents}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
      />
      
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={t('confirmDelete')}
        message={t('confirmDelete')}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, id: null })}
      />
    </div>
  )
}

export default ContentPage