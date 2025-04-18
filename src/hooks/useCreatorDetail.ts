
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';
import type { Creator } from '@/types/creator';

export function useCreatorDetail() {
  const context = useCreatorContext();
  const { id } = useParams<{ id: string }>();
  
  if (!context) {
    throw new Error('useCreatorDetail must be used within a CreatorProvider');
  }
  
  const creator = context.getCreatorById?.(id || '');
  const isLoading = context.loading;
  const error = context.error;
  
  return {
    creator,
    isLoading,
    error,
    relatedCreators: context.creators?.filter((c: Creator) => c.id !== id).slice(0, 3) || []
  };
}

// Export as named export
export default useCreatorDetail;
