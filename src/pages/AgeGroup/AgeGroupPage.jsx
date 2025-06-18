import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { ageGroupService } from '../../api/services/ageGroupService.js'

const AgeGroupPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [ageGroups, setAgeGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null })
  
  const fetchAgeGroups = async () => {
    try {
      setIsLoading(true)
      const response = await ageGroupService.getAll()
      const data = response.data
      
      setAgeGroups(data)
    } catch (error) {
      console.error('Error fetching ageGroups:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchAgeGroups()
  }, [])
  
  const handleEdit = (id) => {
    navigate(`/ageGroup/edit/${id}`)
  }
  
  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id })
  }
  
  const handleDeleteConfirm = async () => {
    try {
      await ageGroupService.delete(deleteDialog.id)
      await fetchAgeGroups() // Refresh data
      toast.success(t('successDelete'))
    } catch (error) {
      console.error('Error deleting ageGroup:', error)
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
    { key: 'nameAr', header: 'nameAr' },
    { key: 'color', header: 'color' }
  ]
  
  return (
    <div>
      <PageHeader 
        title={t('ageGroupManagement')} 
        actionLabel="addAgeGroup"
        actionPath="/ageGroup/add"
      />
      
      <DataTable
        data={ageGroups}
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

export default AgeGroupPage