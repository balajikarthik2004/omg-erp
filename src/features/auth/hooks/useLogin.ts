import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '@/features/auth/services/auth.service'
import type { LoginFormValues } from '@/features/auth/schemas/login.schema'
import { getApiErrorMessage } from '@/lib/errors'
import { useAuthStore } from '@/stores/auth.store'

export function useLogin() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: LoginFormValues) => authService.login(payload),
    onSuccess: (session) => {
      setSession(session)
      toast.success('Signed in successfully')
      navigate('/dashboard', { replace: true })
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Unable to sign in right now'))
    },
  })
}
