
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase';
import { uberCore } from '@/core/UberCore';
import { User } from '@/types/user';

interface EcosystemState {
  initialized: boolean;
  subsystems: {
    core: boolean;
    escorts: boolean;
    creators: boolean;
    livecams: boolean;
    wallet: boolean;
    verification: boolean;
    ai: boolean;
  };
  healthStatus: {
    overall: number;
    systems: {
      [key: string]: number;
    };
  };
  config: {
    features: {
      boostEnabled: boolean;
      aiAssistantEnabled: boolean;
      metaverseEnabled: boolean;
      liveStreamingEnabled: boolean;
    };
    serviceTypes: string[];
  };
}

interface UberEcosystemContextType {
  state: EcosystemState;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initializeSubsystem: (name: string) => Promise<boolean>;
  getSystemHealth: () => Promise<{overall: number, systems: {[key: string]: number}}>;
  refreshEcosystem: () => Promise<void>;
  toggleFeature: (featureName: string, enabled: boolean) => void;
}

const defaultState: EcosystemState = {
  initialized: false,
  subsystems: {
    core: false,
    escorts: false,
    creators: false, 
    livecams: false,
    wallet: false,
    verification: false,
    ai: false
  },
  healthStatus: {
    overall: 0,
    systems: {}
  },
  config: {
    features: {
      boostEnabled: true,
      aiAssistantEnabled: true,
      metaverseEnabled: false,
      liveStreamingEnabled: true
    },
    serviceTypes: ['in-person', 'virtual', 'both']
  }
};

const UberEcosystemContext = createContext<UberEcosystemContextType | undefined>(undefined);

export const UberEcosystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const [state, setState] = useState<EcosystemState>(defaultState);
  
  // Initialize core system on mount
  useEffect(() => {
    const initializeCore = async () => {
      try {
        const success = await uberCore.initialize();
        
        setState(prev => ({
          ...prev,
          initialized: success,
          subsystems: {
            ...prev.subsystems,
            core: success
          }
        }));
        
        if (success) {
          // Get initial health status
          const healthStatus = await getSystemHealth();
          setState(prev => ({
            ...prev,
            healthStatus
          }));
        }
      } catch (error) {
        console.error('Failed to initialize UberEcosystem core:', error);
      }
    };
    
    initializeCore();
    
    // Cleanup on unmount
    return () => {
      uberCore.shutdown();
    };
  }, []);
  
  // Initialize auth integration when user changes
  useEffect(() => {
    if (user && !loading) {
      // Track user for analytics
      console.log('User authenticated in ecosystem context:', user.id);
    }
  }, [user, loading]);

  const initializeSubsystem = async (name: string): Promise<boolean> => {
    try {
      console.log(`Initializing subsystem: ${name}`);
      // In a real implementation, this would call the specific subsystem's initialize method
      const success = true;
      
      setState(prev => ({
        ...prev,
        subsystems: {
          ...prev.subsystems,
          [name]: success
        }
      }));
      
      return success;
    } catch (error) {
      console.error(`Failed to initialize ${name} subsystem:`, error);
      return false;
    }
  };

  const getSystemHealth = async (): Promise<{overall: number, systems: {[key: string]: number}}> => {
    try {
      // This would call the core system's health check in a real implementation
      const health = {
        overall: 95,
        systems: {
          escorts: 97,
          creators: 96,
          livecams: 95,
          wallet: 98,
          verification: 99,
          ai: 90
        }
      };
      
      return health;
    } catch (error) {
      console.error('Failed to get system health:', error);
      return { overall: 0, systems: {} };
    }
  };
  
  const refreshEcosystem = async (): Promise<void> => {
    try {
      const healthStatus = await getSystemHealth();
      setState(prev => ({
        ...prev,
        healthStatus
      }));
    } catch (error) {
      console.error('Failed to refresh ecosystem:', error);
    }
  };
  
  const toggleFeature = (featureName: string, enabled: boolean): void => {
    setState(prev => ({
      ...prev,
      config: {
        ...prev.config,
        features: {
          ...prev.config.features,
          [featureName]: enabled
        }
      }
    }));
  };

  const value = {
    state,
    user,
    isAuthenticated,
    loading,
    initializeSubsystem,
    getSystemHealth,
    refreshEcosystem,
    toggleFeature
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystem = (): UberEcosystemContextType => {
  const context = useContext(UberEcosystemContext);
  if (context === undefined) {
    throw new Error('useUberEcosystem must be used within a UberEcosystemProvider');
  }
  return context;
};

export default UberEcosystemContext;
