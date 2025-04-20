
import { useState, useEffect, useCallback } from 'react';
// Correct import of default export
import escortService from '@/services/escorts/escortService';

export function useEscorts() {
  const [escorts, setEscorts] = useState([]);
  const [featuredEscorts, setFeaturedEscorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const applyCurrentFilters = useCallback(() => {
    console.log('Applying filters:', filters);
  }, [escorts, filters]);

  useEffect(() => {
    setLoading(true);
    escortService.getEscorts()
      .then(data => {
        setEscorts(data);
        setFeaturedEscorts(data.filter(escort => escort.featured));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateFilters = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return {
    escorts,
    featuredEscorts,
    loading,
    filters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters,
  };
}

export default useEscorts;
