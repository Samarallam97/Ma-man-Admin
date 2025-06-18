import apiClient from '../client'

export const moduleService = {
  getAll: async () => {
    const response = await apiClient.get(`/modules`)
    
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/modules/${id}`)
    return response.data
  },
  
  create: async (module) => {
    
    const response = await apiClient.post('/modules', module)
    
    return response.data
  },
  
  update: async (id, module) => {
    const response = await apiClient.put(`/modules/${id}`, module)
    return response.data
  },
  
  delete: async (id) => {
    await apiClient.delete(`/modules/${id}`)
    return true
  }
}