import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:8080'),
})

type Env = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
})

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`)
}

export const env: Env = parsedEnv.data
