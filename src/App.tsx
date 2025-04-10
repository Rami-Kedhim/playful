
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EscortsModule } from '@/modules/escorts/EscortsModule';
import HomePage from '@/pages/HomePage';
import PersonasPage from '@/pages/Personas';
import ProfilePage from '@/pages/ProfilePage';
import PersonaProfile from '@/pages/PersonaProfile';
import AuthPage from '@/pages/AuthPage';
import OtpVerificationPage from '@/pages/OtpVerificationPage';
import EscortDirectory from '@/pages/EscortDirectory';
import ContentManagementPage from '@/pages/ContentManagement';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ToastProvider } from '@/providers/toast-provider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route 
            path="/escorts" 
            element={
              <EscortsModule>
                <EscortDirectory />
              </EscortsModule>
            } 
          />
          <Route 
            path="/personas" 
            element={
              <EscortsModule>
                <PersonasPage />
              </EscortsModule>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/persona/:username" 
            element={
              <EscortsModule>
                <PersonaProfile />
              </EscortsModule>
            } 
          />
          <Route 
            path="/verify" 
            element={
              <ProtectedRoute>
                <OtpVerificationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/content" 
            element={
              <ProtectedRoute>
                <ContentManagementPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <ToastProvider />
      </Router>
    </AuthProvider>
  );
}

export default App;
