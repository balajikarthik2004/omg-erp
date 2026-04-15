import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { authService } from '@/features/auth/services/auth.service'
import type {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  FirstTimePasswordFormValues,
} from '@/features/auth/schemas/password-recovery.schema'
import { getApiErrorMessage } from '@/lib/errors'
import { useAuthStore } from '@/stores/auth.store'

export function useForgetPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordFormValues) => authService.forgotPassword(payload),
    onSuccess: () => {
      toast.success('Password reset link sent to your email')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to process request. Please try again.'))
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordFormValues & { email: string }) =>
      authService.resetPassword({
        email: payload.email,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      }),
    onSuccess: () => {
      toast.success('Password reset successfully. Please sign in with your new password.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to reset password. Please try again.'))
    },
  })
}

export function useFirstTimePassword() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: FirstTimePasswordFormValues) =>
      authService.setFirstTimePassword({
        temporaryPassword: payload.temporaryPassword,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      }),
    onSuccess: (response) => {
      toast.success('Password set successfully!')
      // Update session to mark first-time login as complete
      setSession({
        accessToken: localStorage.getItem('accessToken') || '',
        user: {
          ...response.user,
          isFirstTimeLogin: false,
        },
      })
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to set password. Please try again.'))
    },
  })
}
