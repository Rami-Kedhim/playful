
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import BrainHubPage from './pages/BrainHubPage';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';
import ProfilePage from './pages/ProfilePage';
import EscortDirectoryPage from './pages/EscortDirectory';
import EscortDetail from './pages/EscortDetail';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/escorts" element={<EscortDirectoryPage />} />
            <Route path="/escorts/:id" element={<EscortDetail />} />
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/favorites" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
              <Route path="/messages" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
              <Route path="/bookings" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
            </Route>
            
            {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'moderator']} />}>
              <Route path="/brainhub" element={<BrainHubPage />} />
            </Route>
            
            {/* Escort-only routes */}
            <Route element={<ProtectedRoute allowedRoles={['escort', 'admin']} />}>
              <Route path="/escort-dashboard" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
            </Route>
            
            {/* Creator-only routes */}
            <Route element={<ProtectedRoute allowedRoles={['creator', 'admin']} />}>
              <Route path="/creator-dashboard" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
            </Route>
            
            {/* Public feature routes - these will be implemented in later phases */}
            <Route path="/creators" element={<ProfilePage />} /> {/* Placeholder - will be implemented later */}
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
