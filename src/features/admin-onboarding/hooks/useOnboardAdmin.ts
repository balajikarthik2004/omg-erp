import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminOnboardingService } from '@/features/admin-onboarding/services/admin-onboarding.service'
import type { AdminOnboardingFormValues } from '@/features/admin-onboarding/schemas/admin-onboarding.schema'
import { getApiErrorMessage } from '@/lib/errors'

export function useOnboardAdmin() {
  return useMutation({
    mutationFn: (payload: AdminOnboardingFormValues) =>
      adminOnboardingService.onboardAdmin({
        ...payload,
        phoneNumber: payload.phoneNumber?.trim() ? payload.phoneNumber.trim() : undefined,
      }),
    onSuccess: (createdAdmin) => {
      toast.success(`Admin ${createdAdmin.firstName} ${createdAdmin.lastName} onboarded`)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Unable to onboard admin right now'))
    },
  })
}
