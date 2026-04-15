import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/features/auth/schemas/password-recovery.schema'
import { calculatePasswordStrength, getPasswordRequirements } from '@/features/auth/utils/validation'
import { cn } from '@/lib/cn'

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => void
  isLoading?: boolean
  onBack?: () => void
}

const fieldBaseClass =
  'w-full pl-10 pr-10 h-11 rounded-md border border-slate-300 bg-white/70 text-sm text-slate-900 placeholder:text-slate-400'

export function ResetPasswordForm({ onSubmit, isLoading = false, onBack }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword')

  const passwordStrengthResult = calculatePasswordStrength(newPassword)
  const passwordRequirements = getPasswordRequirements()

  return (
    <div className="login-glass-card">
      <div className="flex items-start gap-2 sm:gap-3 mb-6 sm:mb-7">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-red-600/80 hover:text-red-600 transition-colors duration-200 font-medium mt-1 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight break-word">Create New Password</h1>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm">Enter a strong password to secure your account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
        {/* New Password */}
        <div className="space-y-2">
          <label htmlFor="newPassword" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            New Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Enter new password"
              disabled={isLoading}
              {...register('newPassword')}
              className={cn(fieldBaseClass, errors.newPassword && 'border-red-400 focus:border-red-500', isLoading && 'opacity-60')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-xs text-red-600">{errors.newPassword.message}</p>}

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-slate-50 rounded-md border border-slate-200">
              <p className="text-xs font-medium text-slate-700 mb-2">Password Requirements:</p>
              <div className="space-y-1">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.id}
                    className={cn(
                      'text-xs flex items-center gap-2',
                      req.test(newPassword) ? 'text-green-600' : 'text-slate-400'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        req.test(newPassword) ? 'bg-green-600' : 'bg-slate-300'
                      )}
                    />
                    {req.label}
                  </div>
                ))}
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-300', passwordStrengthResult.strengthColor)}
                  style={{ width: `${passwordStrengthResult.strengthPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Confirm Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Confirm password"
              disabled={isLoading}
              {...register('confirmPassword')}
              className={cn(fieldBaseClass, errors.confirmPassword && 'border-red-400 focus:border-red-500', isLoading && 'opacity-60')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 login-btn-premium login-btn-shimmer text-white rounded-lg mt-1 group disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
            {!isLoading && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
