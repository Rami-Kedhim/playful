import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContentCreator } from '@/types/creator';
import { creatorData } from '@/data/creatorData';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface CreatorContextProps {
  creators: ContentCreator[];
  loading: boolean;
  error: string | null;
}

const CreatorContext = createContext<CreatorContextProps | undefined>(undefined);

export const CreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCreators = async () => {
      try {
        setLoading(true);
        
        // Simulate loading creators from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCreators(creatorData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load creators');
      } finally {
        setLoading(false);
      }
    };
    
    loadCreators();
  }, []);
  
  const value: CreatorContextProps = {
    creators,
    loading,
    error
  };
  
  return (
    <CreatorContext.Provider value={value}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreatorContext = (): CreatorContextProps => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  return context;
};

export default CreatorProvider;
