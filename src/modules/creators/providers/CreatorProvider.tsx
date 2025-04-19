
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ContentCreator } from '@/types/creator';
import { mockCreators } from '@/data/mockData';
import { CreatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';

interface CreatorContextType {
  creators: ContentCreator[];
  loading: boolean;
  error: string | null;
  featuredCreators: ContentCreator[];
  topCreators: ContentCreator[];
  getCreatorById: (id: string) => ContentCreator | undefined;
  refreshCreators: () => Promise<void>;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export const CreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCreators = async () => {
      try {
        setLoading(true);
        await CreatorsNeuralService.initialize();
        setCreators(mockCreators);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load creators');
        console.error('Error loading creators:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCreators();
  }, []);

  const getFeaturedCreators = () => {
    return creators.filter(creator => creator.featured);
  };

  const getTopCreators = () => {
    return [...creators]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  };

  const getCreatorById = (id: string) => {
    return creators.find(creator => creator.id === id);
  };

  const refreshCreators = async () => {
    try {
      setLoading(true);
      setCreators(mockCreators);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh creators');
    } finally {
      setLoading(false);
    }
  };

  const value: CreatorContextType = {
    creators,
    loading,
    error,
    featuredCreators: getFeaturedCreators(),
    topCreators: getTopCreators(),
    getCreatorById,
    refreshCreators
  };

  return (
    <CreatorContext.Provider value={value}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreatorContext = (): CreatorContextType => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  return context;
};
