
import { useContext } from 'react';
import { LivecamContext } from '@/modules/livecams/providers/LivecamProvider';
import { Livecam, LivecamModel } from '@/types/livecams';

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
