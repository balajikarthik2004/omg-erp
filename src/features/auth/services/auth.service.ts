import { loginApi } from '@/features/auth/api/login'
import { forgotPasswordApi, resetPasswordApi, firstTimePasswordApi } from '@/features/auth/api/password-recovery'
import type {
  AuthSession,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  FirstTimePasswordRequest,
  FirstTimePasswordResponse,
} from '@/features/auth/types/auth.types'

const DEMO_EMAIL = 'admin@omgtemple.org'
const DEMO_PASSWORD = 'Admin@1234'

function createDemoSession(email: string): AuthSession {
  return {
    accessToken: 'demo-token',
    user: {
      id: 'demo-admin',
      name: 'Temple Administrator',
      email,
      role: 'admin',
      isFirstTimeLogin: false,
    },
  }
}

async function login(payload: LoginRequest): Promise<AuthSession> {
  try {
    return await loginApi(payload)
  } catch (error) {
    const isDevelopmentFallback =
      import.meta.env.DEV &&
      payload.email.toLowerCase() === DEMO_EMAIL &&
      payload.password === DEMO_PASSWORD

    if (isDevelopmentFallback) {
      return createDemoSession(payload.email)
    }

    throw error
  }
}

async function forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  return await forgotPasswordApi(payload)
}

async function resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return await resetPasswordApi(payload)
}

async function setFirstTimePassword(payload: FirstTimePasswordRequest): Promise<FirstTimePasswordResponse> {
  return await firstTimePasswordApi(payload)
}

export const authService = {
  login,
  forgotPassword,
  resetPassword,
  setFirstTimePassword,
}
