import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { EscortProvider } from './providers/EscortProvider';
import EscortList from '@/pages/EscortList';
import EscortProfile from '@/pages/EscortProfile';
import EscortDirectory from '@/pages/EscortDirectory';
import EscortContent from '@/pages/EscortContent';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { useNeuralService } from '@/hooks/useNeuralService';
import { Toaster } from '@/components/ui/toaster';

const EscortsModule: React.FC = () => {
  const { service, loading, error, toggleEnabled } = useNeuralService(escortsNeuralService.moduleId);
  
  useEffect(() => {
    if (error) {
      console.error("Error initializing EscortsModule:", error);
    }
  }, [error]);
  
  return (
    <EscortProvider>
      <Routes>
        <Route path="/" element={<EscortList />} />
        <Route path="/profile/:id" element={<EscortProfile />} />
        <Route path="/directory" element={<EscortDirectory />} />
        <Route path="/content/:id" element={<EscortContent />} />
      </Routes>
      <Toaster />
    </EscortProvider>
  );
};

export default EscortsModule;
