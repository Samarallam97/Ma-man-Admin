import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://ma-man.runasp.net/api',
  withCredentials: true
});

// Attach access token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token if 401 Unauthorized
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default api

export const refreshToken = () => api.post('/auth/refresh-token');