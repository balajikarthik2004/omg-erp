export type UserRole = 'admin' | 'manager' | 'devotee'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
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
