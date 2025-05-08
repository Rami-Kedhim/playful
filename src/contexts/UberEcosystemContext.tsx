
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { oxum } from '@/core/Oxum';
import { hermes } from '@/core/Hermes';
import { lucie } from '@/core/Lucie';
import { orus } from '@/core/Orus';
import { toast } from '@/components/ui/use-toast';

// Define the context type
interface UberEcosystemContextType {
  isAuthenticated: boolean;
  loading: boolean;
  state: {
    initialized: boolean;
    modules: {
      core: boolean;
      lucie: boolean;
      oxum: boolean;
      hermes: boolean;
      orus: boolean;
      neural: boolean;
    };
    systemHealth: number;
  };
  initialize: () => boolean;
  shutdown: () => boolean;
  initializeAutomaticSeo: () => boolean;
  signUp: (email: string, password: string) => Promise<any>;
  refreshSystemHealth: () => void;
  configureModule: (moduleName: string, config: any) => void;
}

// Create the context with default values
const UberEcosystemContext = createContext<UberEcosystemContextType>({
  isAuthenticated: false,
  loading: true,
  state: {
    initialized: false,
    modules: {
      core: false,
      lucie: false,
      oxum: false,
      hermes: false,
      orus: false,
      neural: false
    },
    systemHealth: 0
  },
  initialize: () => false,
  shutdown: () => false,
  initializeAutomaticSeo: () => false,
  signUp: async () => null,
  refreshSystemHealth: () => {},
  configureModule: () => {}
});

interface UberEcosystemProviderProps {
  children: ReactNode;
}

export const UberEcosystemProvider: React.FC<UberEcosystemProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [systemState, setSystemState] = useState({
    initialized: false,
    modules: {
      core: false,
      lucie: false,
      oxum: false,
      hermes: false,
      orus: false,
      neural: false
    },
    systemHealth: 0
  });

  // Initialize the ecosystem on mount
  useEffect(() => {
    const initializeEcosystem = async () => {
      setLoading(true);
      try {
        // Simulate initialization
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Initialize core modules
        const oxumStatus = oxum.checkSystemStatus();
        const hermesStatus = hermes.getSystemStatus();
        const lucieStatus = lucie.getSystemStatus();
        
        // Check authentication status
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(!!token);
        
        setSystemState({
          initialized: true,
          modules: {
            core: true,
            lucie: lucieStatus.operational !== false,
            oxum: oxumStatus.operational !== false,
            hermes: hermesStatus.status === 'operational',
            orus: true,
            neural: true
          },
          systemHealth: calculateSystemHealth(oxumStatus, hermesStatus, lucieStatus)
        });

      } catch (error) {
        console.error('Failed to initialize UberEcosystem:', error);
        toast({
          title: "Initialization Warning",
          description: "Some modules failed to initialize. Limited functionality may be available.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    initializeEcosystem();

    // Cleanup on unmount
    return () => {
      // Cleanup logic here if needed
    };
  }, []);
  
  const calculateSystemHealth = (oxumStatus: any, hermesStatus: any, lucieStatus: any) => {
    let health = 0;
    
    // Oxum health contribution (40%)
    if (oxumStatus.operational) health += 40;
    
    // Hermes health contribution (30%)
    if (hermesStatus.status === 'operational') health += 30;
    
    // Lucie health contribution (30%)
    const lucieModulesHealth = lucieStatus.modules ? 
      Object.values(lucieStatus.modules).filter(status => status === 'online').length / 
      Object.values(lucieStatus.modules).length * 30 :
      0;
      
    health += lucieModulesHealth;
    
    return health;
  };

  const initialize = () => {
    console.log('Initializing UberEcosystem');
    setSystemState(prev => ({ ...prev, initialized: true }));
    return true;
  };

  const shutdown = () => {
    console.log('Shutting down UberEcosystem');
    setSystemState(prev => ({ ...prev, initialized: false }));
    return true;
  };

  const initializeAutomaticSeo = () => {
    console.log('Initializing automatic SEO');
    return true;
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Implementation would integrate with auth service
      console.log('Signing up user with email:', email);
      return { success: true, user: { email } };
    } catch (error) {
      console.error('Sign up failed:', error);
      return { success: false, error };
    }
  };

  const refreshSystemHealth = () => {
    try {
      const oxumStatus = oxum.checkSystemStatus();
      const hermesStatus = hermes.getSystemStatus();
      const lucieStatus = lucie.getSystemStatus();
      
      setSystemState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          oxum: oxumStatus.operational !== false,
          hermes: hermesStatus.status === 'operational',
          lucie: lucieStatus.operational !== false
        },
        systemHealth: calculateSystemHealth(oxumStatus, hermesStatus, lucieStatus)
      }));
    } catch (error) {
      console.error('Failed to refresh system health:', error);
    }
  };
  
  const configureModule = (moduleName: string, config: any) => {
    console.log(`Configuring ${moduleName} module with:`, config);
    
    switch (moduleName) {
      case 'oxum':
        oxum.configure(config);
        break;
      case 'lucie':
        lucie.configure(config);
        break;
      case 'hermes':
        // If hermes has a configure method
        if (typeof hermes.configure === 'function') {
          hermes.configure(config);
        }
        break;
      default:
        console.warn(`Unknown module: ${moduleName}`);
    }
  };

  const value = {
    isAuthenticated,
    loading,
    state: systemState,
    initialize,
    shutdown,
    initializeAutomaticSeo,
    signUp,
    refreshSystemHealth,
    configureModule
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystem = () => {
  const context = useContext(UberEcosystemContext);
  if (!context) {
    throw new Error('useUberEcosystem must be used within an UberEcosystemProvider');
  }
  return context;
};

export default UberEcosystemContext;
