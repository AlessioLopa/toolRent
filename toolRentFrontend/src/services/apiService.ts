import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set the Bearer token for all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)
