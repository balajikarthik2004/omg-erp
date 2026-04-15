# AI Coding Rules — Project Architecture Guide

This document defines strict rules for AI coding assistants (Copilot, Cursor, etc.)
to ensure generated code follows enterprise-level architecture and consistency.

These rules must always be followed when generating code.

---

## Tech Stack (Mandatory)

React (Vite)
TypeScript (strict mode)
TailwindCSS
React Router
React Query
Zustand
React Hook Form + Zod
Axios (centralized instance only)

---

## Folder Architecture Rules

Use feature-based structure:

src/
app/
features/
components/
ui/
shared/
hooks/
services/
stores/
lib/
utils/
types/
config/
constants/
layouts/
pages/

Never create random folders outside this structure.

---

## API Rules

Never call axios directly inside components.

Correct flow:

component → feature hook → service → axios instance

Example:

features/auth/hooks/useLogin.ts
features/auth/api/login.ts
lib/axios.ts

All API calls must go through services layer.

---

## State Management Rules

Use Zustand only for:

authentication state
theme state
global UI state

Do NOT use Zustand for server data.

Use React Query for:

API data
caching
pagination
mutations

---

## Form Rules

All forms must use:

react-hook-form
zod schema validation

Never use uncontrolled manual validation logic.

---

## Import Rules

Always use absolute imports:

Correct:

@/components/ui/button

Wrong:

../../../components/ui/button

---

## Component Rules

Reusable UI components go inside:

components/ui/

Shared layout components go inside:

components/shared/

Feature-specific components go inside:

features/{featureName}/components/

---

## Styling Rules

Use TailwindCSS only.

Avoid:

inline styles
CSS modules
styled-components

Use:

clsx
tailwind-merge

for conditional classes.

---

## TypeScript Rules

Strict typing required.

Avoid:

any

Prefer:

interfaces
types
zod schemas

All API responses must be typed.

---

## Environment Variables

Access env variables only through:

config/env.ts

Never access:

import.meta.env

directly inside components.

---

## Routing Rules

Routes must be defined inside:

app/router.tsx

Support:

lazy loading
protected routes
role-based routing (future-ready)

---

## Error Handling Rules

Use:

react-error-boundary

Wrap major layouts and routes with error boundaries.

Never ignore runtime errors.

---

## Toast Notifications

Use:

react-hot-toast

Avoid custom alert logic.

---

## Date Handling

Use:

dayjs

Do not use native Date formatting.

---

## File Naming Convention

components → PascalCase

Button.tsx

hooks → camelCase

useLogin.ts

types → camelCase

auth.types.ts

services → camelCase

auth.service.ts

---

## Feature Structure Example

features/auth/

api/
components/
hooks/
types/
store/
pages/

Follow this structure strictly.

---

## Performance Rules

Use:

React.lazy
code splitting
memoization where necessary

Avoid unnecessary re-renders.

---

## Clean Code Rules

Avoid duplicated logic

Prefer reusable hooks

Prefer reusable UI components

Keep files under 300 lines if possible

---

## Absolute Rule

Never generate code outside this architecture.
Always follow feature-based modular structure.
Always prioritize scalability and maintainability.
