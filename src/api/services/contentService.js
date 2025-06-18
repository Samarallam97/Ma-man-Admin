import api from '../client'

export const contentService = {
  getAll: async () => {
    const response = await api.get('/content')
    return response.data
  },
  
  getById: async (id) => {
    const response = await api.get(`/content/${id}`)
    return response.data
  },
  
  create: async (content) => {
    const response = await api.post('/content', content)
    return response.data
  },
  
  update: async (id, content) => {
    const response = await api.put(`/content/${id}`, content)
    return response.data
  },
  
  delete: async (id) => {
    await api.delete(`/content/${id}`)
    return true
  }
}