
import { useState, useEffect } from 'react';
import { CompanionProfile } from './types';

export const useCompanionProfile = (companionId: string, initialMessages: any[] = []) => {
  const [companion, setCompanion] = useState<CompanionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanion = async () => {
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll create a simple mock
        const mockCompanion: CompanionProfile = {
          id: companionId,
          name: 'AI Companion',
          description: 'An intelligent AI companion to assist you.',
          personality_traits: ['helpful', 'friendly', 'knowledgeable'],
          speechStyle: 'friendly',
          voice_id: 'onwK4e9ZLuTAKqWW03F9' // Daniel voice
        };
        
        setCompanion(mockCompanion);
      } catch (error) {
        console.error('Error fetching companion profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (companionId) {
      fetchCompanion();
    }
  }, [companionId]);

  return {
    companion,
    isLoading
  };
};
