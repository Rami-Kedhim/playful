
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';

interface UseEscortSearchProps {
  initialFilters?: {
    query?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minAge?: number;
    maxAge?: number;
    tags?: string[];
    verifiedOnly?: boolean;
  };
}

export function useEscortSearch({ initialFilters = {} }: UseEscortSearchProps = {}) {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchEscorts = async () => {
      setLoading(true);
      
      try {
        // Mock API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockEscorts = Array(10).fill(null).map((_, index) => ({
          id: `escort-${index}`,
          name: `Escort ${index}`,
          age: 20 + Math.floor(Math.random() * 15),
          gender: ['Female', 'Male', 'Non-binary'][Math.floor(Math.random() * 3)],
          location: ['New York', 'Miami', 'Los Angeles', 'Chicago'][Math.floor(Math.random() * 4)],
          profileImage: `https://picsum.photos/seed/${index}/300/400`,
          rating: 3 + Math.random() * 2,
          verified: Math.random() > 0.5,
          price: 100 + Math.floor(Math.random() * 300),
          tags: ['GFE', 'Massage', 'Travel', 'Dinner Date'].slice(0, Math.floor(Math.random() * 4) + 1),
          images: [],
          videos: [{
            id: `video-${index}`,
            url: 'https://example.com/video.mp4',
            thumbnail: `https://picsum.photos/seed/${index}-video/300/400`
          }]
        } as Escort));
        
        setEscorts(mockEscorts);
        setTotal(50); // Mock total results
      } catch (error) {
        console.error('Error fetching escorts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscorts();
  }, [filters]);
  
  return {
    escorts,
    loading,
    filters,
    setFilters,
    total,
  };
}
