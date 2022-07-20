import { ApiResponse, FetchParams } from '../alpine/types'

export function fetchApi<T extends Record<any, any> | string = ApiResponse>(
  action: string,
  init: RequestInit = {},
  params?: FetchParams
): Promise<T> {
  return fetch(action, init)
    .then((response) => {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        return response.json()
      }
      return response.text()
    })
    .then((data: T) => {
      if (params) {
        const { notif, callback } = params
        if (callback) {
          if (Array.isArray(callback)) {
            callback.forEach((cb) => cb())
          } else {
            callback()
          }
        }
        if (!notif) {
          return data
        }
      }

      if (typeof data === 'string') {
        return data
      }

      if (data.type && data.message) {
        if (data.type === 'success') {
          window.notyf.success(data.message)
        } else {
          window.notyf.error(data.message)
        }
      }
      return data
    })
}
