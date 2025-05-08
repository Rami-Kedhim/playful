
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { oxum } from '@/core/Oxum';
import { lucieAI } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { orus } from '@/core/Orus';
import Pulse from '@/core/Pulse';

/**
 * Define the shape of the state stored in the UberEcosystemContext
 */
interface UberEcosystemState {
  initialized: boolean;
  error: string | null;
  modules: {
    ubxWallet: boolean;
    oxum: boolean;
    lucie: boolean;
    hermes: boolean;
    boostSystem: boolean;
    orus: boolean;
    pulse: boolean;
  };
}

/**
 * Define the UberEcosystem API that will be exposed to consumers
 */
interface UberEcosystemContextType {
  state: UberEcosystemState;
  initialize: () => Promise<boolean>;
  reset: () => void;
  configure: (moduleId: string, config: Record<string, any>) => Promise<boolean>;
  recordEvent: (eventType: string, data: Record<string, any>) => void;
}

// Create the context with default values
const UberEcosystemContext = createContext<UberEcosystemContextType | undefined>(undefined);

/**
 * UberEcosystemProvider component
 */
export const UberEcosystemProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Define the state to track ecosystem initialization and status
  const [state, setState] = useState<UberEcosystemState>({
    initialized: false,
    error: null,
    modules: {
      ubxWallet: false,
      oxum: false,
      lucie: false,
      hermes: false,
      boostSystem: false,
      orus: false,
      pulse: false,
    }
  });

  // Initialize the ecosystem
  const initialize = async (): Promise<boolean> => {
    if (state.initialized) return true;
    
    try {
      // Initialize Oxum system
      await oxum.checkSystemStatus();
      
      // Update module status
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          oxum: true,
        },
      }));
      
      // Initialize Lucie AI system
      await lucieAI.initialize();
      
      // Update module status 
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          lucie: true,
        },
      }));
      
      // Initialize Hermes analytics
      await hermes.initialize();
      
      // Update module status
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          hermes: true,
        },
      }));
      
      // Initialize Orus security
      await orus.initialize();
      
      // Update module status
      setState(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          orus: true,
        },
        initialized: true,
      }));
      
      console.log('UberEcosystem initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize UberEcosystem:', error);
      
      setState(prev => ({
        ...prev,
        error: 'Ecosystem initialization failed',
      }));
      
      return false;
    }
  };

  // Reset the ecosystem state
  const reset = () => {
    setState({
      initialized: false,
      error: null,
      modules: {
        ubxWallet: false,
        oxum: false,
        lucie: false,
        hermes: false,
        boostSystem: false,
        orus: false,
        pulse: false,
      }
    });
  };

  // Record events using available modules
  const recordEvent = (eventType: string, data: Record<string, any>) => {
    // Use Hermes for analytics tracking if available
    if (state.modules.hermes) {
      const userId = data.userId || 'anonymous';
      hermes.trackEvent(userId, eventType, data);
    }
    
    // Use Pulse for basic event logging if available
    Pulse.track(data.userId || 'anonymous', eventType, data);
  };

  // Configure module settings
  const configure = async (moduleId: string, config: Record<string, any>): Promise<boolean> => {
    try {
      switch (moduleId) {
        case 'oxum':
          if (state.modules.oxum) {
            oxum.configure(config);
            return true;
          }
          break;
        case 'lucie':
          if (state.modules.lucie) {
            lucieAI.configure(config);
            return true;
          }
          break;
        case 'hermes':
          if (state.modules.hermes) {
            hermes.configure(config);
            return true;
          }
          break;
        default:
          console.warn(`Unknown module: ${moduleId}`);
          return false;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to configure module ${moduleId}:`, error);
      return false;
    }
  };

  // Initialize the ecosystem once when the component mounts
  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  // Create the context value
  const contextValue: UberEcosystemContextType = {
    state,
    initialize,
    reset,
    configure,
    recordEvent,
  };

  return (
    <UberEcosystemContext.Provider value={contextValue}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

// Custom hook for using the UberEcosystem context
export const useUberEcosystem = (): UberEcosystemContextType => {
  const context = useContext(UberEcosystemContext);
  
  if (context === undefined) {
    throw new Error('useUberEcosystem must be used within a UberEcosystemProvider');
  }
  
  return context;
};
