
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort'; // Use capital E in Escort

export function useEscorts() {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch escorts
    const fetchEscorts = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For now, simulate with setTimeout
        setTimeout(() => {
          // Mock data
          const mockEscorts: Escort[] = [
            {
              id: '1',
              name: 'Sophia',
              location: 'New York',
              age: 25,
              rating: 4.9,
              mainImageUrl: '/images/escorts/escort1.jpg',
              isVerified: true,
            },
            {
              id: '2',
              name: 'Isabella',
              location: 'Los Angeles',
              age: 27,
              rating: 4.7,
              mainImageUrl: '/images/escorts/escort2.jpg',
              isVerified: true,
            },
            // Add more mock data as needed
          ];
          
          setEscorts(mockEscorts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching escorts:', err);
        setError('Failed to load escorts');
        setLoading(false);
      }
    };

    fetchEscorts();
  }, []);

  return { escorts, loading, error };
}

export default useEscorts;
