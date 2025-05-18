import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'An error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
)

export default apiClient