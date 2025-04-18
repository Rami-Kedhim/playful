import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';
import CreatorProvider from './providers/CreatorProvider';
import CreatorList from '@/pages/CreatorList';
import CreatorProfile from '@/pages/CreatorProfile';
import CreatorContent from '@/pages/CreatorContent';

const CreatorsModule: React.FC = () => {
  return (
    <CreatorProvider>
      <Routes>
        <Route path="/" element={<CreatorList />} />
        <Route path="/directory" element={<CreatorDirectory />} />
        <Route path="/:creatorId" element={<CreatorProfile />} />
        <Route path="/:creatorId/content" element={<CreatorContent />} />
      </Routes>
    </CreatorProvider>
  );
};

const CreatorDirectory: React.FC = () => {
  return (
    <div>
      <h2>Creator Directory</h2>
      <p>Browse all content creators</p>
    </div>
  );
};

export default CreatorsModule;
