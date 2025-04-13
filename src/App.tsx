import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import AuthGuard from '@/components/auth/AuthGuard';
import { Toaster } from 'sonner';

// Import your pages here
import HomePage from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import AICompanionPage from '@/pages/AICompanionPage';
// ...other imports

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
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              } 
            />
            <Route path="/ai-companions" element={<AICompanionPage />} />
            {/* Add other protected routes here */}
          </Routes>
        </AIVoiceProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
