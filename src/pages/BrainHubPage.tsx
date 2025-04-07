
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';

const BrainHubPage: React.FC = () => {
  return (
    <AppLayout>
      <BrainHubDashboard />
    </AppLayout>
  );
};

export default BrainHubPage;
