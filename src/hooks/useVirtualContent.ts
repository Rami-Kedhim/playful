
import { useState, useEffect } from 'react';
import { ContentType, ContentUnlockOptions } from '@/types/content';
import { useAuth } from '@/hooks/auth';

export { ContentType };

export const useVirtualContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlockedContent, setUnlockedContent] = useState<Record<string, boolean>>({});
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { user } = useAuth();
  
  // Check if content is unlocked
  const isContentUnlocked = (contentId: string): boolean => {
    return unlockedContent[contentId] || false;
  };
  
  // Unlock content
  const unlockContent = async (options: ContentUnlockOptions): Promise<boolean> => {
    if (!user) {
      setError('You must be logged in to unlock content');
      return false;
    }
    
    setIsUnlocking(true);
    setError(null);
    
    try {
      // Simulate API call to unlock content
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demonstration purposes
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setUnlockedContent(prev => ({
          ...prev,
          [options.contentId]: true
        }));
        return true;
      } else {
        setError('Failed to unlock content. Insufficient funds or content unavailable.');
        return false;
      }
    } catch (err) {
      setError('An error occurred while unlocking content');
      return false;
    } finally {
      setIsUnlocking(false);
    }
  };
  
  return {
    isContentUnlocked,
    unlockContent,
    isUnlocking,
    error,
    loading,
    unlockedContent
  };
};

export default useVirtualContent;
