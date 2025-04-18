
import { useContext } from 'react';
import { LivecamContext } from '@/modules/livecams/providers/LivecamProvider';

export function useLivecams() {
  const context = useContext(LivecamContext);
  
  if (!context) {
    throw new Error('useLivecams must be used within a LivecamProvider');
  }
  
  return {
    livecams: context.livecams || [],
    loading: context.loading || false,
    error: context.error || null
  };
}
