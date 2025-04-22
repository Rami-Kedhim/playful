
import React, { useContext } from 'react';
import { Livecam } from '@/types/livecams';

// Create the LivecamContextType interface
export interface LivecamContextType {
  livecams: Livecam[];
  loadingLivecams: boolean;
  error: string | null;
  fetchLivecams: () => Promise<void>;
  getLivecamById?: (id: string) => Livecam | undefined;
}

// Create a dummy context since we don't know the actual LivecamContext structure
const LivecamContext = React.createContext<LivecamContextType | undefined>(undefined);

export const useLivecams = () => {
  const context = useContext(LivecamContext);
  
  if (!context) {
    throw new Error('useLivecams must be used within a LivecamProvider');
  }
  
  // Add the missing getLivecamById function
  const getLivecamById = (id: string): Livecam | undefined => {
    return context.livecams?.find(livecam => livecam.id === id);
  };
  
  return {
    ...context,
    getLivecamById
  };
};

export default useLivecams;
