
import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from '@/hooks/auth';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';

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
    <ErrorBoundary>
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
                  <Layout>
                    <Home />
                  </Layout>
                } />
                <Route path="/profile" element={
                  <Layout requireAuth>
                    <Profile />
                  </Layout>
                } />
                <Route path="/settings" element={
                  <Layout requireAuth>
                    <Settings />
                  </Layout>
                } />
                <Route path="/messages" element={
                  <Layout requireAuth>
                    <Messages />
                  </Layout>
                } />
                <Route path="/search" element={
                  <Layout>
                    <Search />
                  </Layout>
                } />
                <Route path="/wallet" element={
                  <Layout requireAuth>
                    <WalletPage />
                  </Layout>
                } />
                <Route path="/pulse-boost" element={
                  <Layout requireAuth>
                    <PulseBoostPage />
                  </Layout>
                } />
                <Route path="*" element={
                  <Layout hideNavbar>
                    <NotFound />
                  </Layout>
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
