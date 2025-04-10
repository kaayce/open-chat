import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { AppSidebar } from './components/app-sidebar'
import { SiteHeader } from './components/site-header'
import { SidebarProvider, SidebarInset } from './components/ui/sidebar'
import { createQueryClient } from './lib/queryClient'
import { ErrorFallback } from './components/ErrorFallback'

const queryClient = createQueryClient()

export const Layout = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '20rem',
              '--sidebar-width-mobile': '20rem',
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <Toaster />
          <SidebarInset>
            <SiteHeader />
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Outlet />
            </ErrorBoundary>
          </SidebarInset>
        </SidebarProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
