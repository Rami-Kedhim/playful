
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { BrainHubHealth } from '@/types/brainHubHealth';
import SystemHealthPanel from '@/components/brainHub/SystemHealthPanel';
import BrainHubHealthStatus from '@/components/brainHub/BrainHubHealthStatus';
import BrainHubAnalytics from '@/components/brainHub/BrainHubAnalytics';

const BrainHubPage: React.FC = () => {
  const getStatusColor = (status: BrainHubHealth['status']) => {
    // Map the status values to colors
    if (status === 'online' || status === 'healthy') return 'text-green-500';
    if (status === 'degraded' || status === 'warning') return 'text-yellow-500';
    if (status === 'offline' || status === 'error') return 'text-red-500';
    if (status === 'maintenance') return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <MainLayout
      title="Brain Hub"
      description="Monitor and manage neural system health"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BrainHubHealthStatus />
          <SystemHealthPanel />
        </div>
        
        <div className="grid grid-cols-1">
          <BrainHubAnalytics />
        </div>
      </div>
    </MainLayout>
  );
};

export default BrainHubPage;
