
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Livecam } from '@/types/livecam';
import { mockLivecams } from '@/data/mockData';
import { LivecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';

interface LivecamContextType {
  livecams: Livecam[];
  loading: boolean;
  error: string | null;
  featuredLivecams: Livecam[];
  liveLivecams: Livecam[];
  getLivecamById: (id: string) => Livecam | undefined;
  refreshLivecams: () => Promise<void>;
}

const LivecamContext = createContext<LivecamContextType | undefined>(undefined);

export const LivecamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLivecams = async () => {
      try {
        setLoading(true);
        await LivecamsNeuralService.initialize();
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

  const getFeaturedLivecams = () => {
    return livecams.filter(livecam => livecam.featured);
  };

  const getLiveLivecams = () => {
    return livecams.filter(livecam => livecam.isLive);
  };

  const getLivecamById = (id: string) => {
    return livecams.find(livecam => livecam.id === id);
  };

  const refreshLivecams = async () => {
    try {
      setLoading(true);
      setLivecams(mockLivecams);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh livecams');
    } finally {
      setLoading(false);
    }
  };

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

export const useLivecamContext = (): LivecamContextType => {
  const context = useContext(LivecamContext);
  if (!context) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};

