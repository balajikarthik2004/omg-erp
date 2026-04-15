import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { cn } from '@/lib/cn'

const fieldBaseClass =
  'w-full pl-10 h-11 rounded-md border border-slate-300 bg-white/70 text-sm text-slate-900 placeholder:text-slate-400 login-input-enhanced'

export function LoginForm() {
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values)
  }

  return (
    <div className="login-glass-card">
      <div className="mb-7">
        <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-slate-500 mt-1.5 text-sm">Sign in to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Email
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register('email')}
              className={cn(fieldBaseClass, errors.email && 'border-red-400 focus:border-red-500')}
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-red-600/80 hover:text-red-600 transition-colors duration-200 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-300 group-focus-within:text-red-600" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register('password')}
              className={cn(fieldBaseClass, errors.password && 'border-red-400 focus:border-red-500')}
            />
          </div>
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full h-11 login-btn-premium login-btn-shimmer text-white rounded-lg mt-1 group disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
            {!loginMutation.isPending && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
      </form>

      <div className="login-divider mt-6 mb-4">
        <span>secure login</span>
      </div>

      <p className="text-[11px] text-slate-500">
        Development login: admin@omgtemple.org / Admin@1234
      </p>
    </div>
  )
}
