
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import RequireAuth from '@/components/auth/RequireAuth';
import { Toaster } from 'sonner';
import AppRoutes from './Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <AIVoiceProvider>
          <Toaster position="top-right" />
          <AppRoutes />
        </AIVoiceProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
