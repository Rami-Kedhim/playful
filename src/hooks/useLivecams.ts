
import { useState, useEffect } from 'react';
import { AIProfile } from '@/types/ai-profile';

export function useLivecams() {
  const [livecams, setLivecams] = useState<AIProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivecams = async () => {
      try {
        // Mock data - this would be an API call in a real app
        await new Promise(r => setTimeout(r, 1000)); // Simulate network latency
        
        const mockLivecams: AIProfile[] = [
          {
            id: '1',
            name: 'Sophie',
            avatarUrl: '/assets/livecam1.jpg',
            displayName: 'Sophie Star',
            description: 'Fun and flirty livecam performer',
            personality: ['outgoing', 'flirty', 'energetic'],
            tags: ['dancing', 'conversation', 'games'],
            location: 'Las Vegas',
            livecam_enabled: true,
            rating: 4.8,
            reviewCount: 156
          },
          {
            id: '2',
            name: 'Alexis',
            avatarUrl: '/assets/livecam2.jpg',
            displayName: 'Alexis Magic',
            description: 'Let\'s have a magical time together',
            personality: ['mysterious', 'seductive', 'playful'],
            tags: ['magic tricks', 'seduction', 'roleplay'],
            location: 'Miami',
            livecam_enabled: true,
            rating: 4.9,
            reviewCount: 203
          },
          {
            id: '3',
            name: 'Jessica',
            avatarUrl: '/assets/livecam3.jpg',
            displayName: 'Jess Wild',
            description: 'Wild and free spirit',
            personality: ['adventurous', 'spontaneous', 'wild'],
            tags: ['adventure', 'outdoors', 'spontaneity'],
            location: 'Colorado',
            livecam_enabled: true,
            rating: 4.7,
            reviewCount: 142
          }
        ];
        
        setLivecams(mockLivecams);
      } catch (error) {
        console.error('Error fetching livecams:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLivecams();
  }, []);
  
  return { livecams, loading };
}
