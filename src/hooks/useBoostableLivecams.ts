
import { useState, useEffect } from 'react';
import { LivecamModel } from '@/types/livecams';
import { useToast } from '@/components/ui/use-toast';
import { oxum } from '@/core';

export const useBoostableLivecams = () => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [boostedLivecams, setBoostedLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load livecams and apply boost
  useEffect(() => {
    const fetchLivecams = async () => {
      setLoading(true);
      try {
        // Mock livecams data
        const mockLivecams: LivecamModel[] = [
          {
            id: 'cam1',
            name: 'Jessica',
            username: 'jessica_cam',
            displayName: 'Jessica Glamour',
            imageUrl: '/assets/livecams/cam1.jpg',
            thumbnailUrl: '/assets/livecams/thumbnails/cam1.jpg',
            isLive: true,
            isStreaming: true,
            viewerCount: 245,
            tags: ['blonde', 'american', 'dance'],
            rating: 4.8,
            price: 4.99,
            category: 'dance',
            categories: ['dance', 'chat'],
            language: 'English',
            country: 'USA',
            description: 'Join me for a fun dance session!',
            streamUrl: 'https://example.com/stream/jessica_cam',
            age: 24,
            gender: 'female',
            region: 'North America'
          },
          {
            id: 'cam2',
            name: 'Sophia',
            username: 'sophia_stars',
            displayName: 'Sophia Star',
            imageUrl: '/assets/livecams/cam2.jpg',
            thumbnailUrl: '/assets/livecams/thumbnails/cam2.jpg',
            isLive: true,
            isStreaming: true,
            viewerCount: 189,
            tags: ['brunette', 'european', 'chat'],
            rating: 4.7,
            price: 3.99,
            category: 'chat',
            categories: ['chat', 'music'],
            language: 'English, Spanish',
            country: 'Spain',
            description: 'Let\'s have a nice conversation!',
            streamUrl: 'https://example.com/stream/sophia_stars',
            age: 26,
            gender: 'female',
            region: 'Europe'
          }
        ];

        // Apply boost to livecams using Oxum
        const boosted = await Promise.all(mockLivecams.map(async (livecam) => {
          // Create a score array from various metrics for this livecam
          const scoreInputs = [
            livecam.isLive ? 100 : 0,
            livecam.viewerCount / 5, // Scale viewers to 0-100
            livecam.rating * 20, // Convert 0-5 rating to 0-100
          ];
          
          // Calculate boost score
          const boostScore = await oxum.calculateScore(scoreInputs);
          
          return {
            ...livecam,
            boostScore
          };
        }));
        
        // Sort by boost score and set state
        const sorted = [...boosted].sort((a, b) => (b.boostScore || 0) - (a.boostScore || 0));
        
        setLivecams(mockLivecams);
        setBoostedLivecams(sorted);
      } catch (error) {
        console.error('Error loading livecams:', error);
        toast({
          title: 'Error',
          description: 'Could not load livecam data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLivecams();
  }, [toast]);

  return {
    livecams,
    boostedLivecams,
    loading
  };
};

export default useBoostableLivecams;
