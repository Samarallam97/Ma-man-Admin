import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { moduleService } from '../../api/services/moduleService'
import { categoryService } from '../../api/services/categoryService'

const ModulePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [modules, setModules] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null })
  
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [modulesData, categoriesData] = await Promise.all([
        moduleService.getAll(),
        categoryService.getAll()
      ])
      
      // Ensure modulesData is an array
      const modulesArray = Array.isArray(modulesData) ? modulesData : []
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : []
      
      // Enrich module data with category names
      const enrichedModules = modulesArray.map(module => {
        const category = categoriesArray.find(c => c.id === module.categoryId)
        return {
          ...module,
          categoryName: category ? category.name : 'Unknown'
        }
      })
      
      setModules(enrichedModules)
      setCategories(categoriesArray)
    } catch (error) {
      console.error('Error fetching modules:', error)
      toast.error(t('error'))
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const handleEdit = (id) => {
    navigate(`/module/edit/${id}`)
  }
  
  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id })
  }
  
  const handleDeleteConfirm = async () => {
    try {
      await moduleService.delete(deleteDialog.id)
      await fetchData() // Refresh data
      toast.success(t('successDelete'))
    } catch (error) {
      console.error('Error deleting module:', error)
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
    { key: 'name', header: 'name' },
    { key: 'categoryName', header: 'category' },
    { 
      key: 'createdAt', 
      header: 'createdAt',
      render: (item) => formatDate(item.createdAt)
    }
  ]
  
  return (
    <div>
      <PageHeader 
        title={t('moduleManagement')} 
        actionLabel="addModule"
        actionPath="/module/add"
      />
      
      <DataTable
        data={modules}
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

export default ModulePage