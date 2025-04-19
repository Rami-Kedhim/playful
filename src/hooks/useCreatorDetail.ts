
// Fixed import by changing from named import to import type and default export removed

import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';
import type { ContentCreator } from '@/types/creator';

export function useCreatorDetail() {
  const context = useCreatorContext();
  const { id } = useParams<{ id: string }>();
  
  if (!context) {
    throw new Error('useCreatorDetail must be used within a CreatorProvider');
  }
  
  // Use ContentCreator type for individual creator
  const creator = context.getCreatorById?.(id || '');
  const isLoading = context.loading;
  const error = context.error;
  
  return {
    creator,
    isLoading,
    error,
    relatedCreators: context.creators?.filter((c: ContentCreator) => c.id !== id).slice(0, 3) || []
  };
}

// no default export to fix TS errors

