export interface Tool {
  id?: number
  name: string
  description: string
  status: string
  categoryId: number
  due_date?: string | null
}
