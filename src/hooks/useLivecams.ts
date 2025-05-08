
import { useState, useEffect, useCallback } from 'react';
import { Livecam } from '@/types/livecams';

const useLivecams = () => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchLivecams = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Sample data with proper types
      const mockLivecams: Livecam[] = [
        {
          id: '1',
          name: 'Jessica',
          username: 'jessica_live',
          displayName: 'Jessica Live',
          imageUrl: 'https://example.com/jessica.jpg',
          thumbnailUrl: 'https://example.com/jessica-thumb.jpg',
          isLive: true,
          isStreaming: true,
          viewerCount: 342,
          tags: ['dance', 'music'],
          rating: 4.8,
          price: 50,
          category: 'Dance',
          categories: ['Dance', 'Music'],
          language: 'English',
          country: 'US',
          description: 'Join my dance party livestream!'
        },
        {
          id: '2',
          name: 'Michael',
          username: 'michael_gaming',
          displayName: 'Michael Gaming',
          imageUrl: 'https://example.com/michael.jpg',
          thumbnailUrl: 'https://example.com/michael-thumb.jpg',
          isLive: false,
          isStreaming: false,
          viewerCount: 0,
          tags: ['gaming', 'comedy'],
          rating: 4.5,
          price: 40,
          category: 'Gaming',
          categories: ['Gaming', 'Comedy'],
          language: 'English',
          country: 'UK',
          description: 'Gaming streams every evening'
        }
      ];
      
      setLivecams(mockLivecams);
      setError(null);
    } catch (err) {
      console.error('Error fetching livecams:', err);
      setError('Failed to load livecams');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchLivecams();
  }, [fetchLivecams]);
  
  return { livecams, loading, error, refreshLivecams: fetchLivecams };
};

export default useLivecams;
