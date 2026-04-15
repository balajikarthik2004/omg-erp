import dayjs from 'dayjs'
import { ShieldPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FirstTimePasswordModal } from '@/features/auth/components/FirstTimePasswordModal'
import { useAuthStore } from '@/stores/auth.store'

function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const handleFirstTimePasswordSuccess = () => {
    // Update user to mark first login as complete
    if (user) {
      setSession({
        accessToken: localStorage.getItem('accessToken') || '',
        user: {
          ...user,
          isFirstTimeLogin: false,
        },
      })
    }
  }

  if (!user) {
    navigate('/login', { replace: true })
    return null
  }

  // If first time login, show only modal (block dashboard access)
  if (user.isFirstTimeLogin) {
    return (
      <FirstTimePasswordModal
        user={user}
        isOpen={true}
        onClose={handleFirstTimePasswordSuccess}
        canDismiss={false}
      />
    )
  }

  const displayName =
    user.name ?? ([user.firstName, user.lastName].filter(Boolean).join(' ') || 'Administrator')

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm text-slate-500">Today</p>
            <p className="text-lg font-semibold text-slate-900">{dayjs().format('DD/MM/YYYY')}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Sign Out
          </button>
        </div>

        <section className="pt-8">
          {user.role === 'superadmin' && (
            <button
              onClick={() => navigate('/admin-onboard')}
              className="mb-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-linear-to-r from-red-600 to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <ShieldPlus className="h-4 w-4" />
              Onboard Admin
            </button>
          )}

          <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Welcome, {displayName}. Your enterprise dashboard modules can be added here.
          </p>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
