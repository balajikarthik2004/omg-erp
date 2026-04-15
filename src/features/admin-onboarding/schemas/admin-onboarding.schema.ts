import { z } from 'zod'

export const adminOnboardingSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters'),
  phoneNumber: z
    .string()
    .trim()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .optional()
    .or(z.literal('')),
  allowedRoutes: z
    .array(
      z
        .string()
        .trim()
        .min(2, 'Route path is invalid')
        .regex(/^\//, 'Each route must start with /')
    )
    .min(1, 'Select at least one route permission'),
})

export type AdminOnboardingFormValues = z.infer<typeof adminOnboardingSchema>
