
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import BrainHubError from '@/components/brainHub/BrainHubError';
import BrainHubProtected from '@/components/brainHub/BrainHubProtected';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import securityEngine from '@/services/neural/BrainHubSecurityEngine';
import { toast } from "@/components/ui/use-toast";
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';

const BrainHubPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initErrors, setInitErrors] = useState<string[]>([]);
  const { health, startMonitoring } = useBrainHubHealth();
  
  // Initialize Brain Hub
  useEffect(() => {
    initializeBrainHub();
    
    // Start health monitoring
    startMonitoring();
  }, [startMonitoring]);

  // Initialize Brain Hub systems
  const initializeBrainHub = async () => {
    try {
      // Example: Store some initial data in Brain Hub memory
      brainHub.storeInMemory('initial_load_time', Date.now());
      
      // Example: Configure basic capabilities
      brainHub.toggleCapability('userIntelligence', 'emotionalClassification', true);
      
      // Initialize the autonomy engine with the same settings as the Brain Hub
      const autonomyStatus = brainHub.getAutonomyStatus();
      autonomyEngine.setAutonomyLevel(autonomyStatus.level);
      
      // Start the security engine
      securityEngine.startMonitoring();
      
      // Start the autonomy engine if it's enabled in the Brain Hub
      if (autonomyStatus.enabled) {
        autonomyEngine.start();
        
        // Record a decision for demonstration purposes
        setTimeout(() => {
          autonomyEngine.recordDecision({
            moduleId: 'strategy-core',
            description: 'Initialized system with optimal parameters based on current traffic',
            confidence: 0.85,
            impact: 'low',
            metadata: {}
          });
        }, 2000);
      }
      
      // Register data connections between modules
      brainHub.storeInMemory('connected_modules', {
        'neural': true,
        'autonomy': true,
        'userIntelligence': true,
        'security': true
      });
      
      // Notify the user about system status
      if (health.status === 'warning') {
        toast({
          title: "System Warning",
          description: health.message || "System is operating with warnings.",
          variant: "warning",
          action: (
            <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
          )
        });
      } else if (health.status === 'error') {
        toast({
          title: "System Error",
          description: health.message || "Critical errors detected in the system.",
          variant: "destructive",
          action: (
            <div className="h-8 w-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
          )
        });
      } else {
        toast({
          title: "System Online",
          description: "Brain Hub initialized successfully.",
          action: (
            <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          )
        });
      }
    } catch (error: any) {
      console.error("Error initializing Brain Hub:", error);
      setInitErrors(prev => [...prev, error.message || "Unknown error initializing Brain Hub"]);
    } finally {
      // Simulate loading time
      setTimeout(() => setIsLoading(false), 1500);
    }
  };
  
  // Retry initialization
  const handleRetry = () => {
    setIsLoading(true);
    setInitErrors([]);
    initializeBrainHub();
  };

  if (isLoading) {
    return (
      <MainLayout
        title="Brain Hub"
        description="Initializing Brain Hub systems..."
        hideNavbar={false}
      >
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg font-medium">Initializing Brain Hub...</p>
            <p className="text-sm text-muted-foreground mt-2">Configuring neural pathways and autonomy systems</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (initErrors.length > 0) {
    return (
      <MainLayout
        title="Brain Hub Initialization Failed"
        description="The Brain Hub system could not be initialized due to errors."
        hideNavbar={false}
      >
        <BrainHubError 
          title="Brain Hub Initialization Failed"
          description="The Brain Hub system could not be initialized due to the following errors:"
          errors={initErrors}
          onRetry={handleRetry}
        />
      </MainLayout>
    );
  }

  return (
    <BrainHubProtected requiredAccess="viewer">
      <MainLayout
        title="Brain Hub"
        description="Unified control and monitoring of autonomous AI systems"
        hideNavbar={false}
        containerClass="container mx-auto px-4"
      >
        <BrainHubDashboard />
      </MainLayout>
    </BrainHubProtected>
  );
};

export default BrainHubPage;
