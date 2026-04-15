import { apiClient } from '@/lib/axios'
import type {
  OnboardAdminRequest,
  OnboardAdminResponse,
} from '@/features/admin-onboarding/types/admin-onboarding.types'

export async function onboardAdminApi(payload: OnboardAdminRequest): Promise<OnboardAdminResponse> {
  const { data } = await apiClient.post<OnboardAdminResponse>('/users/admins/onboard', payload)
  return data
}
