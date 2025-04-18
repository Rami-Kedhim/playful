
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Livecam } from '@/types/livecam';
import { mockLivecams } from '@/data/mockData';
import { livecamsNeuralService } from '@/services/neural';

// Context type definition
interface LivecamContextType {
  livecams: Livecam[];
  loading: boolean;
  error: string | null;
  featuredLivecams: Livecam[];
  liveLivecams: Livecam[];
  getLivecamById: (id: string) => Livecam | undefined;
  refreshLivecams: () => Promise<void>;
}

// Create the context
const LivecamContext = createContext<LivecamContextType | undefined>(undefined);

// Provider component
export const LivecamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load initial livecam data
  useEffect(() => {
    const loadLivecams = async () => {
      try {
        setLoading(true);
        
        // Initialize neural service
        await livecamsNeuralService.initialize();
        
        // In a real app, this would be an API call
        // For now, use mock data
        setLivecams(mockLivecams);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load livecams');
        console.error('Error loading livecams:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadLivecams();
  }, []);
  
  // Get featured livecams
  const getFeaturedLivecams = () => {
    return livecams.filter(livecam => livecam.featured);
  };
  
  // Get currently live livecams
  const getLiveLivecams = () => {
    return livecams.filter(livecam => livecam.isLive);
  };
  
  // Get livecam by ID
  const getLivecamById = (id: string) => {
    return livecams.find(livecam => livecam.id === id);
  };
  
  // Refresh livecams data
  const refreshLivecams = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, just reset with mock data
      setLivecams(mockLivecams);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh livecams');
    } finally {
      setLoading(false);
    }
  };
  
  // Prepare context value
  const contextValue: LivecamContextType = {
    livecams,
    loading,
    error,
    featuredLivecams: getFeaturedLivecams(),
    liveLivecams: getLiveLivecams(),
    getLivecamById,
    refreshLivecams
  };
  
  return (
    <LivecamContext.Provider value={contextValue}>
      {children}
    </LivecamContext.Provider>
  );
};

// Custom hook to use the livecam context
export const useLivecamContext = (): LivecamContextType => {
  const context = useContext(LivecamContext);
  if (!context) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};

export { LivecamContext };
