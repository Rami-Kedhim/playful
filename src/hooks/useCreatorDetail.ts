
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CreatorContext, Creator } from '@/modules/creators/providers/CreatorProvider';

export function useCreatorDetail() {
  const context = useContext(CreatorContext);
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
    relatedCreators: context.creators?.filter(c => c.id !== id).slice(0, 3) || []
  };
}
