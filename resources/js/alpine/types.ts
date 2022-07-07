export type ApiResponse = {
  type: 'success' | 'error'
  message: string
}

type Callback = () => void

export type FetchParams = {
  notif?: boolean
  callback?: Callback | Callback[]
}

export type Note = {
  id: number
  name: string
  content: string
  created_at: string
  updated_at: string
}
