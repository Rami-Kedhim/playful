
// Fix import of useParams generic and correct usage of context for creator detail

import { useParams } from 'react-router-dom';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';
import type { ContentCreator } from '@/types/creator';

export function useCreatorDetail(creatorId?: string) {
  const context = useCreatorContext();
  const params = useParams<{ id: string }>();
  const id = creatorId || params.id || '';

  if (!context) {
    throw new Error('useCreatorDetail must be used within a CreatorProvider');
  }

  const creator = context.getCreatorById?.(id) || null;
  const isLoading = context.loading;
  const error = context.error;

  // Provide safe fallback values for expected props
  const isFavorite = false;
  const isSubscribed = false;
  const canSubscribe = true;

  // Dummy handlers
  const handleSubscribe = () => Promise.resolve();
  const handleSendTip = () => Promise.resolve();

  return {
    creator,
    isLoading,
    error,
    isFavorite,
    isSubscribed,
    canSubscribe,
    handleSubscribe,
    handleSendTip,
  };
}

