import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/shared/AppSidebar'

export function AppShellLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <AppSidebar />
      <div className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
