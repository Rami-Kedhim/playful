
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import AuthGuard from '@/components/auth/AuthGuard';
import RequireAuth from '@/components/auth/RequireAuth';
import { Toaster } from 'sonner';

// Import your pages here
import HomePage from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import AICompanionPage from '@/pages/AICompanionPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <AIVoiceProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/auth" 
              element={
                <AuthGuard requireAuth={false}>
                  <AuthPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/ai-companions" 
              element={
                <AICompanionPage />
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <RequireAuth requiredRoles={['admin', 'moderator']}>
                  {/* Admin routes go here */}
                  <div>Admin area</div>
                </RequireAuth>
              } 
            />
            
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AIVoiceProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
