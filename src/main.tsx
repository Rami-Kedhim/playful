
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/auth/useAuth'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
import { SubscriptionProvider } from './hooks/useSubscription'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FavoritesProvider>
              <SubscriptionProvider>
                <NotificationsProvider>
                  <App />
                </NotificationsProvider>
              </SubscriptionProvider>
            </FavoritesProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
