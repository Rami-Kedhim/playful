
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';
import { escortService } from '@/services/escorts/escortService';

interface SearchParams {
  query?: string;
  location?: string;
  services?: string[];
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export const useEscortSearch = (initialParams: SearchParams = {}) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [params, setParams] = useState<SearchParams>(initialParams);
  
  const search = async (searchParams: SearchParams = params) => {
    setLoading(true);
    setError(null);
    
    try {
      const { results, total } = await escortService.searchEscorts(searchParams);
      setEscorts(results);
      setTotalCount(total);
    } catch (err: any) {
      console.error('Error searching escorts:', err);
      setError(err.message || 'Failed to search escorts');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    search();
  }, []);
  
  const updateParams = (newParams: Partial<SearchParams>) => {
    const updatedParams = {
      ...params,
      ...newParams,
      page: newParams.page || 1 // Reset to first page when filters change
    };
    setParams(updatedParams);
    search(updatedParams);
  };
  
  return {
    escorts,
    loading,
    error,
    totalCount,
    params,
    updateParams,
    search
  };
};

export default useEscortSearch;
