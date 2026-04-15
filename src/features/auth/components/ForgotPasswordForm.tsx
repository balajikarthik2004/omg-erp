import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/features/auth/schemas/password-recovery.schema'
import { cn } from '@/lib/cn'

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => void
  isLoading?: boolean
  onBack: () => void
}

const fieldBaseClass =
  'w-full pl-10 h-11 rounded-md border border-slate-300 bg-white/70 text-sm text-slate-900 placeholder:text-slate-400'

export function ForgotPasswordForm({ onSubmit, isLoading = false, onBack }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <div className="login-glass-card">
      <div className="flex items-start gap-2 sm:gap-3 mb-6 sm:mb-7">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-red-600/80 hover:text-red-600 transition-colors duration-200 font-medium mt-1 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight break-word">Forgot Password?</h1>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm">Enter your email address to reset your password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={isLoading}
              {...register('email')}
              className={cn(fieldBaseClass, errors.email && 'border-red-400 focus:border-red-500', isLoading && 'opacity-60')}
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 login-btn-premium login-btn-shimmer text-white rounded-lg mt-1 group disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? 'Processing...' : 'Continue'}
            {!isLoading && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
