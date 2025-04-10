
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import BrainHubPage from './pages/BrainHubPage';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import AuthPage from './pages/AuthPage';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            
            {/* Protected routes - require authentication */}
            <Route element={<RoleBasedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            
            {/* Admin-only routes */}
            <Route element={<RoleBasedRoute allowedRoles={['admin', 'moderator']} />}>
              <Route path="/brainhub" element={<BrainHubPage />} />
            </Route>
            
            {/* Escort-only routes - will implement later */}
            <Route element={<RoleBasedRoute allowedRoles={['escort', 'admin']} />}>
              {/* <Route path="/escort-dashboard" element={<EscortDashboard />} /> */}
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
