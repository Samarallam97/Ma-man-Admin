import apiClient from '../client'

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get('/categories')
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/categories/${id}`)
    return response.data
  },
  
  create: async (category) => {
    const response = await apiClient.post('/categories', category)
    return response.data
  },
  
  update: async (id, category) => {
    const response = await apiClient.put(`/categories/${id}`, category)
    return response.data
  },
  
  delete: async (id) => {
    await apiClient.delete(`/categories/${id}`)
    return true
  }
}