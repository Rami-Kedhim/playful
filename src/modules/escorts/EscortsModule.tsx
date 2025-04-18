
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { EscortProvider } from './providers/EscortProvider';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { useNeuralService } from '@/hooks/useNeuralService';
import { Toaster } from '@/components/ui/toaster';

// These are placeholder components until the actual pages are implemented
const EscortList: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Escort List</h2>
    <p>Browse all escorts</p>
  </div>
);

const EscortProfile: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Escort Profile</h2>
    <p>View escort profile and services</p>
  </div>
);

const EscortDirectory: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Escort Directory</h2>
    <p>Search and find escorts by location and services</p>
  </div>
);

const EscortContent: React.FC<{ escort: any }> = ({ escort }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Escort Content</h2>
    <p>View escort's photos and videos</p>
  </div>
);

const EscortsModule: React.FC = () => {
  const { service, loading, error, toggleEnabled } = useNeuralService(escortsNeuralService.getId());
  
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
        <Route path="/content/:id" element={<EscortContent escort={{}} />} />
      </Routes>
      <Toaster />
    </EscortProvider>
  );
};

export default EscortsModule;
