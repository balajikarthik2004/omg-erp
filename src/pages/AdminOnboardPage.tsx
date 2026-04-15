import dayjs from 'dayjs'
import { LockKeyhole, ShieldAlert, ShieldCheck, Sparkles, UserCog } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AdminOnboardingForm } from '@/features/admin-onboarding/components/AdminOnboardingForm'
import { useAuthStore } from '@/stores/auth.store'

function AdminOnboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const displayName =
    user?.name ?? ([user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Superadmin')

  if (!user || user.role !== 'superadmin') {
    return (
      <main className="flex min-h-full items-center justify-center bg-slate-100 px-4 py-10 sm:px-8">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold text-slate-900">Restricted Access</h1>
          <p className="mt-2 text-sm text-slate-600">
            This page is available only for superadmin users who can onboard administrators.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-full overflow-hidden bg-slate-100 px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-2%] h-64 w-64 rounded-full bg-red-500/12 blur-3xl" />
        <div className="absolute right-[-6%] top-[18%] h-72 w-72 rounded-full bg-indigo-700/12 blur-3xl" />
        <div className="absolute bottom-[4%] left-[24%] h-64 w-64 rounded-full bg-slate-300/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-6 rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Access Level: Superadmin
              </p>
              <h1 className="mt-3 text-3xl font-display font-bold text-slate-900">Admin Access Control Center</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Welcome {displayName}. Create admin accounts and precisely assign frontend route access for operational control.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today</p>
              <p className="text-lg font-display font-bold text-slate-900">{dayjs().format('DD/MM/YYYY')}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-red-500" />
                Role governance enabled
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Governance Mode</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ShieldCheck className="h-4 w-4 text-indigo-700" />
                Policy-Enforced Access
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Provisioning</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <UserCog className="h-4 w-4 text-red-600" />
                Admin Onboarding Active
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Security</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <LockKeyhole className="h-4 w-4 text-emerald-600" />
                Route-level Restriction
              </p>
            </div>
          </div>
        </header>

        <AdminOnboardingForm />
      </div>
    </main>
  )
}

export default AdminOnboardPage
