import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LivecamNeuralService, livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';
import LivecamProvider from './providers/LivecamProvider';
import LivecamList from '@/pages/LivecamList';
import LivecamRoom from '@/pages/LivecamRoom';
import LivecamDirectory from '@/pages/LivecamDirectory';

const LivecamsModule: React.FC = () => {
  return (
    <LivecamProvider>
      <Routes>
        <Route path="/" element={<LivecamList />} />
        <Route path="/directory" element={<LivecamDirectory />} />
        <Route path="/:livecamId" element={<LivecamRoom />} />
      </Routes>
    </LivecamProvider>
  );
};

export default LivecamsModule;
