import { onboardAdminApi } from '@/features/admin-onboarding/api/onboard-admin'
import type {
  OnboardAdminRequest,
  OnboardAdminResponse,
} from '@/features/admin-onboarding/types/admin-onboarding.types'

async function onboardAdmin(payload: OnboardAdminRequest): Promise<OnboardAdminResponse> {
  return await onboardAdminApi(payload)
}

export const adminOnboardingService = {
  onboardAdmin,
}
