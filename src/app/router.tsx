import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShellLayout } from '@/components/shared/AppShellLayout'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import AdminOnboardPage from '@/pages/AdminOnboardPage'
import { useAuthStore } from '@/stores/auth.store'

export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/forgot-password"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShellLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin-onboard" element={<AdminOnboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
