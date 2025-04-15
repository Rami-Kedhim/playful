
import React from 'react';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import { Toaster } from 'sonner';
import RoutesComponent from './Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <AIVoiceProvider>
          <Toaster position="top-right" />
          <RoutesComponent />
        </AIVoiceProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
