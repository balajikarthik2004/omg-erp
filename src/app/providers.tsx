import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-display font-semibold text-red-700">Unexpected application error</h1>
        <p className="mt-2 text-sm text-slate-600">{errorMessage}</p>
        <button
          className="mt-5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => {
            toast.dismiss()
            resetErrorBoundary()
          }}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
