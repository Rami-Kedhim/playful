
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from '@/hooks/auth';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ErrorFallback from './components/common/ErrorFallback';
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import WalletPage from "./pages/WalletPage";
import PulseBoostPage from "./pages/PulseBoostPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                } />
                <Route path="/profile" element={
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                } />
                <Route path="/settings" element={
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                } />
                <Route path="/messages" element={
                  <MainLayout>
                    <Messages />
                  </MainLayout>
                } />
                <Route path="/search" element={
                  <MainLayout>
                    <Search />
                  </MainLayout>
                } />
                <Route path="/wallet" element={
                  <MainLayout>
                    <WalletPage />
                  </MainLayout>
                } />
                <Route path="/pulse-boost" element={
                  <MainLayout>
                    <PulseBoostPage />
                  </MainLayout>
                } />
                <Route path="*" element={
                  <MainLayout hideNavbar>
                    <NotFound />
                  </MainLayout>
                } />
              </Routes>
              <Toaster />
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
