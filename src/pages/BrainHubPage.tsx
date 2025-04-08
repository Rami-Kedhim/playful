
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import BrainHubError from '@/components/brainHub/BrainHubError';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import securityEngine from '@/services/neural/BrainHubSecurityEngine';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const BrainHubPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initErrors, setInitErrors] = useState<string[]>([]);
  const [systemHealth, setSystemHealth] = useState<{status: 'good' | 'warning' | 'error', message?: string}>({
    status: 'good'
  });
  const { isAuthenticated, checkRole } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has permission to access Brain Hub
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/brain-hub' } });
      return;
    }
    
    // Check if user has admin role
    const hasAdminAccess = checkRole('admin') || checkRole('moderator');
    if (!hasAdminAccess) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access Brain Hub",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    // Initialize Brain Hub
    initializeBrainHub();
  }, [isAuthenticated, navigate, checkRole]);

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
            metadata: {} // Adding the required empty metadata object
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
      
      // Perform a health check
      const healthCheck = performSystemHealthCheck();
      setSystemHealth(healthCheck);
      
      if (healthCheck.status === 'warning') {
        toast({
          title: "System Warning",
          description: healthCheck.message,
          variant: "warning"
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
    <MainLayout
      title="Brain Hub"
      description="Unified control and monitoring of autonomous AI systems"
      hideNavbar={false}
      containerClass="container mx-auto px-4"
    >
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
    </MainLayout>
  );
};

export default BrainHubPage;
