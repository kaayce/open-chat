import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppSidebar } from './components/app-sidebar'
import { createQueryClient } from './lib/queryClient'
import { SiteHeader } from './components/site-header'
import { Toaster } from './components/ui/sonner'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Chat from './pages/chat'

const queryClient = createQueryClient()

const Fallback = () => (
  <div className="w-full h-full flex items-center justify-center text-center bg-gray-100 text-gray-700 p-4">
    Something went wrong
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<Fallback />}>
        <Routes>
          <Route
            element={
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
                    <ErrorBoundary fallback={<Fallback />}>
                      <Outlet />
                    </ErrorBoundary>
                  </SidebarInset>
                </SidebarProvider>
              </QueryClientProvider>
            }
          >
            <Route path="/" element={<Chat />} />
            <Route path="/phone" element={<Chat />} />
            <Route path="/phone/:phoneId" element={<Chat />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
