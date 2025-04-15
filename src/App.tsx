
import React from 'react';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import { PersonaProvider } from '@/contexts/PersonaContext';
import { Toaster } from 'sonner';
import RoutesComponent from './Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <AIVoiceProvider>
          <PersonaProvider>
            <Toaster position="top-right" />
            <RoutesComponent />
          </PersonaProvider>
        </AIVoiceProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
