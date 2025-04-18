
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import escortService from '@/services/escortService';
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
      const data = await escortService.getAllEscorts();
      setEscorts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch escorts');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEscort = async (escort: Partial<Escort>): Promise<Escort | undefined> => {
    try {
      setLoading(true);
      const newEscort = await escortService.createEscort(escort);
      setEscorts(prevEscorts => [...prevEscorts, newEscort]);
      setError(null);
      return newEscort;
    } catch (err: any) {
      setError(err.message || 'Failed to create escort');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const updateEscort = async (id: string, updates: Partial<Escort>): Promise<Escort | undefined> => {
    try {
      setLoading(true);
      const updatedEscort = await escortService.updateEscort(id, updates);
      if (updatedEscort) {
        setEscorts(prevEscorts =>
          prevEscorts.map(escort => (escort.id === id ? updatedEscort : escort))
        );
        setError(null);
        return updatedEscort;
      }
      setError('Escort not found');
      return undefined;
    } catch (err: any) {
      setError(err.message || 'Failed to update escort');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const deleteEscort = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const success = await escortService.deleteEscort(id);
      if (success) {
        setEscorts(prevEscorts => prevEscorts.filter(escort => escort.id !== id));
        setError(null);
        return true;
      }
      setError('Escort not found');
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to delete escort');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load escorts with optional Uber system integration
  const loadEscorts = async (useUberSystem = false) => {
    try {
      setLoading(true);
      const data = await escortService.getAllEscorts();
      
      if (useUberSystem) {
        // Apply UberCore enhancements when requested
        console.log("Loading escorts with UberCore integration");
        setEscorts(data.map(escort => ({
          ...escort,
          bio: escort.bio + " [Enhanced by UberCore]",
          rating: escort.rating * 1.1 > 5 ? 5 : escort.rating * 1.1,
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
