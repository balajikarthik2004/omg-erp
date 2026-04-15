import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { firstTimePasswordSchema, type FirstTimePasswordFormValues } from '@/features/auth/schemas/password-recovery.schema'
import { calculatePasswordStrength, getPasswordRequirements } from '@/features/auth/utils/validation'
import { cn } from '@/lib/cn'

interface FirstTimePasswordFormProps {
  onSubmit: (values: FirstTimePasswordFormValues) => void
  isLoading?: boolean
  userName?: string
  canDismiss?: boolean
}

const fieldBaseClass =
  'w-full pl-10 pr-10 h-11 rounded-md border border-slate-300 bg-white/70 text-sm text-slate-900 placeholder:text-slate-400'

export function FirstTimePasswordForm({ onSubmit, isLoading = false, userName, canDismiss = true }: FirstTimePasswordFormProps) {
  const [showTemporary, setShowTemporary] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FirstTimePasswordFormValues>({
    resolver: zodResolver(firstTimePasswordSchema),
    defaultValues: {
      temporaryPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword')

  const passwordStrengthResult = calculatePasswordStrength(newPassword)
  const passwordRequirements = getPasswordRequirements()

  return (
    <div className="login-glass-card">
      <div className="mb-6 sm:mb-7">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">Welcome{userName ? `, ${userName}` : ''}!</h1>
        <p className="text-slate-500 mt-1 text-xs sm:text-sm">Please set your password to continue. This is like setting your ATM PIN.</p>
        {!canDismiss && (
          <p className="text-red-600 mt-3 text-xs bg-red-50 p-2 rounded border border-red-200">
            ⚠️ This step is required to access your account. You must complete this before proceeding.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
        {/* Temporary Password */}
        <div className="space-y-2">
          <label htmlFor="temporaryPassword" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Temporary Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="temporaryPassword"
              type={showTemporary ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter temporary password"
              disabled={isLoading}
              {...register('temporaryPassword')}
              className={cn(fieldBaseClass, errors.temporaryPassword && 'border-red-400 focus:border-red-500', isLoading && 'opacity-60')}
            />
            <button
              type="button"
              onClick={() => setShowTemporary(!showTemporary)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showTemporary ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.temporaryPassword && <p className="text-xs text-red-600">{errors.temporaryPassword.message}</p>}
        </div>

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
            {isLoading ? 'Setting Password...' : 'Set Password'}
            {!isLoading && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
