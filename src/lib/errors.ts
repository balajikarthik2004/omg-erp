import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallbackMessage = 'Something went wrong'): string {
  if (!axios.isAxiosError(error)) {
    return fallbackMessage
  }

  const data = error.response?.data

  if (typeof data === 'string' && data.trim().length > 0) {
    return data
  }

  if (data && typeof data === 'object' && 'message' in data) {
    const message = data.message
    if (typeof message === 'string' && message.trim().length > 0) {
      return message
    }
  }

  if (error.message.trim().length > 0) {
    return error.message
  }

  return fallbackMessage
}
