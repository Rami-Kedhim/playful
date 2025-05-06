
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralMonitoringPage from '@/pages/neural/NeuralMonitoringPage';

const UberCoreNeuralMonitor: React.FC = () => {
  return (
    <MainLayout
      title="UberCore Neural Monitor"
      description="Unified monitoring system for UberCore neural infrastructure"
    >
      <NeuralMonitoringPage />
    </MainLayout>
  );
};

export default UberCoreNeuralMonitor;
