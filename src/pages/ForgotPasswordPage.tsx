import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'
import { useForgetPassword, useResetPassword } from '@/features/auth/hooks/usePasswordRecovery'
import type {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from '@/features/auth/schemas/password-recovery.schema'
import logo from '@/assets/img/logo1.png'

type PasswordRecoveryStep = 'forgot-password' | 'reset-password' | 'success'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<PasswordRecoveryStep>('forgot-password')
  const [email, setEmail] = useState('')

  const forgetPasswordMutation = useForgetPassword()
  const resetPasswordMutation = useResetPassword()

  const handleForgotPasswordSubmit = async (values: ForgotPasswordFormValues) => {
    forgetPasswordMutation.mutate(values, {
      onSuccess: () => {
        setEmail(values.email)
        setStep('reset-password')
      },
    })
  }

  const handleResetPasswordSubmit = async (values: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(
      { email, ...values },
      {
        onSuccess: () => {
          setStep('success')
        },
      }
    )
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  const handleBackStep = () => {
    if (step === 'reset-password') {
      setStep('forgot-password')
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background-image" />
        <div className="absolute inset-0 login-image-overlay" />
        <div className="absolute inset-0 bg-slate-100/30 backdrop-blur-[0.5px]" />
      </div>

      <div className="login-floating-orb animate-float hidden lg:block w-75 h-75 top-[-5%] right-[5%] bg-(--primary-color)" />
      <div className="login-floating-orb hidden lg:block w-50 h-50 bottom-[10%] right-[20%] bg-(--secondary-color) [animation-delay:1.5s] animate-[float_4s_ease-in-out_infinite]" />

      <div className="hidden lg:flex lg:w-[55%] relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background-image" />
        <div className="absolute inset-0 login-image-overlay" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="w-full max-w-96 sm:max-w-100">
          {step !== 'success' && (
            <div className="lg:hidden flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-white/90 border border-slate-200 p-1 sm:p-1.5 flex items-center justify-center shadow-sm shrink-0">
                <img src={logo} alt="OMG Temple" className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-sm sm:text-lg font-display font-bold text-slate-900">OMG Temple</span>
            </div>
          )}

          {step === 'forgot-password' && (
            <>
              <ForgotPasswordForm
                onSubmit={handleForgotPasswordSubmit}
                isLoading={forgetPasswordMutation.isPending}
                onBack={handleBackToLogin}
              />
            </>
          )}

          {step === 'reset-password' && (
            <>
              <ResetPasswordForm
                onSubmit={handleResetPasswordSubmit}
                isLoading={resetPasswordMutation.isPending}
                onBack={handleBackStep}
              />
            </>
          )}

          {step === 'success' && (
            <div className="login-glass-card text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Password Reset Successfully!</h1>
                <p className="text-slate-500 mt-2 text-sm">Your password has been changed. Please sign in with your new password.</p>
              </div>

              <button
                onClick={handleBackToLogin}
                className="w-full h-11 login-btn-premium login-btn-shimmer text-white rounded-lg mt-1 group transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Back to Sign In
                </span>
              </button>
            </div>
          )}

          <div className="hidden lg:flex items-center justify-center mt-4 sm:mt-6 gap-1.5">
            <span className="text-xs text-slate-500/80">Powered by</span>
            <span className="text-xs font-display font-semibold text-slate-600 text-center">OMG Temple Governance System</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
