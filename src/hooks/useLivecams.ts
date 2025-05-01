
import { useState, useEffect } from 'react';
import { Livecam } from '@/types/livecams';

interface LivecamsFilters {
  categories?: string[];
  tags?: string[];
  priceRange?: number[];
  onlineOnly?: boolean;
  category?: string;
}

export const useLivecams = (options: { filters?: LivecamsFilters } = {}) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [featured, setFeatured] = useState<Livecam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLivecams = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockLivecams: Livecam[] = Array(12).fill(0).map((_, i) => ({
          id: `livecam-${i}`,
          name: `Livecam ${i}`,
          displayName: `Livecam ${i}`,
          username: `user${i}`,
          thumbnailUrl: `https://picsum.photos/seed/${i}/300/200`,
          imageUrl: `https://picsum.photos/seed/${i}/800/450`,
          isLive: Math.random() > 0.3,
          viewerCount: Math.floor(Math.random() * 1000),
          category: ['Games', 'Music', 'Chat', 'Dance', 'Creative'][Math.floor(Math.random() * 5)],
          categories: [['Games', 'Music', 'Chat', 'Dance', 'Creative'][Math.floor(Math.random() * 5)]],
          description: "This is a sample livecam stream. Join now for fun and entertainment!",
          language: ['English', 'Spanish', 'French'][Math.floor(Math.random() * 3)]
        }));
        
        // Apply filters
        let filtered = [...mockLivecams];
        
        if (options.filters) {
          // Filter by categories
          if (options.filters.categories && options.filters.categories.length > 0) {
            filtered = filtered.filter(livecam => 
              livecam.categories && livecam.categories.some(cat => 
                options.filters?.categories?.includes(cat)
              )
            );
          }
          
          // Filter by category (single category filter)
          if (options.filters.category && options.filters.category !== 'all') {
            filtered = filtered.filter(livecam => 
              livecam.category?.toLowerCase() === options.filters?.category?.toLowerCase() ||
              livecam.categories?.some(cat => 
                cat.toLowerCase() === options.filters?.category?.toLowerCase()
              )
            );
          }
          
          // Filter by online only
          if (options.filters.onlineOnly) {
            filtered = filtered.filter(livecam => livecam.isLive);
          }
        }
        
        // Set featured (just first 3 items for demo)
        setFeatured(mockLivecams.slice(0, 3));
        
        // Set filtered livecams
        setLivecams(filtered);
      } catch (error) {
        console.error('Error fetching livecams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivecams();
  }, [options.filters]);

  return { livecams, featured, isLoading };
};
