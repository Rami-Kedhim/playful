import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/escort';

interface EscortContextType {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  fetchEscorts: () => Promise<void>;
  loadEscorts: (useUberSystem?: boolean) => Promise<void>;
  state: {
    escorts: Escort[];
    loading: boolean;
    error: string | null;
  };
  createEscort: (escort: Partial<Escort>) => Promise<Escort | undefined>;
  updateEscort: (id: string, updates: Partial<Escort>) => Promise<Escort | undefined>;
  deleteEscort: (id: string) => Promise<boolean>;
}

const EscortContext = createContext<EscortContextType | undefined>(undefined);

export const EscortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEscortsData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await escortService.getEscorts();
      setEscorts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch escorts');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEscort = async (escort: Partial<Escort>): Promise<Escort | undefined> => {
    return undefined;
  };

  const updateEscort = async (id: string, updates: Partial<Escort>): Promise<Escort | undefined> => {
    return undefined;
  };

  const deleteEscort = async (id: string): Promise<boolean> => {
    return false;
  };

  const loadEscorts = async (useUberSystem = false) => {
    try {
      setLoading(true);
      const data = await escortService.getEscorts();
      
      if (useUberSystem) {
        console.log("Loading escorts with UberCore integration");
        setEscorts(data.map(escort => ({
          ...escort,
          bio: (escort.bio ?? '') + " [Enhanced by UberCore]",
          rating: escort.rating && escort.rating * 1.1 > 5 ? 5 : escort.rating,
        })));
      } else {
        setEscorts(data);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load escorts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscortsData();
  }, [fetchEscortsData]);

  const value: EscortContextType = {
    escorts,
    loading,
    error,
    fetchEscorts: fetchEscortsData,
    loadEscorts,
    state: { escorts, loading, error },
    createEscort,
    updateEscort,
    deleteEscort,
  };

  return (
    <EscortContext.Provider value={value}>
      {children}
    </EscortContext.Provider>
  );
};

export const useEscortContext = (): EscortContextType => {
  const context = useContext(EscortContext);
  if (!context) {
    throw new Error('useEscortContext must be used within a EscortProvider');
  }
  return context;
};
