import apiClient from '../client'

export const todoService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/todos', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/todos/${id}`)
    return response.data
  },
  
  create: async (todo) => {
    const response = await apiClient.post('/todos', todo)
    return response.data
  },
  
  update: async (id, todo) => {
    const response = await apiClient.put(`/todos/${id}`, todo)
    return response.data
  },
  
  delete: async (id) => {
    await apiClient.delete(`/todos/${id}`)
    return true
  },
  
  addNote: async (id, note) => {
    const response = await apiClient.post(`/todos/${id}/notes`, { note })
    return response.data
  }
}