
import { useContext } from 'react';
import { LivecamContext } from '@/modules/livecams/providers/LivecamProvider';

export function useLivecams() {
  const context = useContext(LivecamContext);
  
  if (!context) {
    throw new Error('useLivecams must be used within a LivecamProvider');
  }
  
  // Return a safe subset of properties
  const { livecams, loading, error } = context;
  
  return {
    livecams,
    loading,
    error
  };
}
