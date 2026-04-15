import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Plus, ShieldCheck, Sparkles, UserPlus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  adminOnboardingSchema,
  type AdminOnboardingFormValues,
} from '@/features/admin-onboarding/schemas/admin-onboarding.schema'
import { useOnboardAdmin } from '@/features/admin-onboarding/hooks/useOnboardAdmin'
import {
  ROUTE_PERMISSION_OPTIONS,
  type RoutePermissionOption,
} from '@/features/admin-onboarding/types/admin-onboarding.types'
import { cn } from '@/lib/cn'

const fieldClassName =
  'w-full h-11 rounded-xl border border-slate-300 bg-white/85 px-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-3 focus:ring-red-200/60'

const groupLabelClassMap: Record<RoutePermissionOption['group'], string> = {
  Core: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  People: 'bg-sky-50 text-sky-700 border-sky-200',
  Seva: 'bg-amber-50 text-amber-700 border-amber-200',
  Finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Operations: 'bg-violet-50 text-violet-700 border-violet-200',
  System: 'bg-slate-100 text-slate-700 border-slate-200',
}

export function AdminOnboardingForm() {
  const [customRoute, setCustomRoute] = useState('')
  const [customRouteError, setCustomRouteError] = useState('')
  const onboardAdminMutation = useOnboardAdmin()

  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminOnboardingFormValues>({
    resolver: zodResolver(adminOnboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      allowedRoutes: ['/dashboard'],
    },
  })

  const selectedRoutes = watch('allowedRoutes')

  const groupedRouteOptions = useMemo(() => {
    return ROUTE_PERMISSION_OPTIONS.reduce<Record<RoutePermissionOption['group'], RoutePermissionOption[]>>(
      (accumulator, option) => {
        accumulator[option.group] = [...(accumulator[option.group] ?? []), option]
        return accumulator
      },
      {
        Core: [],
        People: [],
        Seva: [],
        Finance: [],
        Operations: [],
        System: [],
      }
    )
  }, [])

  const setRoutes = (routes: string[]) => {
    setValue('allowedRoutes', [...new Set(routes)], {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const toggleRoute = (routePath: string) => {
    const routeExists = selectedRoutes.includes(routePath)
    if (routeExists) {
      setRoutes(selectedRoutes.filter((route) => route !== routePath))
      return
    }

    setRoutes([...selectedRoutes, routePath])
  }

  const handleAddCustomRoute = () => {
    const normalizedRoute = customRoute.trim().replace(/\/+$/, '')

    if (normalizedRoute.length < 2 || !normalizedRoute.startsWith('/')) {
      setCustomRouteError('Custom route must start with / and include a valid path')
      return
    }

    if (selectedRoutes.includes(normalizedRoute)) {
      setCustomRouteError('This route is already selected')
      return
    }

    setCustomRouteError('')
    setRoutes([...selectedRoutes, normalizedRoute])
    setCustomRoute('')
  }

  const handleRemoveSelectedRoute = (routePath: string) => {
    setRoutes(selectedRoutes.filter((route) => route !== routePath))
  }

  const onSubmit = (values: AdminOnboardingFormValues) => {
    onboardAdminMutation.mutate(values, {
      onSuccess: () => {
        reset({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: '',
          allowedRoutes: ['/dashboard'],
        })
        setCustomRoute('')
        setCustomRouteError('')
      },
    })
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-36px_rgba(41,48,136,0.45)]">
      <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-indigo-700/10 blur-3xl" />

      <div className="relative border-b border-slate-200 bg-linear-to-r from-[var(--secondary-color)]/95 to-[var(--primary-color)]/90 px-6 py-5 text-white">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          <Sparkles className="h-3.5 w-3.5" />
          Superadmin Workspace
        </p>
        <h2 className="mt-3 text-2xl font-display font-bold">Admin Onboarding</h2>
        <p className="mt-1 text-sm text-white/85">
          Create administrator accounts and grant frontend route permissions with precision.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative grid gap-8 p-6 lg:grid-cols-[1fr_1.15fr]" noValidate>
        <section className="space-y-5">
          <h3 className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wide text-slate-600">
            <UserPlus className="h-4 w-4 text-red-600" />
            Admin Profile
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                {...register('firstName')}
                className={cn(fieldClassName, errors.firstName && 'border-red-400 focus:border-red-500 focus:ring-red-200')}
                placeholder="Anand"
              />
              {errors.firstName && <p className="text-xs text-red-600">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                {...register('lastName')}
                className={cn(fieldClassName, errors.lastName && 'border-red-400 focus:border-red-500 focus:ring-red-200')}
                placeholder="Iyer"
              />
              {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className={cn(fieldClassName, errors.email && 'border-red-400 focus:border-red-500 focus:ring-red-200')}
              placeholder="admin@omgtemple.org"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="password">
              Temporary Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              className={cn(fieldClassName, errors.password && 'border-red-400 focus:border-red-500 focus:ring-red-200')}
              placeholder="Admin@12345"
            />
            {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="phoneNumber">
              Phone Number (Optional)
            </label>
            <input
              id="phoneNumber"
              type="text"
              autoComplete="tel"
              {...register('phoneNumber')}
              className={cn(fieldClassName, errors.phoneNumber && 'border-red-400 focus:border-red-500 focus:ring-red-200')}
              placeholder="9876543210"
            />
            {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wide text-slate-600">
              <ShieldCheck className="h-4 w-4 text-indigo-700" />
              Route Permissions
            </h3>

            <button
              type="button"
              onClick={() => setRoutes(ROUTE_PERMISSION_OPTIONS.map((option) => option.path))}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Select All
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedRoutes.map((route) => (
                <span
                  key={route}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {route}
                  <button
                    type="button"
                    onClick={() => handleRemoveSelectedRoute(route)}
                    className="rounded-full p-0.5 text-indigo-600 transition hover:bg-indigo-100"
                    aria-label={`Remove ${route}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={customRoute}
                onChange={(event) => {
                  setCustomRoute(event.target.value)
                  if (customRouteError) {
                    setCustomRouteError('')
                  }
                }}
                placeholder="Add custom route, e.g. /hall-booking"
                className={fieldClassName}
              />
              <button
                type="button"
                onClick={handleAddCustomRoute}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
            {customRouteError && <p className="mt-2 text-xs text-red-600">{customRouteError}</p>}
            {errors.allowedRoutes && <p className="mt-2 text-xs text-red-600">{errors.allowedRoutes.message}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(groupedRouteOptions).map(([groupName, options]) =>
              options.map((option) => {
                const isSelected = selectedRoutes.includes(option.path)
                return (
                  <button
                    key={option.path}
                    type="button"
                    onClick={() => toggleRoute(option.path)}
                    className={cn(
                      'group rounded-2xl border bg-white p-4 text-left transition-all duration-200',
                      isSelected
                        ? 'border-indigo-400 shadow-[0_10px_20px_-12px_rgba(41,48,136,0.8)] ring-2 ring-indigo-200'
                        : 'border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
                    )}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                          groupLabelClassMap[groupName as RoutePermissionOption['group']]
                        )}
                      >
                        {groupName}
                      </span>
                      <span
                        className={cn(
                          'inline-flex h-5 w-5 items-center justify-center rounded-full border',
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500 text-white'
                            : 'border-slate-300 text-transparent group-hover:text-slate-400'
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                    <p className="mt-1 text-xs text-slate-600">{option.description}</p>
                    <p className="mt-2 text-[11px] font-medium text-slate-500">{option.path}</p>
                  </button>
                )
              })
            )}
          </div>
        </section>

        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={onboardAdminMutation.isPending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(41,48,136,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_26px_-14px_rgba(41,48,136,0.85)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {onboardAdminMutation.isPending ? (
              'Onboarding Admin...'
            ) : (
              <>
                <Check className="h-4 w-4" />
                Create Admin Account
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
