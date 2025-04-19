
// Fix LivecamsNeuralService usage and substitute mockLivecams with full mock livecam data matching Livecam type

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Livecam } from '@/types/livecam';
// import { mockLivecams } from '@/data/mockData'; // Removed due to type issues
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

const MOCK_LIVECAMS: Livecam[] = [
  {
    id: '1',
    name: 'Luna',
    username: 'luna_cam',
    profileImage: '/images/livecams/luna.jpg',
    viewerCount: 1250,
    tags: ['chatty', 'gaming'],
    featured: true,
    isLive: true,
    category: 'Casual'
  },
  {
    id: '2',
    name: 'Max',
    username: 'max_live',
    profileImage: '/images/livecams/max.jpg',
    viewerCount: 850,
    tags: ['music', 'singing'],
    featured: false,
    isLive: false,
    category: 'Music'
  },
  {
    id: '3',
    name: 'Nova',
    username: 'nova_star',
    profileImage: '/images/livecams/nova.jpg',
    viewerCount: 200,
    tags: ['art', 'painting'],
    featured: false,
    isLive: true,
    category: 'Art'
  }
];

export const LivecamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLivecams = async () => {
      try {
        setLoading(true);
        // Removed await LivecamsNeuralService.initialize(); since it does not exist
        setLivecams(MOCK_LIVECAMS);
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
      // refresh with same mock data for now
      setLivecams(MOCK_LIVECAMS);
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

