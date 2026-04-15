import { apiClient } from '@/lib/axios'
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  FirstTimePasswordRequest,
  FirstTimePasswordResponse,
} from '@/features/auth/types/auth.types'

export async function forgotPasswordApi(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const { data } = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload)
  return data
}

export async function resetPasswordApi(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  const { data } = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', payload)
  return data
}

export async function firstTimePasswordApi(payload: FirstTimePasswordRequest): Promise<FirstTimePasswordResponse> {
  const { data } = await apiClient.post<FirstTimePasswordResponse>('/auth/set-password', payload)
  return data
}
