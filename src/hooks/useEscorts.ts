
import { useState, useEffect, useCallback } from 'react';
import { Escort } from '@/types/Escort';
import escortService from '@/services/escortService';

export const useEscorts = () => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const [featuredEscorts, setFeaturedEscorts] = useState<Escort[]>([]);
  
  const fetchEscorts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await escortService.getAllEscorts();
      setEscorts(data);
      
      // Set featured escorts
      setFeaturedEscorts(data.filter(escort => escort.is_featured));
      
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch escorts');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateFilters = useCallback((newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  const applyCurrentFilters = useCallback(async () => {
    // In a real app, this would call the API with the filters
    // For now we'll simulate filtering
    try {
      setLoading(true);
      const allEscorts = await escortService.getAllEscorts();
      
      // Apply filters logic here
      // This is just placeholder logic
      const filtered = allEscorts;
      
      setEscorts(filtered);
    } catch (err: any) {
      setError(err.message || 'Failed to apply filters');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  const clearAllFilters = useCallback(() => {
    setFilters({});
    fetchEscorts();
  }, [fetchEscorts]);
  
  useEffect(() => {
    fetchEscorts();
  }, [fetchEscorts]);
  
  return { 
    escorts, 
    loading, 
    error, 
    featuredEscorts,
    filters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  };
};

export default useEscorts;
