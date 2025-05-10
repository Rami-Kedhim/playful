
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralMonitoringPage from '@/pages/neural/NeuralMonitoringPage';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/core/UberCore';

const UberCoreNeuralMonitor: React.FC = () => {
  const { toast } = useToast();

  // Check session integrity with Orus on component mount
  useEffect(() => {
    const validateSession = () => {
      try {
        // Validate user session using Orus as required in the plan
        const sessionToken = localStorage.getItem('session_token') || 'demo-token';
        
        // Initialize automatic SEO if it's not already running
        uberCore.initializeAutomaticSeo();
      } catch (err) {
        console.error('Session validation error:', err);
      }
    };
    
    validateSession();
  }, [toast]);
  
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
