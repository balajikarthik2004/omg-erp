export interface RoutePermissionOption {
  path: string
  label: string
  description: string
  group: 'Core' | 'People' | 'Seva' | 'Finance' | 'Operations' | 'System'
}

export const ROUTE_PERMISSION_OPTIONS: RoutePermissionOption[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    description: 'Executive dashboard and daily activity panels.',
    group: 'Core',
  },
  {
    path: '/devotees',
    label: 'Devotees',
    description: 'Manage devotee profiles and engagement records.',
    group: 'People',
  },
  {
    path: '/pooja-seva',
    label: 'Pooja & Seva',
    description: 'Handle seva bookings and rituals workflow.',
    group: 'Seva',
  },
  {
    path: '/annadhanam',
    label: 'Annadhanam',
    description: 'Control annadhanam scheduling and attendance.',
    group: 'Seva',
  },
  {
    path: '/donations',
    label: 'Donations',
    description: 'Track transactions and donation management tools.',
    group: 'Finance',
  },
  {
    path: '/events',
    label: 'Events',
    description: 'Access temple events and calendar planning.',
    group: 'Operations',
  },
  {
    path: '/campaign',
    label: 'Campaigns',
    description: 'Create and monitor outreach campaigns.',
    group: 'Operations',
  },
  {
    path: '/inventory',
    label: 'Inventory',
    description: 'Manage stock, issue logs, and usage reports.',
    group: 'Operations',
  },
  {
    path: '/assets',
    label: 'Assets',
    description: 'Review and update asset registers.',
    group: 'Operations',
  },
  {
    path: '/reports',
    label: 'Documents',
    description: 'View generated reports and exported documents.',
    group: 'System',
  },
  {
    path: '/settings',
    label: 'Settings',
    description: 'Update account-level configuration and controls.',
    group: 'System',
  },
]

export interface OnboardAdminRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber?: string
  allowedRoutes: string[]
}

export interface OnboardAdminResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  role: 'admin'
  allowedRoutes: string[]
  accountStatus: 'active' | 'inactive' | 'suspended'
  createdBy?: number
  createdAt: string
}
