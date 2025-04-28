
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from '@/hooks/auth';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { UberCoreProvider } from './contexts/UberCoreContext';

// Shared components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Lazy loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const SettingsPage = React.lazy(() => import("./pages/Settings"));
const MessagesPage = React.lazy(() => import("./pages/Messages"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const WalletPage = React.lazy(() => import("./pages/WalletPage"));
const PulseBoostPage = React.lazy(() => import("./pages/PulseBoostPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));
const NeuralAnalyticsDashboard = React.lazy(() => import("./pages/NeuralAnalyticsDashboard"));

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <UberCoreProvider>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<AuthPage />} />
                  
                  {/* Protected routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/wallet" element={
                    <ProtectedRoute>
                      <WalletPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/pulse-boost" element={
                    <ProtectedRoute>
                      <PulseBoostPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/neural-analytics" element={<NeuralAnalyticsDashboard />} />
                </Routes>
                <Toaster />
              </Suspense>
            </UberCoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
