
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLivecamContext, LivecamContext } from '@/modules/livecams/providers/LivecamProvider';
import type { Livecam } from '@/types/livecam';

export function useLivecamDetail() {
  const context = useLivecamContext();
  const { id } = useParams<{ id: string }>();
  
  if (!context) {
    throw new Error('useLivecamDetail must be used within a LivecamProvider');
  }
  
  const livecam = context.getLivecamById?.(id || '');
  const { loading, error } = context;
  
  return {
    livecam,
    isLoading: loading,
    error,
    relatedLivecams: context.livecams?.filter((c: Livecam) => c.id !== id).slice(0, 3) || []
  };
}

export default useLivecamDetail;
