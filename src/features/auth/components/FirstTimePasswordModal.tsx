import { FirstTimePasswordForm } from '@/features/auth/components/FirstTimePasswordForm'
import { useFirstTimePassword } from '@/features/auth/hooks/usePasswordRecovery'
import type { FirstTimePasswordFormValues } from '@/features/auth/schemas/password-recovery.schema'
import type { AuthUser } from '@/features/auth/types/auth.types'

interface FirstTimePasswordModalProps {
  user: AuthUser
  isOpen: boolean
  onClose?: () => void
  canDismiss?: boolean
}

export function FirstTimePasswordModal({ user, isOpen, onClose, canDismiss = true }: FirstTimePasswordModalProps) {
  const firstTimePasswordMutation = useFirstTimePassword()

  if (!isOpen) return null

  const handleSubmit = (values: FirstTimePasswordFormValues) => {
    firstTimePasswordMutation.mutate(values, {
      onSuccess: () => {
        onClose?.()
      },
    })
  }

  const handleBackdropClick = () => {
    if (canDismiss) {
      onClose?.()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6"
      onClick={canDismiss ? handleBackdropClick : undefined}
    >
      <div 
        className="w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {canDismiss && (
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          <FirstTimePasswordForm
            onSubmit={handleSubmit}
            isLoading={firstTimePasswordMutation.isPending}
            userName={user.name?.split(' ')[0]}
            canDismiss={canDismiss}
          />
        </div>
      </div>
    </div>
  )
}
