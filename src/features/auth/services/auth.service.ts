import { loginApi } from '@/features/auth/api/login'
import type { AuthSession, LoginRequest } from '@/features/auth/types/auth.types'

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

export const authService = {
  login,
}
