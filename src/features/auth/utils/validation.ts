/**
 * Password Validation and Strength Check Utilities
 * Handles all password-related validations
 */

export interface PasswordStrength {
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
  isLongEnough: boolean
}

export interface PasswordStrengthResult extends PasswordStrength {
  strengthCount: number
  strengthColor: 'text-red-600' | 'text-yellow-600' | 'text-green-600'
  strengthPercentage: 'w-1/4' | 'w-1/2' | 'w-3/4' | 'w-full'
  strengthBgColor: 'bg-red-600' | 'bg-yellow-600' | 'bg-green-600'
}

/**
 * Calculate password strength based on requirements
 * @param password - The password to check
 * @returns Object with strength details and metadata
 */
export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const strength: PasswordStrength = {
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
    isLongEnough: password.length >= 8,
  }

  const strengthCount = Object.values(strength).filter(Boolean).length

  let strengthColor: 'text-red-600' | 'text-yellow-600' | 'text-green-600'
  let strengthBgColor: 'bg-red-600' | 'bg-yellow-600' | 'bg-green-600'
  let strengthPercentage: 'w-1/4' | 'w-1/2' | 'w-3/4' | 'w-full'

  if (strengthCount <= 2) {
    strengthColor = 'text-red-600'
    strengthBgColor = 'bg-red-600'
    strengthPercentage = strengthCount === 1 ? 'w-1/4' : 'w-1/2'
  } else if (strengthCount === 3) {
    strengthColor = 'text-yellow-600'
    strengthBgColor = 'bg-yellow-600'
    strengthPercentage = 'w-3/4'
  } else {
    strengthColor = 'text-green-600'
    strengthBgColor = 'bg-green-600'
    strengthPercentage = 'w-full'
  }

  return {
    ...strength,
    strengthCount,
    strengthColor,
    strengthPercentage,
    strengthBgColor,
  }
}

/**
 * Get password requirements description
 * @returns Array of requirement objects
 */
export function getPasswordRequirements() {
  return [
    {
      id: 'length',
      label: 'At least 8 characters',
      test: (password: string) => password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      test: (password: string) => /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      test: (password: string) => /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'One number',
      test: (password: string) => /\d/.test(password),
    },
    {
      id: 'special',
      label: 'One special character (@$!%*?&)',
      test: (password: string) => /[@$!%*?&]/.test(password),
    },
  ]
}

/**
 * Check if password meets all requirements
 * @param password - The password to validate
 * @returns true if password meets all requirements, false otherwise
 */
export function isPasswordValid(password: string): boolean {
  const requirements = getPasswordRequirements()
  return requirements.every((req) => req.test(password))
}

/**
 * Validate email format
 * @param email - The email to validate
 * @returns true if email is valid, false otherwise
 */
export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get all validation errors for a password field
 * @param password - The password to validate
 * @returns Array of error messages, empty if no errors
 */
export function getPasswordErrors(password: string): string[] {
  const errors: string[] = []
  const requirements = getPasswordRequirements()

  requirements.forEach((req) => {
    if (!req.test(password)) {
      errors.push(`Password must contain ${req.label.toLowerCase()}`)
    }
  })

  return errors
}

/**
 * Check password match
 * @param password - First password
 * @param confirmPassword - Confirmation password
 * @returns true if passwords match, false otherwise
 */
export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

/**
 * Get password mismatch error
 * @param password - First password
 * @param confirmPassword - Confirmation password
 * @returns Error message if passwords don't match, empty string if they do
 */
export function getPasswordMismatchError(password: string, confirmPassword: string): string {
  if (!doPasswordsMatch(password, confirmPassword)) {
    return 'Passwords do not match'
  }
  return ''
}
