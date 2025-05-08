import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';

interface UberEcosystemContextType {
  isReady: boolean;
  isInitialized: boolean;
  isOperational: boolean;
  isActive: boolean;
  services: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
  };
  queueLength: number;
  processing: boolean;
  lastUpdated: string;
  initialize: () => Promise<void>;
  shutdown: () => Promise<void>;
  checkSubsystemHealth: () => { name: string; status: string; health: number }[];
  getSystemStatus: () => any;
}

const defaultUberEcosystemContext: UberEcosystemContextType = {
  isReady: false,
  isInitialized: false,
  isOperational: false,
  isActive: false,
  services: {
    auth: 'offline',
    analytics: 'offline',
    ai: 'offline',
    wallet: 'offline',
    seo: 'offline',
  },
  queueLength: 0,
  processing: false,
  lastUpdated: 'N/A',
  initialize: async () => {},
  shutdown: async () => {},
  checkSubsystemHealth: () => [],
  getSystemStatus: () => ({}),
};

const UberEcosystemContext = createContext<UberEcosystemContextType>(
  defaultUberEcosystemContext
);

interface UberEcosystemProviderProps {
  children: ReactNode;
}

export const UberEcosystemProvider: React.FC<UberEcosystemProviderProps> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOperational, setIsOperational] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [services, setServices] = useState({
    auth: 'offline',
    analytics: 'offline',
    ai: 'offline',
    wallet: 'offline',
    seo: 'offline',
  });
  const [queueLength, setQueueLength] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('N/A');
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initializeAutomaticSeo = () => {
      console.log('Initializing UberEcosystem services...');
      setIsInitialized(true);
      setIsOperational(true);
      setIsActive(true);
      setServices({
        auth: 'online',
        analytics: 'online',
        ai: 'online',
        wallet: 'online',
        seo: 'online',
      });
      setQueueLength(10);
      setProcessing(true);
      setLastUpdated(new Date().toLocaleTimeString());
      toast({
        title: 'UberEcosystem Initialized',
        description: 'All core services are now online.',
      });
      return true;
    };

    if (isAuthenticated && !isInitialized) {
      initializeAutomaticSeo();
    }

    setIsReady(true);

    return () => {
      console.log("UberEcosystem shutting down...");
    };
  }, [isAuthenticated, isInitialized, toast]);

  const checkSubsystemHealth = () => {
    return [
      { name: 'Auth', status: 'online', health: 100 },
      { name: 'Analytics', status: 'online', health: 95 },
      { name: 'AI', status: 'degraded', health: 60 },
    ];
  };

  const getSystemStatus = () => {
    return {
      operational: isOperational,
      isActive: isActive,
      services: services,
      queueLength: queueLength,
      processing: processing,
      lastUpdated: lastUpdated,
    };
  };

  const value = {
    isReady,
    isInitialized,
    isOperational,
    isActive,
    services,
    queueLength,
    processing,
    lastUpdated,
    initialize: () => Promise.resolve(initializeAutomaticSeo()),
    shutdown: () => Promise.resolve(console.log("UberEcosystem shutting down...")),
    checkSubsystemHealth,
    getSystemStatus,
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
    throw new Error(
      'useUberEcosystem must be used within a UberEcosystemProvider'
    );
  }
  return context;
};
