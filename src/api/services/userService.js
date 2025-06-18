import apiClient from '../client'

export const userService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/users', { params })
    return response.data
  },
  
  create: async (user) => {
    const response = await apiClient.post('/auth/register', user)
    return response.data
  },
  
  update: async (id, user) => {
    const response = await apiClient.put(`/users/${id}`, user)
    return response.data
  },
  
  delete: async (id) => {
    await apiClient.delete(`/users/${id}`)
    return true
  },

}