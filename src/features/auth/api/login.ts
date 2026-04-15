import { apiClient } from '@/lib/axios'
import type { LoginRequest, LoginResponse } from '@/features/auth/types/auth.types'

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
  return data
}
