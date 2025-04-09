
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EscortsModule } from '@/modules/escorts/EscortsModule';
import PersonasPage from '@/pages/Personas';
import ProfilePage from '@/pages/ProfilePage';
import PersonaProfile from '@/pages/PersonaProfile';
import AuthPage from '@/pages/AuthPage';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/" 
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
