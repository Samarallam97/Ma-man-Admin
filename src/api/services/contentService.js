import apiClient from '../client'

export const contentService = {
  getAll: async () => {
    const response = await apiClient.get('/contents')
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/contents/${id}`)
    return response.data
  },
  
  create: async (content) => {
    const response = await apiClient.post('/contents', content)
    return response.data
  },
  
  update: async (id, content) => {
    const response = await apiClient.put(`/contents/${id}`, content)
    return response.data
  },
  
  delete: async (id) => {
    await apiClient.delete(`/contents/${id}`)
    return true
  }
}