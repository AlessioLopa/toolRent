import type { AxiosError } from 'axios'
import { api } from './apiService'

export const getTools = async () => {
  try {
    const response = await api.get('/tools')
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.message,
      status: error.response?.status,
    }
  }
}

export const getToolsOverdue = async () => {
  try {
    const response = await api.get('/tools/overdue')
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.message,
      status: error.response?.status,
    }
  }
}

export const getToolsOverdueSimulate = async () => {
  try {
    const response = await api.get('/tools/overdue/simulate')
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.message,
      status: error.response?.status,
    }
  }
}

export const rentTool = async (id: number) => {
  try {
    const response = await api.post(`/tools/${id}/rent`)
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.message,
      status: error.response?.status,
    }
  }
}

export const returnTool = async (id: number) => {
  try {
    const response = await api.post(`/tools/${id}/return`)
    return response.data
  } catch (error: AxiosError | any) {
    throw {
      message: error.response?.data.message,
      status: error.response?.status,
    }
  }
}

export const getTool = async (id: number) => {}
