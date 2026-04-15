import { LayoutDashboard, LogOut, ShieldCheck, ShieldUser, UserPlus } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/assets/img/logo1.png'
import type { UserRole } from '@/features/auth/types/auth.types'
import { useAuthStore } from '@/stores/auth.store'

interface SidebarNavItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  roles?: UserRole[]
}

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    to: '/admin-onboard',
    label: 'Admin Onboard',
    icon: UserPlus,
    roles: ['superadmin'],
  },
]

function hasRouteAccess(path: string, role: UserRole, allowedRoutes: string[]): boolean {
  if (role === 'superadmin') {
    return true
  }

  if (path === '/dashboard') {
    return true
  }

  if (allowedRoutes.includes('*')) {
    return true
  }

  return allowedRoutes.includes(path)
}

export function AppSidebar() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)

  if (!user) {
    return null
  }

  const allowedRoutes = user.allowedRoutes ?? user.permissions ?? []
  const displayName = user.name ?? ([user.firstName, user.lastName].filter(Boolean).join(' ') || 'Administrator')

  const visibleLinks = SIDEBAR_ITEMS.filter((item) => {
    if (item.roles && !item.roles.includes(user.role)) {
      return false
    }

    return hasRouteAccess(item.to, user.role, allowedRoutes)
  })

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-hidden border-r border-white/15 bg-[linear-gradient(160deg,var(--secondary-color)_0%,#1f256d_52%,var(--primary-color)_130%)] text-white shadow-[8px_0_30px_rgba(15,23,42,0.16)] sm:w-72">
      <div className="relative border-b border-white/15 px-5 py-5">
        <div className="pointer-events-none absolute -right-8 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/20 bg-white/90 p-1.5 shadow-sm">
            <img src={logo} alt="OMG Temple" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold tracking-wide">OMG Temple ERP</p>
            <p className="text-xs text-white/70">Governance Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {visibleLinks.map((link) => {
          const Icon = link.icon

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-white/35 bg-white/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.36),0_10px_22px_rgba(15,23,42,0.28)]'
                    : 'border-transparent text-white/85 hover:border-white/20 hover:bg-white/12 hover:text-white'
                }`
              }
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <Icon className="h-4 w-4" />
              </span>
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-white/15 bg-black/15 px-4 py-4">
        <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              {(displayName[0] ?? 'A').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{displayName}</p>
              <p className="inline-flex items-center gap-1 truncate text-xs capitalize text-white/70">
                {user.role === 'superadmin' ? (
                  <ShieldCheck className="h-3.5 w-3.5" />
                ) : (
                  <ShieldUser className="h-3.5 w-3.5" />
                )}
                {user.role}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/18"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
