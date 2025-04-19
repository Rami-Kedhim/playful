
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LivecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';
import { LivecamProvider } from './providers/LivecamProvider';

const LivecamList: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Livecam List</h2>
    <p>Browse all active livecam sessions</p>
  </div>
);

const LivecamRoom: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Livecam Room</h2>
    <p>Interactive livecam experience</p>
  </div>
);

const LivecamDirectory: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Livecam Directory</h2>
    <p>Search and find livecam performers</p>
  </div>
);

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

