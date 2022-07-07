interface Base {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

export type Item = {
  state: boolean
  description: string
  category: number
  start: string
  end: string
  user_id: number
} & Base

export interface Options {
  min: Date
  max: Date
  current?: Date
  search?: string
}
