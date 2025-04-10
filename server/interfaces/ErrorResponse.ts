export interface APIErrorResponse {
  message: string
  code: string
  status: number
  docs: string
  title: string
  trace?: string
  errors?: Record<string, unknown>[]
}
