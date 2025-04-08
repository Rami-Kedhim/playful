
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';

const BrainHubPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Brain Hub when the page loads
  useEffect(() => {
    // Example: Store some initial data in Brain Hub memory
    brainHub.storeInMemory('initial_load_time', Date.now());
    
    // Example: Configure basic capabilities
    brainHub.toggleCapability('userIntelligence', 'emotionalClassification', true);
    
    // Initialize the autonomy engine with the same settings as the Brain Hub
    const autonomyStatus = brainHub.getAutonomyStatus();
    autonomyEngine.setAutonomyLevel(autonomyStatus.level);
    if (autonomyStatus.enabled) {
      autonomyEngine.start();
    }
    
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg font-medium">Initializing Brain Hub...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <BrainHubDashboard />
    </AppLayout>
  );
};

export default BrainHubPage;
