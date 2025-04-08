
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import { toast } from "@/components/ui/use-toast";

const BrainHubPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initErrors, setInitErrors] = useState<string[]>([]);
  const [systemHealth, setSystemHealth] = useState<{status: 'good' | 'warning' | 'error', message?: string}>({
    status: 'good'
  });

  // Initialize Brain Hub when the page loads
  useEffect(() => {
    try {
      // Example: Store some initial data in Brain Hub memory
      brainHub.storeInMemory('initial_load_time', Date.now());
      
      // Example: Configure basic capabilities
      brainHub.toggleCapability('userIntelligence', 'emotionalClassification', true);
      
      // Initialize the autonomy engine with the same settings as the Brain Hub
      const autonomyStatus = brainHub.getAutonomyStatus();
      autonomyEngine.setAutonomyLevel(autonomyStatus.level);
      
      // Start the autonomy engine if it's enabled in the Brain Hub
      if (autonomyStatus.enabled) {
        autonomyEngine.start();
        
        // Record a decision for demonstration purposes
        setTimeout(() => {
          autonomyEngine.recordDecision({
            moduleId: 'strategy-core',
            description: 'Initialized system with optimal parameters based on current traffic',
            confidence: 0.85,
            impact: 'low'
          });
        }, 2000);
      }
      
      // Register data connections between modules
      brainHub.storeInMemory('connected_modules', {
        'neural': true,
        'autonomy': true,
        'userIntelligence': true
      });
      
      // Perform a health check
      const healthCheck = performSystemHealthCheck();
      setSystemHealth(healthCheck);
      
      if (healthCheck.status === 'warning') {
        toast({
          title: "System Warning",
          description: healthCheck.message,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error("Error initializing Brain Hub:", error);
      setInitErrors(prev => [...prev, error.message || "Unknown error initializing Brain Hub"]);
    }
    
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  
  // Perform a simulated health check of the system
  const performSystemHealthCheck = () => {
    // This is a placeholder - in a real implementation, this would check actual system metrics
    const randomCheck = Math.random();
    
    if (randomCheck > 0.9) {
      return { 
        status: 'warning' as const, 
        message: "High memory usage detected in neural processing module."
      };
    }
    
    if (randomCheck > 0.95) {
      return { 
        status: 'error' as const, 
        message: "Critical error in data processing pipeline."
      };
    }
    
    return { status: 'good' as const };
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg font-medium">Initializing Brain Hub...</p>
            <p className="text-sm text-muted-foreground mt-2">Configuring neural pathways and autonomy systems</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (initErrors.length > 0) {
    return (
      <AppLayout>
        <div className="container py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-4">Brain Hub Initialization Failed</h2>
            <div className="space-y-2">
              {initErrors.map((error, index) => (
                <div key={index} className="bg-white p-3 rounded border border-red-100 text-red-700">
                  {error}
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Retry Initialization
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {systemHealth.status === 'warning' && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                {systemHealth.message || "System operating with warnings. Check system health."}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <BrainHubDashboard />
    </AppLayout>
  );
};

export default BrainHubPage;
