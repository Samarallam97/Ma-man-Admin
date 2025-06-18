import api from '../client'

export const ageGroupService = {
  getAll: async () => {
    const response = await api.get('/ageGroups')
    
    return response.data
  },
    getById: async (id) => {
    const response = await api.get(`/ageGroups/${id}`)
    return response.data
  },
    update: async (id, ageGroup) => {
    const response = await api.put(`/ageGroups/${id}`, ageGroup)
    return response.data
  },
  create: async (ageGroup) => {
    const response = await api.post('/ageGroups', ageGroup)
    return response.data
  },
  
  delete: async (id) => {
    await api.delete(`/categories/${id}`)
    return true
  }
}