import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { categoryService } from '../../api/services/categoryService'

const CategoryPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null })
  
  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchCategories()
  }, [])
  
  const handleEdit = (id) => {
    navigate(`/category/edit/${id}`)
  }
  
  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id })
  }
  
  const handleDeleteConfirm = async () => {
    try {
      await categoryService.delete(deleteDialog.id)
      await fetchCategories() // Refresh data
      toast.success(t('successDelete'))
    } catch (error) {
      console.error('Error deleting category:', error)
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
    { 
      key: 'createdAt', 
      header: 'createdAt',
      render: (item) => formatDate(item.createdAt)
    }
  ]
  
  return (
    <div>
      <PageHeader 
        title={t('categoryManagement')} 
        actionLabel="addCategory"
        actionPath="/category/add"
      />
      
      <DataTable
        data={categories}
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

export default CategoryPage