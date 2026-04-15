import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'

function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

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
          <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Welcome, {user?.name ?? 'Administrator'}. Your enterprise dashboard modules can be added here.
          </p>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
