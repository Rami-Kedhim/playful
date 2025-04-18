import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LivecamModel } from '@/types/livecam';
import { livecamData } from '@/data/livecamData';
import { livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

interface LivecamContextProps {
  livecams: LivecamModel[];
  loading: boolean;
  error: string | null;
  refreshLivecams: () => Promise<void>;
  getLivecamById: (id: string) => LivecamModel | undefined;
}

const LivecamContext = createContext<LivecamContextProps | undefined>(undefined);

export const LivecamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadLivecams = async () => {
      try {
        setLoading(true);
        
        // Simulate loading data
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Set livecam data
        setLivecams(livecamData);
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load livecams');
      } finally {
        setLoading(false);
      }
    };
    
    loadLivecams();
    
    // Connect to neural service when component mounts
    const connectToNeuralService = async () => {
      try {
        // Configure neural service for livecam optimization
        livecamsNeuralService.configure({
          priority: 70,
          autonomyLevel: 60,
          enabled: true
        });
        
        // Log successful connection
        console.log('Connected to Livecams Neural Service:', livecamsNeuralService.moduleId);
      } catch (err) {
        console.error('Failed to connect to Livecams Neural Service:', err);
      }
    };
    
    connectToNeuralService();
    
    // Cleanup on unmount
    return () => {
      console.log('Disconnecting from Livecams Neural Service');
    };
  }, []);
  
  const refreshLivecams = async () => {
    try {
      setLoading(true);
      
      // Simulate refreshing data
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Re-set livecam data
      setLivecams(livecamData);
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh livecams');
    } finally {
      setLoading(false);
    }
  };
  
  const getLivecamById = (id: string): LivecamModel | undefined => {
    return livecams.find(livecam => livecam.id === id);
  };
  
  const value: LivecamContextProps = {
    livecams,
    loading,
    error,
    refreshLivecams,
    getLivecamById
  };
  
  return (
    <LivecamContext.Provider value={value}>
      {children}
    </LivecamContext.Provider>
  );
};

export const useLivecamContext = (): LivecamContextProps => {
  const context = useContext(LivecamContext);
  if (!context) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};

export default LivecamProvider;
