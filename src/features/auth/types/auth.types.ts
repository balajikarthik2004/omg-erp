export type UserRole = 'superadmin' | 'admin' | 'manager' | 'devotee'

export interface AuthUser {
  id: string | number
  name?: string
  firstName?: string
  lastName?: string
  email: string
  role: UserRole
  allowedRoutes?: string[]
  permissions?: string[]
  isFirstTimeLogin?: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthSession {
  accessToken: string
  user: AuthUser
}

export type LoginResponse = AuthSession

// Password Recovery Types - Forget Password
export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}

export interface ResetPasswordRequest {
  email: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  message: string
  success: boolean
}

// First Time Password Reset
export interface FirstTimePasswordRequest {
  temporaryPassword: string
  newPassword: string
  confirmPassword: string
}

export interface FirstTimePasswordResponse {
  message: string
  success: boolean
  user: AuthUser
}
