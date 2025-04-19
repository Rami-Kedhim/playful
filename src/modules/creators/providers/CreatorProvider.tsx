import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Creator } from '@/types/creator';
import { mockCreators } from '@/data/mockData';
import { CreatorsNeuralService } from '@/services/neural';

// Context type definition
interface CreatorContextType {
  creators: Creator[];
  loading: boolean;
  error: string | null;
  featuredCreators: Creator[];
  topCreators: Creator[];
  getCreatorById: (id: string) => Creator | undefined;
  refreshCreators: () => Promise<void>;
}

// Create the context
const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

// Provider component
export const CreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load initial creator data
  useEffect(() => {
    const loadCreators = async () => {
      try {
        setLoading(true);
        
        // Initialize neural service
        await CreatorsNeuralService.initialize();
        
        // In a real app, this would be an API call
        // For now, use mock data
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
  
  // Get featured creators
  const getFeaturedCreators = () => {
    return creators.filter(creator => creator.featured);
  };
  
  // Get top creators by rating
  const getTopCreators = () => {
    return [...creators]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  };
  
  // Get creator by ID
  const getCreatorById = (id: string) => {
    return creators.find(creator => creator.id === id);
  };
  
  // Refresh creators data
  const refreshCreators = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, just reset with mock data
      setCreators(mockCreators);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh creators');
    } finally {
      setLoading(false);
    }
  };
  
  // Prepare context value
  const contextValue: CreatorContextType = {
    creators,
    loading,
    error,
    featuredCreators: getFeaturedCreators(),
    topCreators: getTopCreators(),
    getCreatorById,
    refreshCreators
  };
  
  return (
    <CreatorContext.Provider value={contextValue}>
      {children}
    </CreatorContext.Provider>
  );
};

// Custom hook to use the creator context
export const useCreatorContext = (): CreatorContextType => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  return context;
};

export { CreatorContext };
