
import { useContext, useEffect, useState } from 'react';
import { CreatorContext } from '@/modules/creators/providers/CreatorProvider';

export function useCreatorDetail(creatorId?: string) {
  const context = useContext(CreatorContext);
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!context) {
      setError('CreatorContext not available');
      setLoading(false);
      return;
    }
    
    if (creatorId && context.creators) {
      setLoading(true);
      // Find creator in the context data
      const foundCreator = context.creators.find(c => c.id === creatorId);
      
      if (foundCreator) {
        setCreator(foundCreator);
        setError(null);
      } else {
        setCreator(null);
        setError('Creator not found');
      }
      setLoading(false);
    } else {
      setCreator(null);
      setLoading(false);
    }
  }, [creatorId, context]);
  
  return { creator, loading, error };
}
