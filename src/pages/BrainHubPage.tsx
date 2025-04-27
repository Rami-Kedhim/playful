
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { BrainHubHealth } from '@/types/brainHubHealth';
import SystemHealthPanel from '@/components/brainHub/SystemHealthPanel';

const BrainHubPage: React.FC = () => {
  const getStatusColor = (status: BrainHubHealth['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'offline':
        return 'text-red-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'maintenance':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <MainLayout
      title="Brain Hub"
      description="Monitor and manage neural system health"
    >
      <div className="space-y-6">
        <SystemHealthPanel />
      </div>
    </MainLayout>
  );
};

export default BrainHubPage;
