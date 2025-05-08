
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';
import escortService from '@/services/escorts/escortService';

export const useEscortSearch = (searchQuery: string = '') => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEscorts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const allEscorts = await escortService.getEscorts();
        
        // Simple filtering based on the search query
        if (searchQuery) {
          const filtered = allEscorts.filter(escort => 
            escort.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            escort.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            escort.location?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setEscorts(filtered);
        } else {
          setEscorts(allEscorts);
        }
      } catch (err: any) {
        console.error('Error searching escorts:', err);
        setError(err.message || 'Failed to search escorts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscorts();
  }, [searchQuery]);
  
  return {
    escorts,
    loading,
    error
  };
};

export default useEscortSearch;
