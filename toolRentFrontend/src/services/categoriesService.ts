import type { AxiosError } from 'axios'
import { api } from './apiService'

export const getCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.errors[0].message,
      status: error.response?.status,
    }
  }
}
