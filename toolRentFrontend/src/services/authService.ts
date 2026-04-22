import type { AxiosError } from 'axios'
import { api } from './apiService'

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', { email, password })
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token.token)
      localStorage.setItem('user', response.data.id)
      return true
    }
    return false
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.errors[0].message,
      status: error.response?.status,
    }
  }
}
