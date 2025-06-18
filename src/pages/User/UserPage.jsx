import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { userService } from '../../api/services/userService'

const UserPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null })
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const data = await userService.getAll()
      // const data = response.data
      
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])
  
  const handleEdit = (id) => {
    navigate(`/user/edit/${id}`)
  }
  
  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id })
  }
  
  const handleDeleteConfirm = async () => {
    try {
      await userService.delete(deleteDialog.id)
      await fetchUsers() // Refresh data
      toast.success(t('successDelete'))
    } catch (error) {
      console.error('Error deleting user:', error)
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
    { key: 'id', header: 'id' },
    { key: 'fullName', header: 'fullName' },
    { key: 'role', header: 'role' }
  ]
  
  return (
    <div>
      <PageHeader 
        title={t('userManagement')} 
        actionLabel="addUser"
        actionPath="/user/add"
      />
      
      <DataTable
        data={users}
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

export default UserPage